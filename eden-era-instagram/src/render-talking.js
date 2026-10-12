// Talking-to-camera Reels from Rebeca's REAL footage only: trim silences, tone-map iPhone HDR to SDR,
// crop/scale to 1080x1920, normalize loudness, burn word-timed captions, append brand end card.
// No synthetic voice or video: every frame and sound comes from her recording.
// Usage: node src/render-talking.js <specId>   (specs in copy/talking.json)
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { chromium } = require('playwright');
const { themes, vars, baseCss, wordmark } = require('./theme');

const W = 1080, H = 1920, FPS = 30;
const root = path.join(__dirname, '..');
const spec = JSON.parse(fs.readFileSync(path.join(root, 'copy', 'talking.json'), 'utf8')).find((s) => s.id === process.argv[2]);
if (!spec) throw new Error('unknown spec');
const tmp = path.join(root, '.build', spec.id);
fs.mkdirSync(tmp, { recursive: true });
const ff = (...a) => execFileSync('ffmpeg', ['-y', '-v', 'error', ...a], { stdio: 'inherit' });

// HLG/PQ iPhone footage -> SDR bt709. No-op-ish for SDR sources.
const toneMap = 'zscale=t=linear:npl=203,format=gbrpf32le,zscale=p=bt709,tonemap=mobius:desat=0,zscale=t=bt709:m=bt709:r=tv,format=yuv420p';
const fit = `scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},setsar=1,fps=${FPS}`;

// 1) Trim to the kept segments and join.
const keep = spec.keep; // [[start,end], ...] in source seconds
const parts = keep.map(([a, b], i) =>
  `[0:v]trim=${a}:${b},setpts=PTS-STARTPTS,${spec.hdr ? toneMap + ',' : ''}${fit}[v${i}];[0:a]atrim=${a}:${b},asetpts=PTS-STARTPTS,afade=t=in:d=0.03,afade=t=out:st=${(b - a - 0.04).toFixed(3)}:d=0.04[a${i}]`).join(';');
const concat = keep.map((_, i) => `[v${i}][a${i}]`).join('') + `concat=n=${keep.length}:v=1:a=1[v][a]`;
ff('-i', spec.source, '-filter_complex', `${parts};${concat};[a]highpass=f=80,afftdn=nf=-25,loudnorm=I=-14:TP=-1.5:LRA=11,aresample=48000[an]`,
  '-map', '[v]', '-map', '[an]', '-c:v', 'libx264', '-crf', '17', '-preset', 'medium', '-c:a', 'aac', '-b:a', '192k', path.join(tmp, 'body.mp4'));

// Map a source timestamp into the trimmed timeline.
const mapT = (t) => {
  let off = 0;
  for (const [a, b] of keep) { if (t >= a && t <= b) return off + (t - a); off += b - a; }
  return null;
};
const bodyDur = keep.reduce((s, [a, b]) => s + (b - a), 0);

// 2) Caption chunks from word timings (source times) -> trimmed timeline.
const chunks = spec.captions.map((c) => ({ text: c.text, s: mapT(c.s), e: Math.min(mapT(c.e) ?? bodyDur, bodyDur) }));

const css = (t) => `${baseCss(W, H)} body{background:transparent!important}
.cap{position:absolute;left:90px;right:150px;bottom:${spec.captionBottom || 470}px;text-align:center}
.cap span{display:inline;font-family:Body;font-weight:600;font-size:68px;line-height:1.32;color:#fff;
 background:rgba(63,54,47,.82);box-decoration-break:clone;-webkit-box-decoration-break:clone;padding:6px 22px;border-radius:14px}
.hook{position:absolute;left:90px;right:150px;top:260px;text-align:center}
.hook{line-height:1.32}.hook span{font-family:Display;font-size:84px;line-height:1.32;color:${t.ink};background:${t.bg};padding:10px 26px;border-radius:12px;
 box-decoration-break:clone;-webkit-box-decoration-break:clone}
.hook em{color:${t.accent}}`;

(async () => {
  const t = themes.cream;
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  const shot = async (body, file, transparent = true) => {
    await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${css(t)}</style></head><body style="${vars(t)}">${body}</body></html>`);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: file, omitBackground: transparent });
  };
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\*([\s\S]+?)\*/g, '<em>$1</em>');
  for (const [i, c] of chunks.entries()) await shot(`<div class="cap"><span>${esc(c.text)}</span></div>`, path.join(tmp, `cap${i}.png`));
  if (spec.hook) await shot(`<div class="hook"><span>${esc(spec.hook.text).replace(/\n/g, "<br>")}</span></div>`, path.join(tmp, 'hook.png'));

  // 3) End card (brand, keyword CTA), rendered as a still.
  await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${baseCss(W, H)}
   .c{position:absolute;left:90px;right:140px;top:250px;bottom:380px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center}
   .pill{font-size:44px;padding:24px 50px;margin-top:60px}</style></head><body>
   <div class="frame bordered" style="${vars(t)}"><div class="c">${wordmark(t.accent, 70)}
   <div class="h" style="font-size:96px;margin-top:80px">${esc(spec.end.line).replace(/\n/g, '<br>')}</div>
   <div><span class="pill">Comment ${spec.end.keyword}</span></div><div class="p" style="font-size:38px;margin-top:40px">link in bio</div></div></div></body></html>`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(tmp, 'end.png') });
  await browser.close();

  // 4) Overlay captions + hook on the body, then append end card.
  const inputs = ['-i', path.join(tmp, 'body.mp4')];
  let chain = '[0:v]null[b0]'; let last = 'b0'; let n = 1;
  const add = (file, s, e) => {
    inputs.push('-i', file);
    chain += `;[${last}][${n}:v]overlay=0:0:enable='between(t,${s.toFixed(3)},${e.toFixed(3)})'[b${n}]`;
    last = `b${n}`; n++;
  };
  if (spec.hook) add(path.join(tmp, 'hook.png'), 0, spec.hook.until);
  chunks.forEach((c, i) => add(path.join(tmp, `cap${i}.png`), c.s, c.e));
  ff(...inputs, '-filter_complex', chain, '-map', `[${last}]`, '-map', '0:a', '-c:v', 'libx264', '-crf', '17', '-pix_fmt', 'yuv420p', '-c:a', 'copy', path.join(tmp, 'captioned.mp4'));

  const endDur = spec.end.duration || 3.5;
  ff('-loop', '1', '-framerate', String(FPS), '-t', String(endDur), '-i', path.join(tmp, 'end.png'),
    '-f', 'lavfi', '-t', String(endDur), '-i', 'anullsrc=r=48000:cl=stereo',
    '-vf', `fade=t=in:st=0:d=0.3,format=yuv420p`, '-c:v', 'libx264', '-crf', '17', '-c:a', 'aac', '-b:a', '192k', '-shortest', path.join(tmp, 'end.mp4'));

  const out = path.join(root, 'reels', `${spec.id}.mp4`);
  ff('-i', path.join(tmp, 'captioned.mp4'), '-i', path.join(tmp, 'end.mp4'), '-filter_complex', '[0:v][0:a][1:v][1:a]concat=n=2:v=1:a=1[v][a]',
    '-map', '[v]', '-map', '[a]', '-c:v', 'libx264', '-profile:v', 'high', '-crf', '18', '-pix_fmt', 'yuv420p', '-r', String(FPS),
    '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', out);
  console.log(`${out}  body ${bodyDur.toFixed(2)}s + end ${endDur}s = ${(bodyDur + endDur).toFixed(2)}s`);
})();

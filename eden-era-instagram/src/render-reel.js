// Text-and-motion Reels: 1080x1920, 30fps, H.264 MP4. Frame-by-frame Playwright -> ffmpeg.
// Usage: node src/render-reel.js <reelId> [--audio file.wav] [--out name.mp4]
// Specs live in copy/reels.json: {id, theme, beats:[{t, d, eyebrow?, text, small?}], cta:{keyword, line}}
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { chromium } = require('playwright');
const { themes, vars, baseCss, wordmark } = require('./theme');

const W = 1080, H = 1920, FPS = 30;
// Instagram safe zone: keep text out of the top ~250px, bottom ~380px and right ~140px.
const SAFE = { top: 250, bottom: 380, left: 90, right: 140 };

const root = path.join(__dirname, '..');
const args = process.argv.slice(2);
const id = args[0];
const opt = (k) => (args.indexOf(k) >= 0 ? args[args.indexOf(k) + 1] : null);
const reel = JSON.parse(fs.readFileSync(path.join(root, 'copy', 'reels.json'), 'utf8')).find((r) => r.id === id);
if (!reel) throw new Error(`No reel ${id}`);
const theme = themes[reel.theme || 'cream'];
const duration = reel.duration || Math.max(...reel.beats.map((b) => b.t + b.d));
if (duration < 12 || duration > 20) console.warn(`WARN ${id}: duration ${duration}s outside 12-20s`);

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const rich = (s = '') => esc(s).replace(/\*([\s\S]+?)\*/g, '<em>$1</em>').replace(/\n/g, '<br>');

const html = `<!doctype html><html><head><meta charset="utf-8"><style>${baseCss(W, H)}
.safe{position:absolute;left:${SAFE.left}px;right:${SAFE.right}px;top:${SAFE.top}px;bottom:${SAFE.bottom}px;display:flex;flex-direction:column;justify-content:center}
.beat{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;opacity:0}
.beat .h{font-size:124px}
.beat.small .h{font-size:104px}
.beat .eyebrow{font-size:30px;margin-bottom:40px}
.bar{position:absolute;left:${SAFE.left}px;top:${SAFE.top - 60}px;height:6px;background:var(--accent);border-radius:3px}
.mark{position:absolute;left:0;right:0;top:120px;display:flex;justify-content:center}
.cta{text-align:center;align-items:center}
.cta .pill{font-size:40px;padding:22px 44px;margin-top:56px}
.cta .p{font-size:36px;margin-top:40px}
</style></head><body><div class="frame bordered" style="${vars(theme)}">
<div class="mark">${wordmark(theme.accent)}</div>
<div class="bar" id="bar"></div>
<div class="safe">
${reel.beats.map((b, i) => `<div class="beat ${b.small ? 'small' : ''}" id="b${i}">
  ${b.eyebrow ? `<div class="eyebrow">${esc(b.eyebrow)}</div>` : ''}<div class="h">${rich(b.text)}</div></div>`).join('')}
<div class="beat cta" id="cta"><div class="h" style="font-size:92px">${rich(reel.cta.line)}</div>
  <div><span class="pill">Comment ${esc(reel.cta.keyword)}</span></div><div class="p">link in bio</div></div>
</div></div>
<script>
const beats=${JSON.stringify(reel.beats)}, ctaT=${reel.cta.t}, total=${duration};
const ease=x=>1-Math.pow(1-Math.min(Math.max(x,0),1),3);
window.setT=(t)=>{
  beats.forEach((b,i)=>{const el=document.getElementById('b'+i);
    const inP=ease((t-b.t)/0.35), outP=ease((t-(b.t+b.d-0.25))/0.25);
    const on=t>=b.t&&t<b.t+b.d; const o=on?Math.min(inP,1-outP):0;
    el.style.opacity=o; el.style.transform='translateY('+((1-inP)*40)+'px)';});
  const c=document.getElementById('cta'); const cp=ease((t-ctaT)/0.4);
  c.style.opacity=t>=ctaT?cp:0; c.style.transform='translateY('+((1-cp)*40)+'px)';
  document.getElementById('bar').style.width=(${W - SAFE.left - SAFE.right}*Math.min(t/total,1))+'px';
};
</script></body></html>`;

(async () => {
  const outDir = path.join(root, 'reels');
  fs.mkdirSync(outDir, { recursive: true });
  const out = path.join(outDir, opt('--out') || `${id}.mp4`);
  const audio = opt('--audio');
  const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
    ...(audio ? ['-i', audio] : ['-f', 'lavfi', '-i', 'anullsrc=r=48000:cl=stereo']),
    '-map', '0:v', '-map', '1:a', '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p',
    '-profile:v', 'high', '-r', String(FPS), '-c:a', 'aac', '-b:a', '192k', '-ar', '48000',
    '-t', String(duration), '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const frames = Math.round(duration * FPS);
  for (let f = 0; f < frames; f++) {
    await page.evaluate((t) => window.setT(t), f / FPS);
    const buf = await page.screenshot({ type: 'jpeg', quality: 95 });
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
  }
  ff.stdin.end();
  await new Promise((r) => ff.on('close', r));
  await browser.close();
  console.log(`${out} (${duration}s, ${frames} frames)`);
})();

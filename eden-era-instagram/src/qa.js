// QA: probe every Reel (format, size, fps, duration), extract frames for a contact sheet,
// Unsafe-zone text check runs in src/qa_zones.py on the extracted frames.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.join(__dirname, '..');
const out = path.join(root, '.build', 'qa');
fs.mkdirSync(out, { recursive: true });
const sh = (cmd, args) => execFileSync(cmd, args, { encoding: 'utf8' });
const reels = fs.readdirSync(path.join(root, 'reels')).filter((f) => f.endsWith('.mp4')).sort();
const rows = [];
let fail = 0;

for (const f of reels) {
  const file = path.join(root, 'reels', f);
  const p = JSON.parse(sh('ffprobe', ['-v', 'error', '-show_entries', 'stream=codec_name,width,height,r_frame_rate,pix_fmt:format=duration', '-of', 'json', file]));
  const v = p.streams.find((s) => s.width); const a = p.streams.find((s) => !s.width);
  const dur = +p.format.duration;
  const issues = [];
  if (v.codec_name !== 'h264' || v.width !== 1080 || v.height !== 1920 || v.r_frame_rate !== '30/1' || v.pix_fmt !== 'yuv420p') issues.push('format');
  if (!a) issues.push('no audio track');
  if (dur < 12 || dur > 20) issues.push(`duration ${dur.toFixed(1)}s`);
  // Frames: hook (0.8s), middle, CTA (end - 1s).
  const times = [0.8, dur / 2, dur - 1];
  times.forEach((t, i) => sh('ffmpeg', ['-v', 'error', '-y', '-ss', String(t), '-i', file, '-frames:v', '1', path.join(out, `${f}.${i}.png`)]));
  if (issues.length) fail++;
  rows.push(`${issues.length ? 'FAIL' : 'ok  '} ${f.padEnd(42)} ${dur.toFixed(1)}s ${issues.join(', ')}`);
}
console.log(rows.join('\n'));
process.exitCode = fail ? 1 : 0;

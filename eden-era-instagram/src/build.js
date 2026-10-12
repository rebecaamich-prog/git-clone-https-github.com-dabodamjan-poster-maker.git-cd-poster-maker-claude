// Generate copy/, posts.json, reels.json, scripts/ and posting-calendar.md from src/content.js,
// and fail loudly on rule violations (mix, days, banned words, prices, links, hashtags).
const fs = require('fs');
const path = require('path');
const { posts, L } = require('./content');

const root = path.join(__dirname, '..');
const w = (f, s) => { fs.mkdirSync(path.dirname(path.join(root, f)), { recursive: true }); fs.writeFileSync(path.join(root, f), s); };
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const day = (d) => DAYS[new Date(d + 'T12:00:00Z').getUTCDay()];
const week = (p) => p.id.slice(0, 2).toUpperCase();
const TIME = { Sun: '10:00 AM', Mon: '10:00 AM', Tue: '10:00 AM', Wed: '10:00 AM', Thu: '10:00 AM', Fri: '10:00 AM' };

// ── QA ─────────────────────────────────────────────
const errors = [];
const count = (k) => posts.filter((p) => p.pillar === k).length;
if (posts.length !== 24) errors.push(`expected 24 posts, got ${posts.length}`);
for (const p of posts) {
  const d = day(p.date);
  if (d === 'Sat') errors.push(`${p.id}: Saturday`);
  const wantFmt = ['Sun', 'Wed'].includes(d) ? 'carousel' : 'reel';
  if (p.format !== wantFmt && !p.launch) errors.push(`${p.id}: ${d} should be ${wantFmt}`);
  const all = JSON.stringify(p);
  for (const bad of ['Atlanta', 'Florida', 'Ocala', 'stress-free', 'bridezilla']) if (all.toLowerCase().includes(bad.toLowerCase())) errors.push(`${p.id}: contains "${bad}"`);
  for (const m of all.match(/\$[\d,]+/g) || []) if (!['$1,000', '$3,000', '$5,000', '$50', '$200'].includes(m)) errors.push(`${p.id}: unexpected price ${m}`);
  for (const m of all.match(/\$(1,000|3,000|5,000)/g) || []) {
    const i = all.indexOf(m); if (!/starting at/i.test(all.slice(Math.max(0, i - 14), i + 1))) errors.push(`${p.id}: ${m} without "starting at"`);
  }
  if (p.hashtags.length < 3 || p.hashtags.length > 5) errors.push(`${p.id}: ${p.hashtags.length} hashtags`);
  if (!p.caption.includes(`Comment ${p.keyword}`)) errors.push(`${p.id}: caption CTA keyword mismatch`);
  if (!/link in bio/i.test(p.caption)) errors.push(`${p.id}: no "link in bio"`);
  if (p.format === 'reel' && (!p.beats || !p.script)) errors.push(`${p.id}: reel missing beats/script`);
  if (p.format === 'carousel' && (!p.slides || p.slides.length < 2 || p.slides.length > 10)) errors.push(`${p.id}: slides`);
  const words = p.script ? p.script.split(/\s+/).length : 0;
  if (p.format === 'reel' && !p.footage && (words < 30 || words > 62)) errors.push(`${p.id}: script ${words} words (aim 12–20 s ≈ 35–55)`);
}
if (errors.length) { console.error('QA FAILED\n' + errors.join('\n')); process.exit(1); }

// ── posts.json / reels.json for the renderers ─────
w('copy/posts.json', JSON.stringify(posts.filter((p) => p.slides).map((p) => ({ id: p.id, slides: p.slides })), null, 1));
const BEAT = 2.6, CTA_LEN = 3.2;
w('copy/reels.json', JSON.stringify(posts.filter((p) => p.beats).map((p, i) => ({
  id: p.id, theme: i % 3 === 2 ? 'sage' : 'cream',
  duration: +(p.beats.length * BEAT + CTA_LEN).toFixed(2),
  beats: p.beats.map(([eyebrow, text], k) => ({ t: +(k * BEAT).toFixed(2), d: BEAT, eyebrow, text, small: text.split('\n').length > 2 || text.length > 28 })),
  cta: { t: +(p.beats.length * BEAT).toFixed(2), keyword: p.keyword, line: p.cta },
})), null, 1));

// ── copy/ ───────────────────────────────────────────
const strip = (s) => s.replace(/\*/g, '');
const confirms = [];
for (const wk of ['W1', 'W2', 'W3', 'W4']) {
  let md = `# ${wk} captions\n\nLinks: Kit ${L.kit} · Site ${L.site} · Consult ${L.consult}\n`;
  for (const p of posts.filter((x) => week(x) === wk)) {
    md += `\n---\n## ${day(p.date)} ${p.date} · ${p.format === 'carousel' ? 'Carousel' : 'Reel'} · ${p.pillar} · CTA ${p.keyword}\n`;
    md += `**ID:** \`${p.id}\` · **Source:** ${p.source}\n\n**Hook:** ${p.hook}\n\n**Caption:**\n\n${p.caption}\n\n${p.hashtags.join(' ')}\n`;
    if (p.slides) md += `\n**Slides:**\n${p.slides.map((s, i) => `${i + 1}. ${[s.eyebrow, s.step, s.title, s.sub, s.body, ...(s.items || [])].filter(Boolean).map(strip).join(' / ').replace(/\n/g, ' ')}`).join('\n')}\n`;
    if (p.beats) md += `\n**On-screen beats:** ${p.beats.map(([e, t]) => strip((e ? e + ': ' : '') + t).replace(/\n/g, ' ')).join(' → ')} → CTA: ${strip(p.cta)} / Comment ${p.keyword}\n`;
    md += `\n**Story:** ${p.story}\n`;
    for (const c of p.confirm || []) { md += `\n[CONFIRM] ${c}\n`; confirms.push(`${p.id}: ${c}`); }
  }
  w(`copy/${wk}-captions.md`, md);
}

// ── scripts/ (teleprompter + shot list + rotation) ──
const reels = posts.filter((p) => p.format === 'reel');
const outfits = ['A: sage or green top', 'B: cream or white top', 'C: black or navy top', 'D: soft neutral blazer'];
const sets = ['1: desk with planner + laptop', '2: sofa or reading chair, warm lamp', '3: by a window, natural light', '4: kitchen or dining table'];
let tp = `# Teleprompter scripts (12–20 s each)\n\nRead at a calm pace (~150 words/min). Every Reel already has a text-and-motion version; film any of these to make the talking version. Upload the clip and I'll caption, trim, add the end card and crop to 9:16.\n\n★ = best as talking-to-camera\n`;
reels.forEach((p, i) => {
  tp += `\n---\n### ${p.talking ? '★ ' : ''}${day(p.date)} ${p.date} · \`${p.id}\`\n**Hook (first second, look into the lens):** ${p.hook}\n\n> ${p.script}\n\nOutfit ${outfits[i % 4]} · Set ${sets[Math.floor(i / 4) % 4]}\n`;
});
w('scripts/teleprompter.md', tp);
w('scripts/shot-list.md', `# Shot list + batch filming plan

## Batch days (film 4 Reels per session; outfits/sets rotate so the feed looks varied)
| Session | Set | Outfits (one per Reel) | Reels |
|---|---|---|---|
${[0, 1, 2, 3].map((s) => `| ${s + 1} | ${sets[s]} | A → B → C → D | ${reels.slice(s * 4, s * 4 + 4).map((p) => '`' + p.id + '`').join(', ')} |`).join('\n')}

Switch outfit between every Reel and change hair (down / half-up / ponytail) once per session. Never wear the same outfit on the same set twice in a row. These are real changes you make on camera; nothing is swapped digitally.

## Every talking Reel
1. **Framing:** phone vertical, at eye level, on a tripod. Eyes in the top third, a little headroom. Leave the bottom third clear (captions go there).
2. **Light:** face a window. No bright window behind you.
3. **Sound:** quiet room, phone within arm's length; turn off the AC or fan. (The car clip worked, but road noise needed cleanup.)
4. **Takes:** say the hook first, straight to the lens, with no "hi guys". Do 2 takes. Pause 2 s before and after.
5. **B-roll (optional, 3–5 s each):** typing on the laptop, writing in a planner, flipping through the printed kit, a slow pan of the desk.
6. **Upload:** original files from the Photos app (not screen recordings). HDR is fine; I convert it.

## After you film, I:
- transcribe with Whisper and time captions to your words
- trim silences, normalize loudness to −14 LUFS, convert HDR to SDR
- add the hook overlay, the brand end card with the keyword CTA, and crop to 1080×1920
- leave the soundtrack open so you can add trending audio in the Instagram app (keep it low under your voice)
`);

// ── posting-calendar.md ─────────────────────────────
let cal = `# Posting calendar · 4 weeks · Sun–Fri (no Saturday)

**Times:** Metricool best-time data for the connected Instagram account (America/New_York) peaks at **10:00 AM every day**; second peak around **6:00 PM Tue–Thu**. All posts are set to 10:00 AM ET. Account: **@edeneraevents**. These times came from the personal account; they get re-pulled once @edeneraevents is connected to Metricool.

**Mix:** ${count('Education')} education (${Math.round(count('Education') / 24 * 100)}%) · ${count('Kit')} kit (${Math.round(count('Kit') / 24 * 100)}%) · ${count('Consult')} consult (${Math.round(count('Consult') / 24 * 100)}%) · Carousels Sun + Wed · Reels Mon, Tue, Thu, Fri

| Week | Day | Date | Time ET | Format | Pillar | Topic | CTA | Files |
|---|---|---|---|---|---|---|---|---|
`;
for (const p of posts) {
  const files = p.format === 'carousel' ? `designs/${p.id}/` : `reels/${p.id}.mp4${p.footage ? ' + talking version' : ''}`;
  cal += `| ${week(p)} | ${day(p.date)} | ${p.date} | ${TIME[day(p.date)]} | ${p.format} | ${p.pillar} | ${p.hook} | ${p.keyword} | \`${files}\` |\n`;
}
cal += `\n**Kit launch moved up:** the kit-launch Reel (your real car clip) now goes out **Wed Oct 14, 10:00 AM ET**. That leaves Mon Oct 19 open: film any ★ script from scripts/teleprompter.md for it, or leave it as a rest day.\n\n**Metricool:** all 24 posts are drafts (auto-publish off) on the brand connected to @edeneraevents. Times use Metricool's benchmark (10 AM ET); the account has too little recent activity for its own best-time data.\n\n## Daily Stories (every day Sun–Fri)\n1. Share the day's post to Stories with a sticker (below).\n2. One personal frame: your desk, a planning moment, a verse on a quiet day (about 1 a week).\n3. Fridays: a question box ("Ask me anything about planning"); answer them Mon–Tue as Stories.\n\n| Date | Story sticker |\n|---|---|\n`;
for (const p of posts) cal += `| ${day(p.date)} ${p.date} | ${p.story} |\n`;
cal += `\n## Keyword replies (set up as Instagram auto-replies or saved replies)\n- **KIT** → "Here's the Guest of Honor Day-Of Kit: ${L.kit} 🤍 Your friend runs the day. You enjoy it."\n- **PLAN** → "So glad you reached out! Book a 60-minute virtual consult ($50) here: ${L.consult} 🤍 Let's stress now so the day can be stress-less."\n\n## Bio (@edeneraevents)\nEden Era Events · Online wedding planning\nCalm, organized, detail-obsessed. Faith-led.\nComment KIT for the Day-Of Kit · PLAN for a consult\n🔗 link in bio → kit · consult · ${L.site}\n`;
w('posting-calendar.md', cal);

console.log(`OK: ${posts.length} posts · edu ${count('Education')} · kit ${count('Kit')} · consult ${count('Consult')} · ${posts.filter((p) => p.slides).length} carousels · ${reels.length} reels`);
if (confirms.length) console.log('CONFIRM:\n' + confirms.join('\n'));

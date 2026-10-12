// Shared brand tokens + slide HTML for posts (1080x1350) and Reels (1080x1920).
const path = require('path');
const nm = path.join(__dirname, '..', 'node_modules', '@fontsource');
const fs = require('fs');
// Inline as data URIs: pages rendered via setContent can't load file:// fonts.
const font = (pkg, file) => 'data:font/woff2;base64,' + fs.readFileSync(path.join(nm, pkg, 'files', file)).toString('base64');

const C = {
  sage: '#55634B', cream: '#F3EDE0', creamLight: '#FBF8F2',
  gold: '#7F6230', goldOnSage: '#E3CB98', ink: '#3F362F', white: '#FFFFFF', line: '#D9C9A3',
};

const fontFaces = `
@font-face{font-family:Display;font-weight:400;font-style:normal;src:url(${font('cormorant-garamond', 'cormorant-garamond-latin-500-normal.woff2')})}
@font-face{font-family:Display;font-weight:400;font-style:italic;src:url(${font('cormorant-garamond', 'cormorant-garamond-latin-500-italic.woff2')})}
@font-face{font-family:Display;font-weight:600;font-style:normal;src:url(${font('cormorant-garamond', 'cormorant-garamond-latin-600-normal.woff2')})}
@font-face{font-family:Body;font-weight:400;src:url(${font('inter', 'inter-latin-400-normal.woff2')})}
@font-face{font-family:Body;font-weight:500;src:url(${font('inter', 'inter-latin-500-normal.woff2')})}
@font-face{font-family:Body;font-weight:600;src:url(${font('inter', 'inter-latin-600-normal.woff2')})}
`;

// Wordmark: monogram + small caps name, matching the Etsy listing images.
const wordmark = (color) => `
<div class="wm" style="color:${color}">
  <span class="mono" style="border-color:${color}">E</span><span>Eden Era Events</span>
</div>`;

const baseCss = (W, H) => `
${fontFaces}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden}
body{font-family:Body,sans-serif;color:${C.ink};-webkit-font-smoothing:antialiased}
.frame{position:absolute;inset:0;background:var(--bg)}
.frame.bordered::after{content:"";position:absolute;inset:28px;border:2px solid var(--rule);pointer-events:none}
.eyebrow{font-family:Body;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:var(--accent)}
.h{font-family:Display;font-weight:400;line-height:1.02;color:var(--ink)}
.h em{font-style:italic;color:var(--accent)}
.p{font-family:Body;font-weight:400;line-height:1.45;color:var(--body)}
.wm{display:flex;align-items:center;gap:14px;font-family:Display;font-weight:600;font-size:30px;letter-spacing:.14em;text-transform:uppercase}
.wm .mono{width:44px;height:44px;border:1.5px solid;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:24px;letter-spacing:0}
.num{font-family:Display;font-weight:400;color:var(--accent)}
.row{display:flex;gap:34px;align-items:baseline;padding:22px 0;border-bottom:1.5px solid var(--rule)}
.pill{display:inline-block;padding:16px 30px;border-radius:999px;background:var(--accent);color:var(--bg);font-family:Body;font-weight:600;letter-spacing:.08em;text-transform:uppercase}
`;

const themes = {
  white: { bg: C.white, ink: C.ink, body: '#5a5048', accent: C.gold, rule: C.line },
  cream: { bg: C.creamLight, ink: C.ink, body: '#5a5048', accent: C.gold, rule: C.line },
  sage: { bg: C.sage, ink: C.creamLight, body: C.cream, accent: C.goldOnSage, rule: 'rgba(227,203,152,.55)' },
};

const vars = (t) => `--bg:${t.bg};--ink:${t.ink};--body:${t.body};--accent:${t.accent};--rule:${t.rule}`;

module.exports = { C, themes, vars, baseCss, wordmark };

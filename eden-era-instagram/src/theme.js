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

// Real logo (assets/logo-*.png, extracted from Rebeca's logo file), tinted per background.
const logo = (variant) => 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, '..', 'assets', `logo-${variant}.png`)).toString('base64');
const logoFor = { [C.gold]: 'gold', [C.goldOnSage]: 'goldlight', [C.sage]: 'sage', [C.creamLight]: 'cream' };
const wordmark = (color, h = 46) => `<img class="wm" src="${logo(logoFor[color] || 'sage')}" style="height:${h}px">`;

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
.wm{display:block}
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

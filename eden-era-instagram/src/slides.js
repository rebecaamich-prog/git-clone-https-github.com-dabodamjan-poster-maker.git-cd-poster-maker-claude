// Slide layouts for 1080x1350 feed posts. Each returns an HTML document.
const { themes, vars, baseCss, wordmark } = require('./theme');

const W = 1080, H = 1350;
const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
// Allow *italic accent* inside headlines.
const rich = (s = '') => esc(s).replace(/\*([\s\S]+?)\*/g, '<em>$1</em>').replace(/\n/g, '<br>');

const page = (theme, inner, { bordered = true } = {}) => {
  const t = themes[theme];
  return `<!doctype html><html><head><meta charset="utf-8"><style>${baseCss(W, H)}
  .pad{position:absolute;inset:0;padding:120px 110px 110px;display:flex;flex-direction:column}
  .foot{position:absolute;left:0;right:0;bottom:66px;display:flex;justify-content:center}
  .count{position:absolute;top:66px;right:80px;font-family:Body;font-weight:500;font-size:22px;letter-spacing:.18em;color:var(--accent)}
  </style></head><body><div class="frame ${bordered ? 'bordered' : ''}" style="${vars(t)}">${inner}
  <div class="foot">${wordmark(t.accent)}</div></div></body></html>`;
};

const counter = (s) => (s.n && s.of ? `<div class="count">${s.n} / ${s.of}</div>` : '');

const layouts = {
  // Big headline cover. {eyebrow, title, sub, swipe}
  cover: (s) => page(s.theme || 'white', `${counter(s)}<div class="pad" style="justify-content:center">
    <div class="eyebrow" style="font-size:26px;margin-bottom:44px">${esc(s.eyebrow)}</div>
    <div class="h" style="font-size:${s.size || 128}px">${rich(s.title)}</div>
    ${s.sub ? `<div class="p" style="font-size:36px;margin-top:48px;max-width:820px">${rich(s.sub)}</div>` : ''}
    ${s.swipe ? `<div class="eyebrow" style="font-size:22px;margin-top:70px">${esc(s.swipe)} &rarr;</div>` : ''}
  </div>`),

  // Numbered list. {eyebrow, title, items:[...], start}
  list: (s) => page(s.theme || 'white', `${counter(s)}<div class="pad" style="padding-top:130px">
    <div class="eyebrow" style="font-size:24px;margin-bottom:26px">${esc(s.eyebrow)}</div>
    <div class="h" style="font-size:${s.size || 78}px;margin-bottom:34px">${rich(s.title)}</div>
    ${s.items.map((it, i) => `<div class="row"><span class="num" style="font-size:52px;min-width:70px">${String((s.start || 1) + i).padStart(2, '0')}</span>
      <span class="p" style="font-size:${s.itemSize || 34}px;color:var(--ink)">${rich(it)}</span></div>`).join('')}
  </div>`),

  // One idea per slide. {step, title, body, note}
  point: (s) => page(s.theme || 'white', `${counter(s)}<div class="pad" style="justify-content:center">
    ${s.step ? `<div class="num" style="font-size:150px;line-height:1;margin-bottom:24px">${esc(s.step)}</div>` : ''}
    ${s.eyebrow ? `<div class="eyebrow" style="font-size:24px;margin-bottom:30px">${esc(s.eyebrow)}</div>` : ''}
    <div class="h" style="font-size:${s.size || 86}px">${rich(s.title)}</div>
    ${s.body ? `<div class="p" style="font-size:36px;margin-top:40px">${rich(s.body)}</div>` : ''}
    ${s.note ? `<div class="p" style="font-size:28px;margin-top:44px;padding:28px 34px;background:rgba(243,237,224,.7);border:1.5px solid var(--rule);color:var(--ink)">${rich(s.note)}</div>` : ''}
  </div>`),

  // Closing CTA. {eyebrow, title, keyword, sub}
  cta: (s) => page(s.theme || 'sage', `${counter(s)}<div class="pad" style="justify-content:center;align-items:center;text-align:center">
    <div class="eyebrow" style="font-size:26px;margin-bottom:40px">${esc(s.eyebrow || 'Your next step')}</div>
    <div class="h" style="font-size:${s.size || 96}px">${rich(s.title)}</div>
    <div style="margin-top:64px"><span class="pill" style="font-size:30px">Comment ${esc(s.keyword)}</span></div>
    ${s.sub ? `<div class="p" style="font-size:30px;margin-top:44px;max-width:760px">${rich(s.sub)}</div>` : ''}
  </div>`),

  // Meet Rebeca — photo still on top. {photo, title, body}
  photo: (s) => page(s.theme || 'cream', `<div style="position:absolute;left:28px;right:28px;top:28px;height:700px;background:#e9e1d1 center/cover no-repeat url('${s.photo || ''}');display:flex;align-items:center;justify-content:center">
      ${s.photo ? '' : `<span class="eyebrow" style="font-size:22px">[ Rebeca photo here ]</span>`}</div>
    <div class="pad" style="padding-top:790px">
      <div class="eyebrow" style="font-size:24px;margin-bottom:20px">${esc(s.eyebrow)}</div>
      <div class="h" style="font-size:${s.size || 76}px">${rich(s.title)}</div>
      ${s.body ? `<div class="p" style="font-size:30px;margin-top:24px">${rich(s.body)}</div>` : ''}
    </div>`, { bordered: false }),
};

module.exports = { layouts, W, H };

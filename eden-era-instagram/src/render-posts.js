// Render carousel/feed posts from copy/posts.json to designs/<id>/<n>.png at 1080x1350.
// Usage: node src/render-posts.js [postId ...]
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { layouts, W, H } = require('./slides');

const root = path.join(__dirname, '..');
const posts = JSON.parse(fs.readFileSync(path.join(root, 'copy', 'posts.json'), 'utf8'));
const only = process.argv.slice(2);

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  for (const post of posts) {
    if (!post.slides || (only.length && !only.includes(post.id))) continue;
    const dir = path.join(root, 'designs', post.id);
    fs.mkdirSync(dir, { recursive: true });
    for (const [i, s] of post.slides.entries()) {
      const slide = { ...s, n: post.slides.length > 1 ? i + 1 : 0, of: post.slides.length };
      await page.setContent(layouts[s.type](slide), { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      // Fail loudly if any text overflows the canvas.
      const overflow = await page.evaluate(() => document.querySelector('.pad') &&
        document.querySelector('.pad').scrollHeight > document.querySelector('.pad').clientHeight + 1);
      if (overflow) console.warn(`OVERFLOW ${post.id} slide ${i + 1}`);
      await page.screenshot({ path: path.join(dir, `${String(i + 1).padStart(2, '0')}.png`) });
    }
    console.log(`${post.id}: ${post.slides.length} slide(s)`);
  }
  await browser.close();
})();

const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const consoleErrors = [];
  page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
  page.on('pageerror', (err) => consoleErrors.push('pageerror: ' + err.message));

  await page.goto('http://localhost:5173/blogs', { waitUntil: 'networkidle' });
  await page.waitForSelector('.blog-card-type-badge');

  const categoryBadges = await page.locator('.blog-card-badge').allInnerTexts();
  const typeBadges = await page.locator('.blog-card-type-badge').allInnerTexts();

  await page.screenshot({ path: 'blogs-two-badges.png' });

  console.log(JSON.stringify({ categoryBadges, typeBadges, consoleErrors }, null, 2));
  await browser.close();
})().catch((e) => { console.error('SCRIPT ERROR', e); process.exit(1); });

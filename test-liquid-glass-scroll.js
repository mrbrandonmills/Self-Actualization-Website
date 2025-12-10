const { chromium } = require('playwright');

async function testLiquidGlassScroll() {
  console.log('Testing liquid glass cards on production (scrolled views)...\n');

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  // Test /books page - scroll to see cards
  console.log('Testing /books page cards...');
  await page.goto('https://selfactualize.life/books', {
    waitUntil: 'domcontentloaded',
    timeout: 30000
  });
  await page.waitForTimeout(2000);

  // Scroll down to see book cards
  await page.evaluate(() => window.scrollTo(0, 700));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/tmp/liquid-glass-books-cards.png' });
  console.log('  Screenshot: /tmp/liquid-glass-books-cards.png\n');

  // Test /courses page - scroll to cards
  console.log('Testing /courses page cards...');
  await page.goto('https://selfactualize.life/courses', {
    waitUntil: 'domcontentloaded',
    timeout: 30000
  });
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 600));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/tmp/liquid-glass-courses-cards.png' });
  console.log('  Screenshot: /tmp/liquid-glass-courses-cards.png\n');

  // Test /blog page
  console.log('Testing /blog page card...');
  await page.goto('https://selfactualize.life/blog', {
    waitUntil: 'domcontentloaded',
    timeout: 30000
  });
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 400));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/tmp/liquid-glass-blog-card.png' });
  console.log('  Screenshot: /tmp/liquid-glass-blog-card.png\n');

  // Test /writing-lab page
  console.log('Testing /writing-lab page card...');
  await page.goto('https://selfactualize.life/writing-lab', {
    waitUntil: 'domcontentloaded',
    timeout: 30000
  });
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 400));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/tmp/liquid-glass-writing-lab-card.png' });
  console.log('  Screenshot: /tmp/liquid-glass-writing-lab-card.png\n');

  // Test /essays page
  console.log('Testing /essays page cards...');
  await page.goto('https://selfactualize.life/essays', {
    waitUntil: 'domcontentloaded',
    timeout: 30000
  });
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 600));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/tmp/liquid-glass-essays-cards.png' });
  console.log('  Screenshot: /tmp/liquid-glass-essays-cards.png\n');

  await browser.close();
  console.log('Done! Check /tmp/liquid-glass-*-cards.png for screenshots');
}

testLiquidGlassScroll().catch(console.error);

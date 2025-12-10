const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15'
  });
  const page = await context.newPage();
  
  console.log('Testing /books page on mobile...');
  await page.goto('https://selfactualize.life/books', { waitUntil: 'networkidle', timeout: 30000 });
  
  // Wait for content to load
  await page.waitForTimeout(2000);
  
  // Check book-cover background
  const bookCoverBg = await page.evaluate(() => {
    const cover = document.querySelector('.book-cover');
    if (cover) {
      return window.getComputedStyle(cover).backgroundColor;
    }
    return 'not found';
  });
  console.log('Book cover background:', bookCoverBg);
  
  // Check if it's white (rgb(255, 255, 255))
  const isWhite = bookCoverBg.includes('255, 255, 255') || bookCoverBg === '#ffffff';
  console.log('Is white background:', isWhite ? 'YES ✓' : 'NO ✗');
  
  // Check text colors
  const textColors = await page.evaluate(() => {
    const h2 = document.querySelector('.book-info h2');
    const accent = document.querySelector('.book-info .text-accent');
    const desc = document.querySelector('.book-info .text-sm');
    return {
      h2: h2 ? window.getComputedStyle(h2).color : 'not found',
      accent: accent ? window.getComputedStyle(accent).color : 'not found',
      desc: desc ? window.getComputedStyle(desc).color : 'not found'
    };
  });
  console.log('Text colors:', textColors);
  
  // Take screenshot
  await page.screenshot({ path: '/tmp/books-fix-test.png', fullPage: false });
  console.log('Screenshot saved to /tmp/books-fix-test.png');
  
  await browser.close();
  console.log('Done!');
})();

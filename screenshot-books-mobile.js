const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 } // iPhone size
  });

  console.log('📱 Taking mobile screenshot of books page...\n');

  try {
    await page.goto('https://selfactualize.life/books', {
      waitUntil: 'networkidle',
      timeout: 60000
    });

    // Wait for rendering
    await page.waitForTimeout(3000);

    // Take full page screenshot
    await page.screenshot({ path: '/tmp/screenshot-books-mobile.png', fullPage: true });
    console.log('✓ Mobile screenshot saved to /tmp/screenshot-books-mobile.png\n');

    console.log('✅ Done!');

  } catch (error) {
    console.error('❌ ERROR:', error.message);
  } finally {
    await browser.close();
  }
})();

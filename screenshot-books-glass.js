const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1920, height: 3000 }
  });

  console.log('📸 Taking screenshot of books page with glass effects...\n');

  try {
    await page.goto('https://selfactualize.life/books', {
      waitUntil: 'networkidle',
      timeout: 60000
    });

    // Wait for rendering
    await page.waitForTimeout(3000);

    // Take full page screenshot
    await page.screenshot({ path: '/tmp/screenshot-books-glass-effect.png', fullPage: true });
    console.log('✓ Screenshot saved to /tmp/screenshot-books-glass-effect.png\n');

    console.log('✅ Done!');

  } catch (error) {
    console.error('❌ ERROR:', error.message);
  } finally {
    await browser.close();
  }
})();

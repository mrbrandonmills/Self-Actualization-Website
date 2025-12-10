const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1920, height: 3000 }
  });

  console.log('📸 Taking final screenshot of courses page...\n');

  try {
    await page.goto('https://selfactualize.life/courses', {
      waitUntil: 'networkidle',
      timeout: 60000
    });

    // Wait for rendering
    await page.waitForTimeout(3000);

    // Take full page screenshot
    await page.screenshot({ path: '/tmp/screenshot-courses-final.png', fullPage: true });
    console.log('✓ Screenshot saved to /tmp/screenshot-courses-final.png\n');

    console.log('✅ Done!');

  } catch (error) {
    console.error('❌ ERROR:', error.message);
  } finally {
    await browser.close();
  }
})();

const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 }
  });

  console.log('🔍 Final test of selfactualize.life...');

  try {
    await page.goto('https://selfactualize.life', {
      waitUntil: 'load',
      timeout: 60000
    });

    console.log('✓ Page loaded');

    // Wait a bit for client-side hydration
    await page.waitForTimeout(5000);

    // Scroll to the section
    await page.evaluate(() => {
      window.scrollTo(0, 4000);
    });
    await page.waitForTimeout(2000);

    // Check first content card
    const cardOpacity = await page.evaluate(() => {
      const firstCard = document.querySelector('.content-card');
      if (!firstCard) return 'NOT_FOUND';

      const styles = window.getComputedStyle(firstCard);
      return styles.opacity;
    });

    console.log(`\n📊 First Card Opacity: ${cardOpacity}`);

    // Take screenshot
    await page.screenshot({ path: '/tmp/screenshot-final-test.png', fullPage: true });
    console.log('✓ Final screenshot saved to /tmp/screenshot-final-test.png');

    if (cardOpacity === '1') {
      console.log('\n✅ SUCCESS: Cards are now visible!');
    } else if (cardOpacity === '0') {
      console.log('\n❌ FAILURE: Cards still have opacity 0');
    } else {
      console.log(`\n⚠️  UNEXPECTED: Card opacity is ${cardOpacity}`);
    }

  } catch (error) {
    console.error('❌ ERROR:', error.message);
  } finally {
    await browser.close();
  }
})();

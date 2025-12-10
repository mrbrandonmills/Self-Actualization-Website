const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 }
  });

  console.log('🔍 Testing course card glass effect on selfactualize.life/courses...\n');

  try {
    await page.goto('https://selfactualize.life/courses', {
      waitUntil: 'networkidle',
      timeout: 60000
    });

    // Wait for page to fully render
    await page.waitForTimeout(3000);

    // Get computed styles of the first course card
    const cardStyles = await page.evaluate(() => {
      const firstCard = document.querySelector('.course-card');
      if (!firstCard) return null;

      const styles = window.getComputedStyle(firstCard);
      return {
        background: styles.background,
        backdropFilter: styles.backdropFilter || styles.webkitBackdropFilter,
        border: styles.border,
        boxShadow: styles.boxShadow,
        borderRadius: styles.borderRadius
      };
    });

    console.log('📊 First Course Card Styles:');
    if (cardStyles) {
      console.log(`  Background: ${cardStyles.background.substring(0, 100)}...`);
      console.log(`  Backdrop Filter: ${cardStyles.backdropFilter}`);
      console.log(`  Border: ${cardStyles.border}`);
      console.log(`  Border Radius: ${cardStyles.borderRadius}`);
      console.log(`  Box Shadow: ${cardStyles.boxShadow.substring(0, 150)}...`);
    } else {
      console.log('  ✗ No course card found');
    }

    // Check button styles
    const buttonStyles = await page.evaluate(() => {
      const btn = document.querySelector('.course-btn');
      if (!btn) return null;

      const styles = window.getComputedStyle(btn);
      return {
        background: styles.background,
        border: styles.border,
        color: styles.color,
        fontWeight: styles.fontWeight,
        textTransform: styles.textTransform
      };
    });

    console.log('\n📊 Explore Course Button Styles:');
    if (buttonStyles) {
      console.log(`  Background: ${buttonStyles.background.substring(0, 100)}...`);
      console.log(`  Border: ${buttonStyles.border}`);
      console.log(`  Color: ${buttonStyles.color}`);
      console.log(`  Font Weight: ${buttonStyles.fontWeight}`);
      console.log(`  Text Transform: ${buttonStyles.textTransform}`);
    } else {
      console.log('  ✗ No button found');
    }

    // Take screenshot
    await page.screenshot({ path: '/tmp/screenshot-courses-glass.png', fullPage: false });
    console.log('\n✓ Screenshot saved to /tmp/screenshot-courses-glass.png');

    console.log('\n✅ All checks complete!');

  } catch (error) {
    console.error('❌ ERROR:', error.message);
  } finally {
    await browser.close();
  }
})();

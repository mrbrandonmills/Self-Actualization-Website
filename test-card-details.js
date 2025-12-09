const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 }
  });

  console.log('🔍 Testing card details on selfactualize.life...\n');

  try {
    await page.goto('https://selfactualize.life', {
      waitUntil: 'load',
      timeout: 60000
    });

    // Wait for hydration
    await page.waitForTimeout(5000);

    // Scroll to the section
    await page.evaluate(() => {
      window.scrollTo(0, 4000);
    });
    await page.waitForTimeout(2000);

    // Check author cards for background images
    const authorCardInfo = await page.evaluate(() => {
      const authorCards = document.querySelectorAll('.author-card');
      return Array.from(authorCards).map(card => {
        const styles = window.getComputedStyle(card);
        const name = card.querySelector('.author-card-name')?.textContent || 'Unknown';
        return {
          name: name,
          hasBackgroundImage: styles.backgroundImage !== 'none',
          backgroundImage: styles.backgroundImage
        };
      });
    });

    console.log('📊 Author Cards:');
    authorCardInfo.forEach((card, i) => {
      console.log(`  ${i + 1}. ${card.name}`);
      console.log(`     Background Image: ${card.hasBackgroundImage ? '✓ YES' : '✗ NO'}`);
      if (card.hasBackgroundImage) {
        console.log(`     URL: ${card.backgroundImage.substring(0, 80)}...`);
      }
    });

    // Check Instagram card for gradient
    const instagramInfo = await page.evaluate(() => {
      const socialCard = document.querySelector('.social-card');
      if (!socialCard) return null;

      const gradient = socialCard.querySelector('.social-bg-gradient');
      const icon = socialCard.querySelector('.social-profile-icon');
      const handle = socialCard.querySelector('.social-handle-large')?.textContent;

      return {
        hasGradient: !!gradient,
        gradientStyle: gradient ? window.getComputedStyle(gradient).background : null,
        hasIcon: !!icon,
        iconText: icon?.textContent,
        handle: handle
      };
    });

    console.log('\n📊 Instagram Card:');
    if (instagramInfo) {
      console.log(`  Handle: ${instagramInfo.handle}`);
      console.log(`  Gradient Element: ${instagramInfo.hasGradient ? '✓ YES' : '✗ NO'}`);
      console.log(`  Profile Icon: ${instagramInfo.hasIcon ? '✓ YES' : '✗ NO'} (${instagramInfo.iconText})`);
    } else {
      console.log('  ✗ Not found');
    }

    // Highlight first content card and take screenshot
    await page.evaluate(() => {
      const firstCard = document.querySelector('.content-card');
      if (firstCard) {
        firstCard.style.border = '5px solid red';
      }
    });

    await page.screenshot({ path: '/tmp/screenshot-card-highlighted.png', fullPage: false });
    console.log('\n✓ Screenshot saved to /tmp/screenshot-card-highlighted.png');

    console.log('\n✅ All checks complete!');

  } catch (error) {
    console.error('❌ ERROR:', error.message);
  } finally {
    await browser.close();
  }
})();

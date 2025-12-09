const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 }
  });

  console.log('🔍 Checking CSS visibility of cards...');

  try {
    await page.goto('https://selfactualize.life', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    // Wait for content to load
    await page.waitForTimeout(3000);

    // Scroll to the section
    await page.evaluate(() => {
      window.scrollTo(0, 4000);
    });
    await page.waitForTimeout(1000);

    // Check first content card
    const firstCard = page.locator('.content-card').first();

    const cardStyles = await firstCard.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        display: styles.display,
        visibility: styles.visibility,
        opacity: styles.opacity,
        position: styles.position,
        transform: styles.transform,
        width: styles.width,
        height: styles.height,
        top: rect.top,
        left: rect.left,
        bottom: rect.bottom,
        right: rect.right,
        inViewport: rect.top >= 0 && rect.bottom <= window.innerHeight
      };
    });

    console.log('\n📊 First Card Computed Styles:');
    console.log(JSON.stringify(cardStyles, null, 2));

    // Check the slider container
    const sliderStyles = await page.evaluate(() => {
      const slider = document.querySelector('.flex.gap-8');
      if (!slider) return null;

      const styles = window.getComputedStyle(slider);
      const rect = slider.getBoundingClientRect();
      return {
        display: styles.display,
        visibility: styles.visibility,
        opacity: styles.opacity,
        transform: styles.transform,
        width: styles.width,
        position: rect.top + ', ' + rect.left,
        childCount: slider.children.length
      };
    });

    console.log('\n📊 Slider Container Styles:');
    console.log(JSON.stringify(sliderStyles, null, 2));

    // Check if GSAP ScrollTrigger is active
    const scrollTriggerInfo = await page.evaluate(() => {
      if (typeof window.ScrollTrigger !== 'undefined') {
        const triggers = window.ScrollTrigger.getAll();
        return {
          loaded: true,
          count: triggers.length,
          triggers: triggers.map(t => ({
            trigger: t.trigger ? t.trigger.tagName : 'unknown',
            start: t.start,
            end: t.end,
            progress: t.progress
          }))
        };
      }
      return { loaded: false };
    });

    console.log('\n📊 GSAP ScrollTrigger Info:');
    console.log(JSON.stringify(scrollTriggerInfo, null, 2));

    // Take screenshot highlighting the first card
    await page.evaluate(() => {
      const firstCard = document.querySelector('.content-card');
      if (firstCard) {
        firstCard.style.outline = '5px solid red';
      }
    });
    await page.screenshot({ path: '/tmp/screenshot-card-highlighted.png' });
    console.log('\n✓ Screenshot with highlighted card saved to /tmp/screenshot-card-highlighted.png');

  } catch (error) {
    console.error('❌ ERROR:', error.message);
  } finally {
    await browser.close();
  }
})();

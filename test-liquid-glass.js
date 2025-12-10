const { chromium } = require('playwright');

async function testLiquidGlass() {
  console.log('Testing liquid glass effects on production...\n');

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  const pages = [
    { path: '/books', name: 'books', selector: '.book-card' },
    { path: '/courses', name: 'courses', selector: '.course-card' },
    { path: '/blog', name: 'blog', selector: '.coming-soon-card' },
    { path: '/writing-lab', name: 'writing-lab', selector: '.lab-card' },
    { path: '/essays', name: 'essays', selector: '.essay-card' },
    { path: '/about', name: 'about', selector: '.liquid-glass-card' }
  ];

  for (const p of pages) {
    console.log(`Testing ${p.path}...`);

    try {
      await page.goto(`https://selfactualize.life${p.path}`, {
        waitUntil: 'domcontentloaded',
        timeout: 30000
      });

      // Wait for page to stabilize
      await page.waitForTimeout(2000);

      // Check if card element exists
      const cardExists = await page.$(p.selector);
      console.log(`  ${p.selector}: ${cardExists ? 'FOUND' : 'NOT FOUND'}`);

      if (cardExists) {
        // Get computed styles for the card
        const styles = await page.evaluate((sel) => {
          const el = document.querySelector(sel);
          if (!el) return null;
          const computed = window.getComputedStyle(el);
          return {
            backdropFilter: computed.backdropFilter || computed.webkitBackdropFilter,
            background: computed.background.substring(0, 100),
            boxShadow: computed.boxShadow.substring(0, 100),
            borderRadius: computed.borderRadius
          };
        }, p.selector);

        if (styles) {
          const hasBlur = styles.backdropFilter && styles.backdropFilter.includes('blur');
          console.log(`  Backdrop filter: ${hasBlur ? 'YES' : 'NO'} - ${styles.backdropFilter || 'none'}`);
          console.log(`  Border radius: ${styles.borderRadius}`);
          console.log(`  Has shadow: ${styles.boxShadow !== 'none' ? 'YES' : 'NO'}`);
        }
      }

      // Take screenshot
      const screenshotPath = `/tmp/liquid-glass-${p.name}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: false });
      console.log(`  Screenshot: ${screenshotPath}\n`);

    } catch (error) {
      console.log(`  ERROR: ${error.message}\n`);
    }
  }

  await browser.close();
  console.log('Done! Check /tmp/liquid-glass-*.png for screenshots');
}

testLiquidGlass().catch(console.error);

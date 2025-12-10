/**
 * Screenshot test - visual verification of mobile and desktop
 */

const { chromium, devices } = require('playwright');

const PROD_URL = 'https://selfactualize-d3lsz0t43-brandons-projects-c4dfa14a.vercel.app';

async function takeScreenshots() {
  const browser = await chromium.launch({ headless: true });

  // Mobile screenshot
  console.log('Taking mobile screenshot...');
  const iPhone = devices['iPhone 12'];
  const mobileContext = await browser.newContext({
    ...iPhone,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)'
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(PROD_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await mobilePage.waitForTimeout(3000);
  await mobilePage.screenshot({ path: '/tmp/mobile-intro.png', fullPage: false });
  console.log('  Saved: /tmp/mobile-intro.png');

  // Click Start Reading
  await mobilePage.click('.start-button');
  await mobilePage.waitForTimeout(2000);
  await mobilePage.screenshot({ path: '/tmp/mobile-book.png', fullPage: false });
  console.log('  Saved: /tmp/mobile-book.png');

  // Desktop screenshot
  console.log('Taking desktop screenshot...');
  const desktopContext = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto(PROD_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await desktopPage.waitForTimeout(5000);
  await desktopPage.screenshot({ path: '/tmp/desktop.png', fullPage: false });
  console.log('  Saved: /tmp/desktop.png');

  await browser.close();
  console.log('\nDone! Check /tmp/*.png files');
}

takeScreenshots().catch(console.error);

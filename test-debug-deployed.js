/**
 * Test the debug deployment - verify overlay is visible
 */

const { chromium, devices } = require('playwright');

const PROD_URL = 'https://selfactualize.life';

async function testDebugOverlay() {
  const browser = await chromium.launch({ headless: true });

  console.log('\n=== Testing Debug Overlay on selfactualize.life ===\n');

  // Mobile test
  const iPhone = devices['iPhone 12'];
  const mobileContext = await browser.newContext({
    ...iPhone,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
  });
  const mobilePage = await mobileContext.newPage();

  await mobilePage.goto(PROD_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await mobilePage.waitForTimeout(3000);

  // Check for debug overlay
  const debugOverlay = await mobilePage.evaluate(() => {
    const overlay = document.querySelector('div[style*="z-index: 99999"]');
    return overlay ? overlay.textContent : 'NO OVERLAY FOUND';
  });

  console.log('Debug overlay content:', debugOverlay);

  // Check background color (green = mobile, red = desktop)
  const overlayColor = await mobilePage.evaluate(() => {
    const overlay = document.querySelector('div[style*="z-index: 99999"]');
    return overlay ? overlay.style.background || getComputedStyle(overlay).background : 'none';
  });

  console.log('Overlay background:', overlayColor);

  await mobilePage.screenshot({ path: '/tmp/debug-overlay-mobile.png' });
  console.log('Screenshot saved: /tmp/debug-overlay-mobile.png');

  await browser.close();
}

testDebugOverlay().catch(console.error);

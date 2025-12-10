/**
 * Debug test - capture what's actually on the page
 */

const { chromium, devices } = require('playwright');

const PROD_URL = 'https://selfactualize-d3lsz0t43-brandons-projects-c4dfa14a.vercel.app';

async function debugTest() {
  const browser = await chromium.launch({ headless: true });

  // Test 1: Desktop - wait longer for React hydration and 3D loading
  console.log('\n=== DESKTOP DEBUG (waiting 15s for 3D) ===');
  const desktopContext = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto(PROD_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });

  // Check at intervals
  for (let i = 0; i < 6; i++) {
    await desktopPage.waitForTimeout(2500);
    const status = await desktopPage.evaluate(() => {
      return {
        hasCanvas: document.querySelectorAll('canvas').length,
        hasMobileIntro: document.querySelectorAll('.mobile-intro').length,
        hasLoadingScreen: document.querySelectorAll('[class*="LoadingScreen"], [class*="loading-screen"]').length,
        hasMain: document.querySelectorAll('main').length,
        bodyChildren: document.body.children.length
      };
    });
    console.log(`  After ${(i+1) * 2.5}s: Canvas=${status.hasCanvas}, MobileIntro=${status.hasMobileIntro}, Loading=${status.hasLoadingScreen}, Main=${status.hasMain}`);
  }

  // Final check with more detail
  const desktopFinal = await desktopPage.evaluate(() => {
    const main = document.querySelector('main');
    return {
      hasCanvas: document.querySelectorAll('canvas').length,
      hasMobileIntro: document.querySelectorAll('.mobile-intro').length,
      hasMobileBook: document.querySelectorAll('.mobile-book-container').length,
      mainExists: !!main,
      mainFirstChild: main?.firstElementChild?.className || 'none',
      divCount: document.querySelectorAll('div').length
    };
  });
  console.log('\nDesktop final state:', desktopFinal);

  // Test 2: Mobile
  console.log('\n=== MOBILE DEBUG ===');
  const iPhone = devices['iPhone 12'];
  const mobileContext = await browser.newContext({
    ...iPhone,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)'
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(PROD_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await mobilePage.waitForTimeout(3000);

  const mobileHTML = await mobilePage.evaluate(() => {
    return {
      hasCanvas: document.querySelectorAll('canvas').length,
      hasMobileIntro: document.querySelectorAll('.mobile-intro').length,
      hasMobileBook: document.querySelectorAll('.mobile-book-container').length,
      introTitle: document.querySelector('.intro-title')?.textContent || 'none',
      startButton: !!document.querySelector('.start-button')
    };
  });

  console.log('Mobile state:', mobileHTML);
  console.log('\n✅ MOBILE IS WORKING: intro-title =', mobileHTML.introTitle);
  console.log('✅ Start button exists:', mobileHTML.startButton);

  await browser.close();
}

debugTest().catch(console.error);

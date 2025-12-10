/**
 * Test ACTUAL production domain selfactualize.life
 * Compare with Vercel preview URL
 */

const { chromium, devices } = require('playwright');

const PROD_DOMAIN = 'https://selfactualize.life';
const VERCEL_PREVIEW = 'https://selfactualize-d3lsz0t43-brandons-projects-c4dfa14a.vercel.app';

async function testBothURLs() {
  const browser = await chromium.launch({ headless: true });
  const iPhone = devices['iPhone 12'];

  console.log('\n============================================');
  console.log('  TESTING PRODUCTION DOMAIN VS VERCEL PREVIEW');
  console.log('============================================\n');

  // Test 1: Production Domain (selfactualize.life)
  console.log('=== TEST 1: selfactualize.life (PRODUCTION) ===');
  try {
    const prodContext = await browser.newContext({
      ...iPhone,
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
    });
    const prodPage = await prodContext.newPage();

    const errors = [];
    prodPage.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    prodPage.on('pageerror', err => errors.push(err.message));

    const response = await prodPage.goto(PROD_DOMAIN, {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });

    console.log(`  HTTP Status: ${response.status()}`);
    await prodPage.waitForTimeout(3000);

    const prodState = await prodPage.evaluate(() => {
      return {
        hasMobileIntro: document.querySelectorAll('.mobile-intro').length,
        hasMobileBook: document.querySelectorAll('.mobile-book-container').length,
        hasCanvas: document.querySelectorAll('canvas').length,
        hasLoadingScreen: document.querySelectorAll('[class*="loading"]').length,
        title: document.querySelector('.intro-title')?.textContent || 'none',
        bodyHTML: document.body.innerHTML.substring(0, 300)
      };
    });

    console.log(`  Mobile Intro: ${prodState.hasMobileIntro}`);
    console.log(`  Mobile Book: ${prodState.hasMobileBook}`);
    console.log(`  Canvas (desktop): ${prodState.hasCanvas}`);
    console.log(`  Loading screens: ${prodState.hasLoadingScreen}`);
    console.log(`  Title: ${prodState.title}`);

    if (prodState.hasMobileIntro > 0) {
      console.log('  ✅ PRODUCTION: Mobile content detected!');
    } else if (prodState.hasCanvas > 0 || prodState.hasLoadingScreen > 0) {
      console.log('  ❌ PRODUCTION: Desktop content on mobile device!');
    } else {
      console.log('  ⚠️ PRODUCTION: No content detected');
      console.log(`  Body preview: ${prodState.bodyHTML}`);
    }

    if (errors.length > 0) {
      console.log(`  Errors: ${errors.slice(0, 3).join('; ')}`);
    }

    await prodPage.screenshot({ path: '/tmp/prod-mobile.png' });
    console.log('  Screenshot: /tmp/prod-mobile.png');
    await prodContext.close();

  } catch (e) {
    console.log(`  ❌ FAILED: ${e.message}`);
  }

  console.log('\n=== TEST 2: Vercel Preview URL ===');
  try {
    const previewContext = await browser.newContext({
      ...iPhone,
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
    });
    const previewPage = await previewContext.newPage();

    await previewPage.goto(VERCEL_PREVIEW, {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });

    await previewPage.waitForTimeout(3000);

    const previewState = await previewPage.evaluate(() => {
      return {
        hasMobileIntro: document.querySelectorAll('.mobile-intro').length,
        hasMobileBook: document.querySelectorAll('.mobile-book-container').length,
        hasCanvas: document.querySelectorAll('canvas').length,
        title: document.querySelector('.intro-title')?.textContent || 'none'
      };
    });

    console.log(`  Mobile Intro: ${previewState.hasMobileIntro}`);
    console.log(`  Canvas (desktop): ${previewState.hasCanvas}`);
    console.log(`  Title: ${previewState.title}`);

    if (previewState.hasMobileIntro > 0) {
      console.log('  ✅ PREVIEW: Mobile content detected!');
    } else {
      console.log('  ❌ PREVIEW: Desktop content on mobile device!');
    }

    await previewPage.screenshot({ path: '/tmp/preview-mobile.png' });
    console.log('  Screenshot: /tmp/preview-mobile.png');
    await previewContext.close();

  } catch (e) {
    console.log(`  ❌ FAILED: ${e.message}`);
  }

  await browser.close();
  console.log('\n============================================\n');
}

testBothURLs().catch(console.error);

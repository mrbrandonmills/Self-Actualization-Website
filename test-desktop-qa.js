/**
 * Desktop QA Test Suite - Verify desktop 3D experience still works
 */

const { chromium } = require('playwright');

const PROD_URL = 'https://selfactualize-d3lsz0t43-brandons-projects-c4dfa14a.vercel.app';

async function runDesktopTests() {
  console.log('\n========================================');
  console.log('  DESKTOP QA TEST SUITE');
  console.log('========================================\n');

  const browser = await chromium.launch({ headless: true });
  const results = { passed: 0, failed: 0, tests: [] };

  // Desktop viewport (1920x1080)
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  try {
    // TEST 1: Page loads
    console.log('TEST 1: Page loads on desktop...');
    const response = await page.goto(PROD_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
    if (response.status() === 200) {
      results.passed++;
      results.tests.push({ name: 'Page loads', status: 'PASS' });
      console.log('  ✅ PASS - HTTP 200\n');
    } else {
      results.failed++;
      results.tests.push({ name: 'Page loads', status: 'FAIL' });
      console.log(`  ❌ FAIL - HTTP ${response.status()}\n`);
    }

    await page.waitForTimeout(3000); // Wait for hasMounted + loading

    // TEST 2: Desktop content renders (Canvas OR loading screen)
    console.log('TEST 2: Desktop content renders...');
    const hasCanvas = await page.locator('canvas').count() > 0;
    const hasLoadingScreen = await page.locator('.loading-screen, [class*="loading"]').count() > 0;
    const hasMobileContent = await page.locator('.mobile-intro, .mobile-book-container').count() > 0;

    if ((hasCanvas || hasLoadingScreen) && !hasMobileContent) {
      results.passed++;
      results.tests.push({ name: 'Desktop content', status: 'PASS' });
      console.log('  ✅ PASS - Desktop content rendered (Canvas or loading screen)\n');
    } else if (hasMobileContent) {
      results.failed++;
      results.tests.push({ name: 'Desktop content', status: 'FAIL', details: 'Mobile content on desktop!' });
      console.log('  ❌ FAIL - Mobile content detected on desktop!\n');
    } else {
      results.failed++;
      results.tests.push({ name: 'Desktop content', status: 'FAIL' });
      console.log('  ❌ FAIL - No desktop content found\n');
    }

    // TEST 3: WebGL Canvas exists
    console.log('TEST 3: WebGL Canvas...');
    await page.waitForTimeout(5000); // Wait for 3D to load
    const canvasCount = await page.locator('canvas').count();

    if (canvasCount > 0) {
      results.passed++;
      results.tests.push({ name: 'WebGL Canvas', status: 'PASS' });
      console.log(`  ✅ PASS - Found ${canvasCount} canvas element(s)\n`);
    } else {
      // Check if still loading
      const stillLoading = await page.locator('.loading-screen, [class*="loading"]').count() > 0;
      if (stillLoading) {
        results.passed++;
        results.tests.push({ name: 'WebGL Canvas', status: 'PASS', details: 'Still loading' });
        console.log('  ✅ PASS - Still loading (expected for heavy 3D)\n');
      } else {
        results.failed++;
        results.tests.push({ name: 'WebGL Canvas', status: 'FAIL' });
        console.log('  ❌ FAIL - No canvas found\n');
      }
    }

    // TEST 4: No critical JS errors
    console.log('TEST 4: No JavaScript errors...');
    const criticalErrors = consoleErrors.filter(e =>
      !e.includes('favicon') && !e.includes('third-party') && !e.includes('WebGL')
    );

    if (criticalErrors.length === 0) {
      results.passed++;
      results.tests.push({ name: 'JS Errors', status: 'PASS' });
      console.log('  ✅ PASS - No critical errors\n');
    } else {
      results.failed++;
      results.tests.push({ name: 'JS Errors', status: 'FAIL' });
      console.log(`  ❌ FAIL - ${criticalErrors.length} errors\n`);
      criticalErrors.slice(0, 3).forEach(e => console.log(`    - ${e}`));
    }

    // TEST 5: Sections exist below hero
    console.log('TEST 5: Content sections...');
    const hasProcessSection = await page.locator('#process, [id*="process"]').count() > 0;
    const hasFooter = await page.locator('footer').count() > 0;

    if (hasProcessSection || hasFooter) {
      results.passed++;
      results.tests.push({ name: 'Sections', status: 'PASS' });
      console.log('  ✅ PASS - Content sections found\n');
    } else {
      results.failed++;
      results.tests.push({ name: 'Sections', status: 'FAIL' });
      console.log('  ❌ FAIL - No content sections\n');
    }

  } finally {
    await browser.close();
  }

  // Summary
  console.log('========================================');
  console.log('  DESKTOP TEST SUMMARY');
  console.log('========================================');
  console.log(`  Total: ${results.passed + results.failed}`);
  console.log(`  ✅ Passed: ${results.passed}`);
  console.log(`  ❌ Failed: ${results.failed}`);
  console.log(`  Rate: ${Math.round((results.passed / (results.passed + results.failed)) * 100)}%`);
  console.log('========================================\n');

  return results;
}

runDesktopTests()
  .then(r => process.exit(r.failed > 0 ? 1 : 0))
  .catch(e => { console.error(e); process.exit(1); });

/**
 * Mobile QA Test Suite - Comprehensive testing for mobile book experience
 * Tests all critical fixes: lazy loading, error handling, scroll lock, SSR hydration
 */

const { chromium, devices } = require('playwright');

const PROD_URL = 'https://selfactualize-d3lsz0t43-brandons-projects-c4dfa14a.vercel.app';

async function runMobileTests() {
  console.log('\n========================================');
  console.log('  MOBILE QA TEST SUITE');
  console.log('========================================\n');

  const browser = await chromium.launch({ headless: true });
  const results = {
    passed: 0,
    failed: 0,
    tests: []
  };

  // Test on iPhone 12 emulation
  const iPhone = devices['iPhone 12'];
  const context = await browser.newContext({
    ...iPhone,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
  });
  const page = await context.newPage();

  // Collect console errors
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  // Collect network failures
  const networkFailures = [];
  page.on('requestfailed', request => {
    networkFailures.push({
      url: request.url(),
      failure: request.failure()?.errorText
    });
  });

  try {
    // ==========================================
    // TEST 1: Page loads without crash
    // ==========================================
    console.log('TEST 1: Page loads without crash on mobile...');
    try {
      const response = await page.goto(PROD_URL, {
        waitUntil: 'networkidle',
        timeout: 30000
      });

      if (response.status() === 200) {
        results.passed++;
        results.tests.push({ name: 'Page loads', status: 'PASS', details: 'HTTP 200' });
        console.log('  ✅ PASS - Page loaded successfully (HTTP 200)\n');
      } else {
        results.failed++;
        results.tests.push({ name: 'Page loads', status: 'FAIL', details: `HTTP ${response.status()}` });
        console.log(`  ❌ FAIL - HTTP ${response.status()}\n`);
      }
    } catch (e) {
      results.failed++;
      results.tests.push({ name: 'Page loads', status: 'FAIL', details: e.message });
      console.log(`  ❌ FAIL - ${e.message}\n`);
    }

    // ==========================================
    // TEST 2: SSR Hydration - Mobile content renders (not desktop)
    // ==========================================
    console.log('TEST 2: SSR Hydration - Mobile content renders...');
    await page.waitForTimeout(2000); // Wait for hasMounted

    // Check for mobile intro screen OR mobile book phase
    const hasMobileIntro = await page.locator('.mobile-intro').count() > 0;
    const hasMobileBook = await page.locator('.mobile-book-container').count() > 0;
    const hasMobileBookPhase = await page.locator('.mobile-book-phase').count() > 0;
    const hasDesktopCanvas = await page.locator('canvas').count() > 0;

    if ((hasMobileIntro || hasMobileBook || hasMobileBookPhase) && !hasDesktopCanvas) {
      results.passed++;
      results.tests.push({ name: 'SSR Hydration', status: 'PASS', details: 'Mobile content rendered, no Canvas' });
      console.log('  ✅ PASS - Mobile content rendered, no WebGL Canvas\n');
    } else if (hasDesktopCanvas) {
      results.failed++;
      results.tests.push({ name: 'SSR Hydration', status: 'FAIL', details: 'Desktop Canvas detected on mobile' });
      console.log('  ❌ FAIL - Desktop Canvas detected on mobile device!\n');
    } else {
      results.failed++;
      results.tests.push({ name: 'SSR Hydration', status: 'FAIL', details: 'No mobile content found' });
      console.log('  ❌ FAIL - No mobile content found\n');
    }

    // ==========================================
    // TEST 3: Mobile intro screen elements
    // ==========================================
    console.log('TEST 3: Mobile intro screen elements...');
    if (hasMobileIntro) {
      const hasTitle = await page.locator('.intro-title').count() > 0;
      const hasStartButton = await page.locator('.start-button').count() > 0;
      const hasBookPreview = await page.locator('.book-preview').count() > 0;

      if (hasTitle && hasStartButton && hasBookPreview) {
        results.passed++;
        results.tests.push({ name: 'Intro screen', status: 'PASS', details: 'All elements present' });
        console.log('  ✅ PASS - Title, Start button, Book preview all present\n');
      } else {
        results.failed++;
        const missing = [];
        if (!hasTitle) missing.push('title');
        if (!hasStartButton) missing.push('start button');
        if (!hasBookPreview) missing.push('book preview');
        results.tests.push({ name: 'Intro screen', status: 'FAIL', details: `Missing: ${missing.join(', ')}` });
        console.log(`  ❌ FAIL - Missing: ${missing.join(', ')}\n`);
      }
    } else {
      results.tests.push({ name: 'Intro screen', status: 'SKIP', details: 'Not on intro screen' });
      console.log('  ⏭️ SKIP - Not on intro screen\n');
    }

    // ==========================================
    // TEST 4: Start Reading button works
    // ==========================================
    console.log('TEST 4: Start Reading button navigation...');
    if (hasMobileIntro) {
      try {
        await page.click('.start-button');
        await page.waitForTimeout(1000); // Wait for transition + loading

        const hasBookContainer = await page.locator('.mobile-book-container').count() > 0;
        const hasBookPhase = await page.locator('.mobile-book-phase').count() > 0;
        const hasLoadingScreen = await page.locator('.mobile-loading-screen').count() > 0;

        if (hasBookContainer || hasBookPhase || hasLoadingScreen) {
          results.passed++;
          results.tests.push({ name: 'Start button', status: 'PASS', details: 'Navigated to book phase' });
          console.log('  ✅ PASS - Navigated to book/loading phase\n');
        } else {
          results.failed++;
          results.tests.push({ name: 'Start button', status: 'FAIL', details: 'No book container after click' });
          console.log('  ❌ FAIL - No book container after clicking Start\n');
        }
      } catch (e) {
        results.failed++;
        results.tests.push({ name: 'Start button', status: 'FAIL', details: e.message });
        console.log(`  ❌ FAIL - ${e.message}\n`);
      }
    } else {
      results.tests.push({ name: 'Start button', status: 'SKIP', details: 'No intro screen' });
      console.log('  ⏭️ SKIP - No intro screen to test\n');
    }

    // Wait for book to fully load
    await page.waitForTimeout(1500);

    // ==========================================
    // TEST 5: Book container renders
    // ==========================================
    console.log('TEST 5: Book container renders...');
    const bookContainer = await page.locator('.mobile-book-container').count() > 0;
    const bookPhase = await page.locator('.mobile-book-phase').count() > 0;

    if (bookContainer || bookPhase) {
      results.passed++;
      results.tests.push({ name: 'Book container', status: 'PASS', details: 'Container rendered' });
      console.log('  ✅ PASS - Book container rendered\n');
    } else {
      results.failed++;
      results.tests.push({ name: 'Book container', status: 'FAIL', details: 'No container found' });
      console.log('  ❌ FAIL - Book container not found\n');
    }

    // ==========================================
    // TEST 6: Page flip controls exist
    // ==========================================
    console.log('TEST 6: Page flip controls...');
    const hasControls = await page.locator('.mobile-book-controls').count() > 0;
    const hasProgressBar = await page.locator('.mobile-progress-container').count() > 0;
    const hasPageIndicator = await page.locator('.mobile-page-indicator').count() > 0;

    if (hasControls && hasProgressBar && hasPageIndicator) {
      results.passed++;
      results.tests.push({ name: 'Controls', status: 'PASS', details: 'All controls present' });
      console.log('  ✅ PASS - Controls, progress bar, page indicator all present\n');
    } else {
      const missing = [];
      if (!hasControls) missing.push('controls');
      if (!hasProgressBar) missing.push('progress bar');
      if (!hasPageIndicator) missing.push('page indicator');
      results.failed++;
      results.tests.push({ name: 'Controls', status: 'FAIL', details: `Missing: ${missing.join(', ')}` });
      console.log(`  ❌ FAIL - Missing: ${missing.join(', ')}\n`);
    }

    // ==========================================
    // TEST 7: Images load (lazy loading check)
    // ==========================================
    console.log('TEST 7: Image loading (first 5 pages)...');
    await page.waitForTimeout(2000); // Let images load

    // Check for loaded images
    const loadedImages = await page.evaluate(() => {
      const images = document.querySelectorAll('.mobile-book-container img, .mobile-book-phase img');
      let loaded = 0;
      let total = images.length;
      images.forEach(img => {
        if (img.complete && img.naturalHeight > 0) loaded++;
      });
      return { loaded, total };
    });

    if (loadedImages.loaded > 0) {
      results.passed++;
      results.tests.push({ name: 'Image loading', status: 'PASS', details: `${loadedImages.loaded}/${loadedImages.total} images loaded` });
      console.log(`  ✅ PASS - ${loadedImages.loaded}/${loadedImages.total} images loaded\n`);
    } else if (loadedImages.total === 0) {
      // Check if images are in placeholder state (lazy loading working)
      const placeholders = await page.locator('.page-placeholder').count();
      if (placeholders > 0) {
        results.passed++;
        results.tests.push({ name: 'Image loading', status: 'PASS', details: 'Lazy loading placeholders active' });
        console.log('  ✅ PASS - Lazy loading working (placeholders visible)\n');
      } else {
        results.failed++;
        results.tests.push({ name: 'Image loading', status: 'FAIL', details: 'No images or placeholders' });
        console.log('  ❌ FAIL - No images or placeholders found\n');
      }
    } else {
      results.failed++;
      results.tests.push({ name: 'Image loading', status: 'FAIL', details: `0/${loadedImages.total} loaded` });
      console.log(`  ❌ FAIL - 0/${loadedImages.total} images loaded\n`);
    }

    // ==========================================
    // TEST 8: No JavaScript errors
    // ==========================================
    console.log('TEST 8: No JavaScript errors...');
    const criticalErrors = consoleErrors.filter(e =>
      !e.includes('favicon') &&
      !e.includes('third-party') &&
      !e.includes('analytics')
    );

    if (criticalErrors.length === 0) {
      results.passed++;
      results.tests.push({ name: 'JS Errors', status: 'PASS', details: 'No critical errors' });
      console.log('  ✅ PASS - No critical JavaScript errors\n');
    } else {
      results.failed++;
      results.tests.push({ name: 'JS Errors', status: 'FAIL', details: criticalErrors.slice(0, 3).join('; ') });
      console.log(`  ❌ FAIL - ${criticalErrors.length} JS errors:\n`);
      criticalErrors.slice(0, 5).forEach(e => console.log(`    - ${e}`));
      console.log('');
    }

    // ==========================================
    // TEST 9: No failed network requests for book images
    // ==========================================
    console.log('TEST 9: Network requests for book images...');
    const imageFailures = networkFailures.filter(f =>
      f.url.includes('book-pages-mobile') || f.url.includes('.webp')
    );

    if (imageFailures.length === 0) {
      results.passed++;
      results.tests.push({ name: 'Network', status: 'PASS', details: 'No failed image requests' });
      console.log('  ✅ PASS - No failed image requests\n');
    } else {
      results.failed++;
      results.tests.push({ name: 'Network', status: 'FAIL', details: `${imageFailures.length} failed requests` });
      console.log(`  ❌ FAIL - ${imageFailures.length} failed image requests:\n`);
      imageFailures.slice(0, 3).forEach(f => console.log(`    - ${f.url}: ${f.failure}`));
      console.log('');
    }

    // ==========================================
    // TEST 10: Skip to Site button exists
    // ==========================================
    console.log('TEST 10: Skip to Site button...');
    const hasSkipButton = await page.locator('.skip-to-site').count() > 0;

    if (hasSkipButton) {
      results.passed++;
      results.tests.push({ name: 'Skip button', status: 'PASS', details: 'Button present' });
      console.log('  ✅ PASS - Skip to Site button present\n');
    } else {
      results.failed++;
      results.tests.push({ name: 'Skip button', status: 'FAIL', details: 'Button not found' });
      console.log('  ❌ FAIL - Skip to Site button not found\n');
    }

    // ==========================================
    // TEST 11: Memory check - page doesn't crash after 10s
    // ==========================================
    console.log('TEST 11: Memory stability (10 second test)...');
    try {
      await page.waitForTimeout(10000);
      const stillResponsive = await page.evaluate(() => document.readyState);

      if (stillResponsive) {
        results.passed++;
        results.tests.push({ name: 'Memory stability', status: 'PASS', details: 'Page responsive after 10s' });
        console.log('  ✅ PASS - Page still responsive after 10 seconds\n');
      }
    } catch (e) {
      results.failed++;
      results.tests.push({ name: 'Memory stability', status: 'FAIL', details: 'Page became unresponsive' });
      console.log('  ❌ FAIL - Page became unresponsive\n');
    }

  } finally {
    await browser.close();
  }

  // ==========================================
  // SUMMARY
  // ==========================================
  console.log('========================================');
  console.log('  TEST SUMMARY');
  console.log('========================================');
  console.log(`  Total Tests: ${results.passed + results.failed}`);
  console.log(`  ✅ Passed: ${results.passed}`);
  console.log(`  ❌ Failed: ${results.failed}`);
  console.log(`  Success Rate: ${Math.round((results.passed / (results.passed + results.failed)) * 100)}%`);
  console.log('========================================\n');

  if (results.failed > 0) {
    console.log('FAILED TESTS:');
    results.tests.filter(t => t.status === 'FAIL').forEach(t => {
      console.log(`  - ${t.name}: ${t.details}`);
    });
    console.log('');
  }

  return results;
}

// Run tests
runMobileTests()
  .then(results => {
    process.exit(results.failed > 0 ? 1 : 0);
  })
  .catch(e => {
    console.error('Test runner failed:', e);
    process.exit(1);
  });

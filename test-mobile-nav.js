/**
 * Test mobile navigation bar visibility and liquid glass effect
 */

const { chromium, devices } = require('playwright');

async function testMobileNav() {
  const browser = await chromium.launch({ headless: true });
  const iPhone = devices['iPhone 12'];

  const context = await browser.newContext({
    ...iPhone,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
  });
  const page = await context.newPage();

  console.log('\n=== Testing Mobile Navigation Bar ===\n');

  // Start local dev server or use production
  const url = 'http://localhost:3000';

  try {
    await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });
  } catch (e) {
    console.log('Local server not running, testing against production...');
    await page.goto('https://selfactualize.life/', {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });
  }

  await page.waitForTimeout(2000);

  // Check for navigation bar
  const navInfo = await page.evaluate(() => {
    const nav = document.querySelector('.bartosz-nav');
    if (!nav) return { found: false };

    const styles = window.getComputedStyle(nav);
    const rect = nav.getBoundingClientRect();

    return {
      found: true,
      visible: rect.height > 0 && styles.display !== 'none',
      position: styles.position,
      top: rect.top,
      height: rect.height,
      background: styles.background,
      backdropFilter: styles.backdropFilter,
      zIndex: styles.zIndex,
      logoVisible: !!nav.querySelector('.nav-logo'),
      hamburgerVisible: !!nav.querySelector('.mobile-menu-button')
    };
  });

  console.log('Navigation Bar Info:');
  console.log('  Found:', navInfo.found);
  console.log('  Visible:', navInfo.visible);
  console.log('  Position:', navInfo.position);
  console.log('  Top:', navInfo.top);
  console.log('  Height:', navInfo.height);
  console.log('  Background:', navInfo.background?.substring(0, 50) + '...');
  console.log('  Backdrop Filter:', navInfo.backdropFilter);
  console.log('  Z-Index:', navInfo.zIndex);
  console.log('  Logo Visible:', navInfo.logoVisible);
  console.log('  Hamburger Visible:', navInfo.hamburgerVisible);

  // Check mobile intro content
  const pageInfo = await page.evaluate(() => {
    return {
      hasMobileIntro: document.querySelectorAll('.mobile-intro').length,
      hasIntroTitle: !!document.querySelector('.intro-title'),
      hasStartButton: !!document.querySelector('.start-button'),
      hasPreviewBadge: !!document.querySelector('.preview-badge'),
      bodyText: document.body.innerText.substring(0, 300)
    };
  });

  console.log('\nPage Content Info:');
  console.log('  Mobile Intro:', pageInfo.hasMobileIntro);
  console.log('  Intro Title:', pageInfo.hasIntroTitle);
  console.log('  Start Button:', pageInfo.hasStartButton);
  console.log('  Preview Badge:', pageInfo.hasPreviewBadge);
  console.log('  Body Preview:', pageInfo.bodyText.substring(0, 150) + '...');

  await page.screenshot({ path: '/tmp/mobile-nav-test.png', fullPage: false });
  console.log('\nScreenshot saved: /tmp/mobile-nav-test.png');

  // Test results
  console.log('\n=== TEST RESULTS ===');
  const passed = navInfo.found && navInfo.visible && navInfo.logoVisible && navInfo.hamburgerVisible;
  console.log(passed ? '✅ Mobile navigation bar is visible and properly configured' : '❌ Mobile navigation bar has issues');

  await browser.close();
}

testMobileNav().catch(console.error);

const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  console.log('🔍 Testing selfactualize.life...');

  try {
    // Navigate to live site
    await page.goto('https://selfactualize.life', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    console.log('✓ Page loaded');

    // Wait for loading screen to disappear
    await page.waitForTimeout(3000);

    // Take screenshot of initial view
    await page.screenshot({ path: '/tmp/screenshot-1-initial.png', fullPage: false });
    console.log('✓ Screenshot 1: Initial view saved');

    // Scroll down to where FeaturedBooksSection should be
    await page.evaluate(() => {
      window.scrollTo(0, 4000);
    });
    await page.waitForTimeout(1000);

    await page.screenshot({ path: '/tmp/screenshot-2-scrolled.png', fullPage: false });
    console.log('✓ Screenshot 2: Scrolled view saved');

    // Check if "Your Journey Starts Here" is visible
    const journeyHeading = await page.locator('h2:has-text("Your Journey Starts Here")').isVisible();
    console.log(`\n📊 "Your Journey Starts Here" heading visible: ${journeyHeading}`);

    // Check if book cards are visible
    const bookCards = await page.locator('.book-card').count();
    console.log(`📊 Number of book cards found: ${bookCards}`);

    // Check if social cards are visible
    const socialCards = await page.locator('.social-card').count();
    console.log(`📊 Number of social cards found: ${socialCards}`);

    // Check if the horizontal scroll container exists
    const scrollContainer = await page.locator('.overflow-hidden').count();
    console.log(`📊 Scroll containers found: ${scrollContainer}`);

    // Get all content cards
    const contentCards = await page.locator('.content-card').count();
    console.log(`📊 Total content cards found: ${contentCards}`);

    // Check if FeaturedBooksSection component is in DOM
    const sectionExists = await page.locator('section.bg-\\[var\\(--bg-tertiary\\)\\]').count();
    console.log(`📊 Sections with bg-tertiary: ${sectionExists}`);

    // Take full page screenshot
    await page.screenshot({ path: '/tmp/screenshot-3-fullpage.png', fullPage: true });
    console.log('✓ Screenshot 3: Full page saved');

    // Get the HTML of the section
    const sectionHTML = await page.locator('h2:has-text("Your Journey Starts Here")').locator('..').innerHTML().catch(() => 'NOT FOUND');
    console.log('\n📄 Section HTML snippet:');
    console.log(sectionHTML.substring(0, 500));

    console.log('\n=== TEST COMPLETE ===');
    console.log('Screenshots saved to:');
    console.log('  /tmp/screenshot-1-initial.png');
    console.log('  /tmp/screenshot-2-scrolled.png');
    console.log('  /tmp/screenshot-3-fullpage.png');

  } catch (error) {
    console.error('❌ ERROR:', error.message);
    await page.screenshot({ path: '/tmp/screenshot-error.png' });
  } finally {
    await browser.close();
  }
})();

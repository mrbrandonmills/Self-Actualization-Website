/**
 * Test what content is actually on the homepage
 */

const { chromium, devices } = require('playwright');

async function testHomepage() {
  const browser = await chromium.launch({ headless: true });
  const iPhone = devices['iPhone 12'];

  const context = await browser.newContext({
    ...iPhone,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
  });
  const page = await context.newPage();

  console.log('\n=== Testing selfactualize.life homepage ===\n');

  // Navigate to root
  const response = await page.goto('https://selfactualize.life/', {
    waitUntil: 'domcontentloaded',
    timeout: 30000
  });

  console.log('Final URL:', page.url());
  console.log('HTTP Status:', response.status());

  await page.waitForTimeout(3000);

  // Get page content
  const content = await page.evaluate(() => {
    const body = document.body;
    return {
      url: window.location.href,
      title: document.title,
      h1: document.querySelector('h1')?.textContent || 'none',
      hasLaboratory: body.innerHTML.includes('Laboratory'),
      hasStartReading: body.innerHTML.includes('Start Reading'),
      hasTransformReality: body.innerHTML.includes('Transform your reality'),
      firstParagraph: document.querySelector('p')?.textContent || 'none',
      mainClasses: document.querySelector('main')?.className || 'none',
      mobileIntro: document.querySelectorAll('.mobile-intro').length,
      bodyText: body.innerText.substring(0, 500)
    };
  });

  console.log('\nPage content:');
  console.log('URL:', content.url);
  console.log('Title:', content.title);
  console.log('H1:', content.h1);
  console.log('Mobile Intro count:', content.mobileIntro);
  console.log('Has "Start Reading":', content.hasStartReading);
  console.log('Has "Transform your reality":', content.hasTransformReality);
  console.log('\nFirst 500 chars of body text:');
  console.log(content.bodyText);

  await page.screenshot({ path: '/tmp/homepage-test.png' });
  console.log('\nScreenshot: /tmp/homepage-test.png');

  await browser.close();
}

testHomepage().catch(console.error);

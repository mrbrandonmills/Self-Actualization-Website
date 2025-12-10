const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 }
  });
  const page = await context.newPage();
  
  console.log('Testing /books hero section colors (DESKTOP)...');
  
  // Test local build first
  await page.goto('http://localhost:3000/books', { waitUntil: 'networkidle', timeout: 10000 }).catch(() => {
    console.log('Local server not running, will test production after deploy');
  });
  
  // Get hero colors
  const heroColors = await page.evaluate(() => {
    const title = document.querySelector('.hero-title');
    const desc = document.querySelector('.hero-description');
    const label = document.querySelector('.hero-label');
    return {
      title: title ? window.getComputedStyle(title).color : 'not found',
      description: desc ? window.getComputedStyle(desc).color : 'not found', 
      label: label ? window.getComputedStyle(label).color : 'not found'
    };
  }).catch(() => ({ title: 'error', description: 'error', label: 'error' }));
  
  console.log('Hero colors:', heroColors);
  
  // Take screenshot
  await page.screenshot({ path: '/tmp/hero-colors-test.png' }).catch(() => {});
  
  await browser.close();
  console.log('Done!');
})();

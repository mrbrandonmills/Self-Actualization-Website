const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 }
  });
  const page = await context.newPage();
  
  console.log('Testing production /books hero section colors (DESKTOP)...');
  
  await page.goto('https://selfactualize.life/books', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  
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
  });
  
  console.log('Hero colors:');
  console.log('  Title:', heroColors.title);
  console.log('  Description:', heroColors.description);
  console.log('  Label:', heroColors.label);
  
  // Check if colors are light (expected)
  // #e8e4dc = rgb(232, 228, 220), #c5d2b7 = rgb(197, 210, 183), #d4af37 = rgb(212, 175, 55)
  const titleIsLight = heroColors.title.includes('232') || heroColors.title.includes('228');
  const descIsLight = heroColors.description.includes('197') || heroColors.description.includes('210');
  
  console.log('\nValidation:');
  console.log('  Title is light cream (#e8e4dc):', titleIsLight ? 'YES ✓' : 'NO ✗ - still dark');
  console.log('  Description is light sage (#c5d2b7):', descIsLight ? 'YES ✓' : 'NO ✗ - still dark');
  
  // Take screenshot
  await page.screenshot({ path: '/tmp/hero-colors-prod.png' });
  console.log('\nScreenshot saved to /tmp/hero-colors-prod.png');
  
  await browser.close();
})();

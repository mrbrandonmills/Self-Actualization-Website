const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 }
  });
  const page = await context.newPage();

  const pages = ['/courses', '/blog', '/writing-lab', '/about', '/essays'];

  for (const pagePath of pages) {
    console.log('\nTesting ' + pagePath + '...');
    await page.goto('https://selfactualize.life' + pagePath, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1500);

    const colors = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      const lead = document.querySelector('.lead');
      return {
        h1: h1 ? window.getComputedStyle(h1).color : 'not found',
        lead: lead ? window.getComputedStyle(lead).color : 'not found'
      };
    });

    const h1IsLight = colors.h1.includes('232') || colors.h1.includes('228');
    const leadIsLight = colors.lead.includes('197') || colors.lead.includes('210');

    console.log('  H1 color: ' + colors.h1 + ' ' + (h1IsLight ? 'YES' : 'NO'));
    console.log('  Lead color: ' + colors.lead + ' ' + (leadIsLight ? 'YES' : 'NO'));

    const filename = '/tmp/test-' + pagePath.replace('/', '') + '.png';
    await page.screenshot({ path: filename });
    console.log('  Screenshot: ' + filename);
  }

  console.log('\nAll tests complete!');
  await browser.close();
})();

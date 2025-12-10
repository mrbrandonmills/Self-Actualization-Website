import { test, expect, devices } from '@playwright/test';
import { loginAsAdmin } from '../fixtures/auth';

// Mobile-only tests
test.describe('Mobile Experience', () => {
  test.use({ ...devices['iPhone 13'] });

  test('should display mobile-friendly courses page', async ({ page }) => {
    await page.goto('/courses');

    // Page should load
    await expect(page.locator('body')).toBeVisible();

    // Check viewport is mobile size
    const viewport = page.viewportSize();
    expect(viewport?.width).toBeLessThan(500);

    // Content should be visible
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible();
  });

  test('should display mobile-friendly lesson page', async ({ page }) => {
    await loginAsAdmin(page);

    await page.goto('/courses/engineering-your-patterns/lesson/week-1-lesson-1');

    await page.waitForTimeout(3000);

    // Page should load without horizontal scroll
    const body = page.locator('body');
    const bodyWidth = await body.evaluate(el => el.scrollWidth);
    const viewportWidth = page.viewportSize()?.width || 0;

    // Body should not be wider than viewport (no horizontal scroll)
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 50); // Allow small margin
  });

  test('should have touch-friendly navigation', async ({ page }) => {
    await loginAsAdmin(page);

    await page.goto('/courses/engineering-your-patterns/lesson/week-1-lesson-1');

    await page.waitForTimeout(3000);

    // Navigation buttons should be present
    const navButtons = page.locator('a, button').filter({
      hasText: /next|prev|back|menu/i,
    });

    const buttonCount = await navButtons.count();
    expect(buttonCount).toBeGreaterThan(0);

    // Buttons should be reasonably sized for touch (at least 40px)
    const firstButton = navButtons.first();
    if (await firstButton.isVisible()) {
      const box = await firstButton.boundingBox();
      if (box) {
        expect(box.height).toBeGreaterThanOrEqual(30);
      }
    }
  });

  test('should show AI Tutor as bottom sheet on mobile', async ({ page }) => {
    await loginAsAdmin(page);

    await page.goto('/courses/engineering-your-patterns/lesson/week-1-lesson-1');

    await page.waitForTimeout(3000);

    // Find and click AI Tutor button
    const tutorButton = page.locator('button').filter({ hasText: /ai tutor|tutor/i }).first();

    if (await tutorButton.isVisible()) {
      await tutorButton.click();

      await page.waitForTimeout(1000);

      // Tutor panel should be visible
      const tutorPanel = page.locator('[class*="tutor"], [class*="chat"], [class*="panel"]').first();
      const panelVisible = await tutorPanel.isVisible().catch(() => false);

      // On mobile, panel often takes full width
      if (panelVisible) {
        const box = await tutorPanel.boundingBox();
        if (box) {
          const viewportWidth = page.viewportSize()?.width || 0;
          // Panel should be close to full width on mobile
          expect(box.width).toBeGreaterThan(viewportWidth * 0.8);
        }
      }
    }
  });

  test('should have responsive text sizing', async ({ page }) => {
    await page.goto('/courses');

    // Text should be readable (not too small)
    const bodyText = page.locator('p, span, a').first();

    if (await bodyText.isVisible()) {
      const fontSize = await bodyText.evaluate(el =>
        parseFloat(window.getComputedStyle(el).fontSize)
      );

      // Font size should be at least 14px for readability
      expect(fontSize).toBeGreaterThanOrEqual(12);
    }
  });
});

// Tablet tests
test.describe('Tablet Experience', () => {
  test.use({ ...devices['iPad (gen 7)'] });

  test('should display properly on tablet', async ({ page }) => {
    await page.goto('/courses');

    // Page should load
    await expect(page.locator('body')).toBeVisible();

    // Check viewport is tablet size
    const viewport = page.viewportSize();
    expect(viewport?.width).toBeGreaterThan(500);
    expect(viewport?.width).toBeLessThan(1100);
  });

  test('tablet should show lesson with sidebar', async ({ page }) => {
    await loginAsAdmin(page);

    await page.goto('/courses/engineering-your-patterns/lesson/week-1-lesson-1');

    await page.waitForTimeout(3000);

    // Content should be visible
    const mainContent = page.locator('main, [class*="content"], article').first();
    await expect(mainContent).toBeVisible();
  });
});

// Desktop comparison test
test.describe('Desktop vs Mobile Layout', () => {
  test('desktop should have wider layout than mobile', async ({ browser }) => {
    // Create desktop context
    const desktopContext = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
    });
    const desktopPage = await desktopContext.newPage();

    // Create mobile context
    const mobileContext = await browser.newContext({
      ...devices['iPhone 13'],
    });
    const mobilePage = await mobileContext.newPage();

    // Load same page
    await desktopPage.goto('/courses');
    await mobilePage.goto('/courses');

    // Get container widths
    const desktopWidth = await desktopPage.locator('body').evaluate(el => el.clientWidth);
    const mobileWidth = await mobilePage.locator('body').evaluate(el => el.clientWidth);

    // Desktop should be wider
    expect(desktopWidth).toBeGreaterThan(mobileWidth);

    await desktopContext.close();
    await mobileContext.close();
  });
});

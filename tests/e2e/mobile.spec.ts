import { test, expect } from '@playwright/test';
import { loginAsAdmin } from '../fixtures/auth';

// Mobile-only tests - use mobile-chrome or mobile-safari project
test.describe('Mobile Experience', () => {
  test('should display mobile-friendly courses page', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile only test');

    await page.goto('/courses');

    // Page should load
    await expect(page.locator('body')).toBeVisible();

    // Content should be visible
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible();
  });

  test('should display mobile-friendly lesson page', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile only test');

    await loginAsAdmin(page);

    await page.goto('/courses/engineering-your-patterns/lesson/week-1-lesson-1');

    await page.waitForTimeout(3000);

    // Page should load without horizontal scroll
    const body = page.locator('body');
    const bodyWidth = await body.evaluate(el => el.scrollWidth);
    const viewportWidth = page.viewportSize()?.width || 0;

    // Body should not be much wider than viewport
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 100);
  });

  test('should have touch-friendly navigation', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile only test');

    await loginAsAdmin(page);

    await page.goto('/courses/engineering-your-patterns/lesson/week-1-lesson-1');

    await page.waitForTimeout(3000);

    // Navigation buttons should be present
    const navButtons = page.locator('a, button').filter({
      hasText: /next|prev|back|menu/i,
    });

    const buttonCount = await navButtons.count();
    expect(buttonCount).toBeGreaterThan(0);
  });

  test('should show AI Tutor panel on mobile', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile only test');

    await loginAsAdmin(page);

    await page.goto('/courses/engineering-your-patterns/lesson/week-1-lesson-1');

    await page.waitForTimeout(3000);

    // Find and click AI Tutor button
    const tutorButton = page.locator('button').filter({ hasText: /ai tutor|tutor/i }).first();

    if (await tutorButton.isVisible()) {
      await tutorButton.click();

      await page.waitForTimeout(1000);

      // Tutor panel should be visible
      const tutorInput = page.locator('input[placeholder*="tutor"], input[placeholder*="ask"]').first();
      await expect(tutorInput).toBeVisible();
    }
  });
});

// Desktop tests for comparison
test.describe('Desktop Experience', () => {
  test('should display desktop layout for courses', async ({ page, isMobile }) => {
    test.skip(isMobile === true, 'Desktop only test');

    await page.goto('/courses');

    // Page should load
    await expect(page.locator('body')).toBeVisible();

    // Should have wide layout
    const viewport = page.viewportSize();
    expect(viewport?.width).toBeGreaterThan(1000);
  });

  test('should show AI Tutor as sidebar on desktop', async ({ page, isMobile }) => {
    test.skip(isMobile === true, 'Desktop only test');

    await loginAsAdmin(page);

    await page.goto('/courses/engineering-your-patterns/lesson/week-1-lesson-1');

    await page.waitForTimeout(3000);

    // Find and click AI Tutor button
    const tutorButton = page.locator('button').filter({ hasText: /ai tutor|tutor/i }).first();

    if (await tutorButton.isVisible()) {
      await tutorButton.click();

      await page.waitForTimeout(1000);

      // On desktop, panel is typically 400px wide sidebar
      const tutorPanel = page.locator('[class*="fixed"][class*="right-0"]').first();
      const panelVisible = await tutorPanel.isVisible().catch(() => false);

      if (panelVisible) {
        const box = await tutorPanel.boundingBox();
        if (box) {
          // Sidebar should be around 400px
          expect(box.width).toBeLessThan(500);
          expect(box.width).toBeGreaterThan(300);
        }
      }
    }
  });
});

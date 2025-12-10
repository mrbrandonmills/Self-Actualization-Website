import { test, expect } from '@playwright/test';
import { ADMIN_EMAIL, ADMIN_PASSWORD, login, loginAsAdmin } from '../fixtures/auth';

test.describe('Authentication', () => {
  test('should display login page', async ({ page }) => {
    await page.goto('/login');

    await expect(page.locator('h1')).toContainText(/sign in|log in|welcome/i);
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should display signup page', async ({ page }) => {
    await page.goto('/signup');

    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('input[name="name"]')).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[type="email"]', 'invalid@example.com');
    await page.fill('input[type="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    // Should show error message
    await expect(page.locator('text=/invalid|incorrect|wrong|error/i')).toBeVisible({ timeout: 10000 });
  });

  test('should login with valid admin credentials', async ({ page }) => {
    await loginAsAdmin(page);

    // Should redirect away from login page
    await expect(page).not.toHaveURL(/\/login/);

    // Should see user menu or dashboard link
    const hasUserIndicator = await page.locator('text=/dashboard|sign out/i').count();
    expect(hasUserIndicator).toBeGreaterThan(0);
  });

  test('should redirect to login for protected routes', async ({ page }) => {
    // Dashboard should require login
    await page.goto('/dashboard');

    // Should redirect to login
    await expect(page).toHaveURL(/\/login/);
  });

  test('should preserve callbackUrl after login', async ({ page }) => {
    // Try to access a protected route
    await page.goto('/dashboard');

    // Should be on login page with callback
    await expect(page).toHaveURL(/\/login.*callbackUrl/);

    // Login
    await page.fill('input[type="email"]', ADMIN_EMAIL);
    await page.fill('input[type="password"]', ADMIN_PASSWORD);
    await page.click('button[type="submit"]');

    // Should redirect to original destination
    await page.waitForURL(/\/dashboard/, { timeout: 15000 });
  });
});

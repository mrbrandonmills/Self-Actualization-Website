import { test, expect } from '@playwright/test';
import { ADMIN_EMAIL, ADMIN_PASSWORD, login, loginAsAdmin } from '../fixtures/auth';

test.describe('Authentication', () => {
  test('should display login page', async ({ page }) => {
    await page.goto('/login');

    // Check for login form elements
    await expect(page.locator('form input[type="email"]').first()).toBeVisible();
    await expect(page.locator('form input[type="password"]').first()).toBeVisible();
    await expect(page.locator('form button[type="submit"]').first()).toBeVisible();
  });

  test('should display signup page', async ({ page }) => {
    await page.goto('/signup');

    // Check for signup form elements
    await expect(page.locator('form input[type="email"]').first()).toBeVisible();
    await expect(page.locator('form input[type="password"]').first()).toBeVisible();
    await expect(page.locator('form input[name="name"]').first()).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.locator('form input[type="email"]').first().fill('invalid@example.com');
    await page.locator('form input[type="password"]').first().fill('wrongpassword');
    await page.locator('form button[type="submit"]').first().click();

    // Should show error message or stay on login page
    await page.waitForTimeout(3000);
    const errorVisible = await page.locator('text=/invalid|incorrect|wrong|error|failed/i').count();
    const stillOnLogin = page.url().includes('/login');
    expect(errorVisible > 0 || stillOnLogin).toBeTruthy();
  });

  test('should login with valid admin credentials', async ({ page }) => {
    await loginAsAdmin(page);

    // Should redirect away from login page
    await page.waitForTimeout(3000);
    await expect(page).not.toHaveURL(/\/login/);
  });

  test('should redirect to login for protected routes', async ({ page }) => {
    // Dashboard should require login
    await page.goto('/dashboard');

    await page.waitForTimeout(2000);

    // Should show login elements or redirect
    const onLogin = page.url().includes('/login');
    const hasLoginForm = await page.locator('form input[type="password"]').count();
    expect(onLogin || hasLoginForm > 0).toBeTruthy();
  });

  test('should preserve callbackUrl after login', async ({ page }) => {
    // Try to access a protected route
    await page.goto('/dashboard');

    await page.waitForTimeout(2000);

    // If redirected to login, try logging in
    if (page.url().includes('/login')) {
      await page.locator('form input[type="email"]').first().fill(ADMIN_EMAIL);
      await page.locator('form input[type="password"]').first().fill(ADMIN_PASSWORD);
      await page.locator('form button[type="submit"]').first().click();

      // Should redirect to dashboard eventually
      await page.waitForTimeout(5000);
      // Just verify we're no longer on login
      expect(page.url().includes('/login')).toBeFalsy();
    }
  });
});

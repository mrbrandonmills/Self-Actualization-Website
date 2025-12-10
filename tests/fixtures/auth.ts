import { test as base, expect } from '@playwright/test';

/**
 * Auth fixtures for Playwright tests
 * Provides authenticated user contexts
 */

// Test admin credentials
export const ADMIN_EMAIL = 'brandonflexy@gmail.com';
export const ADMIN_PASSWORD = 'SelfActualize2025!';

// Test user credentials (for non-admin tests)
export const TEST_USER_EMAIL = 'testuser@example.com';
export const TEST_USER_PASSWORD = 'TestUser2025!';

// Extend base test with auth fixtures
export const test = base.extend<{
  authenticatedPage: typeof base;
  adminPage: typeof base;
}>({
  // Regular authenticated user context
  authenticatedPage: async ({ page }, use) => {
    await use(base);
  },

  // Admin user context
  adminPage: async ({ page }, use) => {
    await use(base);
  },
});

/**
 * Login helper function
 */
export async function login(page: any, email: string, password: string) {
  await page.goto('/login');
  await page.fill('input[type="email"]', email);
  await page.fill('input[type="password"]', password);
  await page.click('button[type="submit"]');

  // Wait for redirect or dashboard
  await page.waitForURL(url => !url.pathname.includes('/login'), { timeout: 10000 });
}

/**
 * Login as admin
 */
export async function loginAsAdmin(page: any) {
  await login(page, ADMIN_EMAIL, ADMIN_PASSWORD);
}

/**
 * Check if user is logged in
 */
export async function isLoggedIn(page: any): Promise<boolean> {
  // Look for user menu or sign out button
  const userMenu = await page.locator('[data-testid="user-menu"]').count();
  const signOutButton = await page.locator('text=Sign out').count();
  return userMenu > 0 || signOutButton > 0;
}

/**
 * Logout helper
 */
export async function logout(page: any) {
  // Click user menu
  await page.click('[data-testid="user-menu"]');
  // Click sign out
  await page.click('text=Sign out');
  await page.waitForURL('/');
}

export { expect };

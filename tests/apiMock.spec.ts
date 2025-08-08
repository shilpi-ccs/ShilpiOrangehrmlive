import { test, expect } from '@playwright/test';

test('Mock user API and validate UI', async ({ page }) => {
  await page.route('**/api/users', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([{ username: 'mockUser1' }, { username: 'mockUser2' }]),
    });
  });

  await page.goto('/dashboard');
  const usernames = await page.locator('.user-row .username').allTextContents();

  expect(usernames).toContain('mockUser1');
  expect(usernames).toContain('mockUser2');
});

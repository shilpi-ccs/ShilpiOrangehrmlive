import { test, expect } from '@playwright/test';
import { UserTablePage } from '../pages/UserTablePage';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.fill('#txtUsername', process.env.USERNAME!);
  await page.fill('#txtPassword', process.env.PASSWORD!);
  await page.click('#btnLogin');
});

test('Search partial match', async ({ page }) => {
  const userTable = new UserTablePage(page);
  await userTable.navigate();

  await userTable.search('john');
  const users = await userTable.getDisplayedUsernames();
  expect(users.some(u => u.toLowerCase().includes('john'))).toBeTruthy();
});

test('Search with no match', async ({ page }) => {
  const userTable = new UserTablePage(page);
  await userTable.navigate();

  await userTable.search('xyznotfound');
  const users = await userTable.getDisplayedUsernames();
  expect(users.length).toBe(0);
});

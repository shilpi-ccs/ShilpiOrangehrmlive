import { test, expect } from '@playwright/test';
import { UserTablePage } from '../pages/UserTablePage';
import { DashboardPage } from '../pages/DashBoardPage';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.fill('#txtUsername', process.env.USERNAME!);
  await page.fill('#txtPassword', process.env.PASSWORD!);
  await page.click('#btnLogin');
});

test('Add, Edit, Delete User', async ({ page }) => {
  const userTable = new UserTablePage(page);
  await userTable.navigate();

  await userTable.addUser('John', 'Doe', 'john123', 'Pass@123');
  await expect(userTable.isUserPresent('john123')).toBeTruthy();

  await userTable.editUser('john123', 'john456');
  await expect(userTable.isUserPresent('john456')).toBeTruthy();

  await userTable.deleteUser('john456');
  await expect(userTable.isUserPresent('john456')).toBeFalsy();
});

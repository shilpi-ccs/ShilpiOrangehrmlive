import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AdminUserManagementPage } from '../pages/AdminUserManagementPage';
import { validUser } from '../utils/testData';

test('search filter by partial username', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(validUser.username, validUser.password);

  const admin = new AdminUserManagementPage(page);
  await admin.gotoUserManagement();
  await admin.searchByUsername('Admin');
  await admin.expectRowWithUsername('Admin');
});
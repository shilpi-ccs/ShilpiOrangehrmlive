import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AdminUserManagementPage } from '../pages/AdminUserManagementPage';
import { validUser, newUser } from '../utils/testData';

test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(validUser.username, validUser.password);
});

test('add, search, delete user flow', async ({ page }) => {
  const admin = new AdminUserManagementPage(page);
  await admin.gotoUserManagement();
  await admin.clickAddUser();
  await admin.fillUserForm(newUser);
  await admin.submitForm();
  await admin.searchByUsername(newUser.username);
  await admin.expectRowWithUsername(newUser.username);

  await admin.deleteFirstResult();
  await admin.searchByUsername(newUser.username);
  await admin.expectNoResults();
});
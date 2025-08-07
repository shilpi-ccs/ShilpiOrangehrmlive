import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { validUser } from '../utils/testData';

test('successful login', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login(validUser.username, validUser.password);
  await login.assertLoginSuccess();
  await page.screenshot({ path: 'screenshots/login-success.png' });
});

test('login failure with wrong credentials', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login('wrong', 'wrong');
  await login.assertError('Invalid credentials');
});
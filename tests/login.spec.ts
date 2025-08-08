import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashBoardPage';

test('Login Workflow: Valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.goto();
  await loginPage.login(process.env.USERNAME!, process.env.PASSWORD!);

  await expect(dashboardPage.welcomeMessage).toBeVisible();
  await page.screenshot({ path: 'screenshots/login-success.png' });
});

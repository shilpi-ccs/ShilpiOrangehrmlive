import { test } from '@playwright/test';

test('check baseURL', async ({ page }) => {
  console.log('✅ Base URL:', process.env.BASE_URL);
  await page.goto('/web/index.php/auth/login');
});
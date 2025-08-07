import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  // Navigate to the login page
  async goto() {
    await this.page.goto('/web/index.php/auth/login', { waitUntil: 'networkidle', timeout: 30000 });
  }

  // Perform login with the provided username and password
  async login(username: string, password: string) {
    const usernameInput = this.page.locator('input[name="username"]');
    const passwordInput = this.page.locator('input[name="password"]');
    const submitButton = this.page.locator('button[type="submit"]');

    // Wait for inputs to be visible
    await usernameInput.waitFor({ state: 'visible', timeout: 20000 });
    await passwordInput.waitFor({ state: 'visible', timeout: 20000 });

    // Fill the login credentials
    await usernameInput.fill(username);
    await passwordInput.fill(password);

    try {
      // Wait for a successful response or error response
      const [response] = await Promise.all([
        this.page.waitForResponse(resp =>
          resp.url().includes('/dashboard') && resp.status() === 200
        ),
        submitButton.click(),
      ]);

      if (response.status() !== 200) {
        throw new Error(`Login failed with status: ${response.status()}`);
      }

      // Wait for the page to finish navigation after login
      await this.page.waitForNavigation({ waitUntil: 'networkidle', timeout: 30000 });

    } catch (error) {
      console.error('Login error:', error);
      throw error; // Re-throw the error to fail the test
    }
  }

  // Assert that login was successful by checking the dashboard title
  async assertLoginSuccess() {
    const dashboardTitle = this.page.locator('h6.oxd-text.oxd-text--h6');

    // Capture screenshot before assertion to help debug
    await this.page.screenshot({ path: 'login_before_assert.png' });

    // Check that the dashboard title is correct (indicating login success)
    await expect(dashboardTitle).toHaveText('Dashboard', { timeout: 30000 });

    // Optional: Capture another screenshot after successful login
    await this.page.screenshot({ path: 'login_after_assert.png' });
  }

  // Assert that login failed and show error message
  async assertError(message: string) {
    const alert = this.page.locator('.oxd-alert-content-text');

    // Wait for the alert to be visible
    await alert.waitFor({ state: 'visible', timeout: 20000 });

    // Assert that the error message matches the expected message
    await expect(alert).toHaveText(message, { timeout: 20000 });

    // Capture screenshot if there's an error
    await this.page.screenshot({ path: 'login_error.png' });
  }
}

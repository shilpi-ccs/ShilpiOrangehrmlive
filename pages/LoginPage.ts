export class LoginPage {
  constructor(private page: any) {}

  async goto() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.page.fill('#txtUsername', username);
    await this.page.fill('#txtPassword', password);
    await this.page.click('#btnLogin');
  }
}
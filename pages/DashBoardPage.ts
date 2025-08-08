export class DashboardPage {
  constructor(private page: any) {}

  get welcomeMessage() {
    return this.page.locator('#welcome');
  }

  async logout() {
    await this.page.click('#welcome');
    await this.page.click('text=Logout');
  }
}

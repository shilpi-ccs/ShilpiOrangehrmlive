export class UserTablePage {
  constructor(private page: any) {}

  async navigate() {
    await this.page.click('text=Admin');
    await this.page.click('text=User Management');
    await this.page.click('text=Users');
  }

  async addUser(first: string, last: string, username: string, password: string) {
    await this.page.click('#btnAdd');
    await this.page.fill('#systemUser_employeeName_empName', `${first} ${last}`);
    await this.page.fill('#systemUser_userName', username);
    await this.page.fill('#systemUser_password', password);
    await this.page.fill('#systemUser_confirmPassword', password);
    await this.page.click('#btnSave');
  }

  async editUser(oldUsername: string, newUsername: string) {
    await this.page.fill('#searchSystemUser_userName', oldUsername);
    await this.page.click('#searchBtn');
    await this.page.click(`text=${oldUsername}`);
    await this.page.fill('#systemUser_userName', newUsername);
    await this.page.click('#btnSave');
  }

  async deleteUser(username: string) {
    await this.page.fill('#searchSystemUser_userName', username);
    await this.page.click('#searchBtn');
    await this.page.check(`input[value*="${username}"]`);
    await this.page.click('#btnDelete');
    await this.page.click('#dialogDeleteBtn');
  }

  async isUserPresent(username: string) {
    await this.page.fill('#searchSystemUser_userName', username);
    await this.page.click('#searchBtn');
    return this.page.locator(`text=${username}`).isVisible();
  }

  async search(name: string) {
    await this.page.fill('#searchSystemUser_userName', name);
    await this.page.click('#searchBtn');
  }

  async getDisplayedUsernames() {
    return this.page.locator('table tbody tr td:nth-child(2)').allTextContents();
  }
}
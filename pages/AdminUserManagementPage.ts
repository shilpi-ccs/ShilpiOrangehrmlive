import { Page, expect } from '@playwright/test';
import { selectDropdown } from '../utils/helper';

export class AdminUserManagementPage {
  constructor(private page: Page) {}

  async gotoUserManagement() {
    await this.page.click('//span[text()="Admin"]');
    await expect(this.page).toHaveURL(/admin\/viewSystemUsers/);
  }

  async clickAddUser() {
    await this.page.click('button:has-text("Add")');
  }

  async fillUserForm(user: any) {
    await selectDropdown(this.page, 'User Role', user.userRole);
    // Employee auto-complete
    await this.page.fill('input[placeholder="Type for hints..."]', user.employeeName);
    await this.page.click(`//div[@role="option" and contains(., "${user.employeeName}")]`);
    await this.page.fill('input[name="username"]', user.username);
    await selectDropdown(this.page, 'Status', user.status);
    await this.page.fill('input[name="password"]', user.password);
    await this.page.fill('input[name="confirmPassword"]', user.confirmPassword);
  }

  async submitForm() {
    await this.page.click('button:has-text("Save")');
  }

  async searchByUsername(username: string) {
    await this.page.fill('input[placeholder="Search"]', username);
    await this.page.click('button:has-text("Search")');
  }

  async editFirstResult(age?: string) {
    await this.page.click('//div[@class="oxd-table-cell-actions"]//button[1]');
    if (age) await this.page.fill('input[name="age"]', age);
    await this.page.click('button:has-text("Save")');
  }

  async deleteFirstResult() {
    await this.page.click('//div[@class="oxd-table-cell-actions"]//button[2]');
    await this.page.click('button:has-text("Yes, Delete")');
  }

  async expectRowWithUsername(username: string) {
    await expect(this.page.locator('div.oxd-table-card')).toContainText(username);
  }

  async expectNoResults() {
    await expect(this.page.locator('.oxd-text--muted')).toHaveText('No Records Found');
  }
}
import { Page } from '@playwright/test';

export async function selectDropdown(page: Page, labelText: string, optionText: string) {
  const dropdownArrow = page.locator(`//label[contains(.,'${labelText}')]/following::i[1]`);
  await dropdownArrow.click();
  await page.locator(`//div[@role='listbox']//div[text()='${optionText}']`).click();
}
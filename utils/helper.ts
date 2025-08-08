import { Page } from "@playwright/test";

export async function takeScreenshot(page, name: string) {
  await page.screenshot({ path: `screenshots/${name}.png` });
}
export function selectDropdown(page: Page, selector: string, value: string) {
  return page.selectOption(selector, { label: value });
}
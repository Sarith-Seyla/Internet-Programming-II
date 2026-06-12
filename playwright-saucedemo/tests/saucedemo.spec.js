const { test, expect } = require('@playwright/test');

test('open saucedemo home and check title', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await expect(page).toHaveTitle(/Swag Labs/);
});

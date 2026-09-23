const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test('item added to cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory/);

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page).toHaveURL(/cart/);

  await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');
});

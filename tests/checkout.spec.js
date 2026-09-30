const { test, expect } = require('../fixtures');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');

test('standard user can checkout', async ({ loggedInPage: page }) => {
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await expect(page).toHaveURL(/inventory/);

  await inventoryPage.addToCart('Sauce Labs Backpack');
  await inventoryPage.goToCart();
  await expect(page).toHaveURL(/cart/);
  await expect(cartPage.productRow('Sauce Labs Backpack')).toHaveCount(1);

  await cartPage.checkout();
  await expect(page).toHaveURL(/checkout-step-one/);

  await page.getByPlaceholder('First Name').fill('Ameen');
  await page.getByPlaceholder('Last Name').fill('test');
  await page.locator('[data-test="postalCode"]').fill('12345');
  await page.locator('[data-test="continue"]').click();
  await expect(page).toHaveURL(/checkout-step-two/);

  await page.locator('[data-test="finish"]').click();
  await expect(page).toHaveURL(/checkout-complete/);
  await expect(page.locator('[data-test="complete-header"]')).toBeVisible();
});

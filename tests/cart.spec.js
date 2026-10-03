const { test, expect } = require('../fixtures');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');

test('item added to cart', { tag: '@smoke' }, async ({ loggedInPage: page }) => {
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await expect(page).toHaveURL(/inventory/);

  await inventoryPage.addToCart('Sauce Labs Backpack');
  await inventoryPage.goToCart();
  await expect(page).toHaveURL(/cart/);

  await expect(cartPage.productRow('Sauce Labs Backpack')).toHaveCount(1);
});

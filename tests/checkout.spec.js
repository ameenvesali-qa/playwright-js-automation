const { test, expect } = require('../fixtures');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

test('standard user can checkout', { tag: '@smoke' }, async ({ loggedInPage: page }) => {
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await expect(page).toHaveURL(/inventory/);

  await inventoryPage.addToCart('Sauce Labs Backpack');
  await inventoryPage.goToCart();
  await expect(page).toHaveURL(/cart/);
  await expect(cartPage.productRow('Sauce Labs Backpack')).toHaveCount(1);
  
  await cartPage.checkout();
  await expect(page).toHaveURL(/checkout-step-one/);

  await checkoutPage.fillCustomerInfo('Ameen', 'Test', '12345');
  await checkoutPage.continue();
  await expect(page).toHaveURL(/checkout-step-two/);

  await checkoutPage.finish();
  await expect(page).toHaveURL(/checkout-complete/);
  await expect(checkoutPage.completeHeader).toBeVisible();
});

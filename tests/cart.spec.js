const { test, expect } = require('../fixtures');

test('item added to cart', async ({ loggedInPage: page }) => {
  await expect(page).toHaveURL(/inventory/);
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page).toHaveURL(/cart/);
  await expect(
  page.locator('[data-test="inventory-item-name"]').filter({ hasText: 'Sauce Labs Backpack' })
).toHaveCount(1);

});

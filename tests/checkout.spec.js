const { test, expect } = require('../fixtures');

test('standard user can checkout', async ({ loggedInPage: page }) => {
  await expect(page).toHaveURL(/inventory/);
  
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(
  page.locator('[data-test="inventory-item-name"]').filter({ hasText: 'Sauce Labs Backpack' })
).toHaveCount(1);

  await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');
  
  await page.locator('[data-test="checkout"]').click();
  await expect(page).toHaveURL(/checkout-step-one/);
  await page.locator('[data-test="firstName"]').fill('Ameen');
  await page.locator('[data-test="lastName"]').fill('test');
  await page.locator('[data-test="postalCode"]').fill('12345');
  await page.locator('[data-test="continue"]').click();
  await expect(page).toHaveURL(/checkout-step-two/);
  await expect(page.locator('[data-test="payment-info-label"]')).toHaveText('Payment Information:');
  await expect(page.locator('[data-test="total-label"]')).toContainText('Total:');
  await page.locator('[data-test="finish"]').click();
  await expect(page).toHaveURL(/checkout-complete/);
  await page.locator('[data-test="back-to-products"]').click();
  await expect(page).toHaveURL(/inventory/);
});





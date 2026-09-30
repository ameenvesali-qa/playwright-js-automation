class CartPage {
  constructor(page) {
    this.page = page;
  }

  productRow(productName) {
    return this.page.locator('[data-test="inventory-item-name"]').filter({ hasText: productName });
  }

  async checkout() {
    await this.page.locator('[data-test="checkout"]').click();
  }
}

module.exports = { CartPage };

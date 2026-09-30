class InventoryPage {
  constructor(page) {
    this.page = page;
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async addToCart(productName) {
    const slug = productName.toLowerCase().replaceAll(' ', '-');
    await this.page.locator(`[data-test="add-to-cart-${slug}"]`).click();
  }
  
  async goToCart() {
    await this.shoppingCartLink.click();
    }
}


module.exports = { InventoryPage };

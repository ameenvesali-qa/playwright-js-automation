const base = require('@playwright/test');
const { users } = require('../test-data/users');
const { LoginPage } = require('../pages/LoginPage');

const test = base.test.extend({
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await use(page);
  },
});

module.exports = { test, expect: base.expect };

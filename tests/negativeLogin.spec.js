const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

const invalidLogins = [
  { name: 'wrong password', username: 'standard_user', password: 'secret_sauces', error: 'Username and password do not match' },
  { name: 'locked out user', username: 'locked_out_user', password: 'secret_sauce', error: 'this user has been locked out' },
  { name: 'empty username', username: '', password: 'secret_sauce', error: 'Username is required' },
  { name: 'empty password', username: 'standard_user', password: '', error: 'Password is required' },
];

for (const { name, username, password, error } of invalidLogins) {
  test(`login fails: ${name}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(username, password);
    await expect(loginPage.errorMessage).toContainText(error);
  });
}

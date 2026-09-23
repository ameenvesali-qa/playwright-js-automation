const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test('standard user can log in', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory/);
});

test('wrong password shows an error', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauces');
  await expect(loginPage.errorMessage).toContainText('Username and password do not match');
});

test('locked out user cannot log in', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('locked_out_user', 'secret_sauce');
  await expect(loginPage.errorMessage).toContainText('this user has been locked out');
});

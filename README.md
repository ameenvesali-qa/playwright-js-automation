# Playwright JS Automation

![Playwright Tests](https://github.com/ameenvesali-qa/playwright-js-automation/actions/workflows/playwright.yml/badge.svg)

An end-to-end and API test suite built with Playwright and JavaScript. It tests the [SauceDemo](https://www.saucedemo.com) practice shop in the browser and the [Restful-Booker](https://restful-booker.herokuapp.com) API, and it's also where I practice a professional QA automation workflow: Page Objects, fixtures, environment config, CI, flakiness detection, and a full git/PR process.

## What's covered

**UI tests (SauceDemo)**
- Login: successful login, plus a data-driven table of invalid cases (wrong password, locked-out user, empty fields)
- Cart: adding an item and verifying the cart contents
- Checkout: the full flow from login to order confirmation

**API tests (Restful-Booker)**
- Listing bookings and creating a booking, with assertions on status codes and response data

## Design

- **Page Object Model:** `LoginPage`, `InventoryPage`, `CartPage`, and `CheckoutPage` each hold their own locators and actions, so a UI change is fixed in one place instead of in every test. `InventoryPage.addToCart()` builds its locator dynamically from a product name, rather than being hardcoded to one item.
- **Custom fixture:** `fixtures/index.js` provides a `loggedInPage` fixture, so tests that need a logged-in user start already logged in, with setup and teardown handled in one place.
- **Data-driven tests:** invalid login cases live in one table and generate one test each.
- **Test data and config:** credentials live in `test-data/users.js`, sourced from environment variables rather than hardcoded. Locally these come from a gitignored `.env` file (see `.env.example` for the expected keys); in CI they're injected via GitHub Actions secrets.
- **baseURL:** set in `playwright.config.js` so page objects navigate with relative paths.
- **Debugging artifacts:** screenshots and traces are kept for failed tests, viewable with the Playwright trace viewer.
- **Reporting:** results are output as both an HTML report and a JUnit XML file (`results.xml`), for compatibility with external reporting tools.

## Project structure

```
tests/          UI tests (login, cart, checkout)
tests/api/      API tests (Restful-Booker)
pages/          Page Objects (LoginPage, InventoryPage, CartPage, CheckoutPage)
fixtures/       Custom Playwright fixtures
test-data/      Test user data, sourced from environment variables
.github/workflows/
  playwright.yml        Runs the full suite on every push/PR to main
  flakiness-check.yml   Runs the suite with repeated executions to catch flaky tests
playwright.config.js    Playwright configuration
.env.example            Expected environment variables (copy to .env locally)
```

## Running the tests

Requires Node.js 18 or newer.

```bash
git clone https://github.com/ameenvesali-qa/playwright-js-automation.git
cd playwright-js-automation
npm ci
npx playwright install --with-deps
cp .env.example .env   # then fill in real values
npm test
```

Useful scripts:

```bash
npm test                     # run all tests
npm run test:chromium        # Chromium only
npm run test:api             # API tests only
npm run test:headed          # headed mode
npm run test:ui              # Playwright UI Mode
npm run report               # open HTML report
npx playwright test --grep @smoke   # run only the critical smoke tests
```

Other useful commands:

```bash
npx playwright test tests/login.spec.js     # one file
npx playwright test --repeat-each=10        # check for flakiness
```

Note: the API tests use a free, shared public server, so they can occasionally be slow or fail because of the server rather than the tests.

## CI and reliability

GitHub Actions runs the full suite on every push and pull request to `main`, with test credentials injected via repository secrets. The test report is uploaded as a build artifact. `main` is protected: changes must come through a pull request with a passing check.

A separate scheduled workflow (`flakiness-check.yml`) runs the full suite with `--repeat-each=5` nightly (and can be triggered manually). This surfaces tests that pass most of the time but fail occasionally — something a single CI run, even with retries, would miss.

## How I work in this repo

- Every change goes through a short-lived branch (`feat/...`, `fix/...`, `refactor/...`, `chore/...`, `docs/...`) and a pull request.
- Commits are small, with messages like `test: add checkout flow` or `fix: wait for cart page before asserting items`.
- Merged branches are deleted, and stable points are tagged (`v1.0.0`, `v1.1.0`, `v1.2.0`) and published as [releases](https://github.com/ameenvesali-qa/playwright-js-automation/releases).

## Tools

Playwright · JavaScript (Node.js) · dotenv · GitHub Actions · Git
```

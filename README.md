# Playwright JS Automation

![Playwright Tests](https://github.com/ameenvesali-qa/playwright-js-automation/actions/workflows/playwright.yml/badge.svg)

An end-to-end and API test suite built with Playwright and JavaScript. It tests the [SauceDemo](https://www.saucedemo.com) practice shop in the browser and the [Restful-Booker](https://restful-booker.herokuapp.com) API, and it is also where I practice a professional git workflow: feature branches, pull requests, required CI checks, and tagged releases.

## What's covered

**UI tests (SauceDemo)**
- Login: successful login, plus a data-driven table of invalid cases (wrong password, locked-out user, empty fields)
- Cart: adding an item and verifying the cart contents
- Checkout: the full flow from login to order confirmation

**API tests (Restful-Booker)**
- Listing bookings and creating a booking, with assertions on status codes and response data

## Design

- **Page Object Model:** `pages/LoginPage.js` holds the login locators and actions, so a UI change is fixed in one place instead of in every test.
- **Custom fixture:** `fixtures/index.js` provides a `loggedInPage` fixture, so tests that need a logged-in user start already logged in.
- **Data-driven tests:** invalid login cases live in one table and generate one test each.
- **Debugging artifacts:** screenshots and traces are kept for failed tests, viewable with the Playwright trace viewer.

## Project structure

```
tests/          UI tests (login, cart, checkout)
tests/api/      API tests (Restful-Booker)
pages/          Page Objects
fixtures/       Custom Playwright fixtures
.github/workflows/playwright.yml   CI pipeline
playwright.config.js               Playwright configuration
```

## Running the tests

Requires Node.js 18 or newer.

```
git clone https://github.com/ameenvesali-qa/playwright-js-automation.git
cd playwright-js-automation
npm ci
npx playwright install --with-deps
npx playwright test
```

Useful variations:

```
npx playwright test --project=chromium      # one browser only
npx playwright test tests/login.spec.js     # one file
npx playwright show-report                  # open the HTML report
```

Note: the API tests use a free, shared public server, so they can occasionally be slow or fail because of the server rather than the tests.

## CI

GitHub Actions runs the full suite on every push and pull request to `main`. The test report is uploaded as a build artifact. `main` is protected: changes must come through a pull request with a passing check.

## How I work in this repo

- Every change goes through a short-lived branch (`feat/...`, `fix/...`, `refactor/...`, `docs/...`) and a pull request.
- Commits are small, with messages like `test: add checkout flow` or `fix: wait for cart page before asserting items`.
- Merged branches are deleted, and stable points are tagged (`v1.0.0`, `v1.1.0`, `v1.2.0`) and published as [releases](../../releases).


## Tools

Playwright, JavaScript (Node.js), GitHub Actions, Git and GitHub

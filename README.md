# Depop E2E Automation
This is an E2E automation project for the Depop login page.

The test cases focus on testing the calendar, event cards, filtering, searching and RSS capabilities of the project.

Most of the selectors are based on CSS and aria-label attributes, which can be improved in the future by using custom `data-*` attributes.

## Setup
This project uses npm & Cypress.
To install, simply run the following terminal command:
'npm i'

## Running the Tests
You can start the graphical Cypress test runner with the `npx cypress open` command, or you can run in headless mode with the `npx cypress run` command.
The `npm run cy:run` and `./node_modules/.bin/cypress run` options are also available.

## Test Maintenance
The main test cases are kept in the `login.spec.js`, while the `fixtures` folder includes all the static test data.

The login page object is the `loginPage.js` file, found in the `PageObject` folder inside the integrations.

The `cypress.json` is configured to retry failed test cases, and to block analytic scripts.

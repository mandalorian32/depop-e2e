/// <reference types="cypress" />

// Get the env login credentials
const username = Cypress.env("username");
const password = Cypress.env("password");

// Default login URL
const loginPage = "/login/";

// Device size for mobile testing
const mobileDevice = "iphone-8";

// Impor the login page object
import LoginPage from "./PageObject/loginPage.js";

describe("Login test suite", () => {
  beforeEach(() => {
    // Check that the login credentials are set as env variables
    expect(username, "username was set").to.be.a("string").and.not.be.empty;
    if (typeof password !== "string" || !password) {
      throw new Error("Missing password value, set using CYPRESS_password=...");
    }

    // Navigate to the login URL
    cy.visit(loginPage);
  });

  /* 
  This test involves happy path login testing on a default desktop device. Additionally, the test verifies
  that the password reveal button works, and that the session is correctly redirected upon logging in.
  The test also verifies that the profile page has the requires basic elements displayed, and that the logout functionality works.
  */
  it("Try a successful login", () => {
    // Create a new login page object
    const login = new LoginPage();

    // Accept the cookies banner
    login.acceptCookies();

    // Enter the login credentials
    login.enterUsername(username);
    login.enterPassword(password);

    // Verify the password reveal button works
    login.clickPasswordRevealButton();
    login.assertPasswordIsDisplayed(password);

    // Click the login button
    login.submit();

    // Verify that the user is redirected to the homepage after a successful login
    cy.url().should("eq", "/");

    // Navigate to the main profile page
    cy.visit("/" + username);

    // Assert the correct page and main profile elements are displayed
    cy.url().should("include", username);
    login.assertUsernameIsDisplayed(username);
    login.assertEmptyMessageStateIsDisplayed();

    // Logout
    login.logout();

    // Verify the session is redirected back to the login page after a successful logout
    cy.url().should("include", loginPage);
  });

  /* 
  This test involves negative path testing, including trying to login with an inccorect username, password or both.
  */
  it.only("Try to login with an invalid username and/or password", () => {
    // Create a new login page object
    const login = new LoginPage();

    // Accept the cookies banner
    login.acceptCookies();

    // Enter a correct username and an incorrect password and try to login
    cy.login(username, "invalidPassword");

    // Assert that an error message is displayed due to the incorrect login information
    login.assertErrorMessageIsDisplayed();

    // Enter an incorrect username and a correct password and try to login
    cy.login("invalidUsername", password);

    // Assert that an error message is displayed due to the incorrect login information
    login.assertErrorMessageIsDisplayed();

    // Enter both an incorrect username and password and try to login
    cy.login("invalidUsername", "invalidPassword");

    // Assert that an error message is displayed due to the incorrect login information
    login.assertErrorMessageIsDisplayed();
  });

  /* 
This test involves happy path login testing on a mobile device.
*/
  it("Try a successful login on a mobile device", () => {
    // Create a new login page object
    const login = new LoginPage();

    // Set the viewport to a mobile device view
    cy.viewport(mobileDevice);

    // Accept the cookies banner
    login.acceptCookies();

    // Enter the login credentials and click the submit button
    cy.login(username, password);

    // Verify that the user is redirected to the homepage after a successful login
    cy.url().should("eq", "/");

    // Navigate to the main profile page
    cy.visit("/" + username);

    // Assert the correct page and main profile elements are displayed
    cy.url().should("include", username);
    login.assertUsernameIsDisplayed(username);
    login.assertEmptyMessageStateIsDisplayed();

    // Logout
    login.logout();

    // Verify the session is redirected back to the login page after a successful logout
    cy.url().should("include", loginPage);
  });

  /* 
This test verifies that logging in doesn't work without accepting the cookies banner
*/
  it("Try to click the login button without accepting the cookies banner", () => {
    // Create a new login page object
    const login = new LoginPage();

    // Enter the login credentials and click the submit button while the cookie banner overlay is active
    login.assertLoginFailsWhenCookiesBannerIsDisplayed(username, password);

    // Verify the session is still on the login page
    cy.url().should("include", loginPage);
  });
});

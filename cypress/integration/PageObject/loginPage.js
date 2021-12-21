/* 
Constants used throughout the login page object
*/
const usernameInputField = '[data-testid="username"]';
const passwordInputField = '[data-testid="password"]';
const loginSubmitButton = '[data-testid="login__cta"]';
const emptyMessageState = '[data-testid="message--empty-state"]';
const usernameField = '[d]ata-testid="username"]';
const userAvatar = '[data-testid="avatar__initials"]';
const logoutButton = '[data-testid="actionMenu__nav-logoutButton"]';
const acceptCookiesButton = '[data-testid="cookieBanner__acceptAllButton"]';
const errorLoginMessage = '[data-testid="login__error--server"]';
const incorrectCredentialsErrorMessage =
  "Incorrect username or password. Check your details and try again.";

class LoginPage {
  /* 
This function accepts the cookies banner that is displayed on each new session
*/
  acceptCookies() {
    cy.get(acceptCookiesButton).should("be.visible");
    cy.get(acceptCookiesButton).click();
    return this;
  }

  /* 
This function enters a username into the username input field
@parametar username: required username for the input field
*/
  enterUsername(username) {
    cy.get(usernameInputField).clear();
    cy.get(usernameInputField).type(username);
    return this;
  }

  /* 
This function enters a password into the password input field
@parametar password: required username for the input field
*/
  enterPassword(password) {
    cy.get(passwordInputField).clear();
    cy.get(passwordInputField).type(password);
    return this;
  }

  /* 
This function clicks the reveal password button that is located inside the password input.
*/
  clickPasswordRevealButton() {
    cy.get(passwordInputField).next(2).click();
    return this;
  }

  /* 
This function asserts that the password input field correctly changes its type to a text based type, thereby revealing the typed password
@parametar username: required username for the input field
*/
  assertPasswordIsDisplayed(password) {
    cy.get(passwordInputField + "[type=text]").should("exist");
  }

  /* 
This functtion clicks the login button
*/
  submit() {
    cy.get(loginSubmitButton).click();
  }

  /* 
This function asserts that the username is displayed in the main profile page
@parametar username: required username for the input field
*/
  assertUsernameIsDisplayed(username) {
    cy.contains(usernameField).should("contain", username);
  }

  /* 
This function asserts that an empty message state is displayed when logging in as a new user without any past orders
*/
  assertEmptyMessageStateIsDisplayed() {
    cy.contains(emptyMessageState).should("be.visible");
  }

  /* 
This function opens the user profile picture dropdown and clicks the log out button
*/
  logout() {
    cy.get(userAvatar).click();
    cy.get(logoutButton).click();
  }

  /* 
This function tryring to login with the supplied username and password data, and doesn't fail the test case if the login is not successful
@parametar username: required username for the input field
@parametar password: required username for the input field
*/
  assertLoginFailsWhenCookiesBannerIsDisplayed(username, password) {
    try {
      enterUsername(username);
      enterPassword(password);
      submit();
    } catch (error) {
      cy.log("Failed to click on login elements");
    }
  }

  /* 
This function asserts that an error message is shown when a login attempt doesnt succeed
*/
  assertErrorMessageIsDisplayed() {
    cy.get(errorLoginMessage).should(
      "contain",
      incorrectCredentialsErrorMessage
    );
  }
}

export default LoginPage;

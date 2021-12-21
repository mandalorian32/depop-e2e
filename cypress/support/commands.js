import LoginPage from "../integration/PageObject/loginPage.js";

/* 
This function enters the username and password in the login form and clicks the form submit button
@parametar username: required username for the input field
@parametar password: required password for the input field
*/
Cypress.Commands.add("login", (username, password) => {
  const login = new LoginPage();

  login.enterUsername(username);
  login.enterPassword(password);
  login.submit();
});

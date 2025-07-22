class LoginPage {
  visit() {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
  }

  login(username, password) {
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
  }

  getAlertText() {
    return cy.get(".oxd-alert-content-text");
  }

  getDashboardHeader() {
    return cy.get("h6");
  }
}

export default LoginPage;

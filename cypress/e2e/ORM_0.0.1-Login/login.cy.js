import LoginPage from "../../support/pageObjects/LoginPage";

describe("Fitur Login OrangeHRM", () => {
  // const url =
  //   "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";

  // beforeEach(() => {
  //   cy.visit(url);
  // });

  // Tugas 17 POM

  const loginPage = new LoginPage();

  beforeEach(() => {
    loginPage.visit();
  });

  // afterEach(() => {
  //   cy.screenshot("login/login_test");
  // });

  it("Login berhasil dengan username dan password valid", () => {
    //Tugas 16 Intercept
    cy.intercept(
      "GET",
      "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index"
    ).as("loginRequest");

    loginPage.login("Admin", "admin123");

    // cy.get('input[name="username"]').type("Admin");
    // cy.get('input[name="password"]').type("admin123");
    // cy.get('button[type="submit"]').click();

    cy.wait("@loginRequest").its("response.statusCode").should("eq", 200);

    cy.url().should("include", "/dashboard");
    cy.get("h6").should("contain", "Dashboard");
  });

  it("Login gagal dengan username salah", () => {
    cy.intercept(
      "POST",
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate"
    ).as("loginRequest");

    loginPage.login("Adminx", "admin123");
    // cy.get('input[name="username"]').type("adminx");
    // cy.get('input[name="password"]').type("admin123");
    // cy.get('button[type="submit"]').click();

    cy.wait("@loginRequest").its("response.statusCode").should("eq", 302);

    cy.get(".oxd-alert-content-text").should("contain", "Invalid credentials");
  });

  it("Login gagal dengan password salah", () => {
    cy.intercept(
      "POST",
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate"
    ).as("loginRequest");

    loginPage.login("Admin", "wrongpass");

    // cy.get('input[name="username"]').type("Admin");
    // cy.get('input[name="password"]').type("wrongpass");
    // cy.get('button[type="submit"]').click();

    cy.wait("@loginRequest").its("response.statusCode").should("eq", 302);

    cy.get(".oxd-alert-content-text").should("contain", "Invalid credentials");
  });
});

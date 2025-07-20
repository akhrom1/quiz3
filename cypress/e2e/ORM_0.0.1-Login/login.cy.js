describe("Fitur Login OrangeHRM", () => {
  const url =
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";

  beforeEach(() => {
    cy.visit(url);
  });

  afterEach(() => {
    cy.screenshot("login/login_test");
  });

  it("Login berhasil dengan username dan password valid", () => {
    cy.get('input[name="username"]').type("Admin");
    cy.get('input[name="password"]').type("admin123");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/dashboard");
    cy.get("h6").should("contain", "Dashboard");
  });

  it("Login gagal dengan username salah", () => {
    cy.get('input[name="username"]').type("adminx");
    cy.get('input[name="password"]').type("admin123");
    cy.get('button[type="submit"]').click();
    cy.get(".oxd-alert-content-text").should("contain", "Invalid credentials");
  });

  it("Login gagal dengan password salah", () => {
    cy.get('input[name="username"]').type("Admin");
    cy.get('input[name="password"]').type("wrongpass");
    cy.get('button[type="submit"]').click();
    cy.get(".oxd-alert-content-text").should("contain", "Invalid credentials");
  });
});

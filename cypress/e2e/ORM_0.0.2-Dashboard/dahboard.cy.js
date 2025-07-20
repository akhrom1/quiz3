describe("Dashboard Access", () => {
  it("Setelah login, user berada di halaman dashboard", () => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
    cy.get('input[name="username"]').type("Admin");
    cy.get('input[name="password"]').type("admin123");
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/dashboard");
    cy.get("h6").should("contain", "Dashboard");
  });
});

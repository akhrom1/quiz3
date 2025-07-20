describe("TC-PROFILE-001 - Cek menu profil user muncul setelah diklik", () => {
  it("User bisa melihat dropdown menu profil setelah login", () => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );

    cy.get('input[name="username"]').type("Admin");
    cy.get('input[name="password"]').type("admin123");
    cy.get('button[type="submit"]').click();

    cy.get(".oxd-userdropdown-tab").click();

    cy.get(".oxd-dropdown-menu").should("be.visible");

    cy.get(".oxd-dropdown-menu").should("contain", "Logout");
    cy.get(".oxd-dropdown-menu").should("contain", "Change Password");
  });
});

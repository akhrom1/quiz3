describe("TC-SIDEBAR-001 - Cek menu sidebar muncul setelah login", () => {
  it("Sidebar harus muncul dan berisi menu utama", () => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );

    cy.get('input[name="username"]').type("Admin");
    cy.get('input[name="password"]').type("admin123");
    cy.get('button[type="submit"]').click();

    cy.get(".oxd-sidepanel").should("be.visible");

    const menuItems = [
      "Admin",
      "PIM",
      "Leave",
      "Time",
      "Recruitment",
      "Dashboard",
    ];

    menuItems.forEach((menuText) => {
      cy.get(".oxd-sidepanel-body").should("contain", menuText);
    });
  });
});

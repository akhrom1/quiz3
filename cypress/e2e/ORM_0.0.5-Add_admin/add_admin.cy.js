describe("TC-ADMIN-001 - Add User di OrangeHRM", () => {
  beforeEach(() => {
    cy.loginAsAdmin();
  });
  afterEach(() => {
    cy.screenshot("admin/add_user");
  });
  it("Berhasil menambahkan user baru", () => {
    // Navigate to Admin section
    cy.get("span.oxd-text").contains("Admin").click();

    // Navigate to Admin section
    cy.get("button").contains("Add").click();

    // Click on Add button to open the form
    cy.get(".oxd-select-text").eq(0).click();
    cy.get(".oxd-select-option").contains("ESS").click();

    // Select user role as ESS
    cy.get("input[placeholder='Type for hints...']").type(
      "Timothy Lewis Amiano"
    );
    cy.wait(1000);
    cy.get(".oxd-autocomplete-option").contains("Timothy Lewis Amiano").click();

    // Select employee from the dropdown
    cy.get(".oxd-select-text").eq(1).click();
    cy.get(".oxd-select-option").contains("Enabled").click();

    // Set status to Enabled
    const newUsername = `testuser${Date.now()}`;
    cy.get(".oxd-input").eq(1).type(newUsername);

    // Input new username
    cy.get('input[type="password"]').eq(0).type("Password123!");
    cy.get('input[type="password"]').eq(1).type("Password123!");

    cy.get("button[type='submit']").contains("Save").click();
  });
});

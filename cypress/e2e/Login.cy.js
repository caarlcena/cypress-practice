describe("SauceDemo Scenarios", () => {
  it("Senacrio 1:Successful Login", () => {
    cy.visit(baseUrl);
    cy.getDataTest("username").type("standard_user");
    cy.getDataTest("password").type("secret_sauce");
    cy.getDataTest("login-button").click();
  });
});
76;

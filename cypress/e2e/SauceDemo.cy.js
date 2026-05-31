describe("SauceDemo Scenarios", () => {
  it("Senacrio 1:Successful Login", () => {
    cy.visit("/");
    cy.getDataTest("username").clear().type("standard_user");
    cy.getDataTest("password").clear().type("secret_sauce");
    cy.getDataTest("login-button").click();
  });

  it("Scenario 2: Invalid Username", () => {
    cy.visit("/");
    cy.getDataTest("username").clear().type("wrongUser");
    cy.getDataTest("password").clear().type("secret_sauce");
    cy.contains(
      /"Username and password do not match any user in this service"/i,
    ).should("not.exist");
    cy.getDataTest("login-button").click();
    cy.getDataTest("error")
      .should("be.visible")
      .and(
        "contain",
        "Username and password do not match any user in this service",
      );
  });

  it("Scenario 3: Invalid Password", () => {
    cy.visit("/");
    cy.getDataTest("username").clear().type("standard_user");
    cy.getDataTest("password").clear().type("wrongPassword");
    cy.contains(
      /"Username and password do not match any user in this service"/i,
    ).should("not.exist");
    cy.getDataTest("login-button").click();
    cy.getDataTest("error")
      .should("be.visible")
      .and(
        "contain",
        "Username and password do not match any user in this service",
      );
  });

  it("Scenario 4: Empty Username", () => {
    cy.visit("/");
    cy.getDataTest("password").clear().type("secret_sauce");
    cy.contains(/"Username is required"/i).should("not.exist");
    cy.getDataTest("login-button").click();
    cy.getDataTest("error")
      .should("be.visible")
      .and("contain", "Username is required");
  });

  it("Scenario 5: Empty Password", () => {
    cy.visit("/");
    cy.getDataTest("username").clear().type("standard_user");
    cy.contains(/"Password is required"/i).should("not.exist");
    cy.getDataTest("login-button").click();
    cy.getDataTest("error")
      .should("be.visible")
      .and("contain", "Password is required");
  });

  context("Product page scenarios", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.getDataTest("username").clear().type("standard_user");
      cy.getDataTest("password").clear().type("secret_sauce");
      cy.getDataTest("login-button").click();
    });

    it("Scenario 6: Verify Product List Loads", () => {
      cy.getDataTest("inventory-item").should("have.length", 6);
    });

    it("Scenario 7: Verify Product Names", () => {
      cy.getDataTest("inventory-item").should("contain", "Sauce Labs Backpack");
      cy.getDataTest("inventory-item").should(
        "contain",
        "Sauce Labs Bike Light",
      );
      cy.getDataTest("inventory-item").should(
        "contain",
        "Sauce Labs Bolt T-Shirt",
      );
    });

    it("Scenario 8: Verify Product Prices", () => {
      cy.getDataTest("inventory-item-price").each(($price) => {
        cy.wrap($price)
          .invoke("text")
          .should("match", /^\$\d+\.\d{2}$/);
      });
    });

    it("Scenario 9: Sort A-Z", () => {
      cy.getDataTest("product-sort-container").select("az");

      cy.getDataTest("inventory-item-name").then(($names) => {
        const names = [...$names].map((el) => el.innerText.trim());
        const sorted = [...names].sort((a, b) => a.localeCompare(b));
        expect(names).to.deep.equal(sorted);
      });
    });

    it.only("Scenario 10: Sort Z-A", () => {
      cy.getDataTest("product-sort-container").select("za");

      cy.getDataTest("inventory-item-name").then(($names) => {
        const names = [...$names].map((el) => el.innerText.trim());
        const sorted = [...names].sort((a, b) => b.localeCompare(a));
        expect(names).to.deep.equal(sorted);
      });
    });
  });
});

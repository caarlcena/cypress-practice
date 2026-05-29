describe("My First Test", () => {
  it("Visits Google", () => {
    cy.visit("https://www.google.com");
    cy.visit("https://www.youtube.com");
  });
});

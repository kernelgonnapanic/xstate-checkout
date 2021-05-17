describe("Successful checkout", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("adds and removes products from a cart", () => {
    cy.contains("Buty sportowe - Adidas").parent().find("img").click();
    cy.contains("Koszulka sportowa - Nike").parent().find("img").click();
    cy.get("[data-cy=cartSize]").should("have.text", 2);

    cy.contains("Buty sportowe - Adidas").parent().find("img").click();
    cy.get("[data-cy=cartSize]").should("have.text", 1);
  });

  it("successfully completes standard checkout", () => {
    cy.contains("Buty sportowe - Adidas").parent().find("img").click();
    cy.get("[data-cy=cartSize]").click();
    cy.contains("Koszyk");

    cy.contains("Dostawa standardowa").click();
    cy.contains("Adres >>").click();

    cy.get("input[placeholder=Imię]").type("John");
    cy.get("input[placeholder=Nazwisko]").type("Snow");
    cy.get("input[placeholder=Ulica]").type("Caste Black");
    cy.get("input[placeholder='Kod pocztowy']").type("00-000");
    cy.get("input[placeholder=Miasto]").type("The North");
    cy.contains("Płatność >>").click();

    cy.contains("Zapłać").click();
    cy.contains("Płatność zakończona pomyślnie");
  });
});

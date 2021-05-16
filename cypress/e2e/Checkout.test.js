describe("Successful checkout", () => {
  it("adds products to a cart", () => {
    cy.visit("/");
    cy.contains("Buty sportowe - Adidas").parent().find("img").click();
    cy.contains("Koszulka sportowa - Nike").parent().find("img").click();
    cy.get("[data-cy=cartSize]").should("have.text", 2);
  });

  it("removes a product from a cart", () => {
    cy.contains("Buty sportowe - Adidas").parent().find("img").click();
    cy.get("[data-cy=cartSize]").should("have.text", 1);
  });

  it("navigates to the cart", () => {
    cy.get("[data-cy=cartSize]").click();
    cy.contains("Koszyk");
  });

  it("chooses a different delivery method", () => {
    cy.contains("Dostawa standardowa").click();
  });

  it("navigates to the address section", () => {
    cy.contains("Adres >>").click();
  });

  it("fills in the address section", () => {
    cy.get("input[placeholder=Imię]").type("Anna");
    cy.get("input[placeholder=Nazwisko]").type("Konopka");
    cy.get("input[placeholder=Ulica]").type("Rynek 2");
    cy.get("input[placeholder='Kod pocztowy']").type("00-000");
    cy.get("input[placeholder=Miasto]").type("Wrocław");
    cy.contains("Płatność >>").click();
  });

  it("successfully pays", () => {
    cy.contains("Zapłać").click();
    cy.contains("Płatność zakończona pomyślnie");
  });
});

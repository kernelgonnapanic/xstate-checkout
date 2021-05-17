describe("Discounts", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("Buty sportowe - Adidas").parent().find("img").click();
    cy.get("[data-cy=cartSize]").click();
  });

  it("shows error message for incorrect discount code", () => {
    cy.get("input[placeholder='Dodaj kod rabatowy']").type("Kodzik12");
    cy.contains("Dodaj kod").click();
    cy.contains("Kod rabatowy jest nieprawidłowy");
  });

  it("successfully applies discount", () => {
    cy.get("input[placeholder='Dodaj kod rabatowy']").type("DLA_NAJLEPSZYCH");
    cy.contains("Dodaj kod").click();
    cy.contains("Rabat: DLA_NAJLEPSZYCH (-13%)");
  });

  it("successfully completes a transaction with a discount", () => {
    cy.get("input[placeholder='Dodaj kod rabatowy']").type("DLA_NAJLEPSZYCH");
    cy.contains("Dodaj kod").click();

    cy.contains("Adres >>").click();
    cy.get("input[placeholder=Imię]").type("John");
    cy.get("input[placeholder=Nazwisko]").type("Snow");
    cy.get("input[placeholder=Ulica]").type("Castle Black");
    cy.get("input[placeholder='Kod pocztowy']").type("00-000");
    cy.get("input[placeholder=Miasto]").type("The North");
    cy.contains("Płatność >>").click();

    cy.contains("Do zapłaty").parent().contains("46.75zł");
    cy.contains("Zapłać").click();

    cy.contains("Płatność zakończona pomyślnie");
  });
});

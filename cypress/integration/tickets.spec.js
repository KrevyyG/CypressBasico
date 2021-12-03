describe("Tickets", () => {
    beforeEach(() => cy.visit("https://ticket-box.s3.eu-central-1.amazonaws.com/index.html"));
    
    it.only("Preencher todos os campos de texto.", () => {
        const firstName = "Guilherme";
        const lastName = "Oliveira";
        cy.get("#first-name").type("Monteiro");
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("guilherme@gmail.com");
        cy.get("#requests").type("Gamer");
        cy.get("#signature").type(`${firstName} ${lastName}`);
    });

    it("Selecionando opção de ComboBox.", () => {
        cy.get("#ticket-quantity").select("2");
    });

    it("Selecionando RadioButton.", () => {
        cy.get("#vip").check();
    });

    it("Selecionando Checkbox.", () => {
        cy.get("#social-media").check();
    });

    it("Marcando 2 Checkbox e desmarcando 1.", () => {
        cy.get("#friend").check();
        cy.get("#publication").check();
        cy.get("#friend").uncheck();
    });

    it("'TICKETBOX' como título da aplicação.", () => {
        cy.get("header h1").should("contain", "TICKETBOX")
    });

    it("Alerta de email inválido.", () => {
        cy.get("#email").as("email").type("guilherme.com");
        cy.get("#email.invalid").should("exist");
        cy.get("@email").clear().type("guilherme@gmail.com");
        cy.get("#email.invalid").should("not.exist");
    });

    it("Preenchendo o formulário e resetando", () => {
        const firstName = "Guilherme";
        const lastName = "Oliveira";
        const fullName = `${firstName} ${lastName}`
        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("guilherme@gmail.com");
        cy.get("#ticket-quantity").select("2");
        cy.get("#vip").check();
        cy.get(".agreement p").should("contain", `I, ${fullName}, wish to buy 2 VIP tickets.`);
        cy.get("#friend").check();
        cy.get("#requests").type("IPA beer");
        cy.get("#agree").click();
        cy.get("#signature").type(fullName);
        cy.get("button[type='submit']").as("submitButton").should("not.be.disabled")
        cy.get("button[type='reset']").click();
        cy.get("@submitButton").should("be.disabled")
    })

    it("Preenchendo formulário com comandos cutomizados", () => {
        const custumer = {
            firstName: "Guilherme",
            lastName: "Oliveira",
            email: "guilherme@gmail.com"
        }

        cy.fillMandatoryFields(custumer);

        cy.get("button[type='submit']").as("submitButton").should("not.be.disabled")
        cy.get("#agree").uncheck();
        cy.get("@submitButton").should("be.disabled")
    });
});
// write tests here
describe('Quotes App Testing', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3001');
    });
    // helpers to select elements
    const textInput = () => cy.get('input[name=text]');
    const submitBtn = () => cy.get(`button[id="submitBtn"]`);
    // select author input
    const authorInput = () => cy.get('input[name=author]');
    // select cancel button
    const cancelBtn = () => cy.get(`button[id="cancelBtn"]`);
    const madeUpBtn = () => cy.get(`button[id="fake"]`);
    it('should do some basic math', () => {
        expect(1+1).to.equal(2);
        expect(1+2).not.to.equal(4);
        expect({}).not.to.equal({}); // ===
        expect({}).to.eql({}); // ==
    });
    it('should display the expected elements', () => {
        textInput().should('exist');
        submitBtn().should('exist');
        // make sure your two selections exist
        authorInput().should('exist');
        cancelBtn().should('exist');
        madeUpBtn().should('not.exist');
        cy.contains('Submit Quote').should('exist');
        cy.contains(/submit quote/i).should('exist');
    });
    describe('Filling out inputs and cancelling', () => {
        it('can get to the correct url', () => {
            cy.url().should('include', 'localhost');
        });
        it('submit button should be disabled on initial load', () => {
            submitBtn().should('be.disabled');
        });
        it('should type stuff in the inputs', () => {
            textInput()
                .should('have.value', '')
                .type('Hi how are you?')
                .should('have.value', 'Hi how are you?');
            // do the same thing for the author input
            authorInput()
                .should('have.value', '')
                .type('I am doing well!')
                .should('have.value', 'I am doing well!');
        });
        it('should enable submit with both inputs filled in', () => {
            textInput().type('Keiran');
            authorInput().type('Kozlowski');
            submitBtn().should('not.be.disabled');
        });
        it('should cancel the values in the input when clicking cancel button', () => {
            textInput().type('Keiran');
            authorInput().type('Kozlowski');
            cancelBtn().click();
            textInput().should('have.value', '');
            authorInput().should('have.value', '');
            submitBtn().should('be.disabled');
        });
    });
    describe('Adding quotes', () => {
        it('can submit and delete a quote', () => {
            textInput().type('Keiran');
            authorInput().type('Kozlowski');
            submitBtn().click();
            cy.contains('Keiran').siblings('button:nth-of-type(2)').click();
            cy.contains('Keiran').should('not.exist');
        });
    });
    describe('Editing quotes', () => {
        it('can edit a quote', () => {
            // submission of initial quote
            textInput().type('Keiran2');
            authorInput().type('Kozlowski2');
            submitBtn().click();
            // hit the edit button and check that inputs are as expected
            cy.contains('Keiran2').siblings('button:nth-of-type(1)').click();
            textInput().should('have.value', 'Keiran2');
            authorInput().should('have.value', 'Kozlowski2');
            // edit the quote and submit changes
            textInput().clear().type('I am cool');
            authorInput().clear().type('Very much so');
            submitBtn().click();
            // check that the changes were submitted properly
            // delete so that no garbage is left over
            cy.contains('I am cool').next().next().click();
            cy.contains('I am cool').should('not.exist');
        });
    });
});
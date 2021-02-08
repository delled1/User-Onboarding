//Write test here

describe('Onboarding Form App Testing', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3001');
    })


//Helpers to select elements

const nameInput = () => cy.get('input[name=name]');
const emailInput = () => cy.get('input[name=email]');
const passwordInput = () => cy.get('input[name=password');
const termsInput = () => cy.get('input[name=terms')
const submitButton = () => cy.get(`button[id="submit"]`)

//Initialize testing

it('should display the expected elements', () => {
    //Add in name, test that the name input exists and test that the name input has the provided name
    nameInput().type('Eric')
    nameInput().should('exist')
    nameInput().should('have.value', 'Eric');

    //Add in email, test that the email input exists and test that the email input has the provided email
    emailInput().type('eric.della@yahoo.com')
    emailInput().should('exist')
    emailInput().should('have.value', 'eric.della@yahoo.com')

    //Add in password, test that the password input exists and test that the password input has the provided password

    passwordInput().type('12345')
    passwordInput().should('exist')
    passwordInput().should('have.value', '12345')
    
    //check for checked off checkbox

    termsInput().check();

    //checking submit button
    submitButton().should('exist')
})
it('Submit button should be disabled on initial load', () =>{
    submitButton().should('be.disabled');
})

it('should enable submit with inputs filled in', () => {
    nameInput().type('Eric');
    emailInput().type('eric.della@yahoo.com');
    passwordInput().type('12345')
    termsInput().check()
    submitButton().should('not.be.disabled')
})

it('should not enable submit with inputs filled in', () => {
    nameInput().type('Eric');
    emailInput().type('eric.della@yahoo.com');
    termsInput().check()
    submitButton().should('be.disabled')
})
});
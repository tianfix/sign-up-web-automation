/// <reference types="cypress" />
require('cypress-xpath')

class SignUp {

    validatePasswordFulfillment(notFulfill) {
        const passwordCriterias = ["At least 8 characters", "One uppercase letter", "One lowercase letter", "One number", "One special character", "No empty space"]

        for (let i=0;i<passwordCriterias.length;i++) {
            if (passwordCriterias[i] == notFulfill) {
                cy.xpath(`//*[contains(text(),"${passwordCriterias[i]}")]`).should('not.have.class', 'is-fulfilled');
            } else {
                cy.xpath(`//*[contains(text(),"${passwordCriterias[i]}")]`).should('have.class', 'is-fulfilled');
            }
        }
    }

    validateBarText(status) {
        this.barText.should('have.text', `${status}`)
    }

    validateOverAllBar(percentage) {
        switch (percentage) {
            case 0:
                this.validateBarText("Weak");
                this.bar.should('have.attr', 'style', 'flex-basis: 0%;');
                this.bar.should('have.class', 'bg-primary');
                break;
            case 25:
                this.validateBarText("Weak");
                this.bar.should('have.attr', 'style', 'flex-basis: 25%;');
                this.bar.should('have.class', 'bg-danger');
                break;
            case 50:
                this.validateBarText("Average");
                this.bar.should('have.attr', 'style', 'flex-basis: 50%;');
                this.bar.should('have.class', 'bg-warning');
                break;
            case 75:
                this.validateBarText("Strong");
                this.bar.should('have.attr', 'style', 'flex-basis: 75%;');
                this.bar.should('have.class', 'bg-success');
                break;
            case 100:
                this.validateBarText("Very Strong");
                this.bar.should('have.attr', 'style', 'flex-basis: 100%;');
                this.bar.should('have.class', 'bg-success');
                break;
        }

    }

    inputEmail(email) {
        this.txtFieldEmail.type(email);
    }

    inputPassword(password) {
        this.txtFieldPassword.type(password);
    }

    signUpButtonIsNotClickable() {
        this.buttonSignUp.should('have.class', 'unclickable');
    }

    seePassword() {
        this.buttonEye.click();
        this.txtFieldPassword.should('have.attr', 'type', 'text');
    }

    unseePassword() {
        this.buttonEyeSlash.click();
        this.txtFieldPassword.should('have.attr', 'type', 'password');
    }

    feedbackSuggestionIsExist() {
        this.feedbackSuggestion.should('exist');
    }

    get txtFieldEmail() {
        return cy.xpath("//*[@name='email']");
    }

    get txtFieldPassword() {
        return cy.xpath("//*[@name='password']");
    }

    get buttonSignUp() {
        return cy.get('.primary');
    }

    get bar() {
        return cy.get('.bar');
    }

    get barText() {
        return cy.get('.bar-text');
    }

    get feedbackSuggestion() {
        return cy.get('.feedback-suggestion');
    }

    get buttonEye() {
        return cy.get('.fa-eye');
    }

    get buttonEyeSlash() {
        return cy.get('.fa-eye-slash');
    }

    get buttonTermsOfUse() {
        return cy.xpath('//*[contains(text(),"Terms of Use")]')
    }

    get buttonPrivacyPolicy() {
        return cy.xpath('//*[contains(text(),"Privacy Policy")]')
    }

    get buttonLogIn() {
        return cy.xpath('//*[contains(text(),"Log in")]')
    }
}

module.exports = new SignUp()
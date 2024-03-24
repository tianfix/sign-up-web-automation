/// <reference types="cypress" />
import SignUpPage from '../pages/SignUp';
import CommonPage from '../pages/Common';
import UserInformationPage from '../pages/UserInformation';

describe('Valid Credential', () => {

    it('Valid email & password', () => {
        cy.visit("/signup");
        SignUpPage.inputEmail("ethnicperri@awgarstone.com");
        SignUpPage.inputPassword("@Y102bas31308");
        SignUpPage.buttonSignUp.click();
        CommonPage.loadingAnimationIsExist();
        cy.wait(4000);
        UserInformationPage.txtFieldFirstName.should('exist');
    })    

})

describe('Mandatory Field and Invalid Credential', () => {

    beforeEach(() => {
        cy.visit("/signup");
    })

    afterEach(() => {
        SignUpPage.signUpButtonIsNotClickable()
    })

    it('Invalid email format', () => {
        SignUpPage.inputEmail("123");
        SignUpPage.txtFieldPassword.click();
        CommonPage.validateErrMsg("Must be a valid emai")
    })

    it('Invalid email domain', () => {
        SignUpPage.inputEmail("yaya@mail.com");
        SignUpPage.inputPassword("rara120AR@");
        SignUpPage.buttonSignUp.click();
        CommonPage.validateErrMsg("Email domain is not allowed. You must use a company email.");
    })

    it('Empty email', () => {
        SignUpPage.txtFieldEmail.click();
        SignUpPage.txtFieldPassword.click();
        CommonPage.validateErrMsg("Field cannot be empty");
    })

    it('Empty password', () => {
        SignUpPage.txtFieldPassword.click()
        SignUpPage.txtFieldEmail.click()
        CommonPage.validateErrMsg("Field cannot be empty");
    })

    it('Repetitive password', () => {
        SignUpPage.inputPassword("aaaa12@L");
        CommonPage.validateErrMsg('Repeats like "aaa" are easy to guess');
        SignUpPage.feedbackSuggestionIsExist();
    })

    it('Common password', () => {
        SignUpPage.inputPassword("123456@lA");
        CommonPage.validateErrMsg('This is similar to a commonly used password');
        SignUpPage.feedbackSuggestionIsExist();
    })
  
})

describe('Password Criteria & Strengness', () => {

    beforeEach(() => {
        cy.visit("/signup");
        SignUpPage.inputEmail("ethnicperri@awgarstone.com");
    })

    it('Fulfill 5 criterias except lowercase letter', () => {
        SignUpPage.inputPassword("YSU1I@AA"); // Without lowercase letter
        SignUpPage.validateOverAllBar(0); // Expect 0% (Weak)
        SignUpPage.validatePasswordFulfillment("One lowercase letter");
    })

    it('Fulfill 5 criterias except uppercase letter', () => {
        SignUpPage.inputPassword("ysu1i@aa"); // Without uppercase letter
        SignUpPage.validateOverAllBar(0); // Expect 0% (Weak)
        SignUpPage.validatePasswordFulfillment("One uppercase letter");
    })

    it('Fulfill 5 criterias except number', () => {
        SignUpPage.inputPassword("Ysuii@aa"); // Without number
        SignUpPage.validateOverAllBar(0); // Expect 0% (Weak)
        SignUpPage.validatePasswordFulfillment("One number");
    })

    it('Fulfill 5 criterias except 8 characters', () => {
        SignUpPage.inputPassword("Ysu1I@A"); // Less than 8 characters
        SignUpPage.validateOverAllBar(25); // Expect 25% (Weak)
        SignUpPage.validatePasswordFulfillment("At least 8 characters");
    })

    it('Fulfill 5 criterias except special characters', () => {
        SignUpPage.inputPassword("Ysu1IaaA"); // Without special characters
        SignUpPage.validateOverAllBar(25); // Expect 25% (Weak)
        SignUpPage.validatePasswordFulfillment("One special character");
    })

    it('Fulfill 5 criterias except no empty space', () => {
        SignUpPage.inputPassword("Ysu1I@ A"); // Without no empty space
        SignUpPage.validateOverAllBar(50); // Expect 50% (Average)
        SignUpPage.validatePasswordFulfillment("No empty space");
    })

    it('Fulfill all criterias with 8 characters', () => {
        SignUpPage.inputPassword("Ysu1I@Aa");
        SignUpPage.validateOverAllBar(50); // Expect 50% (Average)
        SignUpPage.feedbackSuggestionIsExist();
    })

    it('Fulfill all criterias with 9 characters', () => {
        SignUpPage.inputPassword("Ysu1I@Aa2");
        SignUpPage.validateOverAllBar(75); // Expect 75% (Strong)
    })

    it('Fulfill all criterias with 11 characters', () => {
        SignUpPage.inputPassword("Ysu1I@Aa2#a");
        SignUpPage.validateOverAllBar(100); // Expect 100% (Very Strong)
    })

})

describe('Password Behavior', () => {

    beforeEach(() => {
        cy.visit("/signup");
        SignUpPage.inputEmail("ethnicperri@awgarstone.com");
    })

    it('Seen & unseen pasword', () => {
        SignUpPage.inputPassword("@Yih sq");
        SignUpPage.seePassword();
        SignUpPage.unseePassword();
    })

    // Skip because haven't find the working way to perform copy to clipboard yet
    it.skip('Copyable when pasword seen', () => {
        SignUpPage.inputPassword("@Yihsq");
        SignUpPage.seePassword();
        SignUpPage.txtFieldPassword.dblclick().type('{cmd}c'); // Command not working
        CommonPage.validateClipboard("@Yihsq", true)
    })

    it.skip('Uncopyable when pasword unseen', () => {
        SignUpPage.inputPassword("@Yihsq");
        SignUpPage.txtFieldPassword.dblclick().type('{cmd}c'); // Command not working
        CommonPage.validateClipboard("@Yihsq", false)
    })
})

describe('Hyperlink', () => {

    beforeEach(() => {
        cy.visit("/signup");
    })

    it('Terms of use', () => {
        SignUpPage.buttonTermsOfUse.should('have.attr', 'href', '/terms');
        SignUpPage.buttonTermsOfUse.invoke('removeAttr', 'target').click();
        cy.location('href').then((url) => {
            url.should('include', 'https://autobahn-security.com/')
        })
    })

    it('Privacy policy', () => {
        SignUpPage.buttonPrivacyPolicy.should('have.attr', 'href', '/privacy');
        SignUpPage.buttonPrivacyPolicy.invoke('removeAttr', 'target').click();
        cy.location('href').then((url) => {
            url.should('include', 'https://autobahn-security.com/')
        })
    })

    it('Log in', () => {
        SignUpPage.buttonLogIn.should('have.attr', 'href', '/login');
        SignUpPage.buttonLogIn.invoke('removeAttr', 'target').click();
        cy.url().should('include', '/login');
    })
})
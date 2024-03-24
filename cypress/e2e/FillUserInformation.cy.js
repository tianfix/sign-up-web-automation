/// <reference types="cypress" />
import SignUpPage from '../pages/SignUp';
import UserInformationPage from '../pages/UserInformation';
import CommonPage from '../pages/Common';

describe('Fill User Information', () => {

    beforeEach(() => {
        cy.visit("/signup");
        SignUpPage.inputEmail("ethnicperri@awgarstone.com");
        SignUpPage.inputPassword("@Y102bas31308");
        SignUpPage.buttonSignUp.click();
        CommonPage.loadingAnimationIsExist();
        cy.wait(4000)
    })

    it('Valid user data', () => {
        UserInformationPage.inputFirstName("Jacob");
        UserInformationPage.inputLastName("Seeler");
        UserInformationPage.chooseIndustry("Commercial Services");
        UserInformationPage.chooseCountryCode("id", "62");
        UserInformationPage.inputPhoneNumber("812093124");
        UserInformationPage.buttonStartUsing.click();
        //No further scenario because web always throw error after click the button
        
    })

    it('Mandatory Field and Invalid Data', () => {
        // Mandatory First Name
        UserInformationPage.txtFieldFirstName.click();
        UserInformationPage.txtFieldLastName.click();
        CommonPage.validateErrMsg("Field cannot be empty");

        // Mandatory Last Name
        UserInformationPage.txtFieldFirstName.type("Jacob");
        CommonPage.validateErrMsg("Field cannot be empty");

        // Mandatory Industry
        UserInformationPage.dropDownIndustry.click();
        UserInformationPage.txtFieldLastName.click();
        UserInformationPage.inputLastName("Seeler");
        CommonPage.validateErrMsg("Field cannot be empty");

        // Invalid Phone Number
        UserInformationPage.chooseIndustry("Commercial Services");
        UserInformationPage.chooseCountryCode("id", "62");
        UserInformationPage.inputPhoneNumber("21");
        CommonPage.validateErrMsg("Please enter a valid phone number");
        UserInformationPage.startUsingButtonIsNotClickable();

    })
})
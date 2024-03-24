class UserInformation {

    inputFirstName(firstName) {
        this.txtFieldFirstName.type(firstName);
    }

    inputLastName(lasName) {
        this.txtFieldLastName.type(lasName);
    }

    chooseCountryCode(countryCode, dialCode) {
        this.dropDownCountry.click();
        cy.xpath(`//*[@data-country-code="${countryCode}"]`).click()
        cy.xpath(`//*[@data-country-code="${countryCode}"]`).should('have.attr', 'data-dial-code', `${dialCode}`)
    }

    inputPhoneNumber(phoneNumber) {
        this.txtFieldPhoneNumber.type(phoneNumber)
    }

    chooseIndustry(industry) {
        this.dropDownIndustry.click();
        cy.xpath(`//*[contains(text(),'${industry}')]`).click();
    }

    startUsingButtonIsNotClickable() {
        this.buttonStartUsing.should('have.class', 'unclickable');
    }
    
    get txtFieldFirstName() {
        return cy.xpath("//*[@name='first-name']");
    }

    get txtFieldLastName() {
        return cy.xpath("//*[@name='last-name']");
    }

    get txtFieldPhoneNumber() {
        return cy.xpath("//*[@name='phone-number']");
    }

    get dropDownIndustry() {
        return cy.xpath("//*[@name='industry']");
    }

    get dropDownCountry() {
        return cy.get('.iti__selected-flag')
    }

    get buttonStartUsing() {
        return cy.get('.primary')
    }
}

module.exports = new UserInformation()
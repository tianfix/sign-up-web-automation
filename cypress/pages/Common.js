/// <reference types="cypress" />
require('cypress-xpath');

class Common {

    validateErrMsg(message) {
        cy.xpath(`//*[contains(text(),'${message}')]`).should('exist');
    }

    validateClipboard(inputPassword, equal) {

        switch (equal) {
            case true:
                cy.window().then((win) => {
                    win.navigator.clipboard.readText().then((text) => {
                        expect(text).to.eq(inputPassword);
                    });
                });
                break;
            case false:
                cy.window().then((win) => {
                    win.navigator.clipboard.readText().then((text) => {
                        expect(text).not.eq(inputPassword);
                    });
                });
                break;
        }


    }

    loadingAnimationIsExist() {
        this.animationLoading.should('exist')
    }

    get animationLoading() {
        return cy.get('.spinner')
    }

}

module.exports = new Common()
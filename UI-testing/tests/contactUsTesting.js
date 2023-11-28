module.exports = {
    'contact us form is started properly without alerts and accessible to the user'(browser) {

        browser.page.contact_us()
            .navigate()
            .assert.title('Contact us - My Store')
            .assert.elementPresent('@form')
            .assert.visible('@form')
            .assert.not.elementPresent('@errorPanel')
            .assert.not.elementPresent('@successPanel')
    },

    'empty form submission should raise an error that is visible to the user' (browser) {

        browser.page.contact_us()
            .navigate()
            .click('@submitButton')
            .waitForElementPresent('@errorPanel')
            .expect.element('@errorPanel').to.be.visible;
            // .clearValue('@Email')
            // .clearValue('@orderRef')
            // .clearValue('@attachedFile')
            // .clearValue('@message')

    },

    // 'if user only selects the subject heading, raise 2 errors (email and msg required)' (browser) {
    //     browser.page.contact_us()
    //         .navigate()
    //         .setSubjectHeadingOption(1)
    //         .click('@submit')
    //         .waitForElementPresent('@errorPanel')
    //         .expect.elements('@errorText').count.to.be.equal(2)
    // },

    // 'if user only enters a valid email, raise an error (Invalid email address)'

    // ''
    // 'form containing only invalid email should return an error (Invalid email address)'

    // 'form containing only invalid email should return an error (message cannot be blank)'

    // // ''
}
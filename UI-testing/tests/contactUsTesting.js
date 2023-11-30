module.exports = {
    beforeEach: function (browser) {
        browser.page.contact_us()
            .navigate()
    },
    'contact-us form should be started properly without alerts and accessible to the user'(browser) {

        browser.page.contact_us()
            .assert.title('Contact us - My Store')
            .assert.elementPresent('@form')
            .assert.visible('@form')
            .assert.not.elementPresent('@errorPanel')
            .assert.not.elementPresent('@successPanel')
    },

    'empty Form submission should display an error that is visible to the user' (browser) {

        browser.page.contact_us()
            .clearValue('@email')
            .clearValue('@orderRef')
            .clearValue('@attachedFile')
            .clearValue('@message')
            .select_subject_heading(0)
            .click('@submitButton')
            .waitForElementPresent('@errorPanel')
            .expect.element('@errorPanel').to.be.visible;
    },
    'should submit successfully when the user enters required fields (subject heading, email and message)' (browser) {

        browser.page.contact_us()
            .select_subject_heading(1)
            .setValue('@email', 'ahmedbadra@uni.co')
            .setValue('@message', "placeholder")
            .click('@submitButton')
            .waitForElementPresent('@successPanel')
            .expect.element('@successPanel').to.be.visible
    },
    'should fail to submit if user only selects the subject heading attempt to submit, display 2 errors (email and msg required)' (browser) {

        browser.page.contact_us()
            .select_subject_heading(1)
            .click('@submitButton')
            .waitForElementPresent('@errorPanel')
            .assert.visible('@errorPanel')
            .expect.elements('@errorText').count.to.be.equal(2)
    },

    'should fail to submit if user only enters an email, display 2 errors (for the missing required fields)' (browser) {

        browser.page.contact_us()
            .setValue('@email', 'ahmed.mohamed@gmail.com')
            .click('@submitButton')
            .waitForElementPresent('@errorPanel')
            .assert.visible('@errorPanel')
            .expect.elements('@errorText').count.to.be.equal(2)
    },

    'should fail to submit if user only enters invalid email, display 3 errors (2 missing fields and 1 invalid field)' (browser) {

        browser.page.contact_us()
            .setValue('@email', 'ahmed.mohamed@gmail')
            .click('@submitButton')
            .waitForElementPresent('@errorPanel')
            .assert.visible('@errorPanel')
            .expect.elements('@errorText').count.to.be.equal(3)   
    },

    'should submit successfully when selecting a valid text file type' (browser) {

        browser.page.contact_us()
            .select_subject_heading(1)
            .updateValue('@email', 'ahmedbadra@uni.co')
            .updateValue('@message', "placeholder")
            .upload_file('/../upload/txt-type.txt')
            .click('@submitButton')
            .waitForElementPresent('@successPanel')
            .expect.element('@successPanel').to.be.visible
    },

    'should submit successfully when selecting a valid word file type' (browser) {

        browser.page.contact_us()
            .select_subject_heading(1)
            .updateValue('@email', 'ahmedbadra@uni.co')
            .updateValue('@message', "placeholder")
            .upload_file('/../upload/word-type.docx')
            .click('@submitButton')
            .waitForElementPresent('@successPanel')
            .expect.element('@successPanel').to.be.visible
    },

    'should fail to submit when selecting an invalid javascript file type' (browser) {

        browser.page.contact_us()
            .select_subject_heading(1)
            .updateValue('@email', 'ahmedbadra@uni.co')
            .updateValue('@message', "placeholder")
            .upload_file('/../upload/js-type.js')
            .click('@submitButton')
            .waitForElementPresent('@errorPanel')
            .expect.element('@errorPanel').to.be.visible
    },

    'should fail to submit when selecting an invalid exe file type' (browser) {

        browser.page.contact_us()
            .select_subject_heading(1)
            .updateValue('@email', 'ahmedbadra@uni.co')
            .updateValue('@message', "placeholder")
            .upload_file('/../upload/exe-type.exe')
            .click('@submitButton')
            .waitForElementPresent('@errorPanel')
            .expect.element('@errorPanel').to.be.visible
    },

    'should submit successfully even when missing the file' (browser) {

        browser.page.contact_us()
            .select_subject_heading(1)
            .updateValue('@email', 'ahmedbadra@uni.co')
            .updateValue('@message', "placeholder")
            .updateValue('@orderRef', '23-1181-T')
            .click('@submitButton')
            .waitForElementPresent('@successPanel')
            .expect.element('@successPanel').to.be.visible
    },

    'should submit successfully when filling all the fields with valid data' (browser) {

        browser.page.contact_us()
            .select_subject_heading(1)
            .updateValue('@email', 'ahmedbadra@uni.co')
            .updateValue('@orderRef', '23-1181-T')
            .upload_file('/../upload/txt-type.txt')
            .updateValue('@message', "placeholder")
            .click('@submitButton')
            .waitForElementPresent('@successPanel')
            .expect.element('@successPanel').to.be.visible
    },

    'should fail to submit when filling all the fields with valid data except email is invalid' (browser) {

        browser.page.contact_us()
            .select_subject_heading(1)
            .updateValue('@email', 'ahmedbadra@fdasg')
            .updateValue('@orderRef', '23-1181-T')
            .upload_file('/../upload/txt-type.txt')
            .updateValue('@message', "placeholder")
            .click('@submitButton')
            .waitForElementPresent('@errorPanel')
            .assert.visible('@errorPanel')
            .expect.element('@errorPanel').text.to.contain('Invalid email address')
            
    },

    'should fail to submit when missing subject heading selection' (browser) {

        browser.page.contact_us()
            .select_subject_heading(0)
            .updateValue('@email', 'ahmedbadra@gmail.com')
            .updateValue('@orderRef', '23-1181-T')
            .upload_file('/../upload/txt-type.txt')
            .updateValue('@message', "placeholder")
            .click('@submitButton')
            .waitForElementPresent('@errorPanel')
            .assert.visible('@errorPanel')
            .expect.element('@errorPanel').text.to.contain('Please select a subject')
    },

    'should fail to submit when missing email' (browser) {

        browser.page.contact_us()
            .select_subject_heading(2)
            .updateValue('@orderRef', '23-1181-T')
            .upload_file('/../upload/txt-type.txt')
            .updateValue('@message', "placeholder")
            .click('@submitButton')
            .waitForElementPresent('@errorPanel')
            .assert.visible('@errorPanel')
            .expect.element('@errorPanel').text.to.contain('Invalid email address')
    },

    'should submit successfully when missing order reference' (browser) {

        browser.page.contact_us()
            .select_subject_heading(2)
            .updateValue('@email', 'ahmedbadra@uni.co')
            .upload_file('/../upload/txt-type.txt')
            .updateValue('@message', "placeholder")
            .click('@submitButton')
            .waitForElementPresent('@successPanel')
            .expect.element('@successPanel').to.be.visible
    },

    'should fail to submit when missing message' (browser) {

        browser.page.contact_us()
            .select_subject_heading(2)
            .updateValue('@email', 'ahmedbadra@uni.co')
            .updateValue('@orderRef', '23-1181-T')
            .upload_file('/../upload/txt-type.txt')
            .click('@submitButton')
            .waitForElementPresent('@errorPanel')
            .assert.visible('@errorPanel')
            .expect.element('@errorPanel').text.to.contain('The message cannot be blank')
    },

    afterEach: function (browser) {
        browser.end();
    }
}
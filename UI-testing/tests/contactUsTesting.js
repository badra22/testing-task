module.exports = {
    'contact us form is loaded and accessible to the user'(browser) {
        const contactUs = browser.page.contact_us();

        contactUs
            .navigate()
            .assert.title('Contact us - My Store')
            .assert.visible('@form')
    }
}
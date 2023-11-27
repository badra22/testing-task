module.exports = {
    url: 'http://automationpractice.multiformis.com/index.php?controller=contact',
    elements: {
        form: {
            selector: 'form'
        },
        subjectHeading: {
            selector: '#id_contact'
        },
        Email: {
            selector: '#email'
        },
        orderRef: {
            selector: '#id_order'
        },
        attachedFile: {
            selector: '#fileUpload'
        },
        attachedFileName: {
            selector: '.filename'
        },
        message: {
            selector: '#message'
        },

        submitButton: {
            selector: 'input[name="contactKey"]'
        }
    }
}
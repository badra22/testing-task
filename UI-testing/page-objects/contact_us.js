const formCommands = {

    select_subject_heading: function (value) {
        if(value < 3){
            return this.click('@subjectHeading').click(`#id_contact option[value="${value}"]`)
        }
        return this
    },

    upload_file: function (dir) {
        return this.waitForElementPresent('@attachedFile')
                    .uploadFile('@attachedFile', require('path').resolve(__dirname + dir))
    }
}

module.exports = {
    url: 'http://automationpractice.multiformis.com/index.php?controller=contact',
    commands: [formCommands],
    elements: {
        form: {
            selector: 'form'
        },
        subjectHeading: {
            selector: '#id_contact'
        },
        email: {
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
        errorPanel: {
            selector: '.alert-danger'
        },
        errorText: {
            selector: '.alert-danger ol li'
        },
        successPanel: {
            selector: '.alert-success'
        },
        submitButton: {
            selector: 'button[name="submitMessage"]'
        }
    }
}
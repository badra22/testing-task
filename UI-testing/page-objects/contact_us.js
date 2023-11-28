const formCommands = {

    setSubjectHeadingOption: function (value) {
        if(value < 3){
            return this.getText(`@subjectHeading.option[value="${value}"]`, function (result) {
                return this.setText('@subjectHeading', result.value);
            });
        }
        return this.setText('@subjectHeading', 0);
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
        errorPanel: {
            selector: '.alert-danger'
        },
        errorText: {
            selector: '.alert-danger.ol.li'
        },
        successPanel: {
            selector: '.alert-success'
        },
        submitButton: {
            selector: 'button[name="submitMessage"]'
        }
    }
}
class Form {

    constructor(fields) {
        this.fields = fields
        this.valid = true
        this.submited = false
        this.countErrors = 0
    }

    formValidate() {
        this.countErrors = 0

        for (let field in this.fields) {
            if (this.fields[field].validations && this.fields[field].hasError()) {

                this.countErrors++

            }
        }

        return this.valid = this.countErrors > 0 ? false : true
    }

    removeField(removedField) {
        for (var field in this.fields) {
            if (field === removedField) delete this.fields[field]
        }
    }

}

export default Form
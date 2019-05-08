import validationsMessages from './jsons/validationsMessages'
import validateEmail from './scripts/validateEmail'

class FormField {

    constructor(validations = {}, value = '') {
        this.value = value
        this.validations = validations
        this.error = false
        this.errorMessage = ''
    }

    hasError() {
        if (this.validations.required) {
            if (this.value && this.value.toString().length > 0) {

                this.error = false

            } else {

                this.error = true
                return this.error

            }
        }

        if (this.validations.minLength) {
            if (this.value.toString().length >= this.validations.minLength) {

                this.error = false

            } else {

                this.error = true
                return this.error
                
            }
        }

        if (this.validations.email) {
            const emailIsValid = validateEmail(this.value)

            if (emailIsValid) {

                this.error = false

            } else {

                this.error = true
                return this.error
                
            }
        }

        if (this.validations.equals) {
            if (this.value.toString() === this.validations.equals.value.toString()) {

                this.error = false

            } else {

                this.error = true
                return this.error

            }
        }

        return this.error = false
    }

    getErrorMessage() {
        if (this.validations.required) {
            if (!this.value) {

                this.errorMessage = validationsMessages.required
                return this.errorMessage

            }
        }

        if (this.validations.minLength) {
            if (this.value.toString().length < this.validations.minLength) {

                this.errorMessage = `${ validationsMessages.minLength } ${ this.validations.minLength }`
                return this.errorMessage

            }
        }

        if (this.validations.email) {
            const emailIsValid = validateEmail(this.value)

            if (!emailIsValid) {
                
                this.errorMessage = validationsMessages.email
                return this.errorMessage

            }
        }

        if (this.validations.equals) {
            if (this.value.toString() !== this.validations.equals.value.toString()) {

                this.errorMessage = validationsMessages.equals
                return this.errorMessage

            }
        }

        return this.errorMessage = ''
    }

    reset(field = {}) {
        this.value = field.value || ''
        this.validations = field.validations || {}
        this.error = field.error || false
        this.errorMessage = field.errorMessage || ''
    }
}

export default FormField
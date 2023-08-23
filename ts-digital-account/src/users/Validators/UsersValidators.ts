import { UsersErrors } from "../UsersErrors"
import { cpf as cpfValidator } from 'cpf-cnpj-validator';

export class UserValidator{
    static emailValidatorRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    static birthdayFormatValidatorRegex = /^\d{4}\/\d{2}\/\d{2}$/
    static allDigitsValidatorRegex = /^\d+$/
    static nameValidatorRegex = /^[a-zA-Z-' ]+$/

    static validateCpf(cpf:string) {
        if (!cpfValidator.isValid(cpf)) {
            throw new Error(UsersErrors.errors.INVALID_CPF)
        }

        if (!this.allDigitsValidatorRegex.test(cpf)) {
            throw new Error(UsersErrors.errors.INVALID_CPF)
        }
    }

    static validateName(name:string) {
        const nameLength = name.length

        if (!(nameLength >= 3 && nameLength <= 30)) {
            throw new Error(UsersErrors.errors.INVALID_NAME)
        }

        if (!this.nameValidatorRegex.test(name)) {
            throw new Error(UsersErrors.errors.INVALID_NAME)
        }
    }

    static validateEmail(email:string) {
        if (!this.emailValidatorRegex.test(email)) {
            throw new Error(UsersErrors.errors.INVALID_EMAIL)
        }
        return true
    }

    static validateBirthday(birthday:string) {
        if (!this.birthdayFormatValidatorRegex.test(birthday)) {
            throw new Error(UsersErrors.errors.INVALID_BIRTHDAY)
        }

        // YYYY-MM-DD
        const parts = birthday.split('/')
        const year = parseInt(parts[0], 10)
        const month = parseInt(parts[1], 10) - 1
        const day = parseInt(parts[2], 10)

        if (isNaN(year) || isNaN(month) || isNaN(day)) {
            throw new Error(UsersErrors.errors.INVALID_BIRTHDAY)
        }

        const date = new Date(year, month, day)

        if (
            date.getFullYear() !== year ||
            date.getMonth() !== month ||
            date.getDate() !== day
        ) {
            throw new Error(UsersErrors.errors.INVALID_BIRTHDAY)
        }
    }
}
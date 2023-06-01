const { cpf: cpfValidator } = require('cpf-cnpj-validator');

class PersonValidator {
    static emailValidatorRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    static birthdayFormatValidatorRegex = /^\d{4}\/\d{2}\/\d{2}$/;
    static allDigitsValidatorRegex = /^\d+$/;
    static nameValidatorRegex = /^[a-zA-Z-' ]+$/;

    static validateCpf(cpf) {
        if (!cpfValidator.isValid(cpf)) {
            throw new Error('Error: Invalid CPF');
        }
        
        if (!this.allDigitsValidatorRegex.test(cpf)) {
            throw new Error('Error: CPF must contain only numbers');
        }
    }

    static validateName(name) {
        const nameLength = name.length;
        
        if (!(nameLength >= 3 && nameLength <= 30)) {
            throw new Error('Error: name invalid number of characters');
        }

        if (!(this.nameValidatorRegex.test(name))) {
            throw new Error('Error: name invalid characters');
        }
    }

    static validateEmail(email) {
        return this.emailValidatorRegex.test(email)
    }

    static validateBirthday(birthday) {
        if (!this.birthdayFormatValidatorRegex.test(birthday)) {
            throw new Error('Error: Invalid birthday format');
        }
        
        const parts = birthday.split('/');
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        
        if (isNaN(year) || isNaN(month) || isNaN(day)) {
            throw new Error('Error: invalid characters');
        }
        
        const date = new Date(year, month, day);
        
        if (
            date.getFullYear() !== year ||
            date.getMonth() !== month ||
            date.getDate() !== day
        ) {
            throw new Error('Error: Invalid date');
        }
    }

}

module.exports = PersonValidator
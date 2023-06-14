class CustomersErrors {
    static errors = {
        INVALID_EMAIL: 'Invalid email',
        INVALID_NAME: 'Invalid name',
        INVALID_CPF: 'Invalid CPF',
        INVALID_BIRTHDAY: 'Invalid birthday',

        ALREADY_REGISTERED_CPF: 'CPF já registrado. Pare de tentar.',
        ALREADY_REGISTERED_NAME: 'Name already registered',
        ALREADY_REGISTERED_EMAIL: 'Email already registered CPF',
    }
}

module.exports = CustomersErrors

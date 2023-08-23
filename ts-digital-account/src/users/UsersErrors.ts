export class UsersErrors {
    static errors = {
        INVALID_EMAIL: 'Invalid email',
        INVALID_NAME: 'Invalid name',
        INVALID_CPF: 'Invalid CPF',
        INVALID_BIRTHDAY: 'Invalid birthday',

        ALREADY_REGISTERED_CPF: 'CPF already registered',
        ALREADY_REGISTERED_NAME: 'Name already registered',
        ALREADY_REGISTERED_EMAIL: 'Email already registered CPF',
        ALREADY_REGISTERED_DATA: 'Data already registered',

        USER_NOT_FOUND: "User not found",
        CPF_NOT_FOUND: "CPF not found",
        REQUIRED_FIELDS: "You need to fill all required fields",
        

        INTERNAL_SERVER_ERROR: "Internal Server Error",
    }
}
const CustomersErrors = require('./customers.errors')

class CustomersRepository {
    constructor(databaseConnection) {
        this.databaseConnection = databaseConnection
        // this.customerDatabase = require('../database.js')
        // this.customerDatabase = require('../models/connections');
    }

    checkIfNameAlreadyExists(customerWithId) {
        const nameExistingData = this.customerDatabase.some(
            (customer) => customer.name === customerWithId.name
        )

        if (nameExistingData) {
            throw new Error(CustomersErrors.errors.ALREADY_REGISTERED_CPF)
        }
    }

    checkIfCpfAlreadyExists(customerWithId) {
        const CPFExistingData = this.customerDatabase.some(
            (customer) => customer.cpf === customerWithId.cpf
        )
        if (CPFExistingData) {
            throw new Error(CustomersErrors.errors.INVALID_CPF)
        }
    }

    CheckIfEmailAlreadyExists(customerWithId) {
        const emailExistingData = this.customerDatabase.some(
            (customer) => customer.email === customerWithId.email
        )
        if (emailExistingData) {
            throw new Error(CustomersErrors.errors.INVALID_EMAIL)
        }
    }

    async insert(customerToBeCreated) {
        const { cpf, name, birthday, email } = customerToBeCreated

        const insertQuery = `INSERT INTO personal_info (cpf, name, birthday, email) VALUES ('${cpf}', '${name}', '${birthday}', '${email}')`
        const databaseResponse = await this.databaseConnection.query(
            insertQuery
        )

        const readQuery = `SELECT * FROM personal_info WHERE id = ${databaseResponse[0].insertId}`
        const [rows, fields] = await this.databaseConnection.query(readQuery)
        return rows

        // const id = this.customerDatabase.length + 1
        // const customerWithId = { ...customerToBeCreated, id }

        // this.checkIfNameAlreadyExists(customerWithId)
        // this.checkIfCpfAlreadyExists(customerWithId)
        // this.CheckIfEmailAlreadyExists(customerWithId)

        // this.customerDatabase.push(customerWithId)
        // return customerWithId
    }

    findByCPF(cpf) {
        return this.customerDatabase.find((customer) => customer.cpf === cpf)
    }

    delete(cpf) {
        this.customerDatabase = this.customerDatabase.filter(
            (customer) => customer.cpf !== cpf
        )
        return this.customerDatabase
    }

    updateByCPF(cpf, updatedCustomer) {
        const customerIndex = this.customerDatabase.findIndex(
            (customer) => customer.cpf === cpf
        )

        if (customerIndex === -1) {
            throw new Error(CustomersErrors.errors.USER_NOT_FOUND)
        }

        const customer = this.customerDatabase[customerIndex]

        this.checkNameModifyData(updatedCustomer, customer)
        this.checkEmailModifyData(updatedCustomer, customer)

        const updatedCustomerData = Object.assign({}, customer, updatedCustomer)

        this.customerDatabase[customerIndex] = updatedCustomerData

        return updatedCustomerData
    }

    checkNameModifyData(updatedCustomer, currentCustomer) {
        const nameExistingData = this.customerDatabase.some(
            (customer) =>
                customer.name === updatedCustomer.name &&
                customer.id !== currentCustomer.id
        )

        if (nameExistingData) {
            throw new Error(CustomersErrors.errors.ALREADY_REGISTERED_NAME)
        }
    }

    checkEmailModifyData(updatedCustomer, currentCustomer) {
        const emailExistingData = this.customerDatabase.some(
            (customer) =>
                customer.email === updatedCustomer.email &&
                customer.id !== currentCustomer.id
        )

        if (emailExistingData) {
            throw new Error(CustomersErrors.errors.ALREADY_REGISTERED_EMAIL)
        }
    }
}

module.exports = CustomersRepository

const CustomersErrors = require('./customers.errors')

class CustomersRepository {
    constructor() {
        this.customerDatabase = require('../database.js')
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

    insert(customerToBeCreated) {
        const id = this.customerDatabase.length + 1
        const customerWithId = { ...customerToBeCreated, id }

        this.checkIfNameAlreadyExists(customerWithId)
        this.checkIfCpfAlreadyExists(customerWithId)
        this.CheckIfEmailAlreadyExists(customerWithId)

        this.customerDatabase.push(customerWithId)
        return customerWithId
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
            throw new Error('Error: Customer not found.')
        }

        const customer = this.customerDatabase[customerIndex]

        try {
            this.checkNameModifyData(updatedCustomer, customer)
            this.checkEmailModifyData(updatedCustomer, customer)

            const updatedCustomerData = Object.assign(
                {},
                customer,
                updatedCustomer
            )

            this.customerDatabase[customerIndex] = updatedCustomerData

            return updatedCustomerData
        } catch (error) {
            throw new Error(`Error: ${error.message}`)
        }
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

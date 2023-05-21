class CustomersRepository {
    insert(customerToBeCreated) {
        const id = this.customerDatabase.length + 1

        const customerWithId = {...customerToBeCreated, id}
        this.customerDatabase.push(customerWithId)
        return customerWithId
    }

    findByCPF(cpf) {
        return this.customerDatabase.find( customer => customer.cpf === cpf )
    }
}

module.exports = CustomersRepository
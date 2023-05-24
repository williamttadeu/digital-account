
class CustomersRepository {
    constructor() {
        this.customerDatabase = require('../database.js');
    }

    insert(customerToBeCreated) {
        const id = this.customerDatabase.length + 1
        //spread operator
        const customerWithId = {...customerToBeCreated, id}
        this.customerDatabase.push(customerWithId)
        return customerWithId
    }

    findByCPF(cpf) {
        return this.customerDatabase.find( customer => customer.cpf === cpf )
    }

    delete(customerToBeDeleted){
        const {cpf} = customerToBeDeleted;
        this.customerDatabase = this.customerDatabase.filter(customer => customer.cpf !== cpf);
        return this.customerDatabase;
    }
}

module.exports = CustomersRepository
class CustomersService {
    constructor(customerRepository) {
        this.customerRepository = customerRepository
    }

    createCustomer(customerToBeCreated) {
        // Antes de inserir no banco, verificar se está negativado na SPC
        return this.customerRepository.insert(customerToBeCreated)
    }

    findCustomerByCPF(cpf) {
        return this.customerRepository.findByCPF(cpf)
    }
}

module.exports = CustomersService
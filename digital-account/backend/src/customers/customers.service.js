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

    deleteCustomer(cpf) {
        return this.customerRepository.delete(cpf)
    }

    updateCustomerByCPF(cpf, name, email, birthday) {
        const updatedCustomer = {name,email,birthday,};
        return this.customerRepository.updateByCPF(cpf, updatedCustomer);
    }
    
}

module.exports = CustomersService
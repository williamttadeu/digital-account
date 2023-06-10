const PersonValidator = require('./validators/person.validator')

class CustomersService {
    constructor(customerRepository) {
        this.customerRepository = customerRepository
    }

    createCustomer(customerToBeCreated) {
        const { name, cpf, email, birthday } = customerToBeCreated;
        try {
            PersonValidator.validateCpf(cpf);
            if (!PersonValidator.validateEmail(email)) {
                throw new Error('Bad Request: Invalid email');
            }
            PersonValidator.validateBirthday(birthday);
            PersonValidator.validateName(name);
    
            // Antes de inserir no banco, verificar se está negativado na SPC
            return this.customerRepository.insert(customerToBeCreated);
        } catch (error) {
            throw error;
        }
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
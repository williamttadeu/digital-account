class CustomersRepository {
    constructor() {
        this.customerDatabase = require('../database.js');
    }

    insert(customerToBeCreated) {
        try {
            const id = this.customerDatabase.length + 1;
            const customerWithId = {...customerToBeCreated, id};

            checkNameExistingData(customerWithId, this.customerDatabase);
            CPFExistingData(customerWithId, this.customerDatabase);
            emailExistingData(customerWithId, this.customerDatabase);
            
            this.customerDatabase.push(customerWithId);
            return customerWithId;
            
          } catch (error) {
            console.error('Error:', error.message);
            
          }
    }

    findByCPF(cpf) {
        return this.customerDatabase.find( customer => customer.cpf === cpf )
    }

    delete(cpf){
        this.customerDatabase = this.customerDatabase.filter(customer => customer.cpf !== cpf);
        return this.customerDatabase;
    }

    updateByCPF(cpf, updatedCustomer) {
        const customerIndex = this.customerDatabase.findIndex((customer) => customer.cpf === cpf);
      
        if (customerIndex === -1) {
          throw new Error('Error: Customer not found.');
        }
      
        const customer = this.customerDatabase[customerIndex];
      
        try {
            checkNameModifyData(updatedCustomer, this.customerDatabase, customer);
            checkEmailModifyData(updatedCustomer, this.customerDatabase, customer);
        
            const updatedCustomerData = Object.assign({}, customer, updatedCustomer);
        
            this.customerDatabase[customerIndex] = updatedCustomerData;
        
            return updatedCustomerData;
          } catch (error) {
            throw new Error(`Error: ${error.message}`);
          }
        }

    
}

module.exports = CustomersRepository;

checkNameExistingData=(customerWithId, customerDatabase)=> {
    const nameExistingData = customerDatabase.some(
        (customer) => customer.name === customerWithId.name
    );
    if (nameExistingData) {
        throw new Error('Error: Name already registered.');
    }
}

CPFExistingData=(customerWithId, customerDatabase) =>{
    const CPFExistingData = customerDatabase.some(
        (customer) => customer.cpf === customerWithId.cpf
    );
    if (CPFExistingData) {
        throw new Error('Error: CPF already registered.');
    }
}

emailExistingData=(customerWithId, customerDatabase) =>{
    const emailExistingData = customerDatabase.some(
        (customer) => customer.email === customerWithId.email
    );
    if (emailExistingData) {
        throw new Error('Error: E-mail already registered.');
    }
}

checkNameModifyData = (updatedCustomer, customerDatabase, currentCustomer) => {
    const nameExistingData = customerDatabase.some(
      (customer) =>
        customer.name === updatedCustomer.name && customer.id !== currentCustomer.id
    );
  
    if (nameExistingData) {
      throw new Error('Error: Name already registered.');
    }
  };
  
  checkEmailModifyData = (updatedCustomer, customerDatabase, currentCustomer) => {
    const emailExistingData = customerDatabase.some(
      (customer) =>
        customer.email === updatedCustomer.email && customer.id !== currentCustomer.id
    );
  
    if (emailExistingData) {
      throw new Error('Error: E-mail already registered.');
    }
  };
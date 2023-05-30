const { cpf: numeroCPF } = require('cpf-cnpj-validator');

class CustomersController {
    constructor(customerService) {
        this.customerService = customerService
    }

    async createCustomer(req, res) {
        // Validação da requisição HTTP
        const {name,cpf,email,birthday} = req.body
        
        if(!name || !cpf || !email || !birthday) {
            res.status(400).send('Bad Request')
            return
        }

        try {
            CPFValidation(cpf);
          } catch (error) {
            res.status(400).send(error.message);
            return;
          }

        if (!emailValidation(email)) {
        res.status(400).send('Bad Request: Invalid email')
        return
        }
          
        try {
            birthdayValidation(birthday);
        } catch (error) {
            res.status(400).send(error.message);
            return;
        }

        try {
            nameValidation(name);
        } catch (error) {
            res.status(400).send(error.message);
            return;
        }

       

        // Segurança
        const customerToBeCreated = {name,cpf,email,birthday}
        try {
            const createdCustomer = this.customerService.createCustomer(customerToBeCreated);
            //res.json(createdCustomer);
          } catch (error) {
            res.status(400).send(error.message);
            return;
        }
        
        // Chamar o caso de uso
        const createdCustomer = await this.customerService.createCustomer(customerToBeCreated)
        
        // Responder corretamente
        res.json(createdCustomer)
    }

    async findCustomerByCPF(req, res) {
        const {cpf} = req.params
        const foundCustomer = await this.customerService.findCustomerByCPF(cpf)
        
        if(!foundCustomer) {
            res.status(404).send('Not Found')
        }

        res.json(foundCustomer)
    }

    async deleteCustomer(req, res){
        //const cpf = req.params.cpf;
        const {cpf} = req.params
        const deleteCustomerFromDataBase = await this.customerService.deleteCustomer(cpf)

        if(!deleteCustomerFromDataBase) {
            res.status(500).send('Internal Server Error')
        }
        if(!deleteCustomerFromDataBase) {
            res.status(404).send('Not Found')
        }

        res.json(deleteCustomerFromDataBase)
    }

    async updateCustomerByCPF(req, res) {
        const { cpf } = req.params;
        const { name, email, birthday } = req.body;
    
        if (!name || !email || !birthday) {
            res.status(400).send('Bad Request');
            return;
        }
    
        try { 
            const updatedCustomer = await this.customerService
            .updateCustomerByCPF(cpf, name, email, birthday);
            res.json(updatedCustomer);

        } catch (error) {
            res.status(400).send(error.message);
        }
    }
}


 CPFValidation = (cpf) => {
    if (!numeroCPF.isValid(cpf)) {
      throw new Error('Error: Invalid CPF');
    }
    
    if (!/^\d+$/.test(cpf)) {
      throw new Error('Error: CPF must contain only numbers');
    }
  };

  emailValidation = (email)=> {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  
  birthdayValidation = (birthday) =>{
    const regex = /^\d{4}\/\d{2}\/\d{2}$/;
  
    if (!regex.test(birthday)) {
        throw new Error('Error: Invalid birthday format');
    }
  
    const parts = birthday.split('/');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
  
    if (isNaN(year) || isNaN(month) || isNaN(day)) {
        throw new Error('Error: invalid characters');
    }
  
    const date = new Date(year, month, day);
  
    if (
        date.getFullYear() !== year ||
        date.getMonth() !== month ||
        date.getDate() !== day
    ) {
        throw new Error('Error: Invalid date');
    }
  
  }

  nameValidation =(name) =>{
    const nameLength = name.length;
    
    if (!(nameLength >= 3 && nameLength <= 30)) {
        throw new Error('Error: name invalid number of characters');
    }

    const regex = /^[a-zA-Z-' ]+$/;
    if (!(regex.test(name))) {
        throw new Error('Error: name invalid characters');
      }
  }

module.exports = CustomersController
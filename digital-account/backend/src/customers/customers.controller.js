
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

        // Segurança
        const customerToBeCreated = {name,cpf,email,birthday}
        try {
            const createdCustomer = this.customerService.createCustomer(customerToBeCreated);
            //res.json(createdCustomer);
          } catch (error) {
            /*res.status(400).send(error.message);
            return;*/
            if (error.message === 'Invalid email' || error.message === 'Name already registered.' || error.message === 'CPF already registered.') {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal Server Error' });
            }
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

module.exports = CustomersController
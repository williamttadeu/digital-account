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
        
        // Chamar o caso de uso
        const createdCustomer = this.customerService.createCustomer(customerToBeCreated)
        
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
    
        const customerToUpdate = { name, email, birthday };
        const updatedCustomer = await this.customerService
        .updateCustomerByCPF(cpf, customerToUpdate);
    
        if (!updatedCustomer) {
            res.status(404).send('Not Found');
            return;
        }
    
        res.json(updatedCustomer);
    }
}

module.exports = CustomersController
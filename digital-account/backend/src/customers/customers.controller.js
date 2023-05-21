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
}

module.exports = CustomersController
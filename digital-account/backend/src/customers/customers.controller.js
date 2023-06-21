const CustomersErrors = require('./customers.errors')

class CustomersController {
    constructor(customerService) {
        this.customerService = customerService
    }

    async createCustomer(req, res) {
        // Validação da requisição HTTP
        const { name, cpf, email, birthday } = req.body

        if (!name || !cpf || !email || !birthday) {
            res.status(400).send(CustomersErrors.errors.REQUIRED_FIELDS)
            return
        }

        // Segurança
        const customerToBeCreated = { name, cpf, email, birthday }
        try {
            const createdCustomer = await this.customerService.createCustomer(
                customerToBeCreated
            )
            return res.json(createdCustomer)
        } catch (error) {
            const errorMessages = Object.values(CustomersErrors.errors);

            if (errorMessages.includes(error.message)) {
                return res.status(400).json({ error: error.message });
            }

            if (error.message.includes("Duplicate")) {
                return res.status(400).json(CustomersErrors.errors.ALREADY_REGISTERED_DATA);
            }

            return res.status(500).json(CustomersErrors.errors.INTERNAL_SERVER_ERROR);
            /*
            if (
                error.message === CustomersErrors.errors.INVALID_CPF ||
                error.message === CustomersErrors.errors.INVALID_BIRTHDAY ||
                error.message === CustomersErrors.errors.INVALID_EMAIL ||
                error.message ===
                    CustomersErrors.errors.ALREADY_REGISTERED_NAME ||
                error.message ===
                    CustomersErrors.errors.ALREADY_REGISTERED_EMAIL ||
                error.message === CustomersErrors.errors.ALREADY_REGISTERED_CPF
            ) {
                return res.status(400).json({ error: error.message })
            } if(error.message.includes("Duplicate")){
                return res.status(400).json(CustomersErrors.errors.ALREADY_REGISTERED_DATA)
            }else {
                return res
                    .status(500)
                    .json(CustomersErrors.errors.INTERNAL_SERVER_ERROR)
            }
            */
        }
    }

    async findCustomerByCPF(req, res) {
        const { cpf } = req.params
        const foundCustomer = await this.customerService.findCustomerByCPF(cpf)

        if (!foundCustomer) {
            return res.status(404).send(CustomersErrors.errors.USER_NOT_FOUND)
        }

        res.json(foundCustomer)
    }

    async deleteCustomer(req, res) {
        //const cpf = req.params.cpf;
        const { cpf } = req.params

        try{
            const deleteCustomerFromDataBase =
            await this.customerService.deleteCustomer(cpf)
            res.json("Delete operation completed successfully.")

        }catch(error){
            if(error.message === CustomersErrors.errors.CPF_NOT_FOUND)
            {
                return res.status(400).json({ error: error.message })
            } else {
                return res
                    .status(500)
                    .json(CustomersErrors.errors.INTERNAL_SERVER_ERROR)
            }

        }
    }

    async updateCustomerByCPF(req, res) {
        const { cpf } = req.params
        const { name, email, birthday } = req.body

        if (!name || !email || !birthday) {
            res.status(400).send(CustomersErrors.errors.REQUIRED_FIELDS)
            return
        }

        try {
            const updatedCustomer =
                await this.customerService.updateCustomerByCPF(
                    cpf,
                    name,
                    email,
                    birthday
                )
            res.json(updatedCustomer)
        } catch (error) {
            const errorMessages = Object.values(CustomersErrors.errors);

            if (errorMessages.includes(error.message)) {
                return res.status(400).json({ error: error.message });
            }

            if (error.message.includes("Duplicate")) {
                return res.status(400).json(CustomersErrors.errors.ALREADY_REGISTERED_DATA);
            }

            return res.status(500).json(CustomersErrors.errors.INTERNAL_SERVER_ERROR);
        }
    }
}

module.exports = CustomersController

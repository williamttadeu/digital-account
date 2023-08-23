import { Response } from "express"
import { GetUserRequest, PostUserRequest } from "../ServerInterfaces"
import { UsersErrors } from "./UsersErrors"
import { UsersService } from "./UsersService"


export class UsersController {
    private readonly UsersService: UsersService

    constructor(UsersService: UsersService) {
        this.UsersService = UsersService;
      }

    async createUser(req: PostUserRequest, res: Response) {
        const { name, cpf, email, birthday } = req.body

        if (!name || !cpf || !email || !birthday) {
            res.status(400).send(UsersErrors.errors.REQUIRED_FIELDS)
            return
        }
        const customerToBeCreated = { name, cpf, email, birthday }
        try {
            const createdCustomer = await this.UsersService.createUser(
                customerToBeCreated
            )
            return res.json(createdCustomer)
        } catch (error) {
            const errorObj = error as Error;
            const errorMessages = Object.values(UsersErrors.errors)

            if (errorMessages.includes(errorObj.message)) {
                return res.status(400).json({ error: errorObj.message })
            }

            if (errorObj.message.includes("Duplicate")) {
                return res.status(400).json(UsersErrors.errors.ALREADY_REGISTERED_DATA)
            }

            return res.status(500).json(UsersErrors.errors.INTERNAL_SERVER_ERROR)

        }
    }

    getUserByCPF(req: GetUserRequest, res: Response) {
        const { cpf } =  req.query

        res.send({
            birthday: '',
            cpf,
            email: '',
            name: ''
        })
    }
}
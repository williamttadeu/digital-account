import { Response } from "express";
import { GetUserRequest, PostUserRequest } from "../ServerInterfaces";

export class UsersController {
    createUser(req: PostUserRequest, res: Response) {
        const user = req.body
        res.send(user)
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
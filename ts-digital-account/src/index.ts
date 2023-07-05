// Typescript (linguagem criada em cima do JS) -> Javascript
// TS -> Compila -> JS

import express, { Request, Response } from 'express'
import { GetUserRequest } from './ServerInterfaces'
import { UsersController } from './users/UsersController'

const userController = new UsersController()

const app = express()
app.use(express.json())

const PORT = 3000

app.get('/users', (req: GetUserRequest, res: Response) => {
    // Assume que um query parameter vai ser enviado
    // Query parameter vai ser o CPF
    // GET /users?cpf=XXXXXXXXXX
    return userController.getUserByCPF(req, res)
})

app.post('/users', (req: Request, res: Response) => {
    return userController.createUser(req, res)
})

app.listen(PORT, () => {
    console.log(`Started server at PORT ${PORT}`)
})
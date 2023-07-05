import { Request } from 'express'
import { User } from './users/UsersInterfaces'

// type SomeHandlerRequest = Request<ReqDictionary, ResBody, ReqBody, ReqQuery>
export type GetUserRequest = Request<{}, {}, {}, {cpf: string}>
export type PostUserRequest = Request<{}, {}, User, {}>

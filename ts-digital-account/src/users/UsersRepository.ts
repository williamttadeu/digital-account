
import { UsersErrors } from './UsersErrors'
import { User } from './UsersInterfaces'
import connection from '../models/connections'
import { Pool } from 'mysql2/promise'

export class UsersRepository {

    private readonly databaseConnection: Pool
    private readonly tableName: string

    constructor(databaseConnection: Pool) {
        this.databaseConnection = databaseConnection
        this.tableName = 'personal_info'
      }

      async insert(userToBeCreated: User) {
        const { cpf, name, birthday, email } = userToBeCreated
    
        const insertQuery = `INSERT INTO ${this.tableName} (cpf, name, birthday, email) VALUES (?, ?, ?, ?)`
        const values = [cpf, name, birthday, email]
        await this.databaseConnection.query(insertQuery, values)
    
        const readQuery = `SELECT * FROM ${this.tableName} WHERE id = LAST_INSERT_ID()`
        const [rows] = await this.databaseConnection.query(readQuery)
    
        return rows;
      }
}


const usersRepository = new UsersRepository(connection)

export default usersRepository;
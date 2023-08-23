import { User } from "./UsersInterfaces"
import { UsersRepository } from "./UsersRepository"
import { UserValidator } from "./Validators/UsersValidators"

export class UsersService {

    private readonly UsersRepository: UsersRepository;
    constructor(UsersRepository:UsersRepository) {
        this.UsersRepository = UsersRepository
    }

    async createUser(customerToBeCreated:User) {
        const { name, cpf, email, birthday } = customerToBeCreated

        UserValidator.validateCpf(cpf)
        UserValidator.validateEmail(email)
        // UserValidator.validateBirthday(birthday)
        UserValidator.validateName(name)
        return this.UsersRepository.insert(customerToBeCreated)

        
    }
}

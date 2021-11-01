import { inject, injectable } from "tsyringe";
import { IUserRepository, UserRepository } from "../data/UserRepository";

interface IProfileUserService {
    execute(user_id: string)
}

@injectable()
class ProfileUserService implements IProfileUserService {

    constructor(
        @inject("UserRepository")
        private repository: IUserRepository
    ) {}

    async execute(user_id: string) {

        const user = this.repository.getUserById(user_id);

        return user;
    }
}

export { ProfileUserService, IProfileUserService }
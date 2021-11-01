import { injectable, singleton } from "tsyringe";
import { BaseRepository } from "./BaseRepository";
import prismaClient from "./prisma";

interface IUserRepository {
    getUserById(user_id: string);
    getByGithubId(id);
    create(github_id, login, avatar_url, name);
}

@injectable()
class UserRepository implements BaseRepository, IUserRepository {

    async create(github_id, login, avatar_url, name) {
        await prismaClient.user.create({
            data: {
                github_id,
                login,
                avatar_url,
                name
            }
        })
    }

    async getUserById(user_id: string) {
        return await prismaClient.user.findFirst({
            where: {
                id: user_id,
            }
        })
    }

    async getByGithubId(id) {

        return await prismaClient.user.findFirst({
            where: {
                github_id: id
            }
        })
    }
}

export { UserRepository, IUserRepository }
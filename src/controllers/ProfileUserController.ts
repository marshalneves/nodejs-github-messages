import {Request, Response} from "express";
import { container } from "tsyringe";
import { UserRepository } from "../data/UserRepository";
import { ProfileUserService } from "../services/ProfileUserService";


class ProfileUserController {

    
    async handle(request: Request, response: Response) {
        const { user_id } = request;

        const service = container.resolve(ProfileUserService);
        const result = await service.execute(user_id);

        return response.json(result);

    }
}

export { ProfileUserController }
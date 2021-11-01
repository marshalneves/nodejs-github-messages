import {Request, Response} from "express";
import { container, inject, injectable } from "tsyringe";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

class AuthenticateUserController {

    async handle(request: Request, response: Response) {
        const { code } = request.body;

        try {

            const service = container.resolve(AuthenticateUserService);
            const result = await service.execute(code);
            return response.json(result);
    
        } catch (err) {
            return response.json({error: err.message});
        }
    }
}

export {AuthenticateUserController};
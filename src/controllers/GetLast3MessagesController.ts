import {Request, Response} from "express";
import { container } from "tsyringe";
import { MessageRepository } from "../data/MessageRepository";
import { GetLast3MessagesService } from "../services/GetLast3MessagesService";


class GetLast3MessagesController {


    async handle(request: Request, response: Response) {

        const service = container.resolve(GetLast3MessagesService);
        const result = await service.execute();

        return response.json(result);

    }
}

export { GetLast3MessagesController }
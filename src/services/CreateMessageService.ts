import { inject, injectable } from "tsyringe";
import { io } from "../app";
import { IMessageRepository } from "../data/MessageRepository";
import prismaClient from "../data/prisma";
interface ICreateMessageService { 
    execute(text: string, user_id: string)
}

@injectable()
class CreateMessageService implements ICreateMessageService {

    constructor(
        @inject("MessageRepository")
        private repository: IMessageRepository
        
    ) { }

    async execute(text: string, user_id: string) {

        const message = await this.repository.create(text, user_id);       
        this.sendMessage(message);
        return message
    }

    async sendMessage(message) {
        const infoWS = {
            text: message.text,
            user_id: message.user_id,
            created_at: message.created_at,
            user: {
                name: message.user.name,
                avatar_url: message.user.avatar_url
            }
        }
        io.emit("new_message", infoWS);
    }
}

export { CreateMessageService, ICreateMessageService };
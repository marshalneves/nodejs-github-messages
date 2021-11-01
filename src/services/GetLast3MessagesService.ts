import { inject, injectable } from "tsyringe";
import { IMessageRepository } from "../data/MessageRepository";

interface IGetLast3MessagesService {
    execute()
}

@injectable()
class GetLast3MessagesService implements IGetLast3MessagesService {

    constructor(
        @inject("MessageRepository")
        private repository: IMessageRepository
        
    ) {
        console.log(repository);
    }

    async execute() {

        try {
            const messages = this.repository.getNLastMessages(3);
            return messages;
    
        } catch (error) {
            console.error(error);
            
        }
    }
}

export { GetLast3MessagesService, IGetLast3MessagesService }
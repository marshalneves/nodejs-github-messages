import { injectable } from "tsyringe";
import { BaseRepository } from "./BaseRepository";
import prismaClient from "./prisma";

interface IMessageRepository {
    getNLastMessages(limit);
    create(text, user_id);
}


@injectable()
class MessageRepository implements BaseRepository, IMessageRepository {

    async create(text, user_id) {
        
        return await prismaClient.message.create({
            data:{
                text,
                user_id
            },
            include: {
                user: true
            }
        });
    }

    async getNLastMessages(limit) {
        return await prismaClient.message.findMany({
            take: limit,
            orderBy: {
                created_at: "desc",
            },
            include: {
                user: true,
            },
        });

    }
}

export { MessageRepository, IMessageRepository }
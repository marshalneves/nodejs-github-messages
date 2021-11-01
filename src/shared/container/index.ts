import { container } from "tsyringe";
import { IMessageRepository, MessageRepository } from "../../data/MessageRepository";
import { IUserRepository, UserRepository } from "../../data/UserRepository";
import { AuthenticateUserService, IAuthenticateUserService } from "../../services/AuthenticateUserService";
import { CreateMessageService, ICreateMessageService } from "../../services/CreateMessageService";
import { GetLast3MessagesService, IGetLast3MessagesService } from "../../services/GetLast3MessagesService";
import { IProfileUserService, ProfileUserService } from "../../services/ProfileUserService";

// repositories

container.registerSingleton<IMessageRepository>(
    "MessageRepository",
    MessageRepository
)

container.registerSingleton<IUserRepository>(
    "UserRepository",
    UserRepository
)

// services
container.registerSingleton<IAuthenticateUserService>(
    "AutenticateUserService",
    AuthenticateUserService
)

container.registerSingleton<ICreateMessageService>(
    "CreateMessageService",
    CreateMessageService
)

container.registerSingleton<IGetLast3MessagesService>(
    "GetLast3MessagesService",
    GetLast3MessagesService
)

container.registerSingleton<IProfileUserService>(
    "ProfileUserService",
    ProfileUserService
)
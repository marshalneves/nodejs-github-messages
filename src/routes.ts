import { Router } from "express";

import { AuthenticateUserController } from "./controllers/AutenticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { Get3LastMessagesController } from "./controllers/Get3LastMessagesController";
import { ProfileUserController } from "./controllers/ProfileUserController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router();

// work as a middleware
router.post("/authenticate", new AuthenticateUserController().handle);
router.post("/messages", ensureAuthenticated, new CreateMessageController().handle);
router.get("/messages/last3", new Get3LastMessagesController().handle);
router.get("/profile", ensureAuthenticated, new ProfileUserController().handle);

export { router }
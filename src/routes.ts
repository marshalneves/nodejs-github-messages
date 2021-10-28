import { Router } from "express";

import { AuthenticateUserController } from "./controllers/AutenticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router();

// work as a middleware
router.post("/authenticate", new AuthenticateUserController().handle);
router.post("/messages", ensureAuthenticated, new CreateMessageController().handle);

export { router }
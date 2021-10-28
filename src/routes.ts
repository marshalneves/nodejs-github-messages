import { AuthenticateUserController } from "./controllers/AutenticateUserController";
import {Router} from "express";

const router = Router();

// work as a middleware
router.post("/authenticate", new AuthenticateUserController().handle);

export { router }
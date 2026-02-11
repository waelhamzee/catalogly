import { Router } from "express";
import { authenticate } from "../../middlewares/auth.js";
import { UserController } from "./user.controller.js";

const router = Router();
const userController = new UserController();

router.get("/me", authenticate, userController.getMe);

export default router;

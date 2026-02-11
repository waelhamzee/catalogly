import { Router } from "express";
import { LanguageController } from "./language.controller.js";

const router = Router();
const languageController = new LanguageController();

router.get("/", languageController.getAll);

export default router;

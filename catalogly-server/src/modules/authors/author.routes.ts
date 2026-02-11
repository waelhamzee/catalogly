import { Router } from "express";
import { AuthorController } from "./author.controller.js";

const router = Router();

const authorController = new AuthorController();

router.get("/top", authorController.getTopAuthors);
router.get("/search", authorController.searchAuthors);

export default router;

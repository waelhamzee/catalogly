import { Router } from "express";
import { GenreController } from "./genre.controller.js";

const router = Router();

const genreController = new GenreController();

router.get("/", genreController.getAllGenres);

export default router;

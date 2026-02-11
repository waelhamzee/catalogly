import type { Request, Response } from "express";
import { ApiResponse } from "../../utils/response.js";
import { GenreService } from "./genre.service.js";

const genreService = new GenreService();

export class GenreController {
  async getAllGenres(req: Request, res: Response) {
    const genres = await genreService.getAllGenres();
    return ApiResponse.success(res, genres);
  }
}

import type { Request, Response } from "express";
import { ApiResponse } from "../../utils/response.js";
import { AuthorService } from "./author.service.js";
import { BadRequestError } from "../../utils/errors.js";

const authorService = new AuthorService();

export class AuthorController {
  async getTopAuthors(req: Request, res: Response) {
    const authors = await authorService.getTopAuthorsByBookCount();
    return ApiResponse.success(res, authors);
  }

  async searchAuthors(req: Request, res: Response) {
    const query = req.query.q as string;
    if (!query) {
      throw new BadRequestError("Search query is required");
    }
    const authors = await authorService.searchAuthors(query);
    return ApiResponse.success(res, authors);
  }
}
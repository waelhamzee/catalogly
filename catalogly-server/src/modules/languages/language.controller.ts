import type { Request, Response } from "express";
import { ApiResponse } from "../../utils/response.js";
import { LanguageService } from "./language.service.js";

const languageService = new LanguageService();

export class LanguageController {
  async getAll(req: Request, res: Response) {
    const languages = await languageService.getAllLanguages();
    return ApiResponse.success(res, languages);
  }
}

import { ConflictError, NotFoundError } from "../../utils/errors.js";
import { Language } from "./language.model.js";

export class LanguageService {
  async getLanguageById(id: number) {
    const language = await Language.findByPk(id);
    if (!language) {
      throw new NotFoundError("Language not found");
    }
    return language;
  }

  async getAllLanguages() {
    return await Language.findAll({
      order: [["name", "ASC"]],
    });
  }

  async createLanguage(name: string) {
    const existing = await Language.findOne({ where: { name } });
    if (existing) {
      throw new ConflictError("Language already exists");
    }
    return await Language.create({ name });
  }
}

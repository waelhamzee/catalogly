import { ConflictError, NotFoundError } from "../../utils/errors.js";
import { Genre } from "./genre.model.js";

export class GenreService {
  async getGenreById(id: number) {
    const genre = await Genre.findByPk(id);
    if (!genre) {
      throw new NotFoundError("Genre not found");
    }
    return genre;
  }

  async getAllGenres() {
    return await Genre.findAll({
      order: [["name", "ASC"]],
    });
  }

  async createGenre(name: string) {
    const existingGenre = await Genre.findOne({ where: { name } });
    if (existingGenre) {
      throw new ConflictError("Genre already exists");
    }
    return await Genre.create({ name });
  }
}

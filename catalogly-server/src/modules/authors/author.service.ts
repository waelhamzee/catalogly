import { col, fn, literal, Op } from "sequelize";
import { NotFoundError } from "../../utils/errors.js";
import { BookAuthor } from "../book-authors/book-author.model.js";
import { sequelize } from "../../config/db.js";
import { Author } from "./author.model.js";

const TOP_AUTHORS_LIMIT = 10;

export class AuthorService {
  async getTopAuthorsByBookCount(limit = TOP_AUTHORS_LIMIT) {
    const rows = (await BookAuthor.findAll({
      attributes: ["authorId", [fn("COUNT", literal("1")), "bookCount"]],
      group: ["authorId"],
      order: [[col("bookCount"), "DESC"]],
      limit: Math.min(limit, 50),
      raw: true,
    })) as unknown as { authorId: number; bookCount: string }[];

    const authorIds = rows.map((r) => r.authorId);
    if (authorIds.length === 0) return [];

    const authors = await Author.findAll({ where: { id: authorIds } });
    const byId = new Map(authors.map((a) => [a.id, a]));
    return authorIds.map((id) => byId.get(id)).filter((a): a is Author => a != null);
  }

  async getAuthorById(id: number) {
    const author = await Author.findByPk(id);
    if (!author) {
      throw new NotFoundError("Author not found");
    }
    return author;
  }

  async createAuthor(name: string) {
    return await Author.create({ name: name.trim() });
  }

  async searchAuthors(query: string) {
    return await Author.findAll({
      where: {
        name: { [Op.iLike]: `%${query}%` },
      },
      order: [["name", "ASC"]],
    });
  }
}

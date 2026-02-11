import { Op } from "sequelize";
import { NotFoundError } from "../../utils/errors.js";
import { Author } from "../authors/author.model.js";
import { BookAuthor } from "../book-authors/book-author.model.js";
import { bookToListItem } from "./book.mappers.js";
import { LIST_BOOKS_INCLUDE } from "./book.includes.js";
import { Book } from "./book.model.js";
import type { BookListItem } from "./book.types.js";

const BOOKS_PER_AUTHOR_LIMIT = 5;

export class BookReadService {
  async getBookById(id: number): Promise<BookListItem> {
    const book = await Book.findByPk(id, { include: LIST_BOOKS_INCLUDE });
    if (!book) {
      throw new NotFoundError("Book not found");
    }
    return bookToListItem(book);
  }

  async getBooksByAuthorIds(
    authorIds: number[],
    excludeBookId?: number,
  ): Promise<BookListItem[]> {
    if (authorIds.length === 0) return [];

    const result: BookListItem[] = [];
    const seenBookIds = new Set<number>();

    for (const authorId of authorIds) {
      const author = await Author.findByPk(authorId, {
        attributes: ["id", "name"],
      });
      if (!author) continue;

      const where: { authorId: number; bookId?: object } = { authorId };
      if (excludeBookId != null) {
        where.bookId = { [Op.ne]: excludeBookId };
      }

      const bookAuthors = await BookAuthor.findAll({
        where,
        attributes: ["bookId"],
        limit: BOOKS_PER_AUTHOR_LIMIT,
        order: [["bookId", "ASC"]],
      });

      const bookIds = bookAuthors.map((ba) => ba.bookId);
      if (bookIds.length === 0) continue;

      const books = await Book.findAll({
        where: { id: { [Op.in]: bookIds } },
        include: LIST_BOOKS_INCLUDE,
        order: [["id", "ASC"]],
      });

      for (const book of books) {
        const item = bookToListItem(book);
        if (!seenBookIds.has(item.id)) {
          seenBookIds.add(item.id);
          result.push(item);
        }
      }
    }

    return result;
  }
}

import { Op } from "sequelize";
import type { Includeable } from "sequelize";
import { Author } from "../authors/author.model.js";
import { BookAuthor } from "../book-authors/book-author.model.js";
import { BookGenre } from "../book-genres/book-genre.model.js";
import { Genre } from "../genres/genre.model.js";
import { bookToListItem } from "./book.mappers.js";
import { LIST_BOOKS_INCLUDE } from "./book.includes.js";
import { Book } from "./book.model.js";
import type { BookListResult, BookListItem } from "./book.types.js";

export interface ListBooksFilters {
  authorIds?: number[];
  genreIds?: number[];
  languageIds?: number[];
}

export class BookSearchService {
  async listBooks(
    q?: string,
    page = 1,
    limit = 40,
    filters: ListBooksFilters = {},
  ): Promise<BookListResult> {
    const search = q?.trim() || "";
    const safePage = Math.max(1, Math.floor(page));
    const safeLimit = Math.min(100, Math.max(1, Math.floor(limit)));
    const offset = (safePage - 1) * safeLimit;

    if (search) {
      return this.listBooksBySearch(search, offset, safeLimit, filters);
    }

    const where: Record<string, unknown> = {};
    if (filters.languageIds != null && filters.languageIds.length > 0) {
      where.languageId = { [Op.in]: filters.languageIds };
    }

    let include: Includeable[] = LIST_BOOKS_INCLUDE;
    if (filters.authorIds != null && filters.authorIds.length > 0) {
      include = include.map((inc) =>
        (inc as { model?: typeof Author }).model === Author
          ? {
              ...(inc as object),
              required: true as const,
              where: { id: { [Op.in]: filters.authorIds } },
            }
          : inc,
      );
    }
    if (filters.genreIds != null && filters.genreIds.length > 0) {
      include = include.map((inc) =>
        (inc as { model?: typeof Genre }).model === Genre
          ? {
              ...(inc as object),
              required: true as const,
              where: { id: { [Op.in]: filters.genreIds } },
            }
          : inc,
      );
    }

    const { count, rows } = await Book.findAndCountAll({
      where,
      include,
      order: [["id", "ASC"]],
      limit: safeLimit,
      offset,
      distinct: true,
    });

    return {
      items: rows.map(bookToListItem),
      totalCount: typeof count === "number" ? count : (count as unknown[]).length,
    };
  }

  private async listBooksBySearch(
    search: string,
    offset: number,
    limit: number,
    filters: ListBooksFilters = {},
  ): Promise<BookListResult> {
    const pattern = `%${search}%`;

    const [matchingAuthors, matchingGenres, booksByTitleOrIsbn] =
      await Promise.all([
        Author.findAll({
          where: { name: { [Op.iLike]: pattern } },
          attributes: ["id"],
        }),
        Genre.findAll({
          where: { name: { [Op.iLike]: pattern } },
          attributes: ["id"],
        }),
        Book.findAll({
          where: {
            [Op.or]: [
              { title: { [Op.iLike]: pattern } },
              { isbn: { [Op.iLike]: pattern } },
            ],
          },
          attributes: ["id"],
        }),
      ]);

    const authorIds = matchingAuthors.map((a) => a.id);
    const genreIds = matchingGenres.map((g) => g.id);
    const bookIdsByTitleOrIsbn = booksByTitleOrIsbn.map((b) => b.id);

    const bookIdsByAuthor =
      authorIds.length > 0
        ? (
            await BookAuthor.findAll({
              where: { authorId: { [Op.in]: authorIds } },
              attributes: ["bookId"],
            })
          ).map((ba) => ba.bookId)
        : [];
    const bookIdsByGenre =
      genreIds.length > 0
        ? (
            await BookGenre.findAll({
              where: { genreId: { [Op.in]: genreIds } },
              attributes: ["bookId"],
            })
          ).map((bg) => bg.bookId)
        : [];

    let allBookIds = [
      ...new Set([
        ...bookIdsByTitleOrIsbn,
        ...bookIdsByAuthor,
        ...bookIdsByGenre,
      ]),
    ].sort((a, b) => a - b);

    if (
      filters.authorIds != null &&
      filters.authorIds.length > 0 &&
      allBookIds.length > 0
    ) {
      const byAuthor = await BookAuthor.findAll({
        where: {
          bookId: { [Op.in]: allBookIds },
          authorId: { [Op.in]: filters.authorIds },
        },
        attributes: ["bookId"],
      });
      allBookIds = [...new Set(byAuthor.map((ba) => ba.bookId))].sort(
        (a, b) => a - b,
      );
    }

    if (
      filters.languageIds != null &&
      filters.languageIds.length > 0 &&
      allBookIds.length > 0
    ) {
      const byLanguage = await Book.findAll({
        where: {
          id: { [Op.in]: allBookIds },
          languageId: { [Op.in]: filters.languageIds },
        },
        attributes: ["id"],
      });
      allBookIds = byLanguage.map((b) => b.id).sort((a, b) => a - b);
    }

    if (
      filters.genreIds != null &&
      filters.genreIds.length > 0 &&
      allBookIds.length > 0
    ) {
      const byGenre = await BookGenre.findAll({
        where: {
          bookId: { [Op.in]: allBookIds },
          genreId: { [Op.in]: filters.genreIds },
        },
        attributes: ["bookId"],
      });
      const genreBookIds = [...new Set(byGenre.map((bg) => bg.bookId))].sort(
        (a, b) => a - b,
      );
      allBookIds = genreBookIds;
    }

    const totalCount = allBookIds.length;
    const pageIds = allBookIds.slice(offset, offset + limit);

    if (pageIds.length === 0) {
      return { items: [], totalCount };
    }

    const books = await Book.findAll({
      where: { id: { [Op.in]: pageIds } },
      include: LIST_BOOKS_INCLUDE,
      order: [["id", "ASC"]],
    });

    const byId = new Map(books.map((b) => [b.id, b]));
    const ordered = pageIds
      .map((id) => byId.get(id))
      .filter((b): b is Book => b != null);

    return {
      items: ordered.map(bookToListItem),
      totalCount,
    };
  }
}

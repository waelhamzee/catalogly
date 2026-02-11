import { NotFoundError } from "../../utils/errors.js";
import { AuthorService } from "../authors/author.service.js";
import { BookAuthor } from "../book-authors/book-author.model.js";
import { BookCover } from "../book-covers/book-cover.model.js";
import { BookGenre } from "../book-genres/book-genre.model.js";
import { File } from "../files/file.model.js";
import { GenreService } from "../genres/genre.service.js";
import { LanguageService } from "../languages/language.service.js";
import { withTransaction } from "../../utils/transaction.js";
import { Book } from "./book.model.js";
import { BookCoverService } from "../book-covers/book-cover.service.js";
import type { CreateBookInput, UpdateBookInput } from "./book.types.js";
import {
  normalizeCovers,
  validateCreateBookInput,
} from "./book.validators.js";

const authorService = new AuthorService();
const genreService = new GenreService();
const languageService = new LanguageService();
const bookCoverService = new BookCoverService();

export class BookWriteService {
  async createBook(input: CreateBookInput) {
    validateCreateBookInput(input);

    const {
      title,
      description,
      isbn,
      languageId,
      authorIds = [],
      newAuthorNames = [],
      genreIds,
      covers = [],
    } = input;

    for (const genreId of genreIds) {
      await genreService.getGenreById(genreId);
    }

    if (languageId != null) {
      await languageService.getLanguageById(languageId);
    }

    const authorIdList: number[] = [];
    for (const id of authorIds) {
      const author = await authorService.getAuthorById(id);
      authorIdList.push(author.id);
    }
    for (const name of newAuthorNames) {
      if (!name?.trim()) continue;
      const author = await authorService.createAuthor(name);
      authorIdList.push(author.id);
    }

    const book = await Book.create({
      title: title.trim(),
      description: description.trim(),
      isbn: isbn?.trim() || null,
      languageId: languageId ?? null,
    });

    await Promise.all([
      ...authorIdList.map((authorId) =>
        BookAuthor.create({ bookId: book.id, authorId }),
      ),
      ...genreIds.map((genreId) =>
        BookGenre.create({ bookId: book.id, genreId }),
      ),
    ]);

    const coversNormalized = normalizeCovers(covers);
    if (coversNormalized.length > 0) {
      await bookCoverService.createCovers(
        book.id,
        coversNormalized.map((c) => ({
          key: c.key,
          fileName: c.fileName,
          contentType: c.contentType,
          isPrimary: c.isPrimary,
        })),
      );
    }

    return book;
  }

  async updateBook(input: UpdateBookInput) {
    validateCreateBookInput(input);

    const {
      id,
      title,
      description,
      isbn,
      languageId,
      authorIds = [],
      newAuthorNames = [],
      genreIds,
      covers = [],
    } = input;

    const book = await Book.findByPk(id);
    if (!book) {
      throw new NotFoundError("Book not found");
    }

    for (const genreId of genreIds) {
      await genreService.getGenreById(genreId);
    }

    if (languageId != null) {
      await languageService.getLanguageById(languageId);
    }

    const authorIdList: number[] = [];
    
    for (const authorId of authorIds) {
      const author = await authorService.getAuthorById(authorId);
      authorIdList.push(author.id);
    }

    for (const name of newAuthorNames) {
      if (!name?.trim()) continue;
      const author = await authorService.createAuthor(name);
      authorIdList.push(author.id);
    }

    await book.update({
      title: title.trim(),
      description: description.trim(),
      isbn: isbn?.trim() || null,
      languageId: languageId ?? null,
    });

    await BookAuthor.destroy({ where: { bookId: id } });
    await BookGenre.destroy({ where: { bookId: id } });

    const coversNormalized = normalizeCovers(covers);
    const payloadCoverIds = coversNormalized
      .filter((c): c is typeof c & { id: number } => c.id != null)
      .map((c) => c.id);
    const currentCovers = await BookCover.findAll({
      where: { bookId: id },
      attributes: ["id"],
    });
    const currentCoverIds = currentCovers.map((c) => c.id);
    const toDeleteIds = currentCoverIds.filter(
      (cid) => !payloadCoverIds.includes(cid),
    );
    if (toDeleteIds.length > 0) {
      await bookCoverService.deleteCoversByIds(toDeleteIds);
    }

    for (const c of coversNormalized) {
      if (c.id != null) {
        await bookCoverService.updateCoverIsPrimary(c.id, c.isPrimary);
      }
    }

    const newCovers = coversNormalized.filter((c) => c.id == null);
    if (newCovers.length > 0) {
      await bookCoverService.createCovers(
        id,
        newCovers.map((c) => ({
          key: c.key,
          fileName: c.fileName,
          contentType: c.contentType,
          isPrimary: c.isPrimary,
        })),
      );
    }

    await Promise.all([
      ...authorIdList.map((authorId) =>
        BookAuthor.create({ bookId: id, authorId }),
      ),
      ...genreIds.map((genreId) =>
        BookGenre.create({ bookId: id, genreId }),
      ),
    ]);

    return book;
  }

  async deleteBook(id: number): Promise<void> {
    const book = await Book.findByPk(id, {
      include: [
        {
          model: BookCover,
          as: "covers",
          attributes: ["id", "fileId"],
          include: [
            {
              model: File,
              as: "file",
              attributes: ["id", "key", "bucket"],
            },
          ],
        },
      ],
    });
    if (!book) {
      throw new NotFoundError("Book not found");
    }

    await withTransaction(async () => {
      await bookCoverService.deleteCoversForBook(id);
      await BookAuthor.destroy({ where: { bookId: id } });
      await BookGenre.destroy({ where: { bookId: id } });
      await book.destroy();
    });
  }
}

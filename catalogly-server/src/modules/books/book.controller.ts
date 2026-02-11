import type { Request, Response } from "express";
import { HTTP_CREATED } from "../../constants/httpCodes.js";
import { BadRequestError } from "../../utils/errors.js";
import { ApiResponse } from "../../utils/response.js";
import { withTransaction } from "../../utils/transaction.js";
import { BookService } from "./book.service.js";
import { parseAuthorIds, parseGenreIds, parseLanguageIds } from "./book.utils.js";

const bookService = new BookService();

export class BookController {
  async list(req: Request, res: Response) {

    const q = req.query.q as string | undefined;
    const page = req.query.page != null ? Number(req.query.page) : 1;
    const limit = req.query.limit != null ? Number(req.query.limit) : 40;
    const authorIds = parseAuthorIds(req.query);
    const genreIds = parseGenreIds(req.query);
    const languageIds = parseLanguageIds(req.query);
    const filters: { authorIds?: number[]; genreIds?: number[]; languageIds?: number[] } = {};
    if (authorIds.length > 0) filters.authorIds = authorIds;
    if (genreIds.length > 0) filters.genreIds = genreIds;
    if (languageIds.length > 0) filters.languageIds = languageIds;

    const result = await bookService.listBooks(q, page, limit, filters);
    
    return ApiResponse.success(res, result);
  }

  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1) {
      throw new BadRequestError("Invalid book id");
    }
    const book = await bookService.getBookById(id);
    return ApiResponse.success(res, book);
  }

  async getBooksByAuthors(req: Request, res: Response) {
    const authorIds = parseAuthorIds(req.query);
    if (authorIds.length === 0) {
      throw new BadRequestError("At least one author id is required");
    }
    const excludeBookId =
      req.query.excludeBookId != null ? Number(req.query.excludeBookId) : undefined;
    const validExclude =
      excludeBookId != null &&
      Number.isInteger(excludeBookId) &&
      excludeBookId > 0
        ? excludeBookId
        : undefined;
    const result = await bookService.getBooksByAuthorIds(authorIds, validExclude);
    return ApiResponse.success(res, result);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1) {
      throw new BadRequestError("Invalid book id");
    }
    await bookService.deleteBook(id);
    return ApiResponse.success(res, { message: "Book deleted successfully" });
  }

  async createUpdate(req: Request, res: Response) {
    const {
      id,
      title,
      description,
      isbn,
      languageId,
      authorIds,
      newAuthorNames,
      genreIds,
      covers,
    } = req.body;

    const payload = {
      title,
      description,
      isbn,
      languageId,
      authorIds,
      newAuthorNames,
      genreIds,
      covers,
    };

    const book = await withTransaction(() =>
      id != null && Number.isInteger(Number(id)) && Number(id) > 0
        ? bookService.updateBook({ ...payload, id: Number(id) })
        : bookService.createBook(payload)
    );

    const statusCode = id != null ? 200 : HTTP_CREATED;
    return ApiResponse.success(res, book, statusCode);
  }
}

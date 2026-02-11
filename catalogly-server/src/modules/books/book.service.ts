import type {
  BookListItem,
  BookListResult,
  CreateBookInput,
  UpdateBookInput,
} from "./book.types.js";
import { BookReadService } from "./book-read.service.js";
import { BookSearchService } from "./book-search.service.js";
import { BookWriteService } from "./book-write.service.js";

const bookReadService = new BookReadService();
const bookSearchService = new BookSearchService();
const bookWriteService = new BookWriteService();

export class BookService {
  async getBookById(id: number): Promise<BookListItem> {
    return bookReadService.getBookById(id);
  }

  async getBooksByAuthorIds(
    authorIds: number[],
    excludeBookId?: number,
  ): Promise<BookListItem[]> {
    return bookReadService.getBooksByAuthorIds(authorIds, excludeBookId);
  }

  async createBook(input: CreateBookInput) {
    return bookWriteService.createBook(input);
  }

  async updateBook(input: UpdateBookInput) {
    return bookWriteService.updateBook(input);
  }

  async deleteBook(id: number): Promise<void> {
    return bookWriteService.deleteBook(id);
  }

  async listBooks(
    q?: string,
    page = 1,
    limit = 40,
    options?: {
      authorIds?: number[];
      genreIds?: number[];
      languageIds?: number[];
    },
  ): Promise<BookListResult> {
    return bookSearchService.listBooks(q, page, limit, options);
  }
}

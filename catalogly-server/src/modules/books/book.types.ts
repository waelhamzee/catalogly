export interface CreateBookCoverInput {
  id?: number;
  key: string;
  fileName: string;
  contentType: string;
  isPrimary?: boolean;
}

export interface CreateBookInput {
  title: string;
  description: string;
  isbn?: string | null;
  languageId?: number | null;
  authorIds?: number[];
  newAuthorNames?: string[];
  genreIds: number[];
  covers?: CreateBookCoverInput[];
}

export interface UpdateBookInput extends CreateBookInput {
  id: number;
}

export interface BookListCover {
  id?: number;
  key: string;
  fileName: string;
  contentType: string;
  isPrimary: boolean;
}

/** Book with relations as returned from Sequelize (plain, with nested file on covers) */
export interface BookExtended {
  id: number;
  title: string;
  description: string;
  isbn: string | null;
  languageId: number | null;
  authors: { id: number; name: string }[];
  genres: { id: number; name: string }[];
  covers: Array<{
    id?: number;
    isPrimary: boolean;
    file: { key: string; fileName: string; contentType: string } | null;
  }>;
  language?: { id: number; name: string } | null;
}

export interface BookListItem {
  id: number;
  title: string;
  description: string;
  isbn: string | null;
  language: { id: number; name: string } | null;
  covers: BookListCover[];
  authors: { id: number; name: string }[];
  genres: { id: number; name: string }[];
}

export interface BookListResult {
  items: BookListItem[];
  totalCount: number;
}

export interface BooksByAuthorItem {
  author: { id: number; name: string };
  books: BookListItem[];
}

export type BooksByAuthorsResult = BooksByAuthorItem[];

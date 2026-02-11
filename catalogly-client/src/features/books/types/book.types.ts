export interface CreateBookCoverPayload {
  id?: number;
  key: string;
  fileName: string;
  contentType: string;
  isPrimary?: boolean;
}

export interface CreateBookPayload {
  id?: number;
  title: string;
  description: string;
  isbn?: string | null;
  languageId?: number | null;
  authorIds?: number[];
  newAuthorNames?: string[];
  genreIds: number[];
  covers?: CreateBookCoverPayload[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface Language {
  id: number;
  name: string;
}

export interface Author {
  id: number;
  name: string;
}

export interface BookListCover {
  id?: number;
  key: string;
  fileName?: string;
  contentType: string;
  isPrimary: boolean;
}

export interface BookListItem {
  id: number;
  title: string;
  description: string;
  isbn: string | null;
  language: Language | null;
  covers: BookListCover[];
  authors: Author[];
  genres: Genre[];
}

export interface BookListResult {
  items: BookListItem[];
  totalCount: number;
}

export type SelectedAuthor =
  | { type: "existing"; id: number; name: string }
  | { type: "new"; name: string };

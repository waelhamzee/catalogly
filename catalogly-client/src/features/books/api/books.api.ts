import { api } from "../../../api/axios";
import type { ApiSuccessResponse } from "../../../types/api.types";
import type {
  Author,
  BookListItem,
  BookListResult,
  CreateBookPayload,
  Genre,
  Language,
} from "../types/book.types";

export interface PresignedUploadResponse {
  uploadUrl: string;
  key: string;
}

export const getPresignedUploadUrl = async (
  contentType: string,
  folder: string
): Promise<ApiSuccessResponse<PresignedUploadResponse>> => {
  const response = await api.post<ApiSuccessResponse<PresignedUploadResponse>>(
    "/files/presigned-upload",
    { contentType, folder }
  );
  return response.data;
};

export interface GetBooksParams {
  q?: string;
  page?: number;
  limit?: number;
  authorIds?: number[];
  genreIds?: number[];
  languageIds?: number[];
}

export const getBooks = async (
  params?: GetBooksParams
): Promise<ApiSuccessResponse<BookListResult>> => {
  const { q, page, limit, authorIds, genreIds, languageIds } = params ?? {};
  const response = await api.get<ApiSuccessResponse<BookListResult>>("/books", {
    params: {
      ...(q?.trim() ? { q: q.trim() } : {}),
      ...(page != null ? { page } : {}),
      ...(limit != null ? { limit } : {}),
      ...(authorIds?.length ? { authorIds: authorIds.join(",") } : {}),
      ...(genreIds?.length ? { genreIds: genreIds.join(",") } : {}),
      ...(languageIds?.length ? { languageIds: languageIds.join(",") } : {}),
    },
  });
  return response.data;
};

export const getBook = async (
  id: number
): Promise<ApiSuccessResponse<BookListItem>> => {
  const response = await api.get<ApiSuccessResponse<BookListItem>>(`/books/${id}`);
  return response.data;
};

export interface GetBooksByAuthorsParams {
  authorIds: number[];
  excludeBookId?: number;
}

export const getBooksByAuthors = async (
  params: GetBooksByAuthorsParams
): Promise<ApiSuccessResponse<BookListItem[]>> => {
  const { authorIds, excludeBookId } = params;
  const response = await api.get<ApiSuccessResponse<BookListItem[]>>(
    "/books/by-authors",
    {
      params: {
        authorIds: authorIds.join(","),
        ...(excludeBookId != null ? { excludeBookId } : {}),
      },
    }
  );
  return response.data;
};

export const createBook = async (
  payload: CreateBookPayload
): Promise<ApiSuccessResponse<{ id: number; title: string; description: string }>> => {
  const response = await api.post<ApiSuccessResponse<{ id: number; title: string; description: string }>>(
    "/books",
    payload
  );
  return response.data;
};

export const deleteBook = async (
  id: number
): Promise<ApiSuccessResponse<{ message: string }>> => {
  const response = await api.delete<ApiSuccessResponse<{ message: string }>>(
    `/books/${id}`
  );
  return response.data;
};

export const getGenres = async (): Promise<ApiSuccessResponse<Genre[]>> => {
  const response = await api.get<ApiSuccessResponse<Genre[]>>("/genres");
  return response.data;
};

export const getLanguages = async (): Promise<ApiSuccessResponse<Language[]>> => {
  const response = await api.get<ApiSuccessResponse<Language[]>>("/languages");
  return response.data;
};

export const getTopAuthors = async (): Promise<ApiSuccessResponse<Author[]>> => {
  const response = await api.get<ApiSuccessResponse<Author[]>>("/authors/top");
  return response.data;
};

export const searchAuthors = async (
  q: string
): Promise<ApiSuccessResponse<Author[]>> => {
  const response = await api.get<ApiSuccessResponse<Author[]>>("/authors/search", {
    params: { q },
  });
  return response.data;
};

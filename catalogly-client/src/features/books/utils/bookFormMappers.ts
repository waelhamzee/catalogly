import type { BookListItem } from "../types/book.types";
import type { BookFormValues } from "./validation";
import { getCoverImageUrl } from "./coverUrl";
import type { CoverSlot } from "../components/BookCoverUpload";

export function bookToFormValues(book: BookListItem): BookFormValues {
  return {
    title: book.title,
    description: book.description,
    isbn: book.isbn ?? "",
    languageId: book.language?.id ?? null,
    genreIds: book.genres.map((g) => g.id),
    selectedAuthors: book.authors.map((a) => ({
      type: "existing" as const,
      id: a.id,
      name: a.name,
    })),
    coverCount: book.covers.length,
  };
}

export function bookCoversToSlots(book: BookListItem): CoverSlot[] {
  return book.covers.map((c) => ({
    id: `cover-${c.id ?? Math.random()}`,
    coverId: c.id,
    key: c.key,
    fileName: c.fileName,
    contentType: c.contentType,
    preview: getCoverImageUrl(c.key),
    isPrimary: c.isPrimary,
  }));
}

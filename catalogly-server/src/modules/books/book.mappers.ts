import type { Book } from "./book.model.js";
import type { BookExtended, BookListItem } from "./book.types.js";

export function bookToListItem(book: Book): BookListItem {
  const b = book.get({ plain: true }) as BookExtended;
  return {
    id: b.id,
    title: b.title,
    description: b.description,
    isbn: b.isbn ?? null,
    language: b.language ?? null,
    covers: (b.covers ?? []).map((c) => ({
      ...(c.id != null && { id: c.id }),
      key: c.file?.key ?? "",
      fileName: c.file?.fileName ?? "",
      contentType: c.file?.contentType ?? "",
      isPrimary: c.isPrimary,
    })),
    authors: b.authors ?? [],
    genres: b.genres ?? [],
  };
}

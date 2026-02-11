import { BadRequestError } from "../../utils/errors.js";
import type { CreateBookCoverInput, CreateBookInput } from "./book.types.js";

const MAX_BOOK_COVERS = 3;

export function validateCreateBookInput(input: CreateBookInput): void {
  const {
    title,
    description,
    isbn,
    genreIds,
    authorIds = [],
    newAuthorNames = [],
    covers = [],
  } = input;

  const titleTrimmed = title?.trim();
  const descriptionTrimmed = description?.trim();
  if (!titleTrimmed) {
    throw new BadRequestError("Title is required");
  }
  if (!descriptionTrimmed) {
    throw new BadRequestError("Description is required");
  }

  validateIsbn(isbn);

  if (!Array.isArray(genreIds) || genreIds.length === 0) {
    throw new BadRequestError("At least one genre is required");
  }

  const totalAuthors = (authorIds?.length || 0) + (newAuthorNames?.length || 0);
  if (totalAuthors === 0) {
    throw new BadRequestError("At least one author is required");
  }

  if (!Array.isArray(covers) || covers.length > MAX_BOOK_COVERS) {
    throw new BadRequestError(
      `Covers must be an array with at most ${MAX_BOOK_COVERS} items`,
    );
  }

  validateCovers(covers);
}

export function validateIsbn(isbn: string | null | undefined): void {
  const isbnTrimmed = isbn?.trim();
  if (isbnTrimmed && isbnTrimmed !== "") {
    const digitsOnly = isbnTrimmed.replace(/\D/g, "");
    if (digitsOnly.length !== 13) {
      throw new BadRequestError("ISBN must be exactly 13 digits");
    }
  }
}

export function validateCovers(covers: CreateBookCoverInput[]): void {
  if (covers.length === 0) return;

  const coversNormalized = covers.map((c) => ({
    key: (c.key ?? "").trim(),
    fileName: (c.fileName ?? "").trim(),
    contentType: (c.contentType ?? "").trim(),
    isPrimary: Boolean(c.isPrimary),
  }));

  if (coversNormalized.some((c) => !c.key || !c.fileName || !c.contentType)) {
    throw new BadRequestError("Each cover must have key, fileName, and contentType");
  }

  const primaryCount = coversNormalized.filter((c) => c.isPrimary).length;
  if (primaryCount > 1) {
    throw new BadRequestError("Exactly one cover must be primary");
  }
}

export interface NormalizedCover {
  id?: number;
  key: string;
  fileName: string;
  contentType: string;
  isPrimary: boolean;
}

export function normalizeCovers(
  covers: CreateBookCoverInput[],
): NormalizedCover[] {
  const normalized: NormalizedCover[] = covers.map((c) => ({
    ...(c.id != null && { id: c.id }),
    key: (c.key ?? "").trim(),
    fileName: (c.fileName ?? "").trim(),
    contentType: (c.contentType ?? "").trim(),
    isPrimary: Boolean(c.isPrimary),
  }));

  const primaryCount = normalized.filter((c) => c.isPrimary).length;
  if (primaryCount === 0 && normalized[0]) {
    normalized[0].isPrimary = true;
  }

  return normalized;
}

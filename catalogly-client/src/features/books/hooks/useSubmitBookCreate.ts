import { useCallback, useState } from "react";
import type { CoverSlot } from "../components/BookCoverUpload";
import type { BookFormValues } from "../utils/validation";
import { getPresignedUploadUrl } from "../api/books.api";
import type {
  CreateBookCoverPayload,
  CreateBookPayload,
  SelectedAuthor,
} from "../types/book.types";
import { useCreateBook } from "./useCreateBook";

const COVERS_FOLDER = "covers";

async function uploadToPresignedUrl(uploadUrl: string, file: File): Promise<void> {
  const res = await fetch(uploadUrl, {
    method: "PUT",
    body: file,
    headers: { "Content-Type": file.type },
  });
  if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
}

export function useSubmitBookCreate() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutateAsync: createBook, isPending: isMutationPending, isError, error } =
    useCreateBook();

  const submit = useCallback(
    async (values: BookFormValues, covers: CoverSlot[], bookId?: number) => {
      setIsSubmitting(true);
      try {
        const basePayload: CreateBookPayload = {
          title: values.title.trim(),
          description: values.description.trim(),
          isbn: values.isbn?.trim() || null,
          languageId: values.languageId ?? null,
          genreIds: values.genreIds,
          authorIds: values.selectedAuthors
            .filter((a): a is SelectedAuthor & { type: "existing" } => a.type === "existing")
            .map((a) => a.id),
          newAuthorNames: values.selectedAuthors
            .filter((a): a is SelectedAuthor & { type: "new" } => a.type === "new")
            .map((a) => a.name),
        };

        if (bookId != null) {
          basePayload.id = bookId;
        }

        if (basePayload.authorIds?.length === 0) delete basePayload.authorIds;
        if (basePayload.newAuthorNames?.length === 0) delete basePayload.newAuthorNames;

        const coversPayload: CreateBookCoverPayload[] = [];
        for (const cover of covers) {
          if (cover.coverId != null && cover.key != null && cover.contentType != null) {
            coversPayload.push({
              id: cover.coverId,
              key: cover.key,
              fileName: cover.fileName ?? cover.key.split("/").pop() ?? "cover.jpg",
              contentType: cover.contentType,
              isPrimary: cover.isPrimary,
            });
          } else if (cover.file != null) {
            const res = await getPresignedUploadUrl(cover.file.type, COVERS_FOLDER);
            if (!res.success || !res.data) throw new Error("Failed to get upload URL");
            await uploadToPresignedUrl(res.data.uploadUrl, cover.file);
            coversPayload.push({
              key: res.data.key,
              fileName: cover.file.name || "cover.jpg",
              contentType: cover.file.type,
              isPrimary: cover.isPrimary,
            });
          }
        }
        basePayload.covers = coversPayload;
        await createBook(basePayload);
      } finally {
        setIsSubmitting(false);
      }
    },
    [createBook]
  );

  return { submit, isPending: isSubmitting || isMutationPending, isError, error };
}

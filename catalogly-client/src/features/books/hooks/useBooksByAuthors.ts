import { useQuery } from "@tanstack/react-query";
import { getBooksByAuthors } from "../api/books.api";

export function useBooksByAuthors(
  authorIds: number[],
  excludeBookId: number | undefined
) {
  const enabled = authorIds.length > 0;

  return useQuery({
    queryKey: ["books", "by-authors", authorIds, excludeBookId],
    queryFn: async () => {
      const res = await getBooksByAuthors({
        authorIds,
        ...(excludeBookId != null ? { excludeBookId } : {}),
      });
      return res.data ?? [];
    },
    enabled,
  });
}

import { useQuery } from "@tanstack/react-query";
import { getBook } from "../api/books.api";

export function useBook(id: number | undefined) {
  const numericId = id != null ? Number(id) : undefined;
  const enabled = numericId != null && Number.isInteger(numericId) && numericId > 0;

  return useQuery({
    queryKey: ["book", numericId],
    queryFn: async () => {
      const res = await getBook(numericId!);
      return res.data;
    },
    enabled: Boolean(enabled),
  });
}

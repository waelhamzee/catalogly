import { useQuery } from "@tanstack/react-query";
import { getBooks } from "../api/books.api";

export function useBooksSearch(q: string) {
  const search = q.trim();
  const enabled = search.length >= 2;

  return useQuery({
    queryKey: ["books", "search", search],
    queryFn: async () => {
      const res = await getBooks({ q: search, page: 1, limit: 6 });
      return res.data?.items ?? [];
    },
    enabled,
    staleTime: 0,
  });
}

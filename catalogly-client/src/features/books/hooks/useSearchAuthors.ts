import { useQuery } from "@tanstack/react-query";
import { searchAuthors } from "../api/books.api";

export function useSearchAuthors(query: string) {
  return useQuery({
    queryKey: ["authors", "search", query],
    queryFn: async () => {
      const res = await searchAuthors(query);
      return res.data;
    },
    enabled: query.trim().length >= 2,
  });
}

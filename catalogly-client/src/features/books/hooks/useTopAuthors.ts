import { useQuery } from "@tanstack/react-query";
import { getTopAuthors } from "../api/books.api";

export function useTopAuthors() {
  return useQuery({
    queryKey: ["authors", "top"],
    queryFn: async () => {
      const res = await getTopAuthors();
      return res.data ?? [];
    },
    staleTime: Infinity,
  });
}

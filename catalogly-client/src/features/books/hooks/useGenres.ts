import { useQuery } from "@tanstack/react-query";
import { getGenres } from "../api/books.api";

export function useGenres() {
  return useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      const res = await getGenres();
      return res.data
    },
    staleTime: Infinity
  });
}

import { useQuery } from "@tanstack/react-query";
import { getLanguages } from "../api/books.api";

export function useLanguages() {
  return useQuery({
    queryKey: ["languages"],
    queryFn: async () => {
      const res = await getLanguages();
      return res.data ?? [];
    },
    staleTime: Infinity
  });
}

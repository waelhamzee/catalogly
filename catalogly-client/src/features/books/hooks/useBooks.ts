import { useInfiniteQuery } from "@tanstack/react-query";
import { getBooks } from "../api/books.api";

const BOOKS_PAGE_SIZE = 40;

export interface UseBooksFilters {
  authorIds?: number[];
  genreIds?: number[];
  languageIds?: number[];
}

export function useBooks(
  query?: string,
  filters?: UseBooksFilters
) {
  const search = query?.trim() ?? "";
  const authorIds = filters?.authorIds?.length ? filters.authorIds : undefined;
  const genreIds = filters?.genreIds?.length ? filters.genreIds : undefined;
  const languageIds = filters?.languageIds?.length ? filters.languageIds : undefined;

  return useInfiniteQuery({
    queryKey: ["books", "list", search, authorIds, genreIds, languageIds],
    queryFn: async ({ pageParam }) => {
      const res = await getBooks({
        ...(search ? { q: search } : {}),
        ...(authorIds ? { authorIds } : {}),
        ...(genreIds ? { genreIds } : {}),
        ...(languageIds ? { languageIds } : {}),
        page: pageParam,
        limit: BOOKS_PAGE_SIZE,
      });
      return res.data ?? { items: [], totalCount: 0 };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages) => {
      const loaded = _allPages.reduce((acc, p) => acc + p.items.length, 0);
      return loaded < lastPage.totalCount ? _allPages.length + 1 : undefined;
    },
  });
}

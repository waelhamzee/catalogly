import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { useEffect, useRef } from "react";
import BookCard from "./BookCard";
import BookCardSkeleton from "./BookCardSkeleton";
import { useBooks, type UseBooksFilters } from "../hooks/useBooks";

interface BookListProps {
  query?: string;
  filters?: UseBooksFilters;
  onCountsChange?: (loaded: number, total: number) => void;
}

export default function BookList({ query, filters, onCountsChange }: BookListProps) {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useBooks(query, filters);

  const loadMoreRef = useRef<HTMLDivElement>(null);

  const books = data?.pages.flatMap((p) => p.items) ?? [];
  const totalCount = data?.pages[0]?.totalCount ?? 0;

  useEffect(() => {
    onCountsChange?.(books.length, totalCount);
  }, [books.length, totalCount, onCountsChange]);

  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) fetchNextPage();
      },
      { rootMargin: "100px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr)",
            lg: "repeat(5, 1fr)",
          },
          gap: { xs: 2, sm: 3 },
        }}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <BookCardSkeleton key={i} />
        ))}
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography color="error" sx={{ py: 2 }}>
        {error instanceof Error ? error.message : "Failed to load books"}
      </Typography>
    );
  }

  if (books.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ py: 2 }}>
        No books found
      </Typography>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr)",
            lg: "repeat(5, 1fr)",
          },
          gap: { xs: 2, sm: 3 },
        }}
      >
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </Box>
      <div ref={loadMoreRef} aria-hidden />
      {isFetchingNextPage && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
          <CircularProgress size={32} />
        </Box>
      )}
    </>
  );
}

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import BookCard from "./BookCard";
import type { BookListItem } from "../types/book.types";

interface BookDetailMoreByAuthorsProps {
  books: BookListItem[];
}

export default function BookDetailMoreByAuthors({
  books,
}: BookDetailMoreByAuthorsProps) {
  if (books.length === 0) return null;

  return (
    <Box sx={{ mt: { xs: 6, md: 8 } }}>
      <Typography
        variant="h5"
        component="h2"
        sx={{
          mb: 3,
          fontWeight: 700,
          color: "text.primary",
          fontSize: { xs: "1.25rem", md: "1.5rem" },
        }}
      >
        Other Books By The Author(s)
      </Typography>
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
    </Box>
  );
}

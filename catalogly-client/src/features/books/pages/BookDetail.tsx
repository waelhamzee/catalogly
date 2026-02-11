import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import BookDetailCovers from "../components/BookDetailCovers";
import BookDetailFields from "../components/BookDetailFields";
import BookDetailHeader from "../components/BookDetailHeader";
import BookDetailMoreByAuthors from "../components/BookDetailMoreByAuthors";
import BookDetailSkeleton from "../components/BookDetailSkeleton";
import { useBook } from "../hooks/useBook";
import { useBooksByAuthors } from "../hooks/useBooksByAuthors";
import type { BookListItem } from "../types/book.types";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

const fieldStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.02 },
  },
};

function BookDetailContent({
  book,
  booksByAuthors,
}: {
  book: BookListItem;
  booksByAuthors: BookListItem[];
}) {
  const primaryCover = book.covers.find((c) => c.isPrimary) ?? book.covers[0];
  const otherCovers = book.covers.filter((c) => c !== primaryCover).slice(0, 2);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      style={{ overflow: "hidden" }}
    >
      <motion.div variants={itemVariants}>
        <BookDetailHeader book={book} />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Grid container spacing={{ xs: 2, md: 4 }} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, md: 3.5 }}>
            <BookDetailCovers primaryCover={primaryCover} otherCovers={otherCovers} />
          </Grid>
          <Grid size={{ xs: 12, md: 8.5 }}>
            <motion.div variants={fieldStagger} initial="hidden" animate="show">
              <motion.div variants={itemVariants}>
                <BookDetailFields book={book} />
              </motion.div>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>

      <motion.div variants={itemVariants}>
        <BookDetailMoreByAuthors books={booksByAuthors} />
      </motion.div>
    </motion.div>
  );
}

export default function BookDetail() {
  const { id } = useParams<"id">();
  const numericId = id != null ? Number(id) : NaN;
  const validId =
    Number.isInteger(numericId) && numericId > 0 ? numericId : undefined;
  const { data: book, isLoading, isError, error } = useBook(validId);
  const authorIds = book?.authors.map((a) => a.id) ?? [];
  const { data: booksByAuthors = [] } = useBooksByAuthors(authorIds, book?.id);

  if (id == null || id === "" || !validId) {
    return (
      <Typography color="error" sx={{ py: 2 }}>
        Invalid book ID
      </Typography>
    );
  }

  if (isLoading) {
    return <BookDetailSkeleton />;
  }

  if (isError || !book) {
    return (
      <Typography color="error" sx={{ py: 2 }}>
        {error instanceof Error ? error.message : "Failed to load book"}
      </Typography>
    );
  }

  return <BookDetailContent book={book} booksByAuthors={booksByAuthors} />;
}

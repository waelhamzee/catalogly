import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { BookListItem } from "../types/book.types";
import { getCoverImageUrl } from "../utils/coverUrl";

interface BookSearchOptionProps {
  book: BookListItem;
  liProps: React.HTMLAttributes<HTMLLIElement> & { key?: string };
}

function primaryCover(book: BookListItem) {
  return book.covers.find((c) => c.isPrimary) ?? book.covers[0];
}

function authorNames(book: BookListItem) {
  return book.authors.map((a) => a.name).join(", ") || "—";
}

export default function BookSearchOption({ book, liProps }: BookSearchOptionProps) {
  const cover = primaryCover(book);
  const coverUrl = cover ? getCoverImageUrl(cover.key) : null;

  return (
    <Box
      component="li"
      {...liProps}
      sx={{
        gap: 1.5,
        py: 1.5,
        alignItems: "center",
        borderBottom: 1,
        borderColor: "divider",
        "&:last-of-type": { borderBottom: 0 },
      }}
    >
      <Box
        sx={{
          width: 40,
          height: 52,
          flexShrink: 0,
          borderRadius: 0.5,
          overflow: "hidden",
          bgcolor: "grey.200",
        }}
      >
        {coverUrl ? (
          <Box
            component="img"
            src={coverUrl}
            alt={cover.fileName || book.title}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : null}
      </Box>
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography variant="body1" fontWeight={600} noWrap>
          {book.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          noWrap
          sx={{ mt: 0.25 }}
        >
          {authorNames(book)}
        </Typography>
      </Box>
    </Box>
  );
}

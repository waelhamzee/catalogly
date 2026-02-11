import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import type { BookListItem } from "../types/book.types";

interface BookDetailFieldsProps {
  book: BookListItem;
}

export default function BookDetailFields({ book }: BookDetailFieldsProps) {
  const theme = useTheme();
  const authorNames = book.authors.map((a) => a.name).join(", ") || "—";

  const labelSx = {
    mb: 0.75,
    fontSize: "1rem",
    fontWeight: 600,
    color: theme.palette.primary.main,
    letterSpacing: "0.02em",
  } as const;

  const valueSx = {
    fontSize: "0.9375rem",
    lineHeight: 1.6,
    color: "text.primary",
  } as const;

  const fieldSx = { mb: 2.5 };

  return (
    <Box>
      {book.isbn && (
        <Box sx={fieldSx}>
          <Typography variant="body1" component="p" sx={labelSx}>
            ISBN-13
          </Typography>
          <Typography component="p" sx={valueSx}>
            {book.isbn}
          </Typography>
        </Box>
      )}

      <Box sx={fieldSx}>
        <Typography variant="body1" component="p" sx={labelSx}>
          Description
        </Typography>
        <Typography
          component="p"
          sx={{ ...valueSx, whiteSpace: "pre-wrap" }}
        >
          {book.description}
        </Typography>
      </Box>

      {book.genres.length > 0 && (
        <Box sx={fieldSx}>
          <Typography variant="body1" component="p" sx={labelSx}>
            Genres
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {book.genres.map((g) => (
              <Chip
                key={g.id}
                label={g.name}
                size="small"
                color="primary"
                sx={{ fontWeight: 600, fontSize: "0.725rem" }}
              />
            ))}
          </Box>
        </Box>
      )}

      {book.language && (
        <Box sx={fieldSx}>
          <Typography variant="body1" component="p" sx={labelSx}>
            Language
          </Typography>
          <Typography component="p" sx={valueSx}>
            {book.language.name}
          </Typography>
        </Box>
      )}

      <Box sx={fieldSx}>
        <Typography variant="body1" component="p" sx={labelSx}>
          Authors
        </Typography>
        <Typography component="p" sx={valueSx}>
          {authorNames}
        </Typography>
      </Box>
    </Box>
  );
}

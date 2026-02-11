import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { BookListItem } from "../types/book.types";
import { getCoverImageUrl } from "../utils/coverUrl";

const COVER_ASPECT_RATIO = 3 / 4;

interface BookCardProps {
  book: BookListItem;
}

export default function BookCard({ book }: BookCardProps) {
  const primaryCover = book.covers.find((c) => c.isPrimary) ?? book.covers[0];
  const authorNames = book.authors.map((a) => a.name).join(", ") || "—";
  const coverUrl = primaryCover ? getCoverImageUrl(primaryCover.key) : null;

  return (
    <Box
      component={motion.create(Link)}
      to={`/book/${book.id}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      whileHover={{ y: -6 }}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        minWidth: 0,
        alignItems: "center",
        textAlign: "center",
        textDecoration: "none",
        color: "inherit",
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: "0.375rem",
          padding: "0.25rem",
          flexShrink: 0,
          width: "100%",
          maxWidth: { xs: 100, sm: 120 },
          mx: "auto",
        }}
      >
        <Box
          sx={{
            width: "100%",
            aspectRatio: COVER_ASPECT_RATIO,
            overflow: "hidden",
            bgcolor: "grey.200",
          }}
        >
          {coverUrl ? (
            <Box
              component="img"
              loading="lazy"
              src={coverUrl}
              alt={primaryCover.fileName || book.title}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          ) : null}
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.25, width: "100%" }}>
        <Typography variant="subtitle1" fontWeight={600} noWrap title={book.title} sx={{ width: "100%" }}>
          {book.title}
        </Typography>
        <Tooltip title={authorNames} enterDelay={300}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              width: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {authorNames}
          </Typography>
        </Tooltip>
      </Box>
    </Box>
  );
}

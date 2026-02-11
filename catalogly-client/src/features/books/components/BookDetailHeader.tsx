import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import { useCan } from "../../auth/hooks/useCan";
import { PERMISSIONS } from "../../auth/constants/permissions";
import type { BookListItem } from "../types/book.types";

interface BookDetailHeaderProps {
  book: BookListItem;
}

export default function BookDetailHeader({ book }: BookDetailHeaderProps) {
  const theme = useTheme();
  const canEdit = useCan(PERMISSIONS.BOOKS_EDIT);

  return (
    <Box sx={{ mb: 3 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link
          component={RouterLink}
          to="/"
          underline="hover"
          color="inherit"
          sx={{ fontSize: "0.875rem" }}
        >
          Home
        </Link>
        <Link
          component={RouterLink}
          to="/books"
          underline="hover"
          color="inherit"
          sx={{ fontSize: "0.875rem" }}
        >
          Books
        </Link>
        <Typography color="text.primary" sx={{ fontSize: "0.875rem" }}>
          {book.title}
        </Typography>
      </Breadcrumbs>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 2,
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            flex: 1,
            minWidth: 0,
            fontWeight: 700,
            fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem", lg: "2rem" },
            lineHeight: 1.2,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {book.title}
        </Typography>
        {canEdit && (
          <Tooltip title="Edit book">
            <IconButton
              component={RouterLink}
              to={`/admin/book/${book.id}/edit`}
              aria-label="Edit book"
              size="small"
              sx={{ flexShrink: 0 }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
}

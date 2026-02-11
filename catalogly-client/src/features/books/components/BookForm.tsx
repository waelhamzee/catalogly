import DeleteIcon from "@mui/icons-material/Delete";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { useCallback, useMemo, useState } from "react";
import { useDialog } from "../../../context/dialog";
import { getApiErrorMessage } from "../../../utils/getApiErrorMessage";
import { useDeleteBook } from "../hooks/useDeleteBook";
import { useSubmitBookCreate } from "../hooks/useSubmitBookCreate";
import type { BookListItem, SelectedAuthor } from "../types/book.types";
import { bookFormSchema, type BookFormValues } from "../utils/validation";
import { bookCoversToSlots, bookToFormValues } from "../utils/bookFormMappers";
import AuthorsSearch from "./AuthorsSearch";
import type { CoverSlot } from "./BookCoverUpload";
import BookCoverUpload from "./BookCoverUpload";
import Genres from "./Genres";
import Languages from "./Languages";

const emptyValues: BookFormValues = {
  title: "",
  description: "",
  isbn: "",
  languageId: null,
  genreIds: [],
  selectedAuthors: [] as SelectedAuthor[],
  coverCount: 0,
};

export interface BookFormProps {
  mode: "create" | "edit";
  book?: BookListItem;
}

export default function BookForm({ mode, book }: BookFormProps) {
  const bookId = book?.id;
  const bookTitle = book?.title;
  const initialValues = useMemo(
    () => (mode === "edit" && book ? bookToFormValues(book) : emptyValues),
    [mode, book]
  );
  const [covers, setCovers] = useState<CoverSlot[]>(() =>
    mode === "edit" && book ? bookCoversToSlots(book) : []
  );
  const { submit, isPending, isError, error } = useSubmitBookCreate();
  const { mutate: deleteBook, isPending: isDeleting } = useDeleteBook();
  const { openDialog } = useDialog();

  const handleDeleteClick = useCallback(() => {
    if (bookId == null) return;
    openDialog({
      title: "Delete book?",
      content: `Are you sure you want to delete "${bookTitle ?? "this book"}"? This action cannot be undone.`,
      actions: [
        { label: "Cancel", variant: "outlined" },
        {
          label: "Delete",
          variant: "contained",
          color: "error",
          onClick: () => deleteBook(bookId),
        },
      ],
    });
  }, [bookId, bookTitle, openDialog, deleteBook]);

  const formik = useFormik<BookFormValues>({
    initialValues,
    validationSchema: bookFormSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (covers.length === 0) {
        formik.setFieldTouched("coverCount", true);
        return;
      }
      submit(values, covers, mode === "edit" ? bookId : undefined);
    },
  });

  const handleCoversChange = useCallback(
    (next: CoverSlot[]) => {
      setCovers(next);
      formik.setFieldValue("coverCount", next.length);
    },
    [formik],
  );

  const serverError = isError ? getApiErrorMessage(error) : null;

  return (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate>
      {serverError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {serverError}
        </Alert>
      )}

      <Grid container spacing={1} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 3.5 }}>
          <BookCoverUpload
            value={covers}
            onChange={handleCoversChange}
            onBlur={() => formik.setFieldTouched("coverCount", true)}
            error={
              Boolean(formik.errors.coverCount) &&
              (formik.touched.coverCount || formik.submitCount > 0)
            }
            helperText={
              formik.errors.coverCount &&
              (formik.touched.coverCount || formik.submitCount > 0)
                ? (formik.errors.coverCount as string)
                : undefined
            }
          />
        </Grid>
        <Grid size={{ xs: 12, md: 8.5 }}>
          <TextField
            fullWidth
            required
            id="title"
            name="title"
            label="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            sx={{ mb: 2.5 }}
          />

          <TextField
            fullWidth
            id="isbn"
            name="isbn"
            label="ISBN-13"
            value={formik.values.isbn ?? ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.isbn && Boolean(formik.errors.isbn)}
            helperText={formik.touched.isbn && formik.errors.isbn}
            sx={{ mb: 2.5 }}
          />

          <TextField
            fullWidth
            required
            id="description"
            name="description"
            label="Description"
            multiline
            rows={4}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
            sx={{ mb: 2.5 }}
          />

          <Genres
            required
            value={formik.values.genreIds}
            onChange={(genreIds) => formik.setFieldValue("genreIds", genreIds)}
            onBlur={() => formik.setFieldTouched("genreIds", true)}
            error={formik.touched.genreIds && Boolean(formik.errors.genreIds)}
            helperText={
              formik.touched.genreIds
                ? (formik.errors.genreIds as string)
                : undefined
            }
          />

          <Languages
            value={formik.values.languageId ?? null}
            onChange={(languageId) =>
              formik.setFieldValue("languageId", languageId)
            }
            onBlur={() => formik.setFieldTouched("languageId", true)}
            error={
              formik.touched.languageId && Boolean(formik.errors.languageId)
            }
            helperText={
              formik.touched.languageId
                ? (formik.errors.languageId as string)
                : undefined
            }
          />

          <AuthorsSearch
            required
            value={formik.values.selectedAuthors as SelectedAuthor[]}
            onChange={(authors) =>
              formik.setFieldValue("selectedAuthors", authors)
            }
            onBlur={() => formik.setFieldTouched("selectedAuthors", true)}
            error={
              formik.touched.selectedAuthors &&
              Boolean(formik.errors.selectedAuthors)
            }
            helperText={
              formik.touched.selectedAuthors
                ? (formik.errors.selectedAuthors as string)
                : undefined
            }
          />

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              loading={isPending}
              loadingIndicator={<CircularProgress size={22} color="inherit" />}
            >
              {mode === "create" ? "Create Book" : "Update Book"}
            </Button>
            {mode === "edit" && bookId != null && (
              <Button
                type="button"
                variant="outlined"
                color="error"
                size="large"
                startIcon={<DeleteIcon />}
                onClick={handleDeleteClick}
                disabled={isDeleting}
                sx={{
                  borderColor: "error.main",
                  color: "error.dark",
                  "&:hover": {
                    borderColor: "error.dark",
                    backgroundColor: "error.light",
                    color: "error.dark",
                  },
                }}
              >
                Delete Book
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

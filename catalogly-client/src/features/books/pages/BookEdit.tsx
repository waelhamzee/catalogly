import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import PageOverlayLoader from "../../../components/PageOverlayLoader";
import BookForm from "../components/BookForm";
import { useBook } from "../hooks/useBook";
import { getApiErrorMessage } from "../../../utils/getApiErrorMessage";

export default function BookEdit() {
  const { id } = useParams<"id">();
  const bookId = id != null ? parseInt(id, 10) : undefined;
  const { data: book, isLoading, isError, error } = useBook(bookId);

  if (bookId == null || !Number.isInteger(bookId) || bookId < 1) {
    return (
      <Box>
        <Typography variant="h3" color="error">
          Book not found
        </Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box>
        <Alert severity="error">{getApiErrorMessage(error)}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ position: "relative" }}>
      {isLoading && <PageOverlayLoader />}
      <Typography variant="h3" sx={{ mb: 3 }}>
        Edit Book
      </Typography>
      <BookForm key={book?.id ?? "loading"} mode="edit" book={book} />
    </Box>
  );
}

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BookForm from "../components/BookForm";

export default function BookCreateUpdate() {
  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 3 }}>
        Add New Book
      </Typography>
      <BookForm mode="create" />
    </Box>
  );
}

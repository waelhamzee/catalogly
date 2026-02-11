import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";

export default function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        textAlign: "center",
        px: 3,
      }}
    >
      <Typography variant="h1" sx={{ fontSize: "6rem", mb: 1, color: "text.disabled" }}>
        404
      </Typography>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Page not found
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, maxWidth: 400 }}>
        The page you're looking for doesn't exist or has been moved.
      </Typography>
      <Button
        component={RouterLink}
        to="/books"
        variant="contained"
        startIcon={<HomeIcon />}
      >
        Back to Home
      </Button>
    </Box>
  );
}

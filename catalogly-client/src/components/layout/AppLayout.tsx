import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ScrollToTop from "../ScrollToTop";
import TopBar from "./TopBar";

export default function AppLayout() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <ScrollToTop />
      <TopBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: { xs: 3, sm: 4 },
        }}
      >
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}

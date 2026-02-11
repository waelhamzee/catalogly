import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { alpha, useTheme } from "@mui/material/styles";
import TopBarActions from "./TopBarActions";
import TopBarLogo from "./TopBarLogo";
import TopBarSearch from "./TopBarSearch";

export default function TopBar() {
  const theme = useTheme();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        borderBottom: `1px solid ${theme.palette.divider}`,
        backdropFilter: "blur(8px)",
        backgroundColor: alpha(theme.palette.background.paper, 0.85),
      }}
    >
      <Toolbar
        sx={{
          maxWidth: 1200,
          width: "100%",
          mx: "auto",
          px: { xs: 1.5, sm: 2, md: 3 },
          py: { xs: 1, sm: 0.5 },
          flexWrap: "wrap",
          gap: { xs: 1, sm: 0 },
        }}
      >
        <Box sx={{ order: 1 }}>
          <TopBarLogo />
        </Box>

        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            order: 2,
          }}
        />

        <TopBarSearch />

        <Box
          sx={{
            flex: { xs: 0, md: 1 },
            minWidth: 0,
            order: { xs: 0, md: 4 },
            display: { xs: "none", md: "block" },
          }}
        />

        <TopBarActions />
      </Toolbar>
    </AppBar>
  );
}

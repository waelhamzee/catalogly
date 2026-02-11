import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";

export default function TopBarLogo() {
  const theme = useTheme();

  return (
    <Box
      component={RouterLink}
      to="/"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        textDecoration: "none",
        color: "text.primary",
        transition: "opacity 0.2s ease",
        flexShrink: 0,
      }}
    >
      <AutoStoriesIcon
        sx={{
          fontSize: { xs: 24, sm: 28 },
          color: "primary.main",
        }}
      />
      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          letterSpacing: "-0.02em",
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: { xs: "1.25rem", sm: "1.5rem", md: "2.125rem" },
        }}
      >
        Catalogly
      </Typography>
    </Box>
  );
}

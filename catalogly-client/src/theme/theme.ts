import { createTheme, alpha } from "@mui/material/styles";
import { palette } from "./palette";
import { typography } from "./typography";
import { shadows } from "./shadows";
import { components } from "./components";

const theme = createTheme({
  palette: {
    primary: {
      main: palette.forest,
      light: palette.forestLight,
      dark: palette.forestDeep,
      contrastText: palette.warmWhite,
    },
    secondary: {
      main: palette.terracotta,
      light: palette.terracottaLight,
      dark: palette.terracottaDark,
      contrastText: palette.warmWhite,
    },
    error: {
      main: palette.error,
    },
    success: {
      main: palette.success,
    },
    info: {
      main: palette.info,
    },
    background: {
      default: palette.parchment,
      paper: palette.warmWhite,
    },
    text: {
      primary: palette.bark,
      secondary: palette.walnut,
      disabled: palette.sandstone,
    },
    divider: alpha(palette.fog, 0.7),
  },
  typography,
  shape: {
    borderRadius: 8,
  },
  shadows,
  components,
});

export default theme;

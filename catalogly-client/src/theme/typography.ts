import type { ThemeOptions } from "@mui/material/styles";
import { palette } from "./palette";

const FONT_HEADING = "'Fraunces', 'Georgia', serif";
const FONT_BODY = "'General Sans', 'Helvetica Neue', 'Arial', sans-serif";

export const typography: ThemeOptions["typography"] = {
  fontFamily: FONT_BODY,
  h1: {
    fontFamily: FONT_HEADING,
    fontWeight: 600,
    fontSize: "2.75rem",
    letterSpacing: "-0.03em",
    lineHeight: 1.15,
    fontVariationSettings: "'SOFT' 50, 'WONK' 1",
  },
  h2: {
    fontFamily: FONT_HEADING,
    fontWeight: 600,
    fontSize: "2.25rem",
    letterSpacing: "-0.02em",
    lineHeight: 1.2,
    fontVariationSettings: "'SOFT' 50, 'WONK' 1",
  },
  h3: {
    fontFamily: FONT_HEADING,
    fontWeight: 500,
    fontSize: "1.75rem",
    letterSpacing: "-0.015em",
    lineHeight: 1.3,
  },
  h4: {
    fontFamily: FONT_HEADING,
    fontWeight: 500,
    fontSize: "1.5rem",
    lineHeight: 1.35,
  },
  h5: {
    fontFamily: FONT_HEADING,
    fontWeight: 500,
    fontSize: "1.2rem",
    lineHeight: 1.4,
  },
  h6: {
    fontFamily: FONT_HEADING,
    fontWeight: 500,
    fontSize: "1.05rem",
    lineHeight: 1.45,
  },
  subtitle1: {
    fontWeight: 500,
    fontSize: "1rem",
    color: palette.walnut,
    letterSpacing: "0.005em",
  },
  subtitle2: {
    fontWeight: 500,
    fontSize: "0.875rem",
    color: palette.driftwood,
    letterSpacing: "0.005em",
  },
  body1: {
    fontSize: "0.95rem",
    lineHeight: 1.75,
    color: palette.walnut,
  },
  body2: {
    fontSize: "0.85rem",
    lineHeight: 1.65,
    color: palette.driftwood,
  },
  button: {
    fontWeight: 600,
    fontSize: "0.875rem",
    letterSpacing: "0.02em",
  },
  caption: {
    fontSize: "0.75rem",
    color: palette.sandstone,
    letterSpacing: "0.015em",
  },
  overline: {
    fontSize: "0.7rem",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: palette.sage,
  },
};

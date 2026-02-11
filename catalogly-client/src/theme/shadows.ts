import { alpha, createTheme } from "@mui/material/styles";
import { palette } from "./palette";

export const shadows = [
  "none",
  `0 1px 2px ${alpha(palette.bark, 0.04)}`,
  `0 2px 4px ${alpha(palette.bark, 0.05)}`,
  `0 3px 8px ${alpha(palette.bark, 0.05)}`,
  `0 4px 12px ${alpha(palette.bark, 0.06)}`,
  `0 6px 16px ${alpha(palette.bark, 0.07)}`,
  `0 8px 24px ${alpha(palette.bark, 0.07)}`,
  `0 12px 32px ${alpha(palette.bark, 0.08)}`,
  `0 16px 40px ${alpha(palette.bark, 0.09)}`,
  ...Array(16).fill(`0 16px 40px ${alpha(palette.bark, 0.09)}`),
] as unknown as ReturnType<typeof createTheme>["shadows"];

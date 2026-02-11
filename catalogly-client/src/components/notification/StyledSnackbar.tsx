import { alpha } from "@mui/material/styles";
import { MaterialDesignContent } from "notistack";
import { styled } from "@mui/material/styles";
import { palette } from "../../theme/palette";

const elevatedShadow = `0 12px 40px ${alpha(palette.bark, 0.22)}, 0 0 0 1px ${alpha(palette.fog, 0.3)}`;

export const StyledMaterialDesignContent = styled(MaterialDesignContent)(({ theme }) => ({
  "&.notistack-MuiContent-default": {
    backgroundColor: palette.warmWhite,
    color: palette.bark,
    border: `1px solid ${alpha(palette.fog, 0.8)}`,
    boxShadow: elevatedShadow,
  },
  "&.notistack-MuiContent-success": {
    backgroundColor: palette.warmWhite,
    color: palette.forestDeep,
    border: `1px solid ${alpha(palette.success, 0.5)}`,
    boxShadow: elevatedShadow,
  },
  "&.notistack-MuiContent-error": {
    backgroundColor: palette.warmWhite,
    color: palette.bark,
    border: `1px solid ${alpha(palette.error, 0.45)}`,
    boxShadow: elevatedShadow,
  },
  "&.notistack-MuiContent-info": {
    backgroundColor: palette.warmWhite,
    color: palette.bark,
    border: `1px solid ${alpha(palette.info, 0.45)}`,
    boxShadow: elevatedShadow,
  },
  "&.notistack-MuiContent-warning": {
    backgroundColor: palette.warmWhite,
    color: palette.bark,
    border: `1px solid ${alpha(palette.terracotta, 0.45)}`,
    boxShadow: elevatedShadow,
  },
  "&.notistack-MuiContent-success, &.notistack-MuiContent-default, &.notistack-MuiContent-error, &.notistack-MuiContent-info, &.notistack-MuiContent-warning": {
    borderRadius: theme.shape.borderRadius,
    fontFamily: theme.typography.fontFamily,
    fontSize: "0.9375rem",
    fontWeight: 500,
    minWidth: 300,
    position: "relative",
    zIndex: 10000,
  },
}));

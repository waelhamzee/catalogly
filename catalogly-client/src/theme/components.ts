import { alpha } from "@mui/material/styles";
import type { ThemeOptions } from "@mui/material/styles";
import { palette } from "./palette";

export const components: ThemeOptions["components"] = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        scrollBehavior: "smooth",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      },
      "*": {
        boxSizing: "border-box",
      },
      "::selection": {
        backgroundColor: alpha(palette.sage, 0.3),
        color: palette.forestDeep,
      },
      ".notistack-SnackbarContainer": {
        zIndex: 9999,
      },
    },
  },
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        textTransform: "none",
        fontWeight: 600,
        borderRadius: 6,
        padding: "8px 22px",
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative" as const,
        overflow: "hidden",
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          opacity: 0,
          transition: "opacity 0.25s ease",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%)",
        },
        "&:hover::after": {
          opacity: 1,
        },
      },
      contained: {
        "&:hover": {
          transform: "translateY(-1px)",
          boxShadow: `0 4px 14px ${alpha(palette.bark, 0.18)}`,
        },
        "&:active": {
          transform: "translateY(0)",
          boxShadow: "none",
        },
      },
      containedPrimary: {
        background: `linear-gradient(145deg, ${palette.forest} 0%, ${palette.forestDeep} 100%)`,
        "&:hover": {
          background: `linear-gradient(145deg, ${palette.forestLight} 0%, ${palette.forest} 100%)`,
        },
        "&.MuiButton-loading .MuiButton-loadingIndicator": {
          color: "rgba(255, 255, 255)",
        },
      },
      containedSecondary: {
        background: `linear-gradient(145deg, ${palette.terracotta} 0%, ${palette.terracottaDark} 100%)`,
        "&:hover": {
          background: `linear-gradient(145deg, ${palette.terracottaLight} 0%, ${palette.terracotta} 100%)`,
        },
      },
      outlined: {
        borderColor: palette.fog,
        borderWidth: 1.5,
        color: palette.bark,
        "&:hover": {
          borderColor: palette.sage,
          backgroundColor: alpha(palette.sage, 0.06),
          borderWidth: 1.5,
        },
      },
      text: {
        color: palette.forest,
        "&:hover": {
          backgroundColor: alpha(palette.sage, 0.08),
        },
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          backgroundColor: alpha(palette.sage, 0.1),
          transform: "scale(1.05)",
        },
      },
    },
  },
  MuiCard: {
    defaultProps: {
      elevation: 0,
    },
    styleOverrides: {
      root: {
        border: `1px solid ${alpha(palette.fog, 0.7)}`,
        borderRadius: 14,
        transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        overflow: "hidden",
        background: palette.warmWhite,
        "&:hover": {
          borderColor: alpha(palette.sage, 0.4),
          boxShadow: `0 8px 28px ${alpha(palette.forest, 0.07)}, 0 0 0 1px ${alpha(palette.sage, 0.1)}`,
          transform: "translateY(-3px)",
        },
      },
    },
  },
  MuiCardMedia: {
    styleOverrides: {
      root: {
        transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "scale(1.04)",
        },
      },
    },
  },
  MuiTextField: {
    defaultProps: {
      variant: "outlined",
      size: "small",
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: 10,
        backgroundColor: palette.warmWhite,
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: palette.fog,
          borderWidth: "1.5px !important",
          transition: "all 0.2s ease",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: palette.sageMuted,
        },
        "&.Mui-focused": {
          backgroundColor: palette.white,
          boxShadow: `0 0 0 1px ${alpha(palette.sage, 0.15)}`,
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: `${palette.forest} !important`,
          borderWidth: "1.5px !important",
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 20,
        fontWeight: 500,
        fontSize: "0.8rem",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        letterSpacing: "0.01em",
      },
      outlined: {
        borderColor: palette.fog,
        borderWidth: 1.5,
        color: palette.walnut,
        "&:hover": {
          backgroundColor: alpha(palette.forest, 0.06),
          borderColor: palette.sage,
          color: palette.forest,
        },
      },
      filled: {
        backgroundColor: alpha(palette.forest, 0.1),
        color: palette.forest,
        fontWeight: 600,
        "&:hover": {
          backgroundColor: alpha(palette.forest, 0.16),
        },
      },
      colorSecondary: {
        "&.MuiChip-filled": {
          backgroundColor: alpha(palette.terracotta, 0.12),
          color: palette.terracottaDark,
          "&:hover": {
            backgroundColor: alpha(palette.terracotta, 0.2),
          },
        },
      },
    },
  },
  MuiPaper: {
    defaultProps: {
      elevation: 0,
    },
    styleOverrides: {
      root: {
        backgroundImage: "none",
      },
      outlined: {
        borderColor: alpha(palette.fog, 0.7),
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: 18,
        border: `1px solid ${alpha(palette.fog, 0.5)}`,
        boxShadow: `0 24px 48px ${alpha(palette.bark, 0.14)}`,
      },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        backgroundColor: palette.forestDeep,
        fontSize: "0.75rem",
        fontWeight: 500,
        borderRadius: 8,
        padding: "8px 14px",
        boxShadow: `0 4px 12px ${alpha(palette.bark, 0.2)}`,
      },
      arrow: {
        color: palette.forestDeep,
      },
    },
  },
  MuiDivider: {
    styleOverrides: {
      root: {
        borderColor: alpha(palette.fog, 0.5),
      },
    },
  },
  MuiSelect: {
    styleOverrides: {
      root: {
        borderRadius: 10,
      },
    },
  },
  MuiMenu: {
    styleOverrides: {
      paper: {
        borderRadius: 12,
        border: `1px solid ${alpha(palette.fog, 0.7)}`,
        boxShadow: `0 10px 28px ${alpha(palette.bark, 0.1)}`,
        marginTop: 4,
        padding: "4px",
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        margin: "2px 0",
        padding: "8px 14px",
        transition: "all 0.15s ease",
        "&:hover": {
          backgroundColor: alpha(palette.sage, 0.08),
        },
        "&.Mui-selected": {
          backgroundColor: alpha(palette.forest, 0.08),
          fontWeight: 600,
          "&:hover": {
            backgroundColor: alpha(palette.forest, 0.12),
          },
        },
      },
    },
  },
  MuiSkeleton: {
    styleOverrides: {
      root: {
        backgroundColor: alpha(palette.fog, 0.5),
        borderRadius: 8,
      },
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: {
        borderRadius: 4,
        backgroundColor: alpha(palette.fog, 0.4),
        height: 5,
      },
      bar: {
        borderRadius: 4,
        background: `linear-gradient(90deg, ${palette.forest} 0%, ${palette.sage} 100%)`,
      },
    },
  },
  MuiAlert: {
    styleOverrides: {
      root: {
        borderRadius: 10,
      },
      standardSuccess: {
        backgroundColor: alpha(palette.success, 0.08),
        color: palette.success,
      },
      standardError: {
        backgroundColor: alpha(palette.error, 0.08),
        color: palette.error,
      },
    },
  },
  MuiSwitch: {
    styleOverrides: {
      root: {
        padding: 8,
      },
      switchBase: {
        "&.Mui-checked": {
          color: palette.white,
          "& + .MuiSwitch-track": {
            backgroundColor: palette.forest,
            opacity: 1,
          },
        },
      },
      track: {
        borderRadius: 12,
        backgroundColor: palette.fog,
        opacity: 1,
      },
    },
  },
  MuiTabs: {
    styleOverrides: {
      indicator: {
        height: 2.5,
        borderRadius: 2,
        backgroundColor: palette.forest,
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        textTransform: "none",
        fontWeight: 500,
        fontSize: "0.9rem",
        transition: "color 0.2s ease",
        "&.Mui-selected": {
          fontWeight: 600,
        },
      },
    },
  },
  MuiSnackbar: {
    styleOverrides: {
      root: {
        zIndex: 9999,
      },
    },
  },
};

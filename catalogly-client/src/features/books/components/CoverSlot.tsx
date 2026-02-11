import CloseIcon from "@mui/icons-material/Close";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { alpha, useTheme } from "@mui/material/styles";

const btnSx = {
  borderRadius: "50%",
  minWidth: 28,
  minHeight: 28,
  padding: 0,
};

interface CoverSlotProps {
  cover: { id: string; preview: string; fileName?: string; file?: File };
  isPrimary: boolean;
  onRemove: () => void;
  onSetPrimary?: () => void;
}

export default function CoverSlot({
  cover,
  isPrimary,
  onRemove,
  onSetPrimary,
}: CoverSlotProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        aspectRatio: "3/4",
        borderRadius: 2,
        overflow: "hidden",
        position: "relative",
        border: `2px solid ${alpha(theme.palette.divider, 0.4)}`,
        "&:hover": { borderColor: "primary.main" },
      }}
    >
      <Box
        component="img"
        src={cover.preview}
        alt={cover.fileName || cover.file?.name || (isPrimary ? "Primary cover" : "Cover")}
        sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      <Box
        sx={{
          position: "absolute",
          ...(isPrimary ? { top: 6, right: 6 } : { inset: 0 }),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.5,
          ...(!isPrimary && {
            bgcolor: "rgba(0,0,0,0.35)",
            opacity: 0,
            transition: "opacity 0.2s",
            "&:hover": { opacity: 1 },
          }),
        }}
      >
        {isPrimary ? (
          <>
            <IconButton
              size="small"
              sx={{
                ...btnSx,
                bgcolor: "rgba(0,0,0,0.5)",
                color: "white",
                "&:hover": { bgcolor: "rgba(0,0,0,0.65)", color: "white" },
              }}
              title="Primary"
            >
              <StarIcon sx={{ fontSize: 18 }} />
            </IconButton>
            <IconButton
              size="small"
              sx={{
                ...btnSx,
                bgcolor: "rgba(0,0,0,0.5)",
                color: "white",
                "&:hover": { bgcolor: "rgba(0,0,0,0.65)", color: "white" },
              }}
              onClick={(e) => {
                e.preventDefault();
                onRemove();
              }}
              title="Remove"
            >
              <CloseIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton
              size="small"
              sx={{
                ...btnSx,
                bgcolor: "rgba(255,255,255,0.9)",
                color: "text.secondary",
                "&:hover": { bgcolor: "warning.main", color: "warning.contrastText" },
              }}
              onClick={(e) => {
                e.preventDefault();
                onSetPrimary?.();
              }}
              title="Set as primary"
            >
              <StarBorderIcon sx={{ fontSize: 18 }} />
            </IconButton>
            <IconButton
              size="small"
              sx={{
                ...btnSx,
                bgcolor: "rgba(255,255,255,0.9)",
                color: "text.secondary",
                "&:hover": { bgcolor: "error.main", color: "error.contrastText" },
              }}
              onClick={(e) => {
                e.preventDefault();
                onRemove();
              }}
              title="Remove"
            >
              <CloseIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </>
        )}
      </Box>
    </Box>
  );
}

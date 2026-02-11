import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";

interface EmptySlotProps {
  inputId: string;
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  isDragging: boolean;
  error?: boolean;
  variant: "big" | "small";
}

export default function EmptySlot({
  inputId,
  onDrop,
  onDragOver,
  onDragLeave,
  isDragging,
  error,
  variant,
}: EmptySlotProps) {
  const theme = useTheme();
  const isBig = variant === "big";

  return (
    <Box
      component="label"
      htmlFor={inputId}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      sx={{
        width: "100%",
        aspectRatio: "3/4",
        borderRadius: 2,
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: alpha(theme.palette.primary.main, 0.08),
        border: `2px dashed ${error ? theme.palette.error.main : alpha(theme.palette.primary.main, 0.3)}`,
        cursor: "pointer",
        color: "text.secondary",
        transition: "border-color 0.2s, background-color 0.2s",
        ...(isDragging && {
          borderColor: theme.palette.primary.main,
          bgcolor: alpha(theme.palette.primary.main, 0.12),
        }),
      }}
    >
      <AddPhotoAlternateOutlinedIcon
        sx={{ fontSize: isBig ? 48 : 36, mb: isBig ? 1 : 0.5 }}
      />
      <Typography variant="body2">
        {isBig ? "Drop or click" : "Add cover"}
      </Typography>
    </Box>
  );
}

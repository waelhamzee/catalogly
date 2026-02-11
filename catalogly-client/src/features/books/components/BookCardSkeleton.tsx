import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const COVER_ASPECT_RATIO = 3 / 4;

export default function BookCardSkeleton() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        minWidth: 0,
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: "0.375rem",
          padding: "0.25rem",
          flexShrink: 0,
          width: "100%",
          maxWidth: { xs: 100, sm: 120 },
          mx: "auto",
        }}
      >
        <Box
          sx={{
            width: "100%",
            aspectRatio: COVER_ASPECT_RATIO,
            overflow: "hidden",
          }}
        >
          <Skeleton
            variant="rectangular"
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: 0,
            }}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, width: "100%", px: 0.5 }}>
        <Skeleton variant="text" width="90%" height={28} sx={{ mx: "auto" }} />
        <Skeleton variant="text" width="70%" height={20} sx={{ mx: "auto" }} />
      </Box>
    </Box>
  );
}

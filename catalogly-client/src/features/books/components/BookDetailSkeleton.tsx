import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

const COVER_MAX_WIDTH = 280;

export default function BookDetailSkeleton() {
  return (
    <Box>
      <Skeleton variant="text" width="60%" height={48} sx={{ mb: 3, maxWidth: 400 }} />

      <Grid container spacing={1} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 3.5 }}>
          <Box
            sx={{
              width: "100%",
              maxWidth: COVER_MAX_WIDTH,
              aspectRatio: "3/4",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              sx={{ borderRadius: 0 }}
            />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 8.5 }}>
          <Box sx={{ mb: 2.5 }}>
            <Skeleton variant="text" width={48} height={20} sx={{ mb: 0.5 }} />
            <Skeleton variant="text" width="90%" height={28} />
          </Box>
          <Box sx={{ mb: 2.5 }}>
            <Skeleton variant="text" width={64} height={20} sx={{ mb: 0.5 }} />
            <Skeleton variant="text" width="70%" height={28} />
          </Box>
          <Box sx={{ mb: 2.5 }}>
            <Skeleton variant="text" width={80} height={20} sx={{ mb: 0.5 }} />
            <Skeleton variant="text" width="100%" height={20} />
            <Skeleton variant="text" width="100%" height={20} />
            <Skeleton variant="text" width="95%" height={20} />
            <Skeleton variant="text" width="80%" height={20} />
          </Box>
          <Box sx={{ mb: 2.5 }}>
            <Skeleton variant="text" width={56} height={20} sx={{ mb: 0.5 }} />
            <Skeleton variant="text" width="40%" height={28} />
          </Box>
          <Box sx={{ mb: 2.5 }}>
            <Skeleton variant="text" width={56} height={20} sx={{ mb: 0.5 }} />
            <Skeleton variant="text" width="50%" height={28} />
          </Box>
          <Box sx={{ mb: 2.5 }}>
            <Skeleton variant="text" width={56} height={20} sx={{ mb: 0.5 }} />
            <Skeleton variant="text" width="60%" height={28} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

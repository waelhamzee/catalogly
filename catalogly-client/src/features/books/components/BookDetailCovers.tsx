import Box from "@mui/material/Box";
import type { BookListCover } from "../types/book.types";
import { getCoverImageUrl } from "../utils/coverUrl";

const COVER_MAX_WIDTH = 280;
const SECONDARY_COVER_GAP = 2;

interface BookDetailCoversProps {
  primaryCover: BookListCover | undefined;
  otherCovers: BookListCover[];
}

const coverImgSx = {
  width: "100%",
  height: "100%",
  objectFit: "cover" as const,
  display: "block",
};

const primaryCoverSx = {
  width: "100%",
  height: "100%",
  minHeight: 0,
  aspectRatio: "3/4",
  borderRadius: 2,
  overflow: "hidden",
  border: "2px solid",
  borderColor: "primary.main",
  boxShadow: 2,
  bgcolor: "grey.200",
};

const secondaryCoverSx = {
  width: "100%",
  height: "100%",
  minHeight: 0,
  aspectRatio: "3/4",
  borderRadius: 1.5,
  overflow: "hidden",
  border: "1px solid",
  borderColor: "divider",
  boxShadow: 1,
  bgcolor: "grey.200",
};

export default function BookDetailCovers({
  primaryCover,
  otherCovers,
}: BookDetailCoversProps) {
  const primaryCoverUrl = primaryCover
    ? getCoverImageUrl(primaryCover.key)
    : null;

  if (otherCovers.length > 0) {
    const [other1, other2] = otherCovers.slice(0, 2);
    const secondaryWrapperSx = {
      display: "flex",
      gap: SECONDARY_COVER_GAP,
      gridColumn: { xs: 1, md: "1 / -1" },
      gridRow: 2,
      width: "100%",
    };
    return (
      <Box
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", md: COVER_MAX_WIDTH },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gridTemplateRows: "auto auto",
          gap: SECONDARY_COVER_GAP,
        }}
      >
        <Box
          sx={{
            ...primaryCoverSx,
            gridColumn: { xs: 1, md: "1 / -1" },
            gridRow: 1,
            aspectRatio: "auto",
          }}
        >
          {primaryCoverUrl ? (
            <Box
              component="img"
              src={primaryCoverUrl}
              alt={primaryCover?.fileName || ""}
              sx={coverImgSx}
            />
          ) : null}
        </Box>
        <Box sx={secondaryWrapperSx}>
          <Box
            key={other1.id ?? other1.key}
            sx={{
              ...secondaryCoverSx,
              flex: "0 0 calc(50% - 4px)",
              aspectRatio: "auto",
              minWidth: 0,
            }}
          >
            <Box
              component="img"
              src={getCoverImageUrl(other1.key)}
              alt={other1.fileName || ""}
              sx={coverImgSx}
            />
          </Box>
          {other2 && (
            <Box
              key={other2.id ?? other2.key}
            sx={{
              ...secondaryCoverSx,
              flex: "0 0 calc(50% - 4px)",
              aspectRatio: "auto",
              minWidth: 0,
            }}
          >
            <Box
              component="img"
              src={getCoverImageUrl(other2.key)}
                alt={other2.fileName || ""}
                sx={coverImgSx}
              />
            </Box>
          )}
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", maxWidth: { xs: 240, sm: COVER_MAX_WIDTH } }}>
      <Box sx={primaryCoverSx}>
        {primaryCoverUrl ? (
          <Box
            component="img"
            src={primaryCoverUrl}
            alt={primaryCover?.fileName || ""}
            sx={coverImgSx}
          />
        ) : null}
      </Box>
    </Box>
  );
}

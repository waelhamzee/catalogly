import FilterListIcon from "@mui/icons-material/FilterList";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import { useCallback, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { BookFilters } from "../components/BookFilters";
import BookList from "../components/BookList";
import type { UseBooksFilters } from "../hooks/useBooks";
import { parseIdsFromSearchParams } from "../utils/parseIdsFromSearchParams";

const FILTERS_WIDTH = 240;

export default function Books() {
  const { query: queryParam } = useParams<"query">();
  const [searchParams] = useSearchParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const searchQuery =
    queryParam != null ? decodeURIComponent(queryParam) : undefined;

  const filters = useMemo<UseBooksFilters>(() => {
    return {
      authorIds: parseIdsFromSearchParams(searchParams, "authorIds"),
      genreIds: parseIdsFromSearchParams(searchParams, "genreIds"),
      languageIds: parseIdsFromSearchParams(searchParams, "languageIds"),
    };
  }, [searchParams]);

  const [counts, setCounts] = useState<{
    loaded: number;
    total: number;
  } | null>(null);
  const onCountsChange = useCallback((loaded: number, total: number) => {
    setCounts({ loaded, total });
  }, []);

  const activeFilterCount =
    (filters.authorIds?.length ?? 0) +
    (filters.genreIds?.length ?? 0) +
    (filters.languageIds?.length ?? 0);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        gap: 2,
      }}
    >
      {searchQuery != null && searchQuery !== "" && (
        <Box sx={{ borderBottom: 1, borderColor: "divider", pb: 2 }}>
          <Typography variant="h6" component="p">
            &quot;{searchQuery}&quot;
          </Typography>
          {counts != null && (
            <Typography variant="body2" color="text.secondary">
              Showing {counts.loaded} of {counts.total} books
            </Typography>
          )}
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          flex: 1,
          minHeight: 0,
        }}
      >
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            alignItems: "center",
            gap: 1,
          }}
        >
          <Button
            variant="outlined"
            size="small"
            startIcon={<FilterListIcon />}
            onClick={() => setFilterOpen(true)}
          >
            Filters
            {activeFilterCount > 0 && (
              <Box
                component="span"
                sx={{
                  ml: 1,
                  px: 0.75,
                  py: 0.25,
                  borderRadius: 1,
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                }}
              >
                {activeFilterCount}
              </Box>
            )}
          </Button>
        </Box>

        <Drawer
          anchor="left"
          open={filterOpen}
          onClose={() => setFilterOpen(false)}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: FILTERS_WIDTH,
              pt: 3,
              px: 2,
              boxSizing: "border-box",
            },
          }}
        >
          <BookFilters />
        </Drawer>

        <Box
          sx={{
            display: { xs: "none", md: "block" },
            width: FILTERS_WIDTH,
            flexShrink: 0,
            borderRight: 1,
            borderColor: "divider",
            pr: 2,
            alignSelf: "flex-start",
            position: "sticky",
            top: 30,
          }}
        >
          <BookFilters />
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <BookList
            query={searchQuery}
            filters={filters}
            onCountsChange={onCountsChange}
          />
        </Box>
      </Box>
    </Box>
  );
}

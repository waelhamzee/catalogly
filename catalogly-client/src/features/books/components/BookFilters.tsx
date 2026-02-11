import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { memo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useGenres } from "../hooks/useGenres";
import { useLanguages } from "../hooks/useLanguages";
import { useTopAuthors } from "../hooks/useTopAuthors";
import { parseIdsFromSearchParams } from "../utils/parseIdsFromSearchParams";

const SECTION_HEIGHT = 200;
const SKELETON_ROWS = 5;

function FilterSkeleton() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {Array.from({ length: SKELETON_ROWS }).map((_, i) => (
        <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Skeleton
            variant="rectangular"
            width={18}
            height={18}
            sx={{ flexShrink: 0 }}
          />
          <Skeleton variant="text" width="60%" sx={{ fontSize: "0.75rem" }} />
        </Box>
      ))}
    </Box>
  );
}

function BookFiltersInner() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: genres = [], isLoading: genresLoading } = useGenres();
  const { data: languages = [], isLoading: languagesLoading } = useLanguages();
  const { data: authors = [], isLoading: authorsLoading } = useTopAuthors();

  const selectedAuthorIds = parseIdsFromSearchParams(searchParams, "authorIds");
  const selectedGenreIds = parseIdsFromSearchParams(searchParams, "genreIds");
  const selectedLanguageIds = parseIdsFromSearchParams(
    searchParams,
    "languageIds",
  );

  const setAuthorIds = useCallback(
    (ids: number[]) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (ids.length > 0) {
            next.set("authorIds", ids.join(","));
          } else {
            next.delete("authorIds");
          }
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const setGenreIds = useCallback(
    (ids: number[]) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (ids.length > 0) {
            next.set("genreIds", ids.join(","));
          } else {
            next.delete("genreIds");
          }
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const setLanguageIds = useCallback(
    (ids: number[]) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (ids.length > 0) {
            next.set("languageIds", ids.join(","));
          } else {
            next.delete("languageIds");
          }
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const handleGenreChange = useCallback(
    (genreId: number, checked: boolean) => {
      const next = checked
        ? [...selectedGenreIds, genreId]
        : selectedGenreIds.filter((id) => id !== genreId);
      setGenreIds(next);
    },
    [selectedGenreIds, setGenreIds],
  );

  const handleAuthorChange = useCallback(
    (authorId: number, checked: boolean) => {
      const next = checked
        ? [...selectedAuthorIds, authorId]
        : selectedAuthorIds.filter((id) => id !== authorId);
      setAuthorIds(next);
    },
    [selectedAuthorIds, setAuthorIds],
  );

  const handleLanguageChange = useCallback(
    (languageId: number, checked: boolean) => {
      const next = checked
        ? [...selectedLanguageIds, languageId]
        : selectedLanguageIds.filter((id) => id !== languageId);
      setLanguageIds(next);
    },
    [selectedLanguageIds, setLanguageIds],
  );

  return (
    <>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 2, fontWeight: 600 }}
      >
        Filters
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ display: "block", mb: 1 }}
      >
        Authors
      </Typography>
      <Box
        sx={{
          maxHeight: SECTION_HEIGHT,
          overflowY: "auto",
          mb: 3,
        }}
      >
        {authorsLoading ? (
          <FilterSkeleton />
        ) : (
          authors.map((author) => (
            <FormControlLabel
              key={author.id}
              control={
                <Checkbox
                  size="small"
                  checked={selectedAuthorIds.includes(author.id)}
                  onChange={(_, checked) =>
                    handleAuthorChange(author.id, checked)
                  }
                />
              }
              label={
                <Typography variant="caption" color="text.primary">
                  {author.name}
                </Typography>
              }
              sx={{ display: "block", mr: 0 }}
            />
          ))
        )}
      </Box>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ display: "block", mb: 1 }}
      >
        Genres
      </Typography>
      <Box
        sx={{
          maxHeight: SECTION_HEIGHT,
          overflowY: "auto",
          mb: 3,
        }}
      >
        {genresLoading ? (
          <FilterSkeleton />
        ) : (
          genres.map((genre) => (
            <FormControlLabel
              key={genre.id}
              control={
                <Checkbox
                  size="small"
                  checked={selectedGenreIds.includes(genre.id)}
                  onChange={(_, checked) =>
                    handleGenreChange(genre.id, checked)
                  }
                />
              }
              label={
                <Typography variant="caption" color="text.primary">
                  {genre.name}
                </Typography>
              }
              sx={{ display: "block", mr: 0 }}
            />
          ))
        )}
      </Box>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ display: "block", mb: 1 }}
      >
        Languages
      </Typography>
      <Box
        sx={{
          maxHeight: SECTION_HEIGHT,
          overflowY: "auto",
        }}
      >
        {languagesLoading ? (
          <FilterSkeleton />
        ) : (
          languages.map((language) => (
            <FormControlLabel
              key={language.id}
              control={
                <Checkbox
                  size="small"
                  checked={selectedLanguageIds.includes(language.id)}
                  onChange={(_, checked) =>
                    handleLanguageChange(language.id, checked)
                  }
                />
              }
              label={
                <Typography variant="caption" color="text.primary">
                  {language.name}
                </Typography>
              }
              sx={{ display: "block", mr: 0 }}
            />
          ))
        )}
      </Box>
    </>
  );
}

export const BookFilters = memo(BookFiltersInner);

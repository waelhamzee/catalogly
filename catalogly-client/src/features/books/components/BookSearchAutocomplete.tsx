import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { BookListItem } from "../types/book.types";
import BookSearchOption from "./BookSearchOption";
import { useBooksSearch } from "../hooks/useBooksSearch";

const DEBOUNCE_MS = 300;
const SEARCH_MIN_LENGTH = 2;

const VIEW_ALL_ID = "__view_all";

type ViewAllOption = { id: typeof VIEW_ALL_ID; viewAll: true; searchText: string };
type AutocompleteOption = BookListItem | ViewAllOption;

function isViewAllOption(option: AutocompleteOption): option is ViewAllOption {
  return "viewAll" in option && option.viewAll === true;
}

export default function BookSearchAutocomplete() {
  const navigate = useNavigate();
  const { query: queryParam } = useParams<"query">();
  const [inputValue, setInputValue] = useState(
    () => (queryParam != null ? decodeURIComponent(queryParam) : "")
  );

  const [debouncedQ, setDebouncedQ] = useState("");

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedQ(inputValue.trim());
    }, DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [inputValue]);

  const { data: books = [], isFetching } = useBooksSearch(debouncedQ);

  const options = useMemo<AutocompleteOption[]>(() => {
    const viewAllOption: ViewAllOption = {
      id: VIEW_ALL_ID,
      viewAll: true,
      searchText: debouncedQ,
    };
    const showViewAll =
      books.length > 0 &&
      debouncedQ.length >= SEARCH_MIN_LENGTH;
    return showViewAll ? [...books, viewAllOption] : books;
  }, [books, debouncedQ]);

  const applySearch = useCallback(() => {
    const trimmed = inputValue.trim();
    if (trimmed) {
      navigate(`/books/${encodeURIComponent(trimmed)}`);
    } else {
      navigate("/books");
    }
  }, [inputValue, navigate]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        applySearch();
      }
    },
    [applySearch]
  );

  const handleChange = useCallback(
    (_: unknown, value: AutocompleteOption | null) => {
      if (!value) return;
      if (isViewAllOption(value)) {
        applySearch();
      } else {
        setInputValue("");
        navigate(`/book/${value.id}`);
      }
    },
    [applySearch, navigate]
  );

  return (
    <Autocomplete<AutocompleteOption>
      options={options}
      inputValue={inputValue}
      onInputChange={(_, v) => setInputValue(v)}
      onChange={handleChange}
      getOptionLabel={(option) =>
        isViewAllOption(option)
          ? `View all results for "${option.searchText}"`
          : option.title
      }
      filterOptions={(x) => x}
      clearOnBlur={false}
      loading={isFetching}
      noOptionsText={
        debouncedQ.length >= SEARCH_MIN_LENGTH
          ? "No books found"
          : "Type at least 2 characters to search"
      }
      slotProps={{
        paper: { sx: { borderRadius: "2px" } },
      }}
      sx={{ width: "100%", minWidth: 0 }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search books..."
          onKeyDown={handleKeyDown}
          slotProps={{
            input: {
              ...params.InputProps,
              startAdornment: (
                <>
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "text.disabled", fontSize: 22 }} />
                  </InputAdornment>
                  {params.InputProps.startAdornment}
                </>
              ),
            },
          }}
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
          }}
        />
      )}
      renderOption={(props, option) =>
        isViewAllOption(option) ? (
          <li {...props} key={option.id}>
            <Box sx={{ py: 0.5 }}>
              <Typography variant="body2" color="primary">
                View all results for &quot;{option.searchText}&quot;
              </Typography>
            </Box>
          </li>
        ) : (
          <BookSearchOption key={option.id} book={option} liProps={props} />
        )
      }
    />
  );
}

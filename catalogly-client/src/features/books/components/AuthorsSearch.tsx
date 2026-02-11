import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useMemo, useState } from "react";
import type { Author, SelectedAuthor } from "../types/book.types";
import { useSearchAuthors } from "../hooks/useSearchAuthors";

type AuthorAutocompleteOption = SelectedAuthor;

function toOption(author: Author): AuthorAutocompleteOption {
  return { type: "existing", id: author.id, name: author.name };
}

export interface AuthorsSearchProps {
  value: SelectedAuthor[];
  onChange: (authors: SelectedAuthor[]) => void;
  onBlur?: () => void;
  error?: boolean;
  helperText?: string;
  required?: boolean;
}

export default function AuthorsSearch({
  value,
  onChange,
  onBlur,
  error,
  helperText,
  required,
}: AuthorsSearchProps) {
  const [inputValue, setInputValue] = useState("");
  const searchQuery = inputValue.trim();
  const { data: searchResults = [], isFetching: loading } =
    useSearchAuthors(searchQuery);

  const options: AuthorAutocompleteOption[] = useMemo(() => {
    const existingOptions = searchResults.map(toOption);
    const alreadySelectedIds = new Set(
      value
        .filter((a): a is SelectedAuthor & { type: "existing"; id: number } => a.type === "existing")
        .map((a) => a.id)
    );
    const alreadySelectedNewNames = new Set(
      value
        .filter((a): a is SelectedAuthor & { type: "new"; name: string } => a.type === "new")
        .map((a) => a.name)
    );
    const filteredExisting = existingOptions.filter((o) => {
      if (o.type !== "existing") return false;
      return !alreadySelectedIds.has(o.id);
    });
    const addNewOption: AuthorAutocompleteOption | null =
      searchQuery.length >= 2 && !alreadySelectedNewNames.has(searchQuery)
        ? { type: "new", name: searchQuery }
        : null;
    return addNewOption ? [addNewOption, ...filteredExisting] : filteredExisting;
  }, [searchQuery, searchResults, value]);

  const getOptionLabel = (option: AuthorAutocompleteOption) =>
    option.type === "new" ? `Add as new "${option.name}"` : option.name;

  const isOptionEqualToValue = (option: AuthorAutocompleteOption, val: AuthorAutocompleteOption) => {
    if (option.type !== val.type) return false;
    return option.type === "new" ? option.name === val.name : option.id === (val as { id: number }).id;
  };

  return (
    <Autocomplete<AuthorAutocompleteOption, true>
      multiple
      value={value}
      onChange={(_, next) => onChange(next)}
      inputValue={inputValue}
      onInputChange={(_, v) => setInputValue(v)}
      onBlur={onBlur}
      options={options}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          required={required}
          label="Authors"
          placeholder='Search or add as new (e.g. "Add as new John")'
          error={error}
          helperText={helperText ?? ""}
        />
      )}
      sx={{ mb: 2.5 }}
    />
  );
}

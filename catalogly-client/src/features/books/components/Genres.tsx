import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useMemo } from "react";
import type { Genre } from "../types/book.types";
import { useGenres } from "../hooks/useGenres";

export interface GenresProps {
  value: number[];
  onChange: (genreIds: number[]) => void;
  onBlur?: () => void;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
}

export default function Genres({
  value,
  onChange,
  onBlur,
  error,
  helperText,
  disabled,
  required,
}: GenresProps) {
  const { data: genres = [], isLoading: genresLoading } = useGenres();

  const selected = useMemo(
    () => genres.filter((g) => value.includes(g.id)),
    [genres, value]
  );

  return (
    <Autocomplete<Genre, true>
      multiple
      value={selected}
      onChange={(_, next) => onChange(next.map((g) => g.id))}
      onBlur={onBlur}
      options={genres}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, val) => option.id === val.id}
      disabled={disabled ?? genresLoading}
      renderInput={(params) => (
        <TextField
          {...params}
          required={required}
          label="Genres"
          placeholder="Select genres"
          error={error}
          helperText={helperText ?? ""}
        />
      )}
      sx={{ mb: 2.5 }}
    />
  );
}

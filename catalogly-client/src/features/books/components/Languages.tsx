import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useMemo } from "react";
import type { Language } from "../types/book.types";
import { useLanguages } from "../hooks/useLanguages";

export interface LanguagesProps {
  value: number | null;
  onChange: (languageId: number | null) => void;
  onBlur?: () => void;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
}

export default function Languages({
  value,
  onChange,
  onBlur,
  error,
  helperText,
  disabled,
}: LanguagesProps) {
  const { data: languages = [], isLoading: languagesLoading } = useLanguages();

  const selected = useMemo(
    () => languages.find((l) => l.id === value) ?? null,
    [languages, value]
  );

  return (
    <Autocomplete<Language>
      value={selected}
      onChange={(_, next) => onChange(next?.id ?? null)}
      onBlur={onBlur}
      options={languages}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, val) => option.id === val?.id}
      disabled={disabled ?? languagesLoading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Language"
          placeholder="Select language"
          error={error}
          helperText={helperText ?? ""}
        />
      )}
      sx={{ mb: 2.5 }}
    />
  );
}

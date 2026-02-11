import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import Typography from "@mui/material/Typography";
import { useCallback, useId, useState } from "react";
import CoverSlot from "./CoverSlot";
import EmptySlot from "./EmptySlot";

const MAX_COVERS = 3;
const MAX_FILE_SIZE = 1024 * 1024;

export interface CoverSlot {
  id: string;
  preview: string;
  isPrimary: boolean;
  file?: File;
  coverId?: number;
  key?: string;
  fileName?: string;
  contentType?: string;
}

export interface BookCoverUploadProps {
  value: CoverSlot[];
  onChange: (covers: CoverSlot[]) => void;
  onBlur?: () => void;
  error?: boolean;
  helperText?: string;
}

export default function BookCoverUpload({
  value,
  onChange,
  onBlur,
  error,
  helperText,
}: BookCoverUploadProps) {
  const inputId = useId();
  const [isDragging, setIsDragging] = useState(false);

  const setPrimary = useCallback(
    (id: string) =>
      onChange(value.map((c) => ({ ...c, isPrimary: c.id === id }))),
    [value, onChange]
  );

  const remove = useCallback(
    (id: string) => {
      const next = value.filter((c) => c.id !== id);
      if (next.length > 0 && next.every((c) => !c.isPrimary)) {
        next[0].isPrimary = true;
      }
      onChange(next);
    },
    [value, onChange]
  );

  const addFiles = useCallback(
    (files: FileList | null) => {
      if (!files?.length) return;

      const remaining = MAX_COVERS - value.length;
      if (remaining <= 0) return;

      const toAdd = Array.from(files)
        .filter((f) => f.type.startsWith("image/") && f.size <= MAX_FILE_SIZE)
        .slice(0, remaining);

      if (toAdd.length === 0) return;

      const needPrimary = value.length === 0;

      const newSlots: CoverSlot[] = toAdd.map((file, i) => ({
        id: `new-${Date.now()}-${i}-${Math.random().toString(36).slice(2)}`,
        file,
        preview: URL.createObjectURL(file),
        isPrimary: needPrimary && i === 0,
      }));

      const next = [...value, ...newSlots];

      if (needPrimary && newSlots.length > 0) newSlots[0].isPrimary = true;

      onChange(next);
    },
    [value, onChange]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      addFiles(e.dataTransfer.files);
    },
    [addFiles]
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  
  const onDragLeave = useCallback(() => setIsDragging(false), []);

  const primary = value.find((c) => c.isPrimary);
  const others = value.filter((c) => !c.isPrimary);
  const canAdd = value.length < MAX_COVERS;
  const showSecondRow = value.length >= 1;

  return (
    <Box onBlur={onBlur} sx={{ width: "100%" }}>
      <input
        id={inputId}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) => {
          addFiles(e.target.files);
          e.target.value = "";
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          maxWidth: 280,
        }}
      >
        <Box sx={{ width: "100%" }}>
          {primary ? (
            <CoverSlot
              cover={primary}
              isPrimary
              onRemove={() => remove(primary.id)}
            />
          ) : (
            <EmptySlot
              inputId={inputId}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              isDragging={isDragging}
              error={error}
              variant="big"
            />
          )}
        </Box>

        {showSecondRow && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 1.5,
            }}
          >
            {others[0] ? (
              <CoverSlot
                cover={others[0]}
                isPrimary={false}
                onRemove={() => remove(others[0].id)}
                onSetPrimary={() => setPrimary(others[0].id)}
              />
            ) : canAdd ? (
              <EmptySlot
                inputId={inputId}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                isDragging={isDragging}
                error={error}
                variant="small"
              />
            ) : null}
            {others[1] ? (
              <CoverSlot
                cover={others[1]}
                isPrimary={false}
                onRemove={() => remove(others[1].id)}
                onSetPrimary={() => setPrimary(others[1].id)}
              />
            ) : canAdd && others.length === 1 ? (
              <EmptySlot
                inputId={inputId}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                isDragging={isDragging}
                error={error}
                variant="small"
              />
            ) : null}
          </Box>
        )}
      </Box>
      {error && helperText && (
        <FormHelperText error sx={{ mt: 1 }}>
          {helperText}
        </FormHelperText>
      )}
      <Typography component="p" variant="caption" sx={{ mt: 1, color: "text.secondary" }}>
        Max 1MB per image.
      </Typography>
    </Box>
  );
}

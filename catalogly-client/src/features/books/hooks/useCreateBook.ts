import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createBook } from "../api/books.api";
import type { CreateBookPayload } from "../types/book.types";
import { enqueueSnackbar } from "notistack";

export function useCreateBook() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateBookPayload) => createBook(payload),
    onSuccess: (_, payload) => {
      if (payload.id != null) {
        queryClient.invalidateQueries({ queryKey: ["book", Number(payload.id)] });
        enqueueSnackbar(`"${payload.title}" updated successfully`, {
          variant: "success",
        });
      } else {
        enqueueSnackbar(`"${payload.title}" created successfully`, {
          variant: "success",
        });
        navigate("/books");
      }
    },
  });
}

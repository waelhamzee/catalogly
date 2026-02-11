import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { deleteBook } from "../api/books.api";

export function useDeleteBook() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: (id: number) => deleteBook(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      enqueueSnackbar("Book deleted successfully", {
        variant: "success",
      });
      navigate("/books");
    },
  });
}

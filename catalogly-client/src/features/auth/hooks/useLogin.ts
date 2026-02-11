import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth.api";
import { useAuth } from "./useAuth";

export function useLogin() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      if (res.success && res.data?.user) {
        setUser(res.data.user);
      }
      navigate("/books");
    },
  });
}

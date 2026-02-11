import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth.api";
import { useAuth } from "./useAuth";

export function useRegister() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: register,
    onSuccess: (res) => {
      if (res.success && res.data?.user) {
        setUser(res.data.user);
      }
      navigate("/books");
    },
  });
}

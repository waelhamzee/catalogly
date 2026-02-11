import { createContext } from "react";
import type { User } from "../types/auth.types";

export interface AuthContextValue {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

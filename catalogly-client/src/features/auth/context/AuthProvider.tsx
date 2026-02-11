import { useEffect, useState } from "react";
import { getMe, logout as logoutApi } from "../api/auth.api";
import type { User } from "../types/auth.types";
import { AuthContext, type AuthContextValue } from "./AuthContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = async () => {
    try {
      await logoutApi();
    } finally {
      setUser(null);
    }
  };

  useEffect(() => {
    let cancelled = false;

    getMe()
      .then((res) => {
        if (!cancelled && res.success && res.data) {
          setUser(res.data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setUser(null);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const value: AuthContextValue = {
    user,
    isLoggedIn: Boolean(user),
    isLoading,
    setUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

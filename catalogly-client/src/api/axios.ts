import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL ?? "";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthRequest =
      error.config?.url?.startsWith("/auth/") ||
      error.config?.url?.startsWith("/users/me");

    if (error.response?.status === 401 && !isAuthRequest) {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

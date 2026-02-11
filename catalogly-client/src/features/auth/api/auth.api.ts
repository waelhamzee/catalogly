import { api } from "../../../api/axios";
import type { ApiSuccessResponse } from "../../../types/api.types";
import type { User } from "../types/auth.types";

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface AuthData {
  token: string;
  user: User;
}

export const login = async (
  payload: LoginPayload
): Promise<ApiSuccessResponse<AuthData>> => {
  const response = await api.post<ApiSuccessResponse<AuthData>>(
    "/auth/login",
    payload
  );
  return response.data;
};

export const register = async (
  payload: RegisterPayload
): Promise<ApiSuccessResponse<AuthData>> => {
  const response = await api.post<ApiSuccessResponse<AuthData>>(
    "/auth/register",
    payload
  );
  return response.data;
};

export const getMe = async (): Promise<ApiSuccessResponse<User>> => {
  const response = await api.get<ApiSuccessResponse<User>>("/users/me");
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

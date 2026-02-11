import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../types/api.types";

const DEFAULT_MESSAGE = "Something went wrong";

export function getApiErrorMessage(
  error: unknown,
  defaultMessage = DEFAULT_MESSAGE
): string {
  const message = (error as AxiosError<ApiErrorResponse> | undefined)?.response
    ?.data?.message;
  return typeof message === "string" ? message : defaultMessage;
}

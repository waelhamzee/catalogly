import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors.js";
import { HTTP_INTERNAL_SERVER_ERROR } from "../constants/httpCodes.js";
import { env } from "../config/env.js";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  console.error("Error:", err);

  return res.status(HTTP_INTERNAL_SERVER_ERROR).json({
    success: false,
    message: env.NODE_ENV === "development" ? err.message : "Internal server error",
  });
};

import type { Response } from "express";

export class ApiResponse {
  static success<T>(res: Response, data: T, statusCode: number = 200) {
    return res.status(statusCode).json({
      success: true,
      data,
    });
  }

  static error(res: Response, message: string, statusCode: number = 500) {
    return res.status(statusCode).json({
      success: false,
      message,
    });
  }

  static created<T>(res: Response, data: T) {
    return res.status(201).json({
      success: true,
      data,
    });
  }

  static noContent(res: Response) {
    return res.status(204).send();
  }
}

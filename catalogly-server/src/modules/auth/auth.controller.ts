import type { Request, Response } from "express";
import { cookieConfig } from "../../config/cookie.js";
import { ACCESS_TOKEN_COOKIE_NAME } from "../../constants/cookie.js";
import { HTTP_CREATED, HTTP_OK } from "../../constants/httpCodes.js";
import { BadRequestError, UnauthorizedError } from "../../utils/errors.js";
import { ApiResponse } from "../../utils/response.js";
import { AuthService } from "./auth.service.js";

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      throw new BadRequestError("All fields are required");
    }

    const result = await authService.register({ firstName, lastName, email, password });

    res.cookie(ACCESS_TOKEN_COOKIE_NAME, result.token, cookieConfig);

    return ApiResponse.success(res, result, HTTP_CREATED);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError("Email and password are required");
    }

    const result = await authService.login(email, password);
   
    res.cookie(ACCESS_TOKEN_COOKIE_NAME, result.token, cookieConfig);

    return ApiResponse.success(res, result, HTTP_OK);
  }

  async logout(req: Request, res: Response) {
    res.clearCookie(ACCESS_TOKEN_COOKIE_NAME);
    return ApiResponse.success(
      res,
      { message: "Logged out successfully" },
      HTTP_OK,
    );
  }
}

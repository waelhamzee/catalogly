import type { Request, Response } from "express";
import { UserService } from "./user.service.js";
import { ApiResponse } from "../../utils/response.js";
import { HTTP_OK } from "../../constants/httpCodes.js";

const userService = new UserService();

export class UserController {
  async getMe(req: Request, res: Response) {
    const user = await userService.getUserById(req.user!.id);
    return ApiResponse.success(res, user, HTTP_OK);
  }
}

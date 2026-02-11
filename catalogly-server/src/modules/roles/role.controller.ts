import type { Request, Response } from "express";
import { ApiResponse } from "../../utils/response.js";
import { RoleService } from "./role.service.js";

const roleService = new RoleService();

export class RoleController {
  async createRole(req: Request, res: Response) {
    const role = await roleService.createRole(req.body.name);
    return ApiResponse.created(res, role);
  }
}

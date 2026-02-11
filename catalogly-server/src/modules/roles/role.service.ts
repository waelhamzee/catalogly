import { Role } from "./role.model.js";
import { NotFoundError, ConflictError } from "../../utils/errors.js";

export class RoleService {
  async getRoleByName(name: string) {
    const role = await Role.findOne({ where: { name } });
    if (!role) {
      throw new NotFoundError("Role not found");
    }
    return role;
  }

  async createRole(name: string) {
    const existingRole = await Role.findOne({ where: { name } });
    if (existingRole) {
      throw new ConflictError("Role already exists");
    }
    return await Role.create({ name });
  }
}

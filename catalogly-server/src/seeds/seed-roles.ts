import { RoleService } from "../modules/roles/role.service.js";

const roleService = new RoleService();

const ROLES = ["admin", "user"];

export const seedRoles = async () => {
  for (const name of ROLES) {
    try {
      await roleService.createRole(name);
      console.log(`Role "${name}" created.`);
    } catch {
      console.log(`Role "${name}" already exists, skipping.`);
    }
  }
};

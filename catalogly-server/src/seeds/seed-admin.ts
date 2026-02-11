import { RoleService } from "../modules/roles/role.service.js";
import { UserService } from "../modules/users/user.service.js";

const roleService = new RoleService();
const userService = new UserService();

export const seedAdmin = async () => {
  const adminRole = await roleService.getRoleByName("admin");

  try {
    await userService.createUser({
      firstName: "admin",
      lastName: "test",
      email: "admin@gmail.com",
      password: "Password123!",
      roleId: adminRole.id,
    });
    console.log("Admin user created.");
  } catch {
    console.log("Admin user already exists, skipping.");
  }
};
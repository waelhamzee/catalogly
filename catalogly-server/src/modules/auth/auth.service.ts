import { UserService } from "../users/user.service.js";
import { NotFoundError, UnauthorizedError } from "../../utils/errors.js";
import { Role } from "../roles/role.model.js";
import { JwtService } from "../../services/jwt.service.js";

const userService = new UserService();
const jwtService = new JwtService();

export class AuthService {
  async register(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    const role = await Role.findOne({ where: { name: "user" } });
    if (!role) {
      throw new NotFoundError("Error creating user");
    }

    const user = await userService.createUser({
      ...data,
      roleId: role.id,
    });

    const token = jwtService.sign({
      id: user.id,
      email: data.email,
      roleId: role.id,
    });

    return { token, user };
  }

  async login(email: string, password: string) {
    try {
      const user = await userService.getUserByEmail(email);

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        throw new UnauthorizedError("Invalid credentials");
      }

      const token = jwtService.sign({
        id: user.id,
        email: user.email,
        roleId: user.roleId,
      });

      return {
        token,
        user: user.getDecryptedData(),
      };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedError("Invalid credentials");
    }
  }
}

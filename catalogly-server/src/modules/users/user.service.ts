import { ConflictError, NotFoundError } from "../../utils/errors.js";
import { Role } from "../roles/role.model.js";
import { User } from "./user.model.js";
import { encrypt } from "../../utils/crypto.js";

export class UserService {
  async getAllUsers() {
    const users = await User.findAll({
      include: [{ model: Role, as: "role" }],
      order: [["createdAt", "DESC"]],
    });
    return users.map((user) => user.getDecryptedData());
  }

  async getUserById(id: number) {
    const user = await User.findByPk(id, {
      include: [{ model: Role, as: "role" }],
    });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user.getDecryptedData();
  }

  async getUserByEmail(email: string) {
    const encryptedEmail = encrypt(email.trim().toLowerCase());

    const user = await User.findOne({
      where: { email: encryptedEmail },
      include: [{ model: Role, as: "role" }],
    });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user;
  }

  async createUser(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roleId: number;
  }) {
    const encryptedEmail = encrypt(userData.email.trim().toLowerCase());
    const existingUser = await User.findOne({
      where: { email: encryptedEmail },
    });
    if (existingUser) {
      throw new ConflictError("User with this email already exists");
    }

    const user = await User.create(userData);
    return user.getDecryptedData();
  }
}

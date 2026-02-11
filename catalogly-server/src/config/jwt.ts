import type { SignOptions } from "jsonwebtoken";
import { env } from "./env.js";

export const jwtConfig: SignOptions = {
  expiresIn: parseInt(env.JWT_EXPIRES_IN, 10),
};

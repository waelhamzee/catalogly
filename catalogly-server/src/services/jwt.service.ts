import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { jwtConfig } from "../config/jwt.js";
import { UnauthorizedError } from "../utils/errors.js";

export interface TokenPayload {
  id: number;
  email: string;
  roleId: number;
}

export class JwtService {
  sign(payload: TokenPayload) {
    return jwt.sign(payload, env.JWT_SECRET, jwtConfig);
  }

  verify(token: string) {
    try {
      return jwt.verify(token, env.JWT_SECRET) as unknown as TokenPayload;
    } catch {
      throw new UnauthorizedError("Invalid access key");
    }
  }
}

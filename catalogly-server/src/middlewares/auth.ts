import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Role } from "../modules/roles/role.model.js";
import { env } from "../config/env.js";
import { UnauthorizedError, ForbiddenError } from "../utils/errors.js";
import { ACCESS_TOKEN_COOKIE_NAME } from "../constants/cookie.js";

interface JwtPayload {
  id: number;
  email: string;
  roleId: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token =
    req.cookies[ACCESS_TOKEN_COOKIE_NAME] ||
    req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new UnauthorizedError("Authentication required");
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as unknown as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    throw new UnauthorizedError("Invalid or expired token");
  }
};

export const authorize = (...roleIds: number[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new UnauthorizedError("Authentication required");
    }

    if (!roleIds.includes(req.user.roleId)) {
      throw new ForbiddenError("Insufficient permissions");
    }

    next();
  };
};

export const authorizeAdmin = () => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    if (!req.user) {
      throw new UnauthorizedError("Authentication required");
    }
    const adminRole = await Role.findOne({ where: { name: "admin" } });
    if (!adminRole || req.user.roleId !== adminRole.id) {
      throw new ForbiddenError("Insufficient permissions");
    }
    next();
  };
};

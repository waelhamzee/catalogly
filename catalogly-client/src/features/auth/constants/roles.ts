export const ROLES = {
  ADMIN: "admin",
} as const;

export type RoleName = (typeof ROLES)[keyof typeof ROLES];
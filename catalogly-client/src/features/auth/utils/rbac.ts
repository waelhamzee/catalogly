import type { User } from "../types/auth.types";
import { ROLES, type RoleName } from "../constants/roles";
import { type Permission } from "../constants/permissions";

const ROLE_PERMISSIONS: Record<RoleName, readonly Permission[]> = {
  [ROLES.ADMIN]: ["books:create", "books:edit"],
};

const normalizedRole = (name: string | undefined): RoleName | null => {
  if (!name) return null;
  const lower = name.toLowerCase();
  if (lower === ROLES.ADMIN) return ROLES.ADMIN;
  return null;
};

export function hasRole(user: User | null, role: RoleName): boolean {
  if (!user?.role?.name) return false;
  return normalizedRole(user.role.name) === role;
}

export function can(user: User | null, permission: Permission): boolean {
  const role = user?.role?.name ? normalizedRole(user.role.name) : null;
  if (!role) return false;
  const permissions = ROLE_PERMISSIONS[role];
  return permissions?.includes(permission) ?? false;
}
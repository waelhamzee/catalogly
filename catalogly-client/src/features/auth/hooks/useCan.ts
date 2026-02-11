import type { Permission } from "../constants/permissions";
import { useAuth } from "./useAuth";
import { can } from "../utils/rbac";

export function useCan(permission: Permission): boolean {
  const { user } = useAuth();
  return can(user, permission);
}

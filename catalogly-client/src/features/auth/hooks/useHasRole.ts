import type { RoleName } from "../constants/roles";
import { useAuth } from "./useAuth";
import { hasRole } from "../utils/rbac";

export function useHasRole(role: RoleName): boolean {
  const { user } = useAuth();
  return hasRole(user, role);
}

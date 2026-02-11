import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ROLES } from "../features/auth/constants/roles";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useHasRole } from "../features/auth/hooks/useHasRole";

export default function AdminGuard() {
  const { isLoggedIn, isLoading } = useAuth();
  const hasAdminRole = useHasRole(ROLES.ADMIN);
  const location = useLocation();

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 200 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (!hasAdminRole) {
    return <Navigate to="/books" replace />;
  }

  return <Outlet />;
}

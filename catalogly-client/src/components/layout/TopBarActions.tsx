import AddIcon from "@mui/icons-material/Add";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LoginIcon from "@mui/icons-material/Login";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { useCan } from "../../features/auth/hooks/useCan";
import { PERMISSIONS } from "../../features/auth/constants/permissions";
import UserMenu from "./UserMenu";

export default function TopBarActions() {
  const { user, isLoggedIn, isLoading, logout } = useAuth();
  const canCreateBook = useCan(PERMISSIONS.BOOKS_CREATE);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          order: 5,
          flexShrink: 0,
        }}
      >
        <Skeleton
          variant="rectangular"
          width={40}
          height={40}
          sx={{ borderRadius: 1, display: { xs: "block", md: "none" } }}
        />
        <Skeleton
          variant="rectangular"
          width={140}
          height={36}
          sx={{ borderRadius: 1, display: { xs: "none", md: "block" } }}
        />
        <Skeleton
          variant="rectangular"
          width={140}
          height={36}
          sx={{ borderRadius: 1, display: { xs: "none", md: "block" } }}
        />
      </Box>
    );
  }

  return (
    <Stack
      direction="row"
      spacing={{ xs: 0.5, sm: 1 }}
      alignItems="center"
      sx={{ order: 5, flexShrink: 0 }}
    >
      {canCreateBook && (
        <>
          <Tooltip title="Add book">
            <IconButton
              component={RouterLink}
              to="/admin/book/create"
              color="primary"
              aria-label="Add book"
              sx={{ display: { xs: "flex", md: "none" } }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
          <Button
            component={RouterLink}
            to="/admin/book/create"
            variant="contained"
            size="small"
            startIcon={<AddIcon sx={{ fontSize: 18 }} />}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            Add book
          </Button>
        </>
      )}
      {isLoggedIn && user ? (
        <UserMenu user={user} onLogout={logout} />
      ) : (
        <>
          <Tooltip title="Log in">
            <IconButton
              component={RouterLink}
              to="/login"
              aria-label="Log in"
              sx={{ display: { xs: "flex", md: "none" } }}
            >
              <LoginIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Sign up">
            <IconButton
              component={RouterLink}
              to="/signup"
              color="primary"
              aria-label="Sign up"
              sx={{ display: { xs: "flex", md: "none" } }}
            >
              <HowToRegIcon />
            </IconButton>
          </Tooltip>
          <Button
            component={RouterLink}
            to="/login"
            variant="outlined"
            size="small"
            startIcon={<LoginIcon sx={{ fontSize: 18 }} />}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            Log in
          </Button>
          <Button
            component={RouterLink}
            to="/signup"
            variant="contained"
            size="small"
            startIcon={<HowToRegIcon sx={{ fontSize: 18 }} />}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            Sign up
          </Button>
        </>
      )}
    </Stack>
  );
}

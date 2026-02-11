import ChevronDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { alpha, useTheme } from "@mui/material/styles";
import { useState } from "react";
import type { User } from "../../features/auth/types/auth.types";
import { useNavigate } from "react-router-dom";

interface UserMenuProps {
  user: User;
  onLogout: () => Promise<void>;
}

export default function UserMenu({ user, onLogout }: UserMenuProps) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    await onLogout();
    navigate("/login");
  };

  const displayName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") || "Account";

  return (
    <>
      <Tooltip title={displayName}>
        <IconButton
          onClick={handleOpen}
          aria-label="Account menu"
          aria-controls={open ? "user-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          sx={{
            display: { xs: "flex", md: "none" },
          }}
        >
          <PersonOutlineIcon />
        </IconButton>
      </Tooltip>
      <Button
        onClick={handleOpen}
        variant="outlined"
        size="small"
        disableElevation
        aria-label="Account menu"
        aria-controls={open ? "user-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        startIcon={<PersonOutlineIcon sx={{ fontSize: 18 }} />}
        endIcon={
          <ChevronDownIcon
            sx={{
              fontSize: 18,
              transition: "transform 0.2s ease",
              transform: open ? "rotate(180deg)" : "none",
            }}
          />
        }
        sx={{
          display: { xs: "none", md: "flex" },
          px: 2,
          py: 1,
          minWidth: 0,
          textTransform: "none",
          fontWeight: 500,
          borderColor: alpha(theme.palette.divider, 0.8),
          color: "text.primary",
          "&:hover": {
            borderColor: theme.palette.primary.main,
            backgroundColor: alpha(theme.palette.primary.main, 0.06),
          },
        }}
      >
        {displayName}
      </Button>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: { py: 0.5, px: 0.5, minWidth: 140 },
          },
        }}
      >
        <MenuItem onClick={handleLogout} sx={{ gap: 1, py: 1, px: 1.5 }}>
          <LogoutIcon sx={{ fontSize: 18, color: "text.secondary" }} />
          Log out
        </MenuItem>
      </Menu>
    </>
  );
}

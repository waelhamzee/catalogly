import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import type { TextFieldProps } from "@mui/material/TextField";
import { useState } from "react";

type PasswordFieldProps = Omit<TextFieldProps, "type" | "slotProps"> & {
  showIcon?: boolean;
};

export default function PasswordField({
  showIcon = true,
  ...props
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <TextField
      {...props}
      type={visible ? "text" : "password"}
      slotProps={{
        input: {
          startAdornment: showIcon ? (
            <InputAdornment position="start">
              <LockOutlinedIcon
                sx={{ fontSize: 20, color: "text.disabled" }}
              />
            </InputAdornment>
          ) : undefined,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setVisible(!visible)}
                edge="end"
                size="small"
              >
                {visible ? (
                  <VisibilityOffIcon sx={{ fontSize: 20 }} />
                ) : (
                  <VisibilityIcon sx={{ fontSize: 20 }} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

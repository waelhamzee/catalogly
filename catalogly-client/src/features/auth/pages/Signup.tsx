import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import { alpha, useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { getApiErrorMessage } from "../../../utils/getApiErrorMessage";
import PasswordField from "../components/PasswordField";
import { useRegister } from "../hooks/useRegister";
import { signupSchema } from "../utils/validation";

export default function Signup() {
  const theme = useTheme();
  const { mutate: register, isPending, isError, error } = useRegister();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      register(values);
    },
  });

  const serverError = isError ? getApiErrorMessage(error) : null;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 420,
          p: { xs: 3, sm: 5 },
          borderRadius: 4,
          border: `1px solid ${alpha(theme.palette.divider, 0.6)}`,
          bgcolor: "background.paper",
          boxShadow: `0 12px 40px ${alpha(theme.palette.common.black, 0.04)}`,
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <AutoStoriesIcon
            sx={{ fontSize: 40, color: "primary.main", mb: 1.5 }}
          />
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
            Create account
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Join the library today
          </Typography>
        </Box>

        {serverError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {serverError}
          </Alert>
        )}

        <Box component="form" onSubmit={formik.handleSubmit} noValidate>
          <Stack direction="row" spacing={2} sx={{ mb: 2.5 }}>
            <TextField
              fullWidth
              required
              id="firstName"
              name="firstName"
              label="First name"
              placeholder="John"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon
                        sx={{ fontSize: 20, color: "text.disabled" }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              fullWidth
              required
              id="lastName"
              name="lastName"
              label="Last name"
              placeholder="Doe"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon
                        sx={{ fontSize: 20, color: "text.disabled" }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Stack>

          <TextField
            fullWidth
            required
            id="email"
            name="email"
            label="Email"
            placeholder="you@example.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon
                      sx={{ fontSize: 20, color: "text.disabled" }}
                    />
                  </InputAdornment>
                ),
              },
            }}
            sx={{ mb: 2.5 }}
          />

          <PasswordField
            fullWidth
            required
            id="password"
            name="password"
            label="Password"
            placeholder="At least 8 characters"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{ mb: 3.5 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ py: 1.4, fontSize: "0.95rem" }}
            loading={isPending}
            loadingIndicator={<CircularProgress size={22} color="inherit" />}
          >
            Create account
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

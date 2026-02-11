import { SnackbarProvider } from "notistack";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./features/auth/context/AuthProvider";
import { DialogProvider } from "./context/dialog";
import { StyledMaterialDesignContent } from "./components/notification/StyledSnackbar";
import theme from "./theme/theme";
import router from "./routes/router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          Components={{
            default: StyledMaterialDesignContent,
            success: StyledMaterialDesignContent,
            error: StyledMaterialDesignContent,
            info: StyledMaterialDesignContent,
            warning: StyledMaterialDesignContent,
          }}
        >
          <AuthProvider>
            <DialogProvider>
              <RouterProvider router={router} />
            </DialogProvider>
          </AuthProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

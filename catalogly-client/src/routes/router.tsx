import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import NotFound from "../pages/NotFound";
import AdminGuard from "./AdminGuard";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        index: true,
        lazy: () =>
          import("../features/home/pages/Home").then((m) => ({
            Component: m.default,
          })),
      },
      {
        path: "/books/:query?",
        lazy: () =>
          import("../features/books/pages/Books").then((m) => ({
            Component: m.default,
          })),
      },
      {
        path: "/login",
        lazy: () =>
          import("../features/auth/pages/Login").then((m) => ({
            Component: m.default,
          })),
      },
      {
        path: "/signup",
        lazy: () =>
          import("../features/auth/pages/Signup").then((m) => ({
            Component: m.default,
          })),
      },
      {
        path: "admin",
        element: <AdminGuard />,
        children: [
          {
            path: "book/create",
            lazy: () =>
              import("../features/books/pages/BookCreate").then((m) => ({
                Component: m.default,
              })),
          },
          {
            path: "book/:id/edit",
            lazy: () =>
              import("../features/books/pages/BookEdit").then((m) => ({
                Component: m.default,
              })),
          },
        ],
      },
      {
        path: "book/:id",
        lazy: () =>
          import("../features/books/pages/BookDetail").then((m) => ({
            Component: m.default,
          })),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;

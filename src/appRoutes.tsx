import { createBrowserRouter } from "react-router";
import { publicRoutes } from "./public/routes";
import PageNotFound from "./shared/pages/PageNotFound";
import { protectedRoutes } from "./admin/routes";

export const router = createBrowserRouter([
  {
    path: "/",
    //errorElement: <RootErrorBoundary />,
    children: [...publicRoutes, ...protectedRoutes],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

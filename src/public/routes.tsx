import LandingPage from "./pages/LandingPage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { RegistrationOptionsPage } from "./pages/RegistrationOptionsPage";
import { PublicLayout } from "./layouts/PublicLayout";
import { AuthLayout } from "./layouts/AuthLayout";
import { LoginPage } from "./pages/LoginPage";
import { RegistrationSuccessfulPage } from "./pages/RegsitrationSuccessPage";
import { RegistrationLayout } from "./layouts/RegistrationLayout";

export const publicRoutes = [
  {
    path: "/",
    element: <PublicLayout />,
    children: [{ path: "/", element: <LandingPage /> }],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [{ path: "/auth/loginv2", element: <LoginPage /> }],
  },
  {
    path: "/",
    element: <RegistrationLayout />,
    children: [
      {
        path: "/registration-options",
        element: <RegistrationOptionsPage />,
      },
      { path: "/registration", element: <RegistrationPage /> },
      {
        path: "/auth/registration-success",
        element: <RegistrationSuccessfulPage />,
      },
    ],
  },
];

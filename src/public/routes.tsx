import LandingPage from "./pages/LandingPage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { RegistrationOptionsPage } from "./pages/RegistrationOptionsPage";
import { PublicLayout } from "./layouts/PublicLayout";
import { AuthLayoutv2 } from "./layouts/AuthLayoutv2";
import { LoginPagev2 } from "./pages/LoginPagev2";
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
    element: <AuthLayoutv2 />,
    children: [{ path: "/auth/loginv2", element: <LoginPagev2 /> }],
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

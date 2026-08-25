import LandingPage from "./pages/LandingPage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { RegistrationOptionsPage } from "./pages/RegistrationOptionsPage";
import { PublicLayout } from "./layouts/PublicLayout";
import { VerificationPage } from "./pages/VerificationPage";
import LoginPage from "./pages/LoginPage";

export const publicRoutes = [
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/auth/verification", element: <VerificationPage /> },
      {
        path: "/auth/registration-options",
        element: <RegistrationOptionsPage />,
      },
      { path: "/auth/register", element: <RegistrationPage /> },
      { path: "/auth/login", element: <LoginPage /> },
    ],
  },
  // {
  //   path: "/auth",
  //   element: <AuthLayout />,
  //   children: [
  //     { path: "/auth/verification", element: <VerificationPage /> },
  //     {
  //       path: "/auth/registration-options",
  //       element: <RegistrationOptionsPage />,
  //     },
  //     { path: "/auth/register", element: <RegistrationPage /> },
  //     { path: "/auth/login", element: <LoginPage /> },
  //   ],
  // },
];

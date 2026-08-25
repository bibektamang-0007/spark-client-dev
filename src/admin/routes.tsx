import Dashboard from "./features/dashboard/Dashboard";
import Applications from "./features/registration_application/Applications";
import UserManagement from "./features/user_management/UserManagement";
import { ProtectedLayout } from "./layouts/ProtectedLayout";

export const protectedRoutes = [
  {
    path: "/admin",
    element: <ProtectedLayout />,
    children: [
      { path: "/admin/dashboard", element: <Dashboard /> },
      {
        path: "/admin/user-management",
        element: <UserManagement />,
      },
      { path: "/admin/applications", element: <Applications /> },
    ],
  },
];

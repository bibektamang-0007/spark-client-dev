import React from "react";
import { Navigate, useLocation } from "react-router";
import type { UserRole } from "../types/Auth.types";
import { AdminLayout } from "./AdminLayout";

interface ProtectedLayoutProps {
  allowedRoles?: UserRole[];
}

export const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({
  allowedRoles,
}) => {
  const isLoading = false;
  // const accessToken = null;
  const user = {
    role: "super_admin" as UserRole,
  };
  // const location = useLocation();

  if (isLoading)
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
        Loading...
      </div>
    );

  // if (!accessToken || !user) {
  //   return <Navigate to="/auth/login" state={{ from: location }} replace />;
  // }

  if (allowedRoles && (!user || !allowedRoles.includes(user?.role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <AdminLayout userRole={user.role} />;
};

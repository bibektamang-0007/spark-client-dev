import { Navigate, Outlet, useLocation } from "react-router";

interface LocationState {
  from?: {
    pathname: string;
  };
}

const AuthLayout: React.FC = () => {
  const isLoading = false;
  const isAuthenticated = false;
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
        Loading...
      </div>
    );
  }

  if (isAuthenticated) {
    const customRedirect =
      (location.state as LocationState)?.from?.pathname || "/admin/dashboard";
    return <Navigate to={customRedirect} replace />;
  }

  return (
    <div className="bg-white">
      <div className="flex flex-col justify-center h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;

import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import { motion } from "framer-motion";
import type { AuthUser, UserRole } from "../types/Auth.types";
import { NAVIGATION_ITEMS } from "../config/navigation";
import { X, Menu } from "lucide-react";
import brandLogo from "@/shared/assets/logo-startup-sikkim.jpeg";
import ProfileDropdown from "../components/navigation/ProfileDropDown";

interface AdminLayoutProps {
  userRole: UserRole;
}

export const AdminLayout = ({ userRole }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user: AuthUser = {
    userId: "123",
    firstName: "Jhon",
    lastName: "Doe",
    email: "jhondoe@gmail.com",
    role: "super_admin",
  };
  //   const dispatch = useAppDispatch();

  const allowedNavItems = NAVIGATION_ITEMS.filter((item) =>
    item.allowedRoles.includes(userRole),
  );

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const logoutUser = () => {
    navigate("/auth/login");
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-10 md:hidden"
          onClick={toggleMenu}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`flex-col w-64 bg-brand-primary z-20 transition-transform duration-300 ease-in-out absolute md:relative h-full ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} h-full flex flex-col justify-between`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="mt-4 flex shrink-0 items-center gap-3 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50">
              <span className="grid place-items-center rounded-lg bg-white pb-1 px-1.5 shadow-sm">
                <img
                  src={brandLogo}
                  className="h-12 w-auto block mix-blend-multiply object-contain"
                />
              </span>
            </div>
            <button onClick={toggleMenu} className="md:hidden">
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-col flex-1 relative px-4 py-6 space-y-2 overflow-y-auto">
            {allowedNavItems.map((item) => {
              const IconComponent = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200  ${isActive ? "font-semibold" : "text-gray-200"} flex gap-2 relative z-10`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.div
                          layoutId="active-nav-indicator"
                          className="absolute inset-0 bg-brand-ternary text-brand-primary rounded-md -z-10"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}

                      {IconComponent && (
                        <IconComponent size={20} className="shrink-0" />
                      )}
                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>
        <ProfileDropdown user={user} onLogout={logoutUser} />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto relative w-full">
        <header className="md:hidden flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200 shrink-0">
          {/* <Brand variant="Dark" /> */}
          <button onClick={toggleMenu} className="p-2 text-gray-600">
            <Menu className="h-6 w-6" />
          </button>
        </header>

        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

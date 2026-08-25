import { Outlet } from "react-router";
import logoSrc from "@/shared/assets/logo-startup-sikkim.jpeg";
import type { NavItem } from "../components/navigation/navigation.types";
import { Navbar } from "../components/navigation/Navbar";

export const PublicLayout = () => {
  const customNavItems: NavItem[] = [
    { label: "Schemes", href: "/schemes", isActive: true },
    { label: "Incubators", href: "/incubators" },
    { label: "Policy 2024", href: "/policy-2024" },
    { label: "Resources", href: "/resources" },
    { label: "Support", href: "/support" },
  ];
  return (
    <div className="">
      <Navbar
        logo={{
          src: logoSrc,
          alt: "Startup Sikkim",
          href: "/",
        }}
        navItems={customNavItems}
        loginHref="/auth/login"
        loginText="LOG IN"
        registerHref="/auth/verification"
        registerText="REGISTER YOUR STARTAUP"
      />
      <Outlet />
    </div>
  );
};

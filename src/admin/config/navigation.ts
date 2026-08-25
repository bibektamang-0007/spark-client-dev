import { LayoutDashboard, Users, NotepadText } from "lucide-react";
import type { NavItem } from "../types/Config.types";

export const NAVIGATION_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    allowedRoles: ["super_admin"],
    icon: LayoutDashboard,
  },
  {
    label: "Applications",
    path: "/admin/applications",
    allowedRoles: ["super_admin"],
    icon: NotepadText,
  },
  {
    label: "Members",
    path: "/admin/user-management",
    allowedRoles: ["super_admin"],
    icon: Users,
  },
];

import type { LucideIcon } from "lucide-react";
import type { UserRole } from "./Auth.types";

export interface NavItem {
  label: string;
  path: string;
  allowedRoles: UserRole[];
  icon: LucideIcon;
}

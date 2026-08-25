import type { AuthUser } from "@/admin/types/Auth.types";
import React, { useState, useEffect, useRef } from "react";
import { Settings, LogOut } from "lucide-react";

interface ProfileDropdownProps {
  user: AuthUser | null;
  onLogout: () => void;
  onProfileClick?: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  user,
  onLogout,
  onProfileClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getRoleLabel = (role?: string) => {
    if (role === "super_admin") return "SUPER ADMIN";
    return "DEFAULT";
  };

  return (
    <div className="p-4 relative" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-md flex gap-4 items-center cursor-pointer w-full transition-colors duration-200 select-none"
      >
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white font-semibold text-brand-primary shrink-0">
          {user?.firstName?.slice(0, 1)}
          {user?.lastName?.slice(0, 1)}
        </div>
        <div className="flex flex-col min-w-0 overflow-hidden">
          <span className="truncate text-sm text-gray-200">{`${user?.firstName || ""} ${user?.lastName || ""}`}</span>
          <span className="text-gray-200 text-[10px] leading-tight">
            {getRoleLabel(user?.role)}
          </span>
        </div>
      </div>

      <div
        className={`absolute bottom-full left-4 right-4 mb-2 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden transition-all duration-200 ease-out origin-bottom ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-2 scale-95 pointer-events-none"
        }`}
      >
        <div className="py-1 flex flex-col text-gray-700">
          <button
            onClick={() => {
              setIsOpen(false);
              if (onProfileClick) onProfileClick();
            }}
            className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <Settings />
            Settings
          </button>

          <hr className="border-gray-100" />

          <button
            onClick={() => {
              setIsOpen(false);
              onLogout();
            }}
            className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <LogOut />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown;

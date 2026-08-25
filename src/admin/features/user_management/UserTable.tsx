import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/utils/utils";
import { Edit, ShieldBan, Trash2 } from "lucide-react";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
}

interface UserTableProps {
  data: User[];
}

export function UserTable({ data }: UserTableProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-emerald-500/15 text-emerald-700 border-emerald-500/20";
      case "inactive":
        return "bg-slate-500/15 text-slate-700 border-slate-500/20";
      case "suspended":
        return "bg-destructive/15 text-destructive border-destructive/20";
      default:
        return "bg-slate-500/15 text-slate-700 border-slate-500/20";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "super admin":
        return "text-brand-primary font-semibold";
      case "manager":
        return "text-blue-600 font-medium";
      case "reviewer":
        return "text-amber-600 font-medium";
      case "support":
        return "text-teal-600 font-medium";
      default:
        return "text-muted-foreground";
    }
  };

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground bg-card border border-border rounded-xl">
        <p className="text-sm font-medium">No users found.</p>
        <p className="text-xs mt-1">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground bg-muted/30 uppercase border-b border-border">
            <tr>
              <th className="px-5 py-3 font-medium">User</th>
              <th className="px-5 py-3 font-medium">Role</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Last Login</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.map((user) => (
              <tr key={user.id} className="hover:bg-muted/10 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    {/* Initials Avatar */}
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary font-bold text-xs shrink-0">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">
                        {user.name}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className={cn("text-sm", getRoleColor(user.role))}>
                    {user.role}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                      getStatusColor(user.status),
                    )}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-muted-foreground whitespace-nowrap">
                  {user.lastLogin}
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      title="Edit User"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-amber-600"
                      title="Suspend User"
                    >
                      <ShieldBan className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      title="Delete User"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

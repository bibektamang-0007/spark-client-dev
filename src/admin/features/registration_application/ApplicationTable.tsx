import { Button } from "@/components/ui/button";
import { cn } from "@/shared/utils/utils";
import { MoreHorizontal, Eye } from "lucide-react";
import { useNavigate } from "react-router";

export interface Application {
  id: string;
  name: string;
  type: string;
  date: string;
  status: string;
  email: string;
}

interface ApplicationTableProps {
  data: Application[];
}

export function ApplicationTable({ data }: ApplicationTableProps) {
  const navigate = useNavigate();
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-emerald-500/15 text-emerald-700 border-emerald-500/20";
      case "pending":
        return "bg-amber-500/15 text-amber-700 border-amber-500/20";
      case "under review":
        return "bg-blue-500/15 text-blue-700 border-blue-500/20";
      case "rejected":
        return "bg-destructive/15 text-destructive border-destructive/20";
      default:
        return "bg-slate-500/15 text-slate-700 border-slate-500/20";
    }
  };

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground bg-card border border-border rounded-xl">
        <p className="text-sm font-medium">No applications found.</p>
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
              <th className="px-5 py-3 font-medium whitespace-nowrap">ID</th>
              <th className="px-5 py-3 font-medium">Applicant Details</th>
              <th className="px-5 py-3 font-medium">Entity Type</th>
              <th className="px-5 py-3 font-medium">Submitted</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.map((app) => (
              <tr key={app.id} className="hover:bg-muted/10 transition-colors">
                <td className="px-5 py-4 font-medium text-foreground whitespace-nowrap">
                  {app.id}
                </td>
                <td className="px-5 py-4">
                  <div className="font-medium text-foreground">{app.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {app.email}
                  </div>
                </td>
                <td className="px-5 py-4 text-muted-foreground">{app.type}</td>
                <td className="px-5 py-4 text-muted-foreground whitespace-nowrap">
                  {app.date}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                      getStatusColor(app.status),
                    )}
                  >
                    {app.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      title="View Application"
                      onClick={() => navigate("/admin/application-details")}
                    >
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      title="More Actions"
                    >
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
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

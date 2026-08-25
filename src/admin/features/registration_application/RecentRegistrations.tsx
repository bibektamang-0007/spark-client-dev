import { cn } from "@/shared/utils/utils";

interface Registration {
  id: string;
  name: string;
  type: string;
  date: string;
  status: string;
}

interface RecentRegistrationsProps {
  data: Registration[];
}

export function RecentRegistrations({ data }: RecentRegistrationsProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-emerald-500/15 text-emerald-700 border-emerald-500/20";
      case "pending":
        return "bg-amber-500/15 text-amber-700 border-amber-500/20";
      case "rejected":
        return "bg-destructive/15 text-destructive border-destructive/20";
      default:
        return "bg-slate-500/15 text-slate-700 border-slate-500/20";
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
      <div className="border-b border-border p-5">
        <h3 className="font-semibold text-foreground">Recent Registrations</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Latest users and entities that joined the platform.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground bg-muted/30 uppercase">
            <tr>
              <th className="px-5 py-3 font-medium">Application ID</th>
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Entity Type</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-muted/10 transition-colors">
                <td className="px-5 py-3 font-medium text-foreground">
                  {item.id}
                </td>
                <td className="px-5 py-3">{item.name}</td>
                <td className="px-5 py-3 text-muted-foreground">{item.type}</td>
                <td className="px-5 py-3 text-muted-foreground">{item.date}</td>
                <td className="px-5 py-3 text-right">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                      getStatusColor(item.status),
                    )}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

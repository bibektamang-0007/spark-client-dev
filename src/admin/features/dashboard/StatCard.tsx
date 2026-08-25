import { cn } from "@/shared/utils/utils";
import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  trendLabel: string;
  isPositive: boolean;
  icon: LucideIcon;
}

export function StatCard({
  title,
  value,
  trend,
  trendLabel,
  isPositive,
  icon: Icon,
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-xs">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
          <Icon className="h-4.5 w-4.5" />
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-1">
        <span className="text-3xl font-bold tracking-tight text-foreground">
          {value}
        </span>
        <div className="flex items-center gap-1.5 text-xs">
          <span
            className={cn(
              "flex items-center font-medium",
              isPositive ? "text-emerald-600" : "text-destructive",
            )}
          >
            {isPositive ? (
              <TrendingUp className="mr-1 h-3 w-3" />
            ) : (
              <TrendingDown className="mr-1 h-3 w-3" />
            )}
            {trend}
          </span>
          <span className="text-muted-foreground">{trendLabel}</span>
        </div>
      </div>
    </div>
  );
}

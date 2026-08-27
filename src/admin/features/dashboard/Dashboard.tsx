import {
  Rocket,
  Briefcase,
  GraduationCap,
  UserCheck,
  Plus,
} from "lucide-react";

// Import your mock data
import dashboardData from "@/admin/mockDashboardDataa.json";
import { Button } from "@/components/ui/button";
import { StatCard } from "./StatCard";
import { RecentRegistrations } from "../registration_application/RecentRegistrations";

export default function Dashboard() {
  // Helper to map entity ID to Lucide icon
  const getIconForEntity = (id: string) => {
    switch (id) {
      case "startups":
        return Rocket;
      case "enterprises":
        return Briefcase;
      case "aspirants":
        return GraduationCap;
      case "mentors":
        return UserCheck;
      default:
        return UserCheck;
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6 pt-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Platform Overview
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Track ecosystem growth, registrations, and active participants.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-9">
            Download Report
          </Button>
          <Button className="h-9 gap-1.5 bg-brand-primary hover:bg-brand-dark">
            <Plus className="h-4 w-4" />
            Add Entity
          </Button>
        </div>
      </div>

      {/* 4-Column Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardData.overview.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            trend={stat.trend}
            trendLabel={stat.trendLabel}
            isPositive={stat.isPositive}
            icon={getIconForEntity(stat.id)}
          />
        ))}
      </div>

      {/* Content Grid (Table + Placeholder for future charts) */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
        {/* Recent Registrations Table (Takes up 5 columns on large screens) */}
        <div className="lg:col-span-5">
          <RecentRegistrations data={dashboardData.recentRegistrations} />
        </div>

        {/* Quick Actions / System Status (Takes up 2 columns) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
            <h3 className="font-semibold text-foreground mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start text-sm h-10"
              >
                Review Pending Mentors (12)
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-sm h-10"
              >
                Verify Startup Documents
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-sm h-10"
              >
                Broadcast System Notice
              </Button>
            </div>
          </div>

          {/* Decorative support card */}
          <div className="rounded-xl border border-brand-primary/20 bg-brand-primary/5 p-5">
            <h3 className="font-semibold text-brand-primary text-sm mb-2">
              Ecosystem Health
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              All systems are operational. Registration volumes are up by 18%
              compared to last week.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

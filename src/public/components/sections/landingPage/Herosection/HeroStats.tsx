import React from "react";

export interface StatItem {
  value: string;
  label: string;
}

interface HeroStatsProps {
  stats: StatItem[];
}

export const HeroStats: React.FC<HeroStatsProps> = ({ stats }) => {
  return (
    <div className="mt-1.5 flex w-full max-w-120 items-center gap-6.5 border-t border-stone-200 pt-5.5">
      {stats.map((stat, index) => (
        <React.Fragment key={stat.label}>
          {index > 0 && <div className="h-8.5 w-px bg-stone-200" />}
          <div className="flex flex-col gap-0.75">
            <span className="font-sans text-22px font-bold tracking-tight text-brand-primary">
              {stat.value}
            </span>
            <span className="text-xs text-stone-500">{stat.label}</span>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

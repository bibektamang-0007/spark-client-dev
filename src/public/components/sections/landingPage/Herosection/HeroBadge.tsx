import React from "react";

interface HeroBadgeProps {
  label: string;
}

export const HeroBadge: React.FC<HeroBadgeProps> = ({ label }) => {
  return (
    <span className="inline-flex items-center gap-2.25 rounded-full border border-stone-200 bg-white px-3.25 py-1.5 text-xs font-bold uppercase tracking-wider text-[#6B2D6F] shadow-xs">
      <span className="h-1.5 w-1.5 rounded-full bg-[#2EB67D]" />
      {label}
    </span>
  );
};

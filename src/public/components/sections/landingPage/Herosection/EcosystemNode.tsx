import React from "react";
import { type LucideIcon } from "lucide-react";

export interface NodeData {
  id: number;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  position: { left: string; top: string };
  borderColor: string;
  iconBg: string;
  iconColor: string;
  floatDuration: string;
  animationDelay: string;
}

export const EcosystemNode: React.FC<NodeData> = ({
  title,
  subtitle,
  icon: Icon,
  position,
  borderColor,
  iconBg,
  iconColor,
  floatDuration,
  animationDelay,
}) => {
  return (
    /* Outer Anchor: Locks coordinates and centers the element */
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{
        left: position.left,
        top: position.top,
      }}
    >
      {/* Inner Card: Handles float animation and card styles */}
      <div
        className="flex items-center gap-2.5 whitespace-nowrap rounded-full bg-white py-1.5 md:py-2.5 lg:py-1.5 xl:py-2.5 pl-3 pr-3 md:pr-4 lg:pr-3 xl:pr-4 shadow-sm transition-all duration-200 hover:shadow-lg"
        style={{
          border: `1.5px solid ${borderColor}`,
          boxShadow: `0 0 0 4px ${borderColor}1A, 0 0 14px 1px ${borderColor}6B, 0 2px 8px rgba(29,28,29,.08)`,
          animation: `spark-float ${floatDuration} ease-in-out ${animationDelay} infinite`,
          willChange: "transform",
        }}
      >
        <span
          className="grid h-6 w-6 md:h-8 md:w-8 lg:h-6 lg:w-6 place-items-center rounded-full"
          style={{ backgroundColor: iconBg, color: iconColor }}
        >
          <Icon className="h-3 w-3 md:h-4.25 md:w-4.25 lg:h-3 lg:w-3 xl:h-4.25 xl:w-4.25" />
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-[10px] md:text-[12px] lg:text-[10px] xl:text-[12px] font-bold text-stone-900">
            {title}
          </span>
          <span className="text-[8px] md:text-[10px] lg:text-[8px] xl:text-[10px] text-stone-500">
            {subtitle}
          </span>
        </span>
      </div>
    </div>
  );
};

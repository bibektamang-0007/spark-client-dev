import { ArrowRight } from "lucide-react";
import { type ElementType, type ButtonHTMLAttributes } from "react";

interface SelectionCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  handleOptionSelect: () => void;
  cardTitle: string;
  cardDescription: string;
  icon: ElementType;
  iconBg: string;
  iconColor: string;
}

export const SelectionCard = ({
  handleOptionSelect,
  cardTitle,
  cardDescription,
  icon: Icon,
  className = "",
  iconBg,
  iconColor,
  ...props
}: SelectionCardProps) => {
  return (
    <button
      type="button"
      onClick={handleOptionSelect}
      className={`group relative flex items-start gap-4 rounded-xl border border-border/80 bg-card p-5 text-left transition-all duration-200 hover:border-brand-primary/60 hover:bg-brand-surface/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${className}`}
      {...props}
    >
      <span
        className="grid h-12 w-12 place-items-center rounded-full"
        style={{ backgroundColor: iconBg, color: iconColor }}
      >
        <Icon className="h-6 w-6" />
      </span>

      <div className="flex-1 min-w-0 pr-6">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-foreground text-base">
            {cardTitle}
          </h3>
        </div>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {cardDescription}
        </p>
      </div>

      <ArrowRight className="absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-brand-primary" />
    </button>
  );
};

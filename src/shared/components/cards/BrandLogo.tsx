import { Link } from "react-router";
import logoHref from "@/shared/assets/logo-startup-sikkim.jpeg";

interface BrandLogoProps {
  className?: string;
}

export const BrandLogo = ({ className }: BrandLogoProps) => {
  return (
    <Link
      to="/"
      className="flex shrink-0 items-center gap-3 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
    >
      <span className="grid place-items-center rounded-lg bg-white pb-1 px-1.5 shadow-sm">
        <img
          src={logoHref}
          alt={"Startup Sikkim"}
          className={`h-14 w-auto block mix-blend-multiply object-contain ${className}`}
        />
      </span>
    </Link>
  );
};

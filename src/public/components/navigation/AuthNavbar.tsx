import { BrandLogo } from "@/shared/components/cards/Brand";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router";

export const AuthNavbar = () => {
  const navigate = useNavigate();
  const onBrandClick = () => {
    navigate("/", { replace: true });
  };
  return (
    <nav className="w-full px-6 lg:px-12 py-3 flex items-center justify-between z-50 shrink-0 shadow">
      <BrandLogo
        variant="default"
        onClick={onBrandClick}
        showText={true}
        brandText="Spark"
        className="rounded-xl"
      />

      <Link
        to="/"
        className="group flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 hidden sm:block" />
        <span className="hidden sm:inline">Back to homepage</span>
        <span className="sm:hidden">Back</span>
      </Link>
    </nav>
  );
};

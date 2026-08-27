import { Button } from "@/components/ui/button";
import { HeroBadge } from "./HeroBadge";
import { HeroStats, type StatItem } from "./HeroStats";
import { Link, useNavigate } from "react-router";

const DEFAULT_STATS: StatItem[] = [
  { value: "1,284", label: "startups registered" },
  { value: "₹46.2Cr", label: "disbursed to founders" },
  { value: "11", label: "schemes open now" },
];

export const HeroContent = () => {
  const navigate = useNavigate();
  const goToRegister = () => {
    navigate("/auth/loginv2", { replace: true, state: "register" });
  };
  return (
    <div className="flex max-w-135 flex-col items-start gap-6.5">
      <HeroBadge label="Sikkim Startup Policy 2024" />

      <h1 className="m-0 text-balance font-sans text-4xl md:text-5xl xl:text-6xl font-bold leading-tight tracking-tight text-stone-900">
        One portal. Every step of your startup journey.
      </h1>

      <p className="m-0 max-w-120 text-pretty text-sm md:text-lg leading-relaxed text-stone-600">
        SPARK connects Sikkim's founders, mentors, investors and incubators in
        one ecosystem. Register your startup, apply to a state scheme, and track
        every application from idea to scale.
      </p>

      <div className="mt-0.5 flex flex-wrap items-center gap-3">
        <Button
          size="lg"
          onClick={goToRegister}
          className="h-12 bg-brand-secondary hover:bg-brand-secondary/80 text-brand-primary rounded-xl text-lg font-semibold cursor-pointer"
        >
          <span>Register your startup</span>
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="h-12 bg-brand-ternary hover:bg-brand-ternary/80 text-brand-primary rounded-xl text-lg font-semibold"
        >
          <Link to="/auth/loginv2">Log in</Link>
        </Button>
      </div>

      <HeroStats stats={DEFAULT_STATS} />
    </div>
  );
};

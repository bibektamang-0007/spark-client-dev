import { Button } from "@/shared/components/ui/button";
import { HeroBadge } from "./HeroBadge";
import { HeroStats, type StatItem } from "./HeroStats";
import { Link } from "react-router";

const DEFAULT_STATS: StatItem[] = [
  { value: "1,284", label: "startups registered" },
  { value: "₹46.2Cr", label: "disbursed to founders" },
  { value: "11", label: "schemes open now" },
];

export const HeroContent = () => {
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
          className="bg-brand-secondary text-brand-primary rounded-md hover:bg-brand-secondary"
        >
          <Link to="/auth/verification">Register your startup</Link>
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="text-brand-primary bg-brand-ternary rounded-md hover:bg-brand-ternary"
        >
          <Link to="/auth/login">Log in</Link>
        </Button>
      </div>

      <HeroStats stats={DEFAULT_STATS} />
    </div>
  );
};

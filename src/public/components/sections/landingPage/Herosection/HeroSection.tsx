import React from "react";
import { HeroContent } from "./HeroContent";
import { EcosystemStage } from "./EcosystemStage";
import logoSrc from "../../../../../shared/assets/logo-startup-sikkim.jpeg";
import "./heroSection.css";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-brand-surface py-16 lg:py-24">
      {/* Background Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(54,197,240,0.13) 1px, transparent 1px), linear-gradient(to bottom, rgba(46,182,125,0.11) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 34%, #000 72%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 34%, #000 72%)",
        }}
      />

      {/* Background Radial Glow */}
      <div
        className="animate-spark-aurora pointer-events-none absolute -right-30 -top-45 h-195 w-225"
        style={{
          background:
            "radial-gradient(46% 46% at 62% 40%, rgba(54,197,240,0.16) 0%, rgba(54,197,240,0) 70%), radial-gradient(44% 44% at 38% 66%, rgba(46,182,125,0.15) 0%, rgba(46,182,125,0) 72%), radial-gradient(40% 40% at 72% 74%, rgba(237,106,95,0.16) 0%, rgba(237,106,95,0) 72%)",
        }}
      />

      {/* Hero Content Container */}
      <div className="relative container mx-auto grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16 px-6">
        <HeroContent />
        <EcosystemStage logoSrc={logoSrc} />
      </div>
    </section>
  );
};

export default HeroSection;

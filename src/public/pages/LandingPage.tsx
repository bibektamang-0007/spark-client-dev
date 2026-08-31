import { useState } from "react";
import HeroSection from "../components/sections/landingPage/Herosection/HeroSection";
import { MapSection } from "../components/sections/landingPage/Mapsection/MapSection";
import { EcosystemMarquee } from "../components/sections/landingPage/EcosystemMarquee";
import { MapDescription } from "../components/sections/landingPage/Mapsection/MapDescription";
import { StatsSection } from "../components/sections/landingPage/Herosection/HeroStats";

const LandingPage = () => {
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);

  return (
    <section className="">
      <HeroSection />
      <StatsSection />
      <main className="relative w-full container mx-auto px-6 sm:px-10 pb-20 lg:pb-32">
        {/* 
          Global background haze applied to the parent container 
          so the text and map exist in the same ambient environment 
        */}
        <div className="absolute inset-0 pointer-events-none map-haze opacity-70 hidden lg:block" />

        <MapDescription />
        <MapSection hoveredPin={hoveredPin} setHoveredPin={setHoveredPin} />
      </main>
      {/* <MapSection hoveredPin={hoveredPin} setHoveredPin={setHoveredPin} /> */}
      <EcosystemMarquee />
    </section>
  );
};

export default LandingPage;

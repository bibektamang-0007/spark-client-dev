import React from "react";
import {
  Rocket,
  TrendingUp,
  Users,
  Building2,
  Lightbulb,
  GraduationCap,
  Factory,
  Sparkles,
  Landmark,
} from "lucide-react";
import { EcosystemSvgBackground } from "./EcosystemSvgBackground";
import { EcosystemNode, type NodeData } from "./EcosystemNode";

const nodesData: NodeData[] = [
  {
    id: 1,
    title: "Startups",
    subtitle: "1,284 registered",
    icon: Rocket,
    position: { left: "52%", top: "7%" },
    borderColor: "#ED6A5F",
    iconBg: "#FDECEA",
    iconColor: "#C64A3F",
    floatDuration: "4.9s",
    animationDelay: "0.50s",
  },
  {
    id: 2,
    title: "Investors",
    subtitle: "28 on the panel",
    icon: TrendingUp,
    position: { left: "73.51%", top: "20.60%" },
    borderColor: "#2EB67D",
    iconBg: "#E6F7EF",
    iconColor: "#22946A",
    floatDuration: "5.2s",
    animationDelay: "1.00s",
  },
  {
    id: 3,
    title: "Mentors",
    subtitle: "142 empanelled",
    icon: Users,
    position: { left: "86.03%", top: "43.34%" },
    borderColor: "#36C5F0",
    iconBg: "#E3F7FE",
    iconColor: "#1093C4",
    floatDuration: "5.4s",
    animationDelay: "1.50s",
  },
  {
    id: 4,
    title: "Incubation centres",
    subtitle: "9 across districts",
    icon: Building2,
    position: { left: "81.68%", top: "69.19%" },
    borderColor: "#8A5090",
    iconBg: "#F8F1F9",
    iconColor: "#4A154B",
    floatDuration: "5.7s",
    animationDelay: "2.00s",
  },
  {
    id: 5,
    title: "Innovation hubs",
    subtitle: "4 sector hubs",
    icon: Lightbulb,
    position: { left: "76%", top: "86.06%" },
    borderColor: "#ECB22E",
    iconBg: "#FDF4DE",
    iconColor: "#B4841B",
    floatDuration: "6.0s",
    animationDelay: "2.50s",
  },
  {
    id: 6,
    title: "Academia",
    subtitle: "17 partner colleges",
    icon: GraduationCap,
    position: { left: "37.49%", top: "86.06%" },
    borderColor: "#1093C4",
    iconBg: "#E3F7FE",
    iconColor: "#0B6E93",
    floatDuration: "6.3s",
    animationDelay: "3.00s",
  },
  {
    id: 7,
    title: "Enterprises",
    subtitle: "MSMEs & industry",
    icon: Factory,
    position: { left: "18.32%", top: "69.19%" },
    borderColor: "#8B8379",
    iconBg: "#F6F2EC",
    iconColor: "#423E39",
    floatDuration: "6.6s",
    animationDelay: "3.50s",
  },
  {
    id: 8,
    title: "Innovators",
    subtitle: "idea-stage founders",
    icon: Sparkles,
    position: { left: "13.97%", top: "43.34%" },
    borderColor: "#B084B4",
    iconBg: "#EEE1F0",
    iconColor: "#6B2D6F",
    floatDuration: "6.8s",
    animationDelay: "4.00s",
  },
  {
    id: 9,
    title: "Commerce & Industries",
    subtitle: "Government of Sikkim",
    icon: Landmark,
    position: { left: "26.49%", top: "20.60%" },
    borderColor: "#6B2D6F",
    iconBg: "#EEE1F0",
    iconColor: "#2E0C2F",
    floatDuration: "7.1s",
    animationDelay: "4.50s",
  },
];

interface EcosystemStageProps {
  logoSrc: string;
}

export const EcosystemStage: React.FC<EcosystemStageProps> = ({ logoSrc }) => {
  return (
    <div className="relative mx-auto aspect-760/620 w-full max-w-190">
      <EcosystemSvgBackground />

      {/* Center Logo Hub */}
      <div className="absolute left-1/2 top-1/2 flex h-20 w-20 md:h-40 md:w-40 lg:w-20 lg:h-20 xl:w-40 xl:h-40 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1.5 rounded-full border border-stone-200 bg-white shadow-spark-center">
        <img
          src={logoSrc}
          alt="Startup Sikkim — SPARK"
          className="h-auto w-14 md:w-28 lg:w-14 xl:w-28 block mix-blend-multiply"
        />
        <span className="px-2 text-[8px] md:text-[9.5px] lg:text-[8px] xl:text-[9.5px] font-bold uppercase tracking-widest text-stone-500 text-center text-wrap">
          SPARK Sikkim
        </span>
      </div>

      {/* Orbiting Ecosystem Nodes */}
      {nodesData.map((node) => (
        <EcosystemNode key={node.id} {...node} />
      ))}

      {/* Live Indicator Subtext */}
      <div className="absolute -bottom-10 md:-bottom-1.5 left-1/2 flex -translate-x-1/2 items-center gap-2 text-xs text-stone-500">
        <span className="h-0.5 w-5.5 rounded-full bg-linear-to-r from-[#36C5F0] to-[#2EB67D]" />
        Live flow of applications, funding and mentorship
      </div>
    </div>
  );
};

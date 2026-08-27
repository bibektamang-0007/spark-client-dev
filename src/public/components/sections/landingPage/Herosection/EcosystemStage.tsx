import React from "react";
import { EcosystemSvgBackground } from "./EcosystemSvgBackground";
import { EcosystemNode } from "./EcosystemNode";
import { NODES_DATA } from "@/public/constants/pageConstants";

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
      {NODES_DATA.map((node) => (
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

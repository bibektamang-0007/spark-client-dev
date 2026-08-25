import React from "react";

export const EcosystemSvgBackground: React.FC = () => {
  const orbits = [
    {
      d: "M380,310 Q406,191 380,72",
      stroke: "#ED6A5F",
    },
    {
      d: "M380,310 Q488,237 558.7,127.7",
      stroke: "#2EB67D",
    },
    {
      d: "M380,310 Q520.8,315 653.8,268.7",
      stroke: "#36C5F0",
    },
    {
      d: "M380,310 Q488.9,392.8 620.8,429",
      stroke: "#8A5090",
    },
    {
      d: "M380,310 Q403.7,432 475.1,533.6",
      stroke: "#ECB22E",
    },
    {
      d: "M380,310 Q308.6,411.6 284.9,533.6",
      stroke: "#1093C4",
    },
    {
      d: "M380,310 Q248.1,346.2 139.2,429",
      stroke: "#8B8379",
    },
    {
      d: "M380,310 Q247,263.7 106.2,268.7",
      stroke: "#B084B4",
    },
    {
      d: "M380,310 Q309.3,200.7 201.3,127.7",
      stroke: "#6B2D6F",
    },
  ];

  return (
    <svg
      viewBox="0 0 760 620"
      className="absolute inset-0 h-full w-full overflow-visible"
      aria-hidden="true"
    >
      <defs>
        <filter id="sparkGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* Outer Rings */}
      <ellipse
        cx="380"
        cy="310"
        rx="278"
        ry="238"
        fill="none"
        stroke="#EEE1F0"
        strokeWidth="1.25"
        strokeDasharray="2 8"
      />
      <ellipse
        cx="380"
        cy="310"
        rx="176"
        ry="150"
        fill="none"
        stroke="#EEE1F0"
        strokeWidth="1.25"
        strokeDasharray="2 8"
      />

      {/* Guide Lines */}
      <g
        fill="none"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="5 7"
      >
        {orbits.map((orbit, i) => (
          <path
            key={`guide-${i}`}
            d={orbit.d}
            stroke={orbit.stroke}
            opacity="0.26"
          />
        ))}
      </g>

      {/* Animated Glowing Outflow Paths */}
      <g
        fill="none"
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray="22 338"
        className="opacity-50"
        style={{ filter: "url(#sparkGlow)" }}
      >
        {orbits.map((orbit, i) => (
          <path
            key={`glow-out-${i}`}
            d={orbit.d}
            stroke={orbit.stroke}
            style={{
              animation: "spark-flow 4.2s linear infinite",
            }}
          />
        ))}
      </g>

      {/* Pulsing Central Halo */}
      <circle
        cx="380"
        cy="310"
        r="86"
        fill="#5FDBFF"
        className="animate-spark-halo"
        style={{ filter: "url(#sparkGlow)" }}
      />
    </svg>
  );
};

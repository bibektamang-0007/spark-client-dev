import { useEffect, useRef } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { FeatureCollection, Geometry } from "geojson";
import type { Topology } from "topojson-specification";
import { STARTUP_DATA } from "@/public/constants/pageConstants";
import "./map.css";

export function MapSection({
  hoveredPin,
  setHoveredPin,
}: {
  hoveredPin: string | null;
  setHoveredPin: (k: string | null) => void;
}) {
  const { t } = useTranslation();
  const svgRef = useRef<SVGSVGElement>(null);
  const startups = STARTUP_DATA(t);

  const mapLoaded = useRef(false);

  useEffect(() => {
    if (!svgRef.current || mapLoaded.current) return;
    mapLoaded.current = true;

    const SIKKIM_URL =
      "https://cdn.jsdelivr.net/gh/udit-001/india-maps-data@2884453/topojson/states/sikkim.json";

    d3.json(SIKKIM_URL).then((topo: any) => {
      const objKey = Object.keys(topo.objects)[0];
      const fc = topojson.feature(
        topo as unknown as Topology,
        topo.objects[objKey] as any,
      ) as unknown as FeatureCollection<Geometry, any>;

      const state = { type: "FeatureCollection", features: fc.features };
      const W = 480,
        H = 600,
        PAD = 20;

      const projection = d3.geoMercator().fitExtent(
        [
          [PAD, PAD],
          [W - PAD, H - PAD],
        ],
        state as any,
      );
      const path = d3.geoPath(projection);
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      // District hairlines
      svg
        .append("g")
        .selectAll("path")
        .data(state.features)
        .join("path")
        .attr(
          "class",
          "fill-none stroke-[#D6BEDA] stroke-1 opacity-80 map-dash",
        )
        .attr("d", path as any);

      // Generate Dot Matrix background
      const STEP = 9;
      const dots: { x: number; y: number; edge: boolean; dist?: number }[] = [];

      for (let y = PAD; y <= H - PAD; y += STEP) {
        const offset = ((y - PAD) / STEP) % 2 ? STEP / 2 : 0;
        for (let x = PAD + offset; x <= W - PAD; x += STEP) {
          const ll = projection.invert?.([x, y]);
          if (!ll) continue;

          const inside = state.features.some((f: any) => d3.geoContains(f, ll));
          if (!inside) continue;

          const edge = [
            [x - STEP, y],
            [x + STEP, y],
            [x, y - STEP],
            [x, y + STEP],
          ].some(([px, py]) => {
            const l = projection.invert?.([px, py]);
            return !l || !state.features.some((f: any) => d3.geoContains(f, l));
          });
          dots.push({ x, y, edge });
        }
      }

      const cx0 = W / 2,
        cy0 = H / 2;
      let maxD = 1;
      dots.forEach((d) => {
        d.dist = Math.hypot(d.x - cx0, d.y - cy0);
        maxD = Math.max(maxD, d.dist);
      });

      const BANDS = 14;
      const layer = svg.append("g");
      for (let b = 0; b < BANDS; b++) {
        layer
          .append("g")
          .attr("class", "dotband opacity-100")
          .selectAll("circle")
          .data(
            dots.filter(
              (d) =>
                Math.min(BANDS - 1, Math.floor((d.dist! / maxD) * BANDS)) === b,
            ),
          )
          .join("circle")
          .attr("class", (d) =>
            d.edge ? "fill-[#6B2D6F] opacity-55" : "fill-[#D6BEDA]",
          )
          .attr("cx", (d) => d.x)
          .attr("cy", (d) => d.y)
          .attr("r", (d) => (d.edge ? 1.9 : 1.6));
      }

      // Draw SVG Pins (with static base classes, no dynamic hover classes here)
      const pins = svg
        .append("g")
        .selectAll("g")
        .data(startups)
        .join("g")
        .attr("class", "pin cursor-pointer")
        .attr("data-pin", (d) => d.key)
        .attr("transform", (d) => `translate(${projection([d.lon, d.lat])})`)
        .on("mouseenter", (d) => setHoveredPin(d.key))
        .on("mouseleave", () => setHoveredPin(null));

      pins
        .append("circle")
        .attr("class", "halo transition-opacity duration-200 opacity-0")
        .attr("r", (d) => (d.small ? 13 : 20))
        .attr("fill", (d) => d.color);

      pins
        .append("circle")
        .attr("class", "ring transition-opacity duration-200 opacity-35")
        .attr("r", (d) => (d.small ? 6.5 : 10))
        .attr("fill", "none")
        .attr("stroke", (d) => d.color)
        .attr("stroke-width", 1.4);

      pins
        .append("circle")
        .attr("r", (d) => (d.small ? 3.4 : 4.6))
        .attr("fill", (d) => d.color)
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.6);

      pins
        .append("line")
        .attr("class", "leader transition-opacity duration-200 opacity-0")
        .attr("x1", (d) => (d.side === "left" ? -1 : 1) * (d.small ? 8 : 12))
        .attr("y1", (d) => (d.dy || 0) * 0.4)
        .attr("x2", (d) => (d.side === "left" ? -1 : 1) * (d.small ? 15 : 19))
        .attr("y2", (d) => d.dy || 0)
        .attr("stroke", (d) => d.color)
        .attr("stroke-width", 1.1);

      pins
        .append("text")
        .attr(
          "class",
          "plabel text-[11.5px] font-bold font-sans tracking-wide transition-opacity duration-200 opacity-0",
        )
        .attr("x", (d) => (d.side === "left" ? -1 : 1) * (d.small ? 19 : 23))
        .attr("y", (d) => (d.dy || 0) + 4)
        .attr("text-anchor", (d) => (d.side === "left" ? "end" : "start"))
        .attr("fill", (d) => d.color)
        .text((d) => d.label);
    });
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);

    svg.selectAll(".pin").each(function () {
      const pinNode = d3.select(this);
      const isHovered = pinNode.attr("data-pin") === hoveredPin;

      pinNode
        .select(".halo")
        .classed("opacity-30", isHovered)
        .classed("opacity-0", !isHovered);
      pinNode
        .select(".ring")
        .classed("opacity-90", isHovered)
        .classed("opacity-35", !isHovered);
      pinNode
        .select(".leader")
        .classed("opacity-85", isHovered)
        .classed("opacity-0", !isHovered);
      pinNode
        .select(".plabel")
        .classed("opacity-100", isHovered)
        .classed("opacity-0", !isHovered);
    });
  }, [hoveredPin]);

  return (
    <div className="relative mx-auto w-full max-w-310 max-lg:h-auto h-240 map-stage my-24">
      <div className="absolute inset-0 pointer-events-none map-haze hidden lg:block" />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-120 h-150 max-lg:relative max-lg:transform-none max-lg:left-auto max-lg:top-auto max-lg:mx-auto">
        <svg
          ref={svgRef}
          viewBox="0 0 480 600"
          className="w-full h-full overflow-visible"
        />
      </div>

      <div className="absolute inset-0 hidden lg:block pointer-events-none">
        {startups.map((s, i) => (
          <motion.div
            key={s.key}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotate: s.pos.rot }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            onMouseEnter={() => setHoveredPin(s.key)}
            onMouseLeave={() => setHoveredPin(null)}
            className="absolute w-32 pointer-events-auto origin-center"
            style={{
              left: s.pos.left,
              top: s.pos.top,
              rotate: `${s.pos.rot}deg`,
            }}
          >
            <Card
              className={`p-2 shadow-lg transition-all duration-300 ${hoveredPin === s.key ? "shadow-xl ring-2 scale-105" : ""}`}
              style={{
                borderColor: hoveredPin === s.key ? s.color : "transparent",
              }}
            >
              <div className="relative w-full h-21 bg-[#F6F2EC] rounded-sm mb-2 overflow-hidden">
                <img
                  //   src={sparkSrc}
                  alt={s.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="%23e2e8f0"><rect width="100" height="100"/></svg>';
                  }}
                />
                <Badge
                  className="absolute bottom-1 left-1 w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center p-0"
                  style={{ color: s.color }}
                >
                  <s.icon className="w-3.5 h-3.5" />
                </Badge>
              </div>
              <div className="flex flex-col gap-0.5 px-1">
                <span className="font-display font-bold text-[11.5px] leading-tight text-slate-900">
                  {s.name}
                </span>
                <span className="flex items-start gap-1 text-[9.5px] leading-tight text-slate-500">
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-1 shrink-0"
                    style={{ backgroundColor: s.color }}
                  />
                  {s.town}
                </span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="absolute left-1/2 -bottom-24 -translate-x-1/2 flex items-center gap-2 text-xs text-slate-500 whitespace-nowrap">
        <span className="w-5 h-0.5 rounded-full bg-[#ED6A5F]" />
        {t(
          "map.legend",
          "Each pin is a SPARK facilitation centre at its physical location",
        )}
      </div>
    </div>
  );
}

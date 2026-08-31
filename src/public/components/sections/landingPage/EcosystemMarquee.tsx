import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { SECTOR_DATA } from "@/public/constants/pageConstants";

export function EcosystemMarquee() {
  const { t } = useTranslation();
  const sectors = SECTOR_DATA(t);

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="max-w-350 mx-auto mb-6 px-10">
        <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.08em] uppercase text-[#6B2D6F]">
          <i className="w-1.5 h-1.5 rounded-full bg-[#ED6A5F]" />
          {t("marquee.eyebrow", "Ecosystem Stakeholders")}
        </span>
      </div>

      <div className="relative flex overflow-hidden group mask-edges">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          className="flex gap-4 px-2 w-max py-4"
        >
          {[...sectors, ...sectors].map((s, i) => (
            <Card
              key={i}
              className="rounded-md flex flex-row items-center gap-3 w-61 p-3 bg-white hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-md cursor-pointer"
            >
              <div className="w-12 h-12 shrink-0 rounded overflow-hidden">
                <img
                  src={s.logo}
                  alt={s.name}
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </div>
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="font-display font-bold text-[13.5px] truncate text-slate-900">
                  {s.name}
                </span>
                <span className="flex items-center gap-1.5 text-[10.5px] text-slate-500">
                  <i
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: s.color }}
                  />
                  {s.count}
                </span>
              </div>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

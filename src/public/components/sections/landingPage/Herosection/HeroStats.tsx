import { useTranslation } from "react-i18next";
import { motion, type Variants } from "framer-motion";
import { Card } from "@/components/ui/card";
import { TrendingUp, Rocket, IndianRupee, FileSpreadsheet } from "lucide-react";

export interface StatItem {
  topLabel: string;
  value: string;
  bottomLabel: string;
  icon: React.ElementType;
}

export const StatsSection = () => {
  const { t } = useTranslation();

  const stats: StatItem[] = [
    {
      topLabel: t("stats.startups.top", "Total Registered"),
      value: t("stats.startups.value", "1,284"),
      bottomLabel: t("stats.startups.bottom", "By Founders in Sikkim"),
      icon: Rocket,
    },
    {
      topLabel: t("stats.disbursed.top", "Total Disbursed"),
      value: t("stats.disbursed.value", "₹46.2Cr"),
      bottomLabel: t("stats.disbursed.bottom", "Via State Seed Grants"),
      icon: IndianRupee,
    },
    {
      topLabel: t("stats.schemes.top", "Active State"),
      value: t("stats.schemes.value", "11"),
      bottomLabel: t("stats.schemes.bottom", "Schemes Currently Open"),
      icon: FileSpreadsheet,
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
    },
  };

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-stone-50/50">
      <div className="max-w-300 mx-auto px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 flex flex-col items-center gap-3"
        >
          <h2 className="font-sans text-3xl md:text-4xl font-extrabold tracking-tight text-stone-900">
            {t("stats.header.title", "The Ecosystem Impact")}
          </h2>
          <p className="text-stone-500 text-sm md:text-base max-w-lg">
            {t(
              "stats.header.subtitle",
              "Connecting resources across multiple channels leads to unprecedented state-wide growth.",
            )}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card className="relative p-6 lg:p-8 bg-white shadow-sm border-stone-100 hover:shadow-lg transition-all duration-300 group">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-stone-400">
                    {stat.topLabel}
                  </span>
                  <div className="p-2 rounded-full bg-brand-ternary/20 text-brand-secondary group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-2">
                  <span className="text-4xl md:text-5xl font-extrabold tracking-tighter text-brand-primary">
                    {stat.value}
                  </span>
                  <TrendingUp
                    className="w-7 h-7 text-brand-secondary opacity-80"
                    strokeWidth={2.5}
                  />
                </div>

                <div className="flex justify-between items-end mt-4">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400 max-w-[160px] leading-relaxed">
                    {stat.bottomLabel}
                  </span>
                  <span className="text-[9px] font-medium text-stone-300 uppercase tracking-widest">
                    {t("stats.source", "Source")}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

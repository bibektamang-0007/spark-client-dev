import { useTranslation } from "react-i18next";
import { motion, type Variants } from "framer-motion";

export function MapDescription() {
  const { t } = useTranslation();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="relative z-10 w-full max-w-3xl mx-auto lg:mx-0 flex flex-col gap-4 pt-16 lg:pt-24 pb-8 text-center lg:text-left"
    >
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-center lg:justify-start gap-2.5"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ED6A5F] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ED6A5F]"></span>
        </span>
        <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#6B2D6F]">
          {t("network.eyebrow", "On the ground")}
        </span>
      </motion.div>

      <motion.h2
        variants={itemVariants}
        className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-[1.1] tracking-tight text-slate-900 text-balance"
      >
        {t(
          "network.title",
          "Facilitation network — district industries centres and incubators.",
        )}
      </motion.h2>

      <motion.p
        variants={itemVariants}
        className="text-base sm:text-lg md:text-xl leading-relaxed text-slate-600 max-w-2xl mx-auto lg:mx-0 text-pretty"
      >
        {t(
          "network.lede",
          "Five District Industries Centres, the Gangtok Innovation Hub and two technical incubation centres support founders across Sikkim. Hover a card to locate it on the map.",
        )}
      </motion.p>
    </motion.div>
  );
}

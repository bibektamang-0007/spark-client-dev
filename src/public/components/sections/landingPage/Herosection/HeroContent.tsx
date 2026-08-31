import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HeroBadge } from "./HeroBadge";

export const HeroContent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate("/auth/loginv2", { replace: true, state: "register" });
  };

  // Memoize headings to prevent unnecessary re-renders in the effect
  const headings = useMemo(
    () => [
      t("hero.heading.startup", "Every step of your startup journey."),
      t("hero.heading.enterprise", "Scaling your enterprise globally."),
      t("hero.heading.aspirant", "Fueling aspirant dreams into reality."),
      t("hero.heading.mentor", "Connecting mentors with future leaders."),
    ],
    [t],
  );

  // Typewriter effect state
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const i = loopNum % headings.length;
    const fullText = headings[i];

    const handleTyping = () => {
      setText((current) =>
        isDeleting
          ? fullText.substring(0, current.length - 1)
          : fullText.substring(0, current.length + 1),
      );

      if (isDeleting) {
        setTypingSpeed(40);
      } else {
        setTypingSpeed(60 + Math.random() * 40);
      }

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum((prev) => prev + 1);
        setTypingSpeed(400);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, headings, typingSpeed]);

  return (
    <div className="flex w-full max-w-2xl flex-col items-start gap-8 z-10 relative">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <HeroBadge label={t("hero.badge", "Sikkim Startup Policy 2024")} />
      </motion.div>

      <div className="flex flex-col gap-2 min-h-35 md:min-h-40">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="m-0 text-balance font-sans text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight tracking-tight text-stone-900"
        >
          {t("hero.heading.prefix", "One portal.")}
          <br />
          <span className="inline-block text-brand-primary mt-2 min-h-[1.2em]">
            {text}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              className="inline-block w-0.75 md:w-1 h-[0.9em] bg-brand-primary ml-1 align-baseline -mb-1"
            />
          </span>
        </motion.h1>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="m-0 max-w-xl text-pretty text-base md:text-lg leading-relaxed text-stone-600"
      >
        {t(
          "hero.description",
          "SPARK connects Sikkim's founders, mentors, investors and incubators in one ecosystem. Register your startup, apply to a state scheme, and track every application from idea to scale.",
        )}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-wrap items-center gap-4 pt-2"
      >
        <Button
          size="lg"
          onClick={goToRegister}
          className="h-14 px-8 bg-brand-secondary hover:bg-brand-secondary/90 text-brand-primary rounded-xl text-lg font-semibold cursor-pointer shadow-sm transition-transform hover:-translate-y-0.5"
        >
          {t("hero.actions.register", "Register your startup")}
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="h-14 px-8 bg-brand-ternary hover:bg-brand-ternary/80 text-brand-primary border-transparent rounded-xl text-lg font-semibold transition-transform hover:-translate-y-0.5"
        >
          <Link to="/auth/loginv2">{t("hero.actions.login", "Log in")}</Link>
        </Button>
      </motion.div>
    </div>
  );
};

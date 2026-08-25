import { useNavigate } from "react-router";
import { SelectionCard } from "@/shared/components/cards/SelectionCard";
import { Building, Sparkles } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { AnimatedDiv } from "@/shared/components/wrappers/AnimatedDiv";
import { useTranslation } from "react-i18next";

export const RegistrationOptionsPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("public");
  const handleOptionSelect = () => {
    navigate("/auth/register", { replace: true });
  };
  return (
    <div className="container mx-auto py-14 md:py-32 flex justify-center">
      <div className="card-box">
        <AnimatePresence mode="wait">
          <AnimatedDiv animationKey="select">
            <div className="text-center space-y-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-brand-surface px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-primary">
                <Sparkles className="h-3.5 w-3.5" />
                {t("helper-text.startup-portal")}
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {t("titles.register")}
              </h2>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                {t("helper-text.register-text")}
              </p>
            </div>

            <div className="grid gap-4 pt-2">
              <SelectionCard
                icon={Sparkles}
                cardTitle={t("titles.as-startup")}
                cardDescription={t("helper-text.as-startup-text")}
                handleOptionSelect={handleOptionSelect}
              />
              <SelectionCard
                icon={Building}
                cardTitle={t("titles.as-enterprise")}
                cardDescription={t("helper-text.as-enterprise-text")}
                handleOptionSelect={handleOptionSelect}
              />
              <SelectionCard
                icon={Building}
                cardTitle={t("titles.as-mentor")}
                cardDescription={t("helper-text.as-mentor-text")}
                handleOptionSelect={handleOptionSelect}
              />
            </div>
          </AnimatedDiv>
        </AnimatePresence>
      </div>
    </div>
  );
};

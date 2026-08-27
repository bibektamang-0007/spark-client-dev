import { useNavigate } from "react-router";
import { SelectionCard } from "@/shared/components/cards/SelectionCard";
import { Factory, Rocket, Sparkles, TrendingUp } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { AnimatedDiv } from "@/shared/components/wrappers/AnimatedDiv";
import { useTranslation } from "react-i18next";
import { REGISTRATION_OPTIONS } from "../constants/formConstants";
import { Card } from "@/components/ui/card";

export const RegistrationOptionsPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("public");
  const handleOptionSelect = (registerAs: string) => {
    navigate("/registration", { replace: true, state: registerAs });
  };
  return (
    <Card className="w-full bg-white shadow-2xl shadow-brand-primary/10 border-0 rounded-3xl overflow-hidden p-8 max-w-3xl">
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

          <div className="grid md:grid-cols-2 gap-4 pt-2">
            <SelectionCard
              icon={TrendingUp}
              cardTitle={t("titles.as-aspirant")}
              cardDescription={t("helper-text.as-aspirant-text")}
              handleOptionSelect={() =>
                handleOptionSelect(REGISTRATION_OPTIONS.ASPIRANT)
              }
              iconBg="#E6F7EF"
              iconColor="#22946A"
            />
            <SelectionCard
              icon={Rocket}
              cardTitle={t("titles.as-startup")}
              cardDescription={t("helper-text.as-startup-text")}
              handleOptionSelect={() =>
                handleOptionSelect(REGISTRATION_OPTIONS.STARTUP)
              }
              iconBg="#FDECEA"
              iconColor="#C64A3F"
            />
            <SelectionCard
              icon={Factory}
              cardTitle={t("titles.as-enterprise")}
              cardDescription={t("helper-text.as-enterprise-text")}
              handleOptionSelect={() =>
                handleOptionSelect(REGISTRATION_OPTIONS.ENTERPRISE)
              }
              iconBg="#F6F2EC"
              iconColor="#423E39"
            />
            <SelectionCard
              icon={Sparkles}
              cardTitle={t("titles.as-mentor")}
              cardDescription={t("helper-text.as-mentor-text")}
              handleOptionSelect={() =>
                handleOptionSelect(REGISTRATION_OPTIONS.MENTOR)
              }
              iconBg="#EEE1F0"
              iconColor="#6B2D6F"
            />
          </div>
        </AnimatedDiv>
      </AnimatePresence>
    </Card>
  );
};

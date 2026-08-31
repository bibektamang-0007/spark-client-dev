import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { RegistrationForm } from "../components/forms/registration/RegistrationForm";
import { useEffect } from "react";
import type { RegisterAsOption } from "../components/forms/registration/Registration.types";
import { Card } from "@/components/ui/card";
import { RegistrationHeaderConfig } from "../config/registrationFormConfig";

export const RegistrationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const registerAs: RegisterAsOption = location.state;

  useEffect(() => {
    if (!registerAs) {
      navigate("/auth/verification", { replace: true });
    }
  }, [registerAs, navigate]);

  if (!registerAs) {
    return null;
  }

  const config =
    RegistrationHeaderConfig[registerAs] || RegistrationHeaderConfig.default;
  const Icon = config.icon;

  return (
    <Card className="w-full bg-white shadow-2xl shadow-brand-primary/10 border-0 rounded-3xl overflow-hidden p-8 max-w-7xl">
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center px-2.5 py-1 rounded-full border border-gray-200 bg-white shadow-sm">
          <span className="flex w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
          <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">
            Registering as:{" "}
            <span className="text-brand-primary">{registerAs}</span>
          </span>
        </div>

        {/* Allows them to fix a misclick without losing their email verification */}
        <button
          onClick={() => navigate("/registration-options")}
          className="text-xs font-medium text-gray-400 hover:text-brand-primary flex items-center transition-colors"
        >
          <ArrowLeft className="w-3 h-3 mr-1" />
          Change
        </button>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-6">
        <div
          className={`shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl`}
          style={{ backgroundColor: config.iconBg, color: config.iconColor }}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900">
            {config.title}
          </h2>
          <span className="text-gray-500 text-sm mt-0.5">
            {config.subtitle}
          </span>
        </div>
      </div>
      <RegistrationForm registerAs={registerAs} />
    </Card>
  );
};

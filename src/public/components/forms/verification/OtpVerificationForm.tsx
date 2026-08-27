import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatedDiv } from "@/shared/components/wrappers/AnimatedDiv";
import { ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { RegistrationMode } from "./Verification.types";

interface OtpVerificationFormProps {
  handleSubmit: (otp: string) => void;
  onChangeContact: (mode: RegistrationMode) => void;
  onResend: () => void;
  contactValue: string;
  isSubmitting: boolean;
  registrationMode: RegistrationMode;
}

export const OtpVerificationForm = ({
  handleSubmit,
  onChangeContact,
  onResend,
  contactValue,
  isSubmitting,
  registrationMode,
}: OtpVerificationFormProps) => {
  const { t } = useTranslation("public");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  // Derived validation
  const isOtpComplete = otp.every((digit) => digit !== "");

  // OTP input handler
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input box
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  // Handle pasting a 6 digit code directly into the inputs
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text/plain")
      .replace(/[^0-9]/g, "")
      .slice(0, 6);

    if (pastedData) {
      const newOtp = [...otp];
      pastedData.split("").forEach((char, index) => {
        if (index < 6) newOtp[index] = char;
      });
      setOtp(newOtp);

      // Auto-focus the next empty input, or the last one if full
      const focusIndex = Math.min(pastedData.length, 5);
      document.getElementById(`otp-input-${focusIndex}`)?.focus();
    }
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isOtpComplete && !isSubmitting) {
      handleSubmit(otp.join(""));
    }
  };

  return (
    <AnimatedDiv animationKey="otp-verify">
      <div className="mt-4 space-y-1">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-brand-primary" />
          <h2 className="text-lg font-bold tracking-tight text-foreground">
            {t("titles.enter-security-code")}
          </h2>
        </div>
        <p className="text-xs text-muted-foreground">
          {t("helper-text.otp-sent-to")}{" "}
          <strong className="text-foreground">{contactValue}</strong>.
        </p>
      </div>

      <form onSubmit={onFormSubmit} className="mt-6 space-y-6">
        <div className="flex justify-between gap-2">
          {otp.map((digit, idx) => (
            <Input
              key={idx}
              id={`otp-input-${idx}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              disabled={isSubmitting}
              onChange={(e) => handleOtpChange(idx, e.target.value)}
              onPaste={handlePaste}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !otp[idx] && idx > 0) {
                  document.getElementById(`otp-input-${idx - 1}`)?.focus();
                }
              }}
              className="h-12 w-11 text-center text-lg font-bold shadow-sm focus-visible:ring-brand-primary"
            />
          ))}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || !isOtpComplete}
          className="w-full h-12 bg-linear-to-r from-brand-primary to-brand-primary/90 hover:from-brand-primary/90 hover:to-brand-primary text-white rounded-xl text-lg font-semibold shadow-lg shadow-brand-primary/30 transition-all active:scale-[0.98]"
        >
          {isSubmitting ? t("actions.verifying") : t("actions.verify")}
        </Button>

        <div className="text-center flex flex-col gap-3 mt-4">
          <button
            type="button"
            onClick={() => onChangeContact(registrationMode)}
            className="font-medium text-brand-primary transition-colors hover:text-brand-dark hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm"
          >
            {registrationMode === "email"
              ? t("actions.use-different-email")
              : t("actions.use-different-phone")}
          </button>
          <button
            type="button"
            onClick={onResend}
            disabled={isSubmitting}
            className="text-xs font-medium text-brand-primary transition-colors hover:text-brand-dark hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm disabled:opacity-50 disabled:hover:no-underline"
          >
            {t("actions.resend-code-prompt")}
          </button>
        </div>
      </form>
    </AnimatedDiv>
  );
};

import { useState, type Dispatch, type SetStateAction } from "react";
import { Link } from "react-router";
import type { RegistrationMode } from "./Verification.types";
import { AnimatedDiv } from "@/shared/components/wrappers/AnimatedDiv";
import { Button } from "@/shared/components/ui/button";
import { Mail, Phone } from "lucide-react";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { useTranslation } from "react-i18next";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_REGEX = /^[0-9]{10}$/;

interface EmailPhoneVerificationFormProps {
  handleSubmit: (value: string, mode: RegistrationMode) => void;
  isSubmitting: boolean;
  registrationMode: RegistrationMode;
  setRegistrationMode: Dispatch<SetStateAction<RegistrationMode>>;
}

export const EmailPhoneVerificationForm = ({
  handleSubmit,
  isSubmitting,
  registrationMode,
  setRegistrationMode,
}: EmailPhoneVerificationFormProps) => {
  const { t } = useTranslation("public");

  // State for Email
  const [email, setEmail] = useState("");
  const [isEmailTouched, setIsEmailTouched] = useState(false);

  // State for Phone
  const [phone, setPhone] = useState("");
  const [isPhoneTouched, setIsPhoneTouched] = useState(false);

  // Derived validation
  const isValidEmail = EMAIL_REGEX.test(email);
  const showEmailError = isEmailTouched && email.length > 0 && !isValidEmail;

  const isValidPhone = PHONE_REGEX.test(phone);
  const showPhoneError = isPhoneTouched && phone.length > 0 && !isValidPhone;

  // Determine current validity based on mode
  const isFormValid =
    registrationMode === "email" ? isValidEmail : isValidPhone;

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid && !isSubmitting) {
      const submitValue = registrationMode === "email" ? email : phone;
      handleSubmit(submitValue, registrationMode);
    }
  };

  const toggleMode = () => {
    setRegistrationMode((prev) => (prev === "email" ? "phone" : "email"));
  };

  return (
    <AnimatedDiv animationKey="email-phone-verify">
      <div className="space-y-1">
        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {registrationMode === "email"
            ? t("titles.email-verification")
            : t("titles.phone-verification")}
        </h2>
        <p className="text-xs text-muted-foreground">
          {t("helper-text.email-phone-verification-text")}
        </p>
      </div>

      <form onSubmit={onFormSubmit} noValidate className="mt-6 space-y-4">
        {registrationMode === "email" ? (
          <div className="space-y-2">
            <Label htmlFor="registered-email" className="text-xs font-semibold">
              {t("labels.email")}
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="registered-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (showEmailError) setIsEmailTouched(false);
                }}
                onBlur={() => setIsEmailTouched(true)}
                placeholder="name@startup.in"
                className="pl-9 h-10"
                aria-invalid={showEmailError}
                autoFocus
              />
            </div>
            {showEmailError && (
              <p className="mt-1 text-xs font-medium text-destructive">
                {t("errors.invalid-email")}
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="registered-phone" className="text-xs font-semibold">
              {t("labels.phone")}
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="registered-phone"
                type="tel"
                maxLength={10}
                value={phone}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/[^0-9]/g, "");
                  setPhone(numericValue);
                  if (showPhoneError) setIsPhoneTouched(false);
                }}
                onBlur={() => setIsPhoneTouched(true)}
                placeholder="9876543210"
                className="pl-9 h-10"
                aria-invalid={showPhoneError}
                autoFocus
              />
            </div>
            {showPhoneError && (
              <p className="mt-1 text-xs font-medium text-destructive">
                {t("errors.invalid-phone")}
              </p>
            )}
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting || !isFormValid}
          className="h-10 w-full rounded-md bg-brand-primary font-semibold tracking-wide text-white transition-colors hover:bg-brand-dark"
        >
          {isSubmitting
            ? t("actions.sending-code")
            : t("actions.send-verification")}
        </Button>
      </form>

      {/* Footer Actions */}
      <div className="mt-6 flex flex-col items-center gap-3 text-sm">
        <button
          type="button"
          onClick={toggleMode}
          className="font-medium text-brand-primary transition-colors hover:text-brand-dark hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm"
        >
          {registrationMode === "email"
            ? t("actions.use-phone")
            : t("actions.use-email")}
        </button>

        <p className="text-muted-foreground">
          {t("labels.already-have-account")}
          <Link
            to="/auth/login"
            className="font-medium text-slate-900 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm"
          >
            {t("actions.log-in")}
          </Link>
        </p>
      </div>
    </AnimatedDiv>
  );
};

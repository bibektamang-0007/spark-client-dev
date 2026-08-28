import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { AnimatedDiv } from "@/shared/components/wrappers/AnimatedDiv";
import {
  Mail,
  Lock,
  Eye,
  ShieldCheck,
  CheckCircle2,
  EyeOff,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_REGEX = /^[0-9]{10}$/;

interface LoginFormProps {
  onSubmit: (identifier: string, pass: string) => void;
  isSubmitting: boolean;
}

export function LoginForm({ onSubmit, isSubmitting }: LoginFormProps) {
  const { t } = useTranslation("public");

  // State
  const [identifier, setIdentifier] = useState("");
  const [isIdentifierTouched, setIsIdentifierTouched] = useState(false);

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Derived Validation
  const isValidEmail = EMAIL_REGEX.test(identifier);
  const isValidPhone = PHONE_REGEX.test(identifier);
  const isIdentifierValid = isValidEmail || isValidPhone;

  const showIdentifierError =
    isIdentifierTouched && identifier.length > 0 && !isIdentifierValid;

  const isFormValid = isIdentifierValid && password.length >= 6;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid && !isSubmitting) {
      onSubmit(identifier, password);
    }
  };

  return (
    <AnimatedDiv animationKey="login-form">
      <form className="space-y-6" onSubmit={handleFormSubmit}>
        {/* Email Field with leading icon */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 ml-1">
            {t("labels.email-or-phone", "Email or Phone Number")}
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              id="identifier"
              type="text"
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.target.value);
                if (showIdentifierError) setIsIdentifierTouched(false);
              }}
              onBlur={() => setIsIdentifierTouched(true)}
              placeholder={t(
                "placeholders.identifier",
                "name@startup.in or 9876543210",
              )}
              className="pl-10 h-12 bg-brand-secondary/30 rounded-xl transition-all"
              aria-invalid={showIdentifierError}
              autoFocus
            />
          </div>
        </div>

        {/* Password Field with leading and trailing icons */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 ml-1">
            {t("labels.password", "Password")}
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="pl-10 pr-10 h-12 bg-brand-secondary/30 rounded-xl font-mono text-lg tracking-widest"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-primary transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* reCAPTCHA Mockup */}
        <div className="flex items-center justify-between p-3 border rounded-xl bg-gray-50/50">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="robot"
              className="border-gray-300 w-6 h-6 rounded-md data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary"
            />
            <label
              htmlFor="robot"
              className="text-sm font-medium text-gray-700 cursor-pointer"
            >
              I'm not a robot
            </label>
          </div>
          <div className="flex flex-col items-center justify-center">
            <ShieldCheck className="w-8 h-8 text-blue-500 mb-1" />
            <span className="text-[9px] text-gray-400">reCAPTCHA</span>
          </div>
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start space-x-3 pt-2">
          <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-600">
            I agree to Spark Sikkim{" "}
            <a
              href="#"
              className="text-brand-primary hover:underline font-medium"
            >
              Terms of use
            </a>
          </p>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting || !isFormValid}
          className="w-full h-12 bg-linear-to-r from-brand-primary to-brand-primary/90 hover:from-brand-primary/90 hover:to-brand-primary text-white rounded-xl text-lg font-semibold shadow-lg shadow-brand-primary/30 transition-all active:scale-[0.98]"
        >
          {isSubmitting
            ? t("actions.signing-in", "Signing in...")
            : t("actions.sign-in", "Sign In")}
        </Button>
      </form>
    </AnimatedDiv>
  );
}

import { useState } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Eye, EyeOff, Lock, User } from "lucide-react";

import { AnimatedDiv } from "@/shared/components/wrappers/AnimatedDiv";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_REGEX = /^[0-9]{10}$/;

interface LoginFormProps {
  onSubmit: (identifier: string, pass: string) => void;
  isSubmitting: boolean;
}

export const LoginForm = ({ onSubmit, isSubmitting }: LoginFormProps) => {
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
      <form onSubmit={handleFormSubmit} noValidate className="space-y-5">
        {/* Email or Phone Input */}
        <div className="space-y-2">
          <Label htmlFor="identifier" className="text-xs font-semibold">
            {t("labels.email-or-phone", "Email or Phone Number")}
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
              className="pl-9 h-10 transition-all"
              aria-invalid={showIdentifierError}
              autoFocus
            />
          </div>
          {showIdentifierError && (
            <p className="mt-1 text-xs font-medium text-destructive">
              {t(
                "errors.invalid-identifier",
                "Please enter a valid email or 10-digit phone number.",
              )}
            </p>
          )}
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-xs font-semibold">
              {t("labels.password", "Password")}
            </Label>
            <Link
              to="/forgot-password"
              className="text-xs font-medium text-brand-primary transition-colors hover:text-brand-dark hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm"
              tabIndex={-1} // Prevent tabbing to this before the password input itself
            >
              {t("actions.forgot-password", "Forgot password?")}
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="pl-9 pr-10 h-10 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || !isFormValid}
          className="mt-2 w-full h-10 bg-brand-primary text-white hover:bg-brand-dark transition-colors font-semibold tracking-wide rounded-md shadow-sm"
        >
          {isSubmitting
            ? t("actions.signing-in", "Signing in...")
            : t("actions.sign-in", "Sign In")}
        </Button>
      </form>
    </AnimatedDiv>
  );
};

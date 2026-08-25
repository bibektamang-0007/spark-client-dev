import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Building2 } from "lucide-react"; // Replace with your actual Logo component
import { LoginForm } from "../components/forms/login/LoginForm";

export const LoginPage = () => {
  const { t } = useTranslation("public");
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLoginSubmit = async (identifier: string, pass: string) => {
    setIsSubmitting(true);

    try {
      console.log("Authenticating:", { identifier, pass });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-6 mt-8 sm:mt-0 py-14 md:py-32">
      {/* Main Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col items-center justify-center"
      >
        <div className="card-box">
          {/* Header Section */}
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-brand-primary/10 text-brand-primary">
              <Building2 className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {t("titles.welcome-back", "Welcome back")}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {t(
                "helper-text.login-prompt",
                "Enter your credentials to access your account",
              )}
            </p>
          </div>

          {/* Form Section */}
          <LoginForm onSubmit={handleLoginSubmit} isSubmitting={isSubmitting} />
        </div>

        {/* Footer Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-6 text-center text-sm text-muted-foreground"
        >
          {t("labels.no-account", "Don't have an account?")}{" "}
          <Link
            to="/auth/verification"
            className="font-medium text-brand-primary transition-colors hover:text-brand-dark hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm"
          >
            {t("actions.create-account", "Create account")}
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;

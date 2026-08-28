import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2 } from "lucide-react";
import { LoginForm } from "../components/forms/login/LoginForm";
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { RegistrationMode } from "../components/forms/verification/Verification.types";
import { OtpVerificationForm } from "../components/forms/verification/OtpVerificationForm";
import { EmailPhoneVerificationForm } from "../components/forms/verification/EmailPhoneVerificationForm";

export function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [otpSubmitting, setOtpSubmitting] = useState(false);
  const [showOtpValidation, setShowOtpValidation] = useState(false);
  const [registrationMode, setRegistrationMode] =
    useState<RegistrationMode>("email");
  const [userContact, setUserContact] = useState("");
  const [activeTab] = useState(() => {
    return location.state === "register" ? "register" : "signin";
  });

  const handleSendOtp = (contact: string) => {
    setUserContact(contact);
    console.log("CONTACT", contact);
    setOtpSending(true);
    setTimeout(() => {
      setOtpSending(false);
      setShowOtpValidation(true);
    }, 1000);
  };
  const handleSubmitOtp = (otp: string) => {
    setOtpSubmitting(true);
    console.log("String", otp);
    setTimeout(() => {
      setOtpSubmitting(false);
      navigate("/registration-options", { replace: true });
    }, 1000);
  };
  const handleChangeContact = (mode: RegistrationMode) => {
    setRegistrationMode(mode);
    setShowOtpValidation(false);
  };
  const handleResend = () => {};

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
    <Card className="w-full max-w-md bg-white shadow-2xl shadow-brand-primary/10 border-0 rounded-3xl overflow-hidden">
      <Tabs defaultValue={activeTab} className="w-full">
        {/* Top Navigation Tabs */}
        <TabsList className="w-full grid grid-cols-3 bg-brand-secondary/20 rounded-none">
          <TabsTrigger
            value="signin"
            className="rounded-xl data-[state=active]:bg-brand-ternary data-[state=active]:text-brand-primary data-[state=active]:shadow-sm"
          >
            Sign In
          </TabsTrigger>
          <TabsTrigger
            value="register"
            className="rounded-xl text-gray-500 text-xs"
          >
            Register
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="signin"
          className="p-8 space-y-8 focus-visible:outline-none"
        >
          <div className="space-y-6">
            <div
              className="flex items-center space-x-2 text-brand-primary font-bold cursor-pointer"
              onClick={() => navigate("/")}
            >
              <Building2 className="w-6 h-6 text-brand-ternary" />
              <span>
                SIKKIM
                <br />
                <span className="text-xs font-normal tracking-widest text-gray-400">
                  SPARK
                </span>
              </span>
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Sign In
            </h2>
          </div>

          <LoginForm onSubmit={handleLoginSubmit} isSubmitting={isSubmitting} />
        </TabsContent>
        <TabsContent
          value="register"
          className="p-8 space-y-8 focus-visible:outline-none"
        >
          <div className="space-y-6">
            <div
              className="flex items-center space-x-2 text-brand-primary font-bold cursor-pointer"
              onClick={() => navigate("/")}
            >
              <Building2 className="w-6 h-6 text-brand-ternary" />
              <span>
                SIKKIM
                <br />
                <span className="text-xs font-normal tracking-widest text-gray-400">
                  SPARK
                </span>
              </span>
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Register
            </h2>
          </div>
          <AnimatePresence mode="wait">
            {showOtpValidation ? (
              <OtpVerificationForm
                handleSubmit={handleSubmitOtp}
                onResend={handleResend}
                onChangeContact={handleChangeContact}
                contactValue={userContact}
                isSubmitting={otpSubmitting}
                registrationMode={registrationMode}
              />
            ) : (
              <EmailPhoneVerificationForm
                handleSubmit={handleSendOtp}
                isSubmitting={otpSending}
                registrationMode={registrationMode}
                setRegistrationMode={setRegistrationMode}
              />
            )}
          </AnimatePresence>
        </TabsContent>
      </Tabs>
    </Card>
  );
}

import { AnimatePresence } from "framer-motion";
import { EmailPhoneVerificationForm } from "../components/forms/verification/EmailPhoneVerificationForm";
import { useState } from "react";
import { useNavigate } from "react-router";
import { OtpVerificationForm } from "../components/forms/verification/OtpVerificationForm";
import type { RegistrationMode } from "../components/forms/verification/Verification.types";

export const VerificationPage = () => {
  const navigate = useNavigate();
  const [otpSending, setOtpSending] = useState(false);
  const [otpSubmitting, setOtpSubmitting] = useState(false);
  const [showOtpValidation, setShowOtpValidation] = useState(false);
  const [registrationMode, setRegistrationMode] =
    useState<RegistrationMode>("email");
  const [userContact, setUserContact] = useState("");

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
      navigate("/auth/registration-options", { replace: true });
    }, 1000);
  };
  const handleChangeContact = (mode: RegistrationMode) => {
    setRegistrationMode(mode);
    setShowOtpValidation(false);
  };
  const handleResend = () => {};

  return (
    <div className="container mx-auto p-6 py-14 md:py-32 flex justify-center">
      <div className="card-box">
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
      </div>
    </div>
  );
};

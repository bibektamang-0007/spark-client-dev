import { registrationFromConfig } from "@/public/config/registrationFormConfig";
import MultiStepForm from "@/shared/components/multiStepForm/MultiStepForm";
import type { RegisterAsOption } from "./Registration.types";
import { useNavigate } from "react-router";
import { useState } from "react";
import { ApplicationMockAPI } from "@/public/mockservice";

export const RegistrationForm = ({
  registerAs,
}: {
  registerAs: RegisterAsOption;
}) => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  const handleStepSubmit = async (stepData: any, stepIndex: number) => {
    setIsSaving(true);
    try {
      // Save current step data
      const returnedId = await ApplicationMockAPI.saveStepProgress(
        "APP-001",
        stepData,
      );
      console.log("returnedId", returnedId);
      console.log("isSaving", isSaving);
      // Store the ID in state so the next step updates the same record
      // setAppId(returnedId);

      // Navigate to Step 2...
      console.log(`Step ${stepIndex + 1} Submitted:`, stepData);
    } catch (error) {
      console.error("Failed to save progress", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleFinalSubmit = (allData: any) => {
    console.log("Entire Multi-Step Data Submitted:", allData);
    navigate("/auth/registration-success");
  };
  return (
    <MultiStepForm
      formConfig={registrationFromConfig}
      onStepSubmit={handleStepSubmit}
      onFinalSubmit={handleFinalSubmit}
      registerAs={registerAs}
    />
  );
};

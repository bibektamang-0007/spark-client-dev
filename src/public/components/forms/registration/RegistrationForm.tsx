import { registrationFromConfig } from "@/public/config/registrationFormConfig";
import MultiStepForm from "@/shared/components/multiStepForm/MultiStepForm";
import { useTranslation } from "react-i18next";

export const RegistrationForm = () => {
  const { t } = useTranslation("public");
  const handleStepSubmit = (stepData: any, stepIndex: number) => {
    console.log(`Step ${stepIndex + 1} Submitted:`, stepData);
  };

  const handleFinalSubmit = (allData: any) => {
    console.log("Entire Multi-Step Data Submitted:", allData);
  };
  return (
    <MultiStepForm
      formTitle={t("titles.registration-title")}
      formSubTitle={t("titles.registration-subtitle")}
      formConfig={registrationFromConfig}
      onStepSubmit={handleStepSubmit}
      onFinalSubmit={handleFinalSubmit}
    />
  );
};

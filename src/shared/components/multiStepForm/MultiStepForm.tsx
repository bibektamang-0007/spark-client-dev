import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import type { MultiStepFormProps } from "./MultiStepForm.types";
import { SingleStepForm } from "./SingleStepForm";
import { ProgressTracker } from "./ProgressTracker";

const formVariants: Variants = {
  hidden: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
  }),
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -50 : 50,
    opacity: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  }),
};

export default function MultiStepForm({
  formConfig,
  onStepSubmit,
  onFinalSubmit,
  registerAs,
}: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [globalFormData, setGlobalFormData] = useState<Record<string, any>>({});

  const handleStepCompletion = (stepData: any) => {
    const updatedData = { ...globalFormData, ...stepData };
    setGlobalFormData(updatedData);

    if (onStepSubmit) {
      onStepSubmit(stepData, currentStep);
    }

    if (currentStep === formConfig.length - 1) {
      onFinalSubmit(updatedData);
    } else {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = (currentStepValues: Record<string, any>) => {
    setGlobalFormData((prev) => ({ ...prev, ...currentStepValues }));
    setDirection(-1);
    setCurrentStep((prev) => prev - 1);
  };
  return (
    <div className="w-full mx-auto">
      <ProgressTracker formConfig={formConfig} currentStep={currentStep} />
      <div className="overflow-hidden relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full"
          >
            <SingleStepForm
              key={currentStep}
              config={formConfig[currentStep]}
              stepIndex={currentStep}
              totalSteps={formConfig.length}
              defaultValues={globalFormData}
              onSubmit={handleStepCompletion}
              onBack={handleBack}
              registerAs={registerAs}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

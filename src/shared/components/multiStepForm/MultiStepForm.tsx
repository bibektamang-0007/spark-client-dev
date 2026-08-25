import { Fragment, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import type { MultiStepFormProps } from "./MultiStepForm.types";
import { SingleStepForm } from "./SingleStepForm";
import { Check } from "lucide-react";
import { cn } from "@/shared/utils/utils";

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
  formTitle,
  formSubTitle,
  formConfig,
  onStepSubmit,
  onFinalSubmit,
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
      <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900">
        {formTitle}
      </h2>
      <span className="text-gray-500 text-sm">{formSubTitle}</span>
      {/* Progress Tracker */}
      <div className="my-8 mb-14 sm:mb-8 w-full mx-auto px-4">
        <div className="flex items-center justify-between">
          {formConfig.map((config, index) => {
            const isCurrentOrDone = currentStep >= index;
            const isDone = currentStep > index;

            return (
              <Fragment key={index}>
                <div className="relative flex flex-col items-center sm:flex-row sm:gap-3 shrink-0">
                  <motion.div
                    initial={false}
                    animate={{
                      borderColor: isCurrentOrDone
                        ? "var(--brand-green, #4CAF50)"
                        : "#94a3b8",
                      color: isCurrentOrDone
                        ? "var(--brand-green, #4CAF50)"
                        : "#94a3b8",
                      backgroundColor: isDone
                        ? "var(--brand-green, #4CAF50)"
                        : "transparent",
                    }}
                    transition={{ duration: 0.25 }}
                    className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border-[1.5px] transition-colors z-10",
                      isCurrentOrDone
                        ? "border-brand-primary text-brand-primary"
                        : "border-slate-400 text-slate-400 font-medium",
                    )}
                  >
                    <AnimatePresence mode="wait">
                      {isDone ? (
                        <motion.div
                          key="check"
                          initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                          transition={{ duration: 0.2 }}
                          className="text-white"
                        >
                          <Check className="w-4 h-4 stroke-3" />
                        </motion.div>
                      ) : (
                        <motion.span
                          key="number"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          transition={{ duration: 0.2 }}
                        >
                          {index + 1}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Responsive Label */}
                  <span
                    className={cn(
                      "absolute top-full mt-2 left-1/2 -translate-x-1/2 text-center text-[10px] leading-tight",
                      "md:relative md:top-auto md:mt-0 md:left-auto md:translate-x-0 md:text-left md:text-sm",
                      "tracking-tight whitespace-nowrap transition-colors duration-200",
                      isCurrentOrDone
                        ? "text-brand-green font-bold"
                        : "text-slate-400 font-medium",
                    )}
                  >
                    {config?.formHeading}
                  </span>
                </div>

                {/* Connecting Line */}
                {index < formConfig.length - 1 && (
                  <div className="flex-1 mx-2 sm:mx-6 h-px bg-slate-300 relative overflow-hidden min-w-5">
                    <motion.div
                      className="h-full bg-brand-green origin-left"
                      initial={false}
                      animate={{ width: isDone ? "100%" : "0%" }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                    />
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>
      </div>

      <div className="min-h-75 overflow-hidden relative">
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
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

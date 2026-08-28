import { useForm } from "react-hook-form";
import { FormFieldRenderer } from "./FormFieldRenderer";
import type { SingleStepFormProps } from "./MultiStepForm.types";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function SingleStepForm({
  config,
  stepIndex,
  totalSteps,
  defaultValues = {},
  onSubmit,
  onBack,
  registerAs,
}: SingleStepFormProps) {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    values: defaultValues,
    mode: "onTouched",
  });

  const handleBackClick = () => {
    onBack(getValues());
  };

  const standardFields = config?.children.filter(
    (field) => field.type !== "file",
  );
  const documentFields = config?.children.filter(
    (field) => field.type === "file",
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col h-full space-y-6"
      noValidate
    >
      <div className="flex flex-col grow md:border md:border-border md:p-6 rounded-md space-y-8">
        <div className="grid grid-cols-12 gap-x-8 gap-y-10 items-start">
          {standardFields.map((fieldConfig) => (
            <FormFieldRenderer
              key={fieldConfig.name}
              fieldConfig={fieldConfig}
              control={control}
              errors={errors}
              registerAs={registerAs}
            />
          ))}
          {documentFields &&
            documentFields.map((fieldConfig) => (
              <FormFieldRenderer
                key={fieldConfig.name}
                fieldConfig={fieldConfig}
                control={control}
                errors={errors}
                registerAs={registerAs}
              />
            ))}
        </div>
      </div>

      <div className="flex justify-between items-center pt-2">
        <Button
          type="button"
          variant="secondary"
          onClick={handleBackClick}
          disabled={stepIndex === 0}
          className="rounded-md"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 hidden sm:block" />
          Back
        </Button>
        <Button
          type="submit"
          className="rounded-md bg-brand-primary hover:bg-brand-primary/90 text-white"
        >
          {stepIndex === totalSteps - 1 ? "Submit" : "Save and continue"}
        </Button>
      </div>
    </form>
  );
}

import { useForm } from "react-hook-form";
import { FormFieldRenderer } from "./FormFieldRenderer";
import type { SingleStepFormProps } from "./MultiStepForm.types";
import { Button } from "../ui/button";

export function SingleStepForm({
  config,
  stepIndex,
  totalSteps,
  defaultValues = {},
  onSubmit,
  onBack,
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col h-full space-y-6 "
      noValidate
    >
      <div className="grid grid-cols-12 gap-x-8 gap-y-6 grow items-start md:border md:p-6 rounded-md">
        {config?.children.map((fieldConfig) => (
          <FormFieldRenderer
            key={fieldConfig.name}
            fieldConfig={fieldConfig}
            control={control}
            errors={errors}
          />
        ))}
      </div>

      <div className="flex justify-between items-center pt-5">
        <Button
          type="button"
          variant="secondary"
          onClick={handleBackClick}
          disabled={stepIndex === 0}
          className="rounded-md"
        >
          Back
        </Button>
        <Button type="submit" className="rounded-md bg-brand-primary">
          {stepIndex === totalSteps - 1 ? "Submit" : "Save and continue"}
        </Button>
      </div>
    </form>
  );
}

import {
  Controller,
  useWatch,
  type Control,
  type FieldErrors,
} from "react-hook-form";
import { MultiGroupField } from "./MultiGroupField";
import type { FieldConfig } from "./MultiStepForm.types";
import { useMemo } from "react";
import { FileUpload } from "../inputs/FileUpload";
import type { RegisterAsOption } from "@/public/components/forms/registration/Registration.types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface FormFieldRendererProps {
  fieldConfig: FieldConfig;
  control: Control<any>;
  errors: FieldErrors;
  registerAs?: RegisterAsOption;
}

// 1. Helper to resolve relative nested field names inside dynamic arrays
function resolveTargetFieldName(
  currentFieldName: string,
  targetName: string,
): string {
  if (!targetName) return "";
  if (targetName.includes(".")) return targetName;
  const pathSegments = currentFieldName.split(".");
  if (pathSegments.length > 1) {
    pathSegments[pathSegments.length - 1] = targetName;
    return pathSegments.join(".");
  }
  return targetName;
}

// 2. Type-coercing comparator to handle boolean/string/number conversions cleanly
function evaluateCondition(expectedValue: any, actualValue: any): boolean {
  if (actualValue === undefined || actualValue === null || actualValue === "") {
    return false;
  }

  if (Array.isArray(expectedValue)) {
    return expectedValue.some(
      (val) =>
        String(val).toLowerCase().trim() ===
        String(actualValue).toLowerCase().trim(),
    );
  }

  return (
    String(expectedValue).toLowerCase().trim() ===
    String(actualValue).toLowerCase().trim()
  );
}

// Gets dynamic value for col span
const getColSpanClass = (col: 1 | 2 | 3 = 2) => {
  if (col === 1) return "col-span-12";
  if (col === 3) return "col-span-12 md:col-span-4";
  return "col-span-12 md:col-span-6";
};

export function FormFieldRenderer({
  fieldConfig,
  control,
  errors,
  registerAs,
}: FormFieldRendererProps) {
  const colSpanClass = getColSpanClass(fieldConfig.col);
  const targetFieldName = useMemo(() => {
    return fieldConfig.dependsOn
      ? resolveTargetFieldName(
          fieldConfig.name,
          fieldConfig.dependsOn.fieldName,
        )
      : "";
  }, [fieldConfig.name, fieldConfig.dependsOn]);

  // --- Watch for Cascading Parent Field ---
  const cascadingParentName = useMemo(() => {
    return fieldConfig.cascadingOptions
      ? resolveTargetFieldName(
          fieldConfig.name,
          fieldConfig.cascadingOptions.dependsOnField,
        )
      : "";
  }, [fieldConfig.name, fieldConfig.cascadingOptions]);

  const watchedCascadingParent = useWatch({
    control,
    name: cascadingParentName,
  });

  // Calculate dynamic options based on the parent value
  const activeOptions = useMemo(() => {
    if (fieldConfig.cascadingOptions && watchedCascadingParent) {
      return (
        fieldConfig.cascadingOptions.optionsMap[watchedCascadingParent] || []
      );
    }
    return fieldConfig.options || [];
  }, [
    fieldConfig.cascadingOptions,
    fieldConfig.options,
    watchedCascadingParent,
  ]);

  // Watch target field if conditional dependency is configured
  const watchedValue = useWatch({
    control,
    name: targetFieldName,
  });

  // Dynamic validation rules generator
  const validationRules = useMemo(() => {
    const rules: Record<string, any> = {};
    if (fieldConfig.required) {
      rules.required = `${fieldConfig.label} is required`;
    }
    rules.validate = (value: any) => {
      if (!value && !fieldConfig.required) return true;
      if (!value && fieldConfig.required)
        return `${fieldConfig.label} is required`;

      if (fieldConfig.type === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRegex.test(String(value).trim())) {
          return "Please enter a valid email address (e.g. name@domain.com)";
        }
      }

      if (fieldConfig.type === "mobile") {
        const mobileRegex = /^[6-9]\d{9}$/;
        if (!mobileRegex.test(String(value).trim())) {
          return "Please enter a valid 10-digit mobile number starting with 6-9";
        }
      }

      return true;
    };

    return rules;
  }, [fieldConfig.required, fieldConfig.type, fieldConfig.label]);

  // --- NEW: Evaluate Role-based condition ---
  if (fieldConfig.showForRoles && registerAs) {
    if (!fieldConfig.showForRoles.includes(registerAs)) {
      return null;
    }
  }

  // Evaluate condition: hide component if expected value does not match
  if (fieldConfig.dependsOn) {
    const isVisible = evaluateCondition(
      fieldConfig.dependsOn.expectedValue,
      watchedValue,
    );

    if (!isVisible) {
      return null;
    }
  }

  if (fieldConfig.type === "multiple") {
    return (
      <div className={colSpanClass}>
        <Controller
          name={fieldConfig.name}
          control={control}
          rules={{
            validate: (val) => {
              if (fieldConfig.required && (!val || val.length === 0)) {
                return `At least one ${fieldConfig.label.toLowerCase()} is required`;
              }
              return true;
            },
          }}
          render={() => (
            <MultiGroupField
              fieldConfig={fieldConfig}
              control={control}
              errors={errors}
            />
          )}
        />
      </div>
    );
  }

  return (
    <div className={colSpanClass}>
      <Controller
        name={fieldConfig.name}
        control={control}
        rules={validationRules}
        render={({ field, fieldState }) => {
          if (fieldConfig.cascadingOptions && field.value) {
            const isValid = activeOptions.some(
              (opt) => opt.value === field.value,
            );
            if (!isValid && activeOptions.length > 0) {
              // Delay the reset slightly to avoid React render cycle warnings
              setTimeout(() => field.onChange(""), 0);
            }
          }

          return (
            <div className="flex flex-col space-y-2">
              {/* Label and Optional Additional Notes */}
              <div>
                <Label
                  htmlFor={fieldConfig.name}
                  className="font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1"
                >
                  {fieldConfig.label}
                  {fieldConfig.required && (
                    <span className="text-destructive font-bold">*</span>
                  )}
                </Label>
                {fieldConfig.additionalNotes && (
                  <p className="text-[11.5px] text-muted-foreground mt-1.5 leading-relaxed">
                    {fieldConfig.additionalNotes}
                  </p>
                )}
              </div>

              {(() => {
                switch (fieldConfig.type) {
                  case "textarea":
                    return (
                      <div className="relative">
                        <textarea
                          {...field}
                          id={fieldConfig.name}
                          value={field.value ?? ""}
                          placeholder={
                            fieldConfig.placeholder ??
                            `Enter ${fieldConfig.label.toLowerCase()}`
                          }
                          maxLength={fieldConfig.maxLength}
                          aria-invalid={fieldState.invalid}
                          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none h-30"
                        />
                        {fieldConfig.maxLength && (
                          <div className="text-[10px] text-muted-foreground text-right mt-1">
                            {String(field.value ?? "").length} /{" "}
                            {fieldConfig.maxLength}
                          </div>
                        )}
                      </div>
                    );

                  case "text":
                    return (
                      <Input
                        {...field}
                        id={fieldConfig.name}
                        value={field.value ?? ""}
                        placeholder={
                          fieldConfig.placeholder ??
                          `Enter ${fieldConfig.label.toLowerCase()}`
                        }
                        aria-invalid={fieldState.invalid}
                        className="text-sm"
                      />
                    );

                  case "email":
                    return (
                      <Input
                        {...field}
                        id={fieldConfig.name}
                        type="email"
                        value={field.value ?? ""}
                        placeholder={
                          fieldConfig.placeholder ?? "name@example.com"
                        }
                        aria-invalid={fieldState.invalid}
                        className="text-sm"
                      />
                    );

                  case "mobile":
                    return (
                      <Input
                        {...field}
                        id={fieldConfig.name}
                        type="tel"
                        maxLength={10}
                        value={field.value ?? ""}
                        placeholder={fieldConfig.placeholder ?? "9876543210"}
                        aria-invalid={fieldState.invalid}
                        onChange={(e) => {
                          const numericOnly = e.target.value.replace(/\D/g, "");
                          field.onChange(numericOnly);
                        }}
                        className="text-sm"
                      />
                    );

                  case "number":
                    return (
                      <Input
                        {...field}
                        id={fieldConfig.name}
                        type="number"
                        value={field.value ?? ""}
                        placeholder={
                          fieldConfig.placeholder ??
                          `Enter ${fieldConfig.label.toLowerCase()}`
                        }
                        aria-invalid={fieldState.invalid}
                        className="text-sm"
                      />
                    );

                  case "date":
                    return (
                      <Input
                        {...field}
                        id={fieldConfig.name}
                        type="date"
                        value={field.value ?? ""}
                        aria-invalid={fieldState.invalid}
                        className="block w-full text-sm"
                      />
                    );

                  case "dropdown":
                    return (
                      <Select
                        value={field.value ?? ""}
                        onValueChange={field.onChange}
                        // --- NEW: Disable if cascading but parent is not selected ---
                        disabled={
                          !!fieldConfig.cascadingOptions &&
                          !watchedCascadingParent
                        }
                      >
                        <SelectTrigger
                          id={fieldConfig.name}
                          aria-invalid={fieldState.invalid}
                          className="w-full"
                        >
                          <SelectValue
                            placeholder={
                              // --- NEW: Dynamic placeholder for cascading fields ---
                              fieldConfig.cascadingOptions &&
                              !watchedCascadingParent
                                ? `Select ${fieldConfig.cascadingOptions.dependsOnField} first`
                                : (fieldConfig.placeholder ??
                                  `Select ${fieldConfig.label.toLowerCase()}`)
                            }
                          />
                        </SelectTrigger>
                        <SelectContent alignItemWithTrigger={false}>
                          {/* --- NEW: Use activeOptions instead of fieldConfig.options --- */}
                          {activeOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    );

                  case "radio":
                    return (
                      <RadioGroup
                        value={field.value ?? ""}
                        onValueChange={field.onChange}
                        className="flex flex-wrap gap-6 pt-1"
                      >
                        {/* --- NEW: Use activeOptions instead of fieldConfig.options --- */}
                        {activeOptions.map((opt) => (
                          <div
                            key={opt.value}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={opt.value}
                              id={`${fieldConfig.name}-${opt.value}`}
                            />
                            <Label
                              htmlFor={`${fieldConfig.name}-${opt.value}`}
                              className="font-normal cursor-pointer text-sm"
                            >
                              {opt.label}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    );

                  case "file":
                    return (
                      <FileUpload
                        name={fieldConfig.name}
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        hasError={fieldState.invalid}
                      />
                    );

                  default:
                    return null;
                }
              })()}

              {fieldState.error && (
                <span className="text-xs text-destructive mt-1 font-medium">
                  {fieldState.error.message}
                </span>
              )}
            </div>
          );
        }}
      />
    </div>
  );
}

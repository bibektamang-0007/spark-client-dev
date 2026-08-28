import type { RegisterAsOption } from "@/public/components/forms/registration/Registration.types";

export type FieldType =
  | "text"
  | "dropdown"
  | "file"
  | "radio"
  | "multiple"
  | "date"
  | "mobile"
  | "email"
  | "number"
  | "textarea";

export interface FieldOption {
  label: string;
  value: string;
}

export interface CascadingOptions {
  dependsOnField: string;
  optionsMap: Record<string, FieldOption[]>;
}

export interface FieldDependency {
  fieldName: string;
  expectedValue: string | number | boolean | Array<string | number | boolean>;
}

export interface FieldConfig {
  label: string;
  type: FieldType;
  name: string;
  options?: FieldOption[];
  cascadingOptions?: CascadingOptions;
  required?: boolean;
  multiGroupFields?: FieldConfig[];
  col?: 1 | 2 | 3;
  dependsOn?: FieldDependency;
  showForRoles?: RegisterAsOption[];
  placeholder?: string;
  additionalNotes?: string;
  maxLength?: number;
}

export interface FormConfig {
  formHeading: string;
  children: FieldConfig[];
}

export interface MultiStepFormProps {
  formConfig: FormConfig[];
  onStepSubmit?: (stepData: any, stepIndex: number) => void;
  onFinalSubmit: (allData: any) => void;
  registerAs: RegisterAsOption;
}

export interface SingleStepFormProps {
  config: FormConfig;
  stepIndex: number;
  totalSteps: number;
  defaultValues: any;
  onSubmit: (data: Record<string, any>) => void;
  onBack: (currentValues: Record<string, any>) => void;
  registerAs: RegisterAsOption;
}

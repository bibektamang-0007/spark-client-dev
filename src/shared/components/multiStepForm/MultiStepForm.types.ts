export type FieldType =
  | "text"
  | "dropdown"
  | "file"
  | "radio"
  | "multiple"
  | "date"
  | "mobile"
  | "email"
  | "number";

export interface FieldOption {
  label: string;
  value: string;
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
  required?: boolean;
  multiGroupFields?: FieldConfig[];
  col?: 1 | 2 | 3;
  dependsOn?: FieldDependency;
}

export interface FormConfig {
  formHeading: string;
  children: FieldConfig[];
}

export interface MultiStepFormProps {
  formTitle: string;
  formSubTitle: string;
  formConfig: FormConfig[];
  onStepSubmit?: (stepData: any, stepIndex: number) => void;
  onFinalSubmit: (allData: any) => void;
}

export interface SingleStepFormProps {
  config: FormConfig;
  stepIndex: number;
  totalSteps: number;
  defaultValues: any;
  onSubmit: (data: Record<string, any>) => void;
  onBack: (currentValues: Record<string, any>) => void;
}

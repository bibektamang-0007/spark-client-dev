import { useFieldArray, type Control, type FieldErrors } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import type { FieldConfig } from "./MultiStepForm.types";
import { FormFieldRenderer } from "./FormFieldRenderer";
import { Button } from "../ui/button";

interface MultiGroupFieldProps {
  fieldConfig: FieldConfig;
  control: Control<any>;
  errors: FieldErrors;
}

export function MultiGroupField({
  fieldConfig,
  control,
  errors,
}: MultiGroupFieldProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldConfig.name,
  });

  const handleAdd = () => {
    const emptyItem: Record<string, any> = {};
    fieldConfig.multiGroupFields?.forEach((subField) => {
      emptyItem[subField.name] = "";
    });
    append(emptyItem);
  };

  return (
    <div className="space-y-4 rounded-lg border border-border/80 bg-muted/20 p-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold tracking-tight text-foreground flex items-center gap-1">
          {fieldConfig.label}
          {fieldConfig.required && (
            <span className="text-destructive font-bold">*</span>
          )}
        </label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAdd}
          className="h-8 gap-1.5 text-xs font-medium"
        >
          <Plus className="h-3.5 w-3.5" />
          Add {fieldConfig.label}
        </Button>
      </div>

      {fields.length === 0 && (
        <div className="rounded-md border border-dashed border-border py-6 text-center text-xs text-muted-foreground">
          No items added yet. Click &ldquo;Add {fieldConfig.label}&rdquo; to add
          one.
        </div>
      )}

      <div className="space-y-4">
        {fields.map((fieldItem, index) => (
          <div
            key={fieldItem.id}
            className="relative rounded-md border border-border bg-card p-4 shadow-xs"
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-border/60">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {fieldConfig.label} #{index + 1}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => remove(index)}
                className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                aria-label={`Remove item ${index + 1}`}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>

            <div className="grid grid-cols-12 gap-x-8 gap-y-6 grow items-start">
              {fieldConfig.multiGroupFields?.map((subField) => (
                <FormFieldRenderer
                  key={`${fieldConfig.name}.${index}.${subField.name}`}
                  fieldConfig={{
                    ...subField,
                    name: `${fieldConfig.name}.${index}.${subField.name}`,
                  }}
                  control={control}
                  errors={errors}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

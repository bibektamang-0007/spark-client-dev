import { useState } from "react";
import {
  useFieldArray,
  useWatch,
  type Control,
  type FieldErrors,
} from "react-hook-form";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import type { FieldConfig } from "./MultiStepForm.types";
import { FormFieldRenderer } from "./FormFieldRenderer";
import { Button } from "@/components/ui/button";

// Sub-component to fetch live field data without re-rendering the entire array list
const FieldSummary = ({
  control,
  path,
  fallbackName,
}: {
  control: Control<any>;
  path: string;
  fallbackName: string;
}) => {
  const itemData = useWatch({ control, name: path });

  // Dynamically find name and role keys based on typical naming conventions (e.g., founderName, founderRole)
  const nameKey = Object.keys(itemData || {}).find((k) =>
    k.toLowerCase().includes("name"),
  );
  const roleKey = Object.keys(itemData || {}).find((k) =>
    k.toLowerCase().includes("role"),
  );

  const displayName =
    nameKey && itemData[nameKey] ? itemData[nameKey] : fallbackName;
  const displayRole =
    roleKey && itemData[roleKey] ? itemData[roleKey] : "No role specified";

  return (
    <div className="flex flex-col border-l border-border/60 pl-4 ml-2">
      <span className="text-sm font-semibold text-foreground">
        {displayName}
      </span>
      <span className="text-xs text-muted-foreground">{displayRole}</span>
    </div>
  );
};

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

  // Track which fields are currently collapsed by their ID
  const [collapsedIds, setCollapsedIds] = useState<Set<string>>(new Set());

  const standardFields = fieldConfig?.multiGroupFields?.filter(
    (field) => field.type !== "file",
  );
  const documentFields = fieldConfig?.multiGroupFields?.filter(
    (field) => field.type === "file",
  );

  const handleAdd = () => {
    const emptyItem: Record<string, any> = {};
    fieldConfig.multiGroupFields?.forEach((subField) => {
      emptyItem[subField.name] = "";
    });

    // Auto-collapse all previously opened items when a new one is added
    setCollapsedIds((prev) => {
      const next = new Set(prev);
      fields.forEach((f) => next.add(f.id));
      return next;
    });

    append(emptyItem);
  };

  const toggleCollapse = (id: string) => {
    setCollapsedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-4 rounded-lg">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold tracking-tight text-foreground flex items-center gap-1">
          {fieldConfig.label}
          {fieldConfig.required && (
            <span className="text-destructive font-bold">*</span>
          )}
        </label>
      </div>

      {fields.length === 0 && (
        <div className="rounded-md border border-dashed border-border py-6 text-center text-xs text-muted-foreground">
          No items added yet. Click &ldquo;Add {fieldConfig.label}&rdquo; to add
          one.
        </div>
      )}

      <div className="space-y-4">
        {fields.map((fieldItem, index) => {
          const isCollapsed = collapsedIds.has(fieldItem.id);

          return (
            <div
              key={fieldItem.id}
              className="relative rounded-md border border-border bg-card p-4 shadow-xs transition-all"
            >
              <div
                className={`flex items-center justify-between ${isCollapsed ? "" : "pb-3 mb-3 border-b border-border/60"}`}
              >
                {/* Header & Dynamic Summary */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider bg-muted/50 px-2 py-1 rounded-md">
                    {fieldConfig.label} #{index + 1}
                  </span>
                  {isCollapsed && (
                    <FieldSummary
                      control={control}
                      path={`${fieldConfig.name}.${index}`}
                      fallbackName={`New ${fieldConfig.label}`}
                    />
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleCollapse(fieldItem.id)}
                    className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-accent"
                    aria-label={
                      isCollapsed ? "Expand details" : "Collapse details"
                    }
                  >
                    {isCollapsed ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronUp className="h-4 w-4" />
                    )}
                  </Button>
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
              </div>

              {/* Form Fields Body (Hidden when collapsed) */}
              {!isCollapsed && (
                <div className="flex flex-col grow space-y-6 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="grid grid-cols-12 gap-x-8 gap-y-10 items-start">
                    {standardFields?.map((subField) => (
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
                    {documentFields &&
                      documentFields.map((subField) => (
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
              )}
            </div>
          );
        })}
      </div>
      <div className="flex justify-end">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAdd}
          className="h-8 gap-1.5 text-xs font-medium bg-brand-ternary hover:bg-brand-ternary/80"
        >
          <Plus className="h-3.5 w-3.5" />
          Add {fieldConfig.label}
        </Button>
      </div>
    </div>
  );
}

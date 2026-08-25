import * as React from "react";
import { UploadCloud, FileText, X } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { Button } from "../ui/button";

interface FileUploadProps {
  name: string;
  value?: File | string | null;
  onChange: (file: File | null) => void;
  onBlur?: () => void;
  disabled?: boolean;
  hasError?: boolean;
  accept?: string;
}

export function FileUpload({
  name,
  value,
  onChange,
  onBlur,
  disabled,
  hasError,
  accept,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onChange(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inputRef.current) inputRef.current.value = "";
    onChange(null);
  };

  const fileName =
    value instanceof File
      ? value.name
      : typeof value === "string"
        ? value.split("/").pop()
        : null;

  const fileSize =
    value instanceof File
      ? `${(value.size / (1024 * 1024)).toFixed(2)} MB`
      : null;

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        id={name}
        name={name}
        type="file"
        accept={accept}
        className="sr-only"
        onBlur={onBlur}
        disabled={disabled}
        onChange={(e) => onChange(e.target.files?.[0] || null)}
      />

      {!fileName ? (
        <label
          htmlFor={name}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "group relative flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-5 text-center cursor-pointer transition-all duration-200",
            isDragging
              ? "border-brand-primary bg-brand-primary/5"
              : "border-border/80 hover:border-brand-primary/60 bg-muted/15 hover:bg-muted/30",
            hasError && "border-destructive/80 bg-destructive/5",
            disabled && "cursor-not-allowed opacity-60",
          )}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background border border-border/60 shadow-2xs group-hover:scale-105 transition-transform">
            <UploadCloud className="h-5 w-5 text-muted-foreground group-hover:text-brand-primary transition-colors" />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs font-semibold text-foreground">
              <span className="text-brand-primary underline-offset-2 hover:underline">
                Click to upload
              </span>{" "}
              or drag and drop
            </p>
            <p className="text-[11px] text-muted-foreground">
              PDF, DOCX, PNG, or JPG (max. 10MB)
            </p>
          </div>
        </label>
      ) : (
        <div
          className={cn(
            "flex items-center justify-between gap-3 rounded-lg border bg-card p-3 shadow-2xs transition-all",
            hasError ? "border-destructive" : "border-border",
          )}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand-primary/10 text-brand-primary">
              <FileText className="h-4.5 w-4.5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-foreground">
                {fileName}
              </p>
              {fileSize && (
                <p className="text-[11px] text-muted-foreground">{fileSize}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <label
              htmlFor={name}
              className="cursor-pointer text-[11px] font-medium text-brand-primary hover:underline px-2 py-1"
            >
              Replace
            </label>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleRemove}
              className="h-7 w-7 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              aria-label="Remove uploaded file"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

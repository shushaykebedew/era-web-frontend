"use client";

import { useRef, useState, ChangeEvent, DragEvent } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/utils/cn";

export interface LogoUploadFieldProps {
  id?: string;
  label?: string;
  file: File | null;
  previewUrl: string | null;
  onFileSelect: (file: File) => void;
  onClear: () => void;
}

export function LogoUploadField({
  id = "logo-upload",
  label = "Company Logo",
  file,
  previewUrl,
  onFileSelect,
  onClear,
}: LogoUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      onFileSelect(selectedFile);
    }
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      onFileSelect(droppedFile);
    }
  }

  function handleClear() {
    onClear();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <div className="flex flex-col gap-1.5 2xl:gap-2.5">
      <label className="text-[10px] 2xl:text-sm font-inter font-semibold uppercase tracking-[1.8px] text-foreground-muted/80">
        {label}{" "}
        <span className="normal-case tracking-normal text-foreground-muted/50 font-normal">
          (Optional)
        </span>
      </label>

      <input
        ref={fileInputRef}
        id={id}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {previewUrl ? (
        /* Preview State */
        <div className="flex items-center gap-4 p-4 2xl:p-5 bg-[#0f0d0a] border border-primary/20 rounded-lg">
          <div className="relative w-16 h-16 2xl:w-20 2xl:h-20 shrink-0 rounded-md overflow-hidden border border-primary/20 bg-[#1a1612]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="Logo preview"
              className="w-full h-full object-contain p-1"
            />
          </div>
          <div className="flex flex-col gap-1.5 min-w-0 flex-1">
            <p className="text-sm 2xl:text-base text-foreground font-inter font-medium truncate">
              {file?.name}
            </p>
            <p className="text-xs 2xl:text-sm text-foreground-muted/60 font-inter">
              {file ? (file.size / 1024).toFixed(0) + " KB" : ""}
            </p>
            <div className="flex items-center gap-3 mt-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs 2xl:text-sm font-inter font-semibold text-primary hover:text-primary/80 transition-colors uppercase tracking-[1px] cursor-pointer"
              >
                Replace
              </button>
              <span className="h-3 w-px bg-primary/20" />
              <button
                type="button"
                onClick={handleClear}
                className="text-xs 2xl:text-sm font-inter font-semibold text-foreground-muted/60 hover:text-danger transition-colors uppercase tracking-[1px] cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Drop Zone */
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={cn(
            "w-full flex flex-col items-center justify-center gap-3 2xl:gap-4",
            "py-8 2xl:py-10 px-6 rounded-lg border-2 border-dashed cursor-pointer",
            "transition-all duration-200 group",
            isDragging
              ? "border-primary bg-primary/8 scale-[1.01]"
              : "border-primary/20 hover:border-primary/40 bg-[#0f0d0a] hover:bg-[#13110c]",
          )}
        >
          <div
            className={cn(
              "w-12 h-12 2xl:w-16 2xl:h-16 rounded-full flex items-center justify-center transition-colors duration-200",
              "border border-primary/20 group-hover:border-primary/40",
              isDragging ? "bg-primary/15 border-primary/50" : "bg-primary/5",
            )}
          >
            <Upload
              className={cn(
                "w-5 h-5 2xl:w-6 2xl:h-6 transition-colors duration-200",
                isDragging
                  ? "text-primary"
                  : "text-primary/50 group-hover:text-primary/70",
              )}
            />
          </div>
          <div className="text-center">
            <p className="text-sm 2xl:text-base font-inter font-semibold text-foreground/80 group-hover:text-foreground transition-colors">
              <span className="text-primary">Click to upload</span> or drag & drop
            </p>
            <p className="text-xs 2xl:text-sm text-foreground-muted/50 font-inter mt-1">
              PNG, JPG, SVG or WEBP — max 5 MB
            </p>
          </div>
        </button>
      )}
    </div>
  );
}

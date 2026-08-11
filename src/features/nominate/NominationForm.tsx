"use client";

import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useCategories } from "@/hooks/queries/useNominees";
import { createNominee } from "@/services/nominees";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Dropdown } from "@/components/ui/Dropdown";
import { TEXTAREA_LIMITS } from "@/constants/textLimits";
import {
  AlertCircle,
  CheckCircle2,
  Upload,
  X,
  Image as ImageIcon,
  Building2,
  Globe,
  Mail,
  Phone,
  User,
  Award,
  FileText,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import {
  validateRequiredName,
  validateRequiredEmail,
  validatePhone,
  sanitizePhone,
} from "@/utils/validation";
import type { AwardCategory } from "@/types";

// ── Design tokens ─────────────────────────────────────────────────────────────
const inputBase = cn(
  "w-full bg-[#0f0d0a] border border-primary/15 rounded-lg",
  "px-4 pl-11 2xl:pl-14 pr-4 py-3 2xl:py-4",
  "text-base 2xl:text-[20px] text-foreground font-inter",
  "placeholder:text-foreground-muted/40",
  "outline-none transition-all duration-200",
  "focus:border-primary/50 focus:ring-1 focus:ring-primary/20 focus:bg-[#13110c]",
  "hover:border-primary/25",
);

const inputError = "border-danger/50 focus:border-danger/70 focus:ring-danger/20";

// ── Field wrapper ──────────────────────────────────────────────────────────────
function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5 2xl:gap-2.5">
      <label
        htmlFor={id}
        className="text-[10px] 2xl:text-sm font-inter font-semibold uppercase tracking-[1.8px] text-foreground-muted/80"
      >
        {label}
      </label>
      <div className="relative">
        {children}
      </div>
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="text-[11px] 2xl:text-sm text-danger font-inter flex items-center gap-1"
          >
            <AlertCircle className="w-3 h-3 shrink-0" />
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Icon prefix helper ─────────────────────────────────────────────────────────
function InputIcon({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <Icon className="absolute left-3.5 2xl:left-4 top-1/2 -translate-y-1/2 w-4 h-4 2xl:w-5 2xl:h-5 text-primary/50 pointer-events-none" />
  );
}

// ── Category Select ────────────────────────────────────────────────────────────
function CategorySelect({
  value,
  onChange,
  categories,
  error,
}: {
  value: string;
  onChange: (id: string) => void;
  categories: AwardCategory[];
  error?: string;
}) {
  const options = categories.map((c) => ({ value: c.id, label: c.name }));
  const selected = options.find((o) => o.value === value);

  return (
    <Field id="nom-category" label="Award Category *" error={error}>
      <Dropdown<string>
        value={value}
        onChange={onChange}
        options={options}
        className="relative"
        renderButton={({ open, onClick, onKeyDown }) => (
          <>
            <input type="hidden" name="awardCategoryId" value={value} required />
            <button
              id="nom-category"
              type="button"
              role="combobox"
              aria-haspopup="listbox"
              aria-expanded={open}
              aria-controls="category-listbox"
              onClick={onClick}
              onKeyDown={onKeyDown}
              className={cn(
                inputBase,
                "flex items-center justify-between cursor-pointer text-left",
                error ? inputError : "",
                open && "border-primary/50 ring-1 ring-primary/20 bg-[#13110c]",
                !selected && "text-foreground-muted/40",
              )}
            >
              <Award className="absolute left-3.5 2xl:left-4 top-1/2 -translate-y-1/2 w-4 h-4 2xl:w-5 2xl:h-5 text-primary/50" />
              <span className="text-base 2xl:text-[20px] truncate">
                {selected ? selected.label : "Select a category..."}
              </span>
              <svg
                width="12" height="8" viewBox="0 0 12 8" fill="none"
                className={cn(
                  "shrink-0 text-primary/60 transition-transform duration-200 2xl:w-4 2xl:h-3",
                  open && "rotate-180",
                )}
              >
                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}
        renderList={({ activeIndex, setActiveIndex, onSelect, options: opts }) => (
          <ul
            id="category-listbox"
            role="listbox"
            tabIndex={-1}
            className={cn(
              "absolute z-20 top-[calc(100%+6px)] w-full border border-primary/20",
              "bg-[#0f0d0a] shadow-[0_16px_40px_rgba(0,0,0,0.7)] rounded-lg overflow-hidden",
              "max-h-64 2xl:max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/30",
              "animate-in fade-in slide-in-from-top-2 duration-150",
            )}
          >
            {opts.map((option, i) => {
              const isSelected = option.value === value;
              const isActive = i === activeIndex;
              return (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => onSelect(option)}
                  className={cn(
                    "flex cursor-pointer items-center justify-between px-4 2xl:px-6 py-3 2xl:py-4",
                    "text-sm 2xl:text-lg font-inter transition-colors border-b border-primary/5 last:border-0",
                    isActive && !isSelected ? "bg-primary/8 text-foreground" : "text-foreground-muted",
                    isSelected && "bg-primary/10 text-primary font-semibold",
                  )}
                >
                  <span>{option.label}</span>
                  {isSelected && (
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" className="shrink-0 2xl:w-4 2xl:h-4 text-primary">
                      <path d="M1 5L4.5 8.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      />
    </Field>
  );
}

// ── Main export ────────────────────────────────────────────────────────────────
export function NominationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactPerson: "",
    awardCategoryId: "",
    reason: "",
    website: "",
  });

  const [phone, setPhone] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const { data: categories = [] } = useCategories();

  const nominateMutation = useMutation({
    mutationFn: createNominee,
    onSuccess: () => setIsSuccess(true),
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function applyLogo(file: File) {
    setLogoFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setLogoPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (file) applyLogo(file);
  }

  function clearLogo() {
    setLogoFile(null);
    setLogoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) applyLogo(file);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errors: Record<string, string> = {};

    const nameErr = validateRequiredName(formData.name, "Company Name");
    if (nameErr) errors.name = nameErr;

    const emailErr = validateRequiredEmail(formData.email);
    if (emailErr) errors.email = emailErr;

    const contactErr = validateRequiredName(formData.contactPerson, "Contact Person");
    if (contactErr) errors.contactPerson = contactErr;

    const phoneErr = validatePhone(phone);
    if (phoneErr) errors.phone = phoneErr;

    if (!formData.awardCategoryId)
      errors.awardCategoryId = "Please select a category";

    const reasonErr = validateRequiredName(formData.reason, "Reason for nomination");
    if (reasonErr) errors.reason = reasonErr;

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    nominateMutation.mutate({ ...formData, phone, logo: logoFile });
  }

  // ── Success screen ──────────────────────────────────────────────────────────
  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-12 text-center"
      >
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full bg-success/20 blur-2xl scale-150" />
          <CheckCircle2 className="relative w-20 h-20 2xl:w-24 2xl:h-24 text-success" />
        </div>
        <h3 className="text-3xl 2xl:text-5xl font-bold font-display text-foreground mb-3">
          Nomination <span className="text-primary italic">Submitted</span>
        </h3>
        <p className="text-foreground-muted font-inter mb-10 2xl:text-xl 2xl:leading-8 max-w-sm 2xl:max-w-md">
          Your nomination for{" "}
          <span className="text-foreground font-semibold">{formData.name}</span>{" "}
          has been received. Our team will review and verify the listing.
        </p>
        <Button
          onClick={() => setIsSuccess(false)}
          variant="primary"
          className="px-10 sm:px-14 2xl:px-20 h-12 2xl:h-16 tracking-[2px] 2xl:tracking-[3.6px] text-[12px] 2xl:text-base font-bold font-inter"
        >
          Submit Another Nomination
        </Button>
      </motion.div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────
  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-5 2xl:gap-7"
      onSubmit={handleSubmit}
    >
      {/* Row 1 — Company Name + Website */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:gap-8">
        <Field id="nom-name" label="Company Name *" error={fieldErrors.name}>
          <InputIcon icon={Building2} />
          <input
            id="nom-name"
            name="name"
            type="text"
            placeholder="e.g. Zoma Real Estate"
            value={formData.name}
            onChange={handleChange}
            required
            className={cn(inputBase, fieldErrors.name && inputError)}
          />
        </Field>

        <Field id="nom-website" label="Website">
          <InputIcon icon={Globe} />
          <input
            id="nom-website"
            name="website"
            type="url"
            placeholder="https://company.com"
            value={formData.website}
            onChange={handleChange}
            className={inputBase}
          />
        </Field>
      </div>

      {/* Row 2 — Email + Contact Person */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:gap-8">
        <Field id="nom-email" label="Email Address *" error={fieldErrors.email}>
          <InputIcon icon={Mail} />
          <input
            id="nom-email"
            name="email"
            type="email"
            placeholder="contact@company.com"
            value={formData.email}
            onChange={handleChange}
            required
            className={cn(inputBase, fieldErrors.email && inputError)}
          />
        </Field>

        <Field id="nom-contact" label="Contact Person *" error={fieldErrors.contactPerson}>
          <InputIcon icon={User} />
          <input
            id="nom-contact"
            name="contactPerson"
            type="text"
            placeholder="e.g. Ruth Elias"
            value={formData.contactPerson}
            onChange={handleChange}
            required
            className={cn(inputBase, fieldErrors.contactPerson && inputError)}
          />
        </Field>
      </div>

      {/* Row 3 — Phone + Category */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:gap-8">
        <Field id="nom-phone" label="Phone Number" error={fieldErrors.phone}>
          <InputIcon icon={Phone} />
          <input
            id="nom-phone"
            name="phone"
            type="tel"
            placeholder="+251 911 234 567"
            value={phone}
            maxLength={13}
            onChange={(e) => {
              setPhone(sanitizePhone(e.target.value));
              setFieldErrors((prev) => ({ ...prev, phone: "" }));
            }}
            className={cn(inputBase, fieldErrors.phone && inputError)}
          />
        </Field>

        <CategorySelect
          value={formData.awardCategoryId}
          onChange={(id) => {
            setFormData((prev) => ({ ...prev, awardCategoryId: id }));
            setFieldErrors((prev) => ({ ...prev, awardCategoryId: "" }));
          }}
          categories={categories}
          error={fieldErrors.awardCategoryId}
        />
      </div>

      {/* Row 4 — Reason */}
      <Textarea
        id="nom-reason"
        name="reason"
        label="Reason for Nomination *"
        placeholder="Describe why this company deserves the award — their impact, innovation, and contribution to Ethiopia's real estate landscape..."
        value={formData.reason}
        onChange={handleChange}
        required
        rows={4}
        maxLength={TEXTAREA_LIMITS.nomineeReason}
        showCount
        error={fieldErrors.reason}
      />

      {/* Row 5 — Logo upload */}
      <div className="flex flex-col gap-1.5 2xl:gap-2.5">
        <label className="text-[10px] 2xl:text-sm font-inter font-semibold uppercase tracking-[1.8px] text-foreground-muted/80">
          Company Logo <span className="normal-case tracking-normal text-foreground-muted/50 font-normal">(Optional)</span>
        </label>

        <input
          ref={fileInputRef}
          id="nom-logo-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleLogoChange}
        />

        {logoPreview ? (
          /* ── Preview state ── */
          <div className="flex items-center gap-4 p-4 2xl:p-5 bg-[#0f0d0a] border border-primary/20 rounded-lg">
            <div className="relative w-16 h-16 2xl:w-20 2xl:h-20 shrink-0 rounded-md overflow-hidden border border-primary/20 bg-[#1a1612]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logoPreview} alt="Logo preview" className="w-full h-full object-contain p-1" />
            </div>
            <div className="flex flex-col gap-1.5 min-w-0 flex-1">
              <p className="text-sm 2xl:text-base text-foreground font-inter font-medium truncate">
                {logoFile?.name}
              </p>
              <p className="text-xs 2xl:text-sm text-foreground-muted/60 font-inter">
                {logoFile ? (logoFile.size / 1024).toFixed(0) + " KB" : ""}
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
                  onClick={clearLogo}
                  className="text-xs 2xl:text-sm font-inter font-semibold text-foreground-muted/60 hover:text-danger transition-colors uppercase tracking-[1px] cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ── Drop zone ── */
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
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
            <div className={cn(
              "w-12 h-12 2xl:w-16 2xl:h-16 rounded-full flex items-center justify-center transition-colors duration-200",
              "border border-primary/20 group-hover:border-primary/40",
              isDragging ? "bg-primary/15 border-primary/50" : "bg-primary/5",
            )}>
              <Upload className={cn(
                "w-5 h-5 2xl:w-6 2xl:h-6 transition-colors duration-200",
                isDragging ? "text-primary" : "text-primary/50 group-hover:text-primary/70",
              )} />
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

      {/* Error banner */}
      <AnimatePresence>
        {nominateMutation.isError && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="flex items-start gap-3 px-4 py-3 2xl:px-5 2xl:py-4 rounded-lg border border-danger/30 bg-danger/8 text-danger"
          >
            <AlertCircle className="w-4 h-4 2xl:w-5 2xl:h-5 mt-0.5 shrink-0" />
            <span className="text-sm 2xl:text-base font-inter">
              {(nominateMutation.error as any)?.response?.data?.message ||
                "An error occurred while submitting your nomination."}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit */}
      <div className="mt-2 flex justify-center">
        <Button
          type="submit"
          isLoading={nominateMutation.isPending}
          variant="primary"
          className={cn(
            "w-full sm:w-auto px-10 sm:px-14 2xl:px-20 h-12 2xl:h-16",
            "tracking-[2.5px] 2xl:tracking-[4px] font-bold font-inter text-[12px] 2xl:text-base",
            "shadow-[0_4px_20px_rgba(201,162,75,0.25)] hover:shadow-[0_6px_28px_rgba(201,162,75,0.35)]",
          )}
        >
          Submit Nomination
        </Button>
      </div>
    </motion.form>
  );
}

"use client";

import { useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Dropdown } from "@/components/ui/Dropdown";
import { TEXTAREA_LIMITS } from "@/constants/textLimits";
import { type TierId } from "@/types/partners";
import { cn } from "@/utils/cn";
import { TIERS } from "./PartnersTierCards";
import { SponsorshipFormProps } from "@/types/partners";
import { SlideUp } from "@/components/ui/animations";
import { partnersService } from "@/services/partners";
import {
  AlertCircle,
  Upload,
  Building2,
  Globe,
  Mail,
  Phone,
  User,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  validateRequiredName,
  validateRequiredEmail,
  validatePhone,
  sanitizePhone,
} from "@/utils/validation";

// ── Design tokens ──────────────────────────────────────────────────────────────
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

// ── Icon prefix inside input ───────────────────────────────────────────────────
function InputIcon({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <Icon className="absolute left-3.5 2xl:left-4 top-1/2 -translate-y-1/2 w-4 h-4 2xl:w-5 2xl:h-5 text-primary/50 pointer-events-none" />
  );
}

// ── Tier Select (using same Dropdown pattern) ─────────────────────────────────
const tierOptions = TIERS.map((t) => ({ value: t.id, label: t.label }));

function TierSelectField({
  value,
  onChange,
  error,
}: {
  value: TierId | "";
  onChange: (v: TierId | "") => void;
  error?: string;
}) {
  const selected = tierOptions.find((o) => o.value === value);

  return (
    <Field id="sp-tier" label="Partnership Tier *" error={error}>
      <Dropdown<TierId | "">
        value={value}
        onChange={onChange}
        options={tierOptions}
        className="relative"
        renderButton={({ open, onClick, onKeyDown }) => (
          <>
            <input type="hidden" name="tier" value={value} required />
            <button
              id="sp-tier"
              type="button"
              role="combobox"
              aria-haspopup="listbox"
              aria-expanded={open}
              aria-controls="tier-listbox"
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
              <FileText className="absolute left-3.5 2xl:left-4 top-1/2 -translate-y-1/2 w-4 h-4 2xl:w-5 2xl:h-5 text-primary/50" />
              <span className="text-base 2xl:text-[20px] truncate">
                {selected ? selected.label : "Select a tier..."}
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
        renderList={({ activeIndex, setActiveIndex, onSelect, options }) => (
          <ul
            id="tier-listbox"
            role="listbox"
            tabIndex={-1}
            className={cn(
              "absolute z-20 top-[calc(100%+6px)] w-full border border-primary/20",
              "bg-[#0f0d0a] shadow-[0_16px_40px_rgba(0,0,0,0.7)] rounded-lg overflow-hidden",
              "max-h-64 2xl:max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/30",
              "animate-in fade-in slide-in-from-top-2 duration-150",
            )}
          >
            {options.map((option, i) => {
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
                    "text-sm 2xl:text-lg font-inter uppercase tracking-wide transition-colors border-b border-primary/5 last:border-0",
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
export function SponsorshipForm({ selectedTier = "" }: SponsorshipFormProps) {
  const [tier, setTier] = useState<TierId | "">(selectedTier);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [phone, setPhone] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setFieldErrors({});

    const form = e.currentTarget;
    const data = new FormData(form);

    const errors: Record<string, string> = {};
    const company = data.get("company") as string;
    const email = data.get("email") as string;

    const companyErr = validateRequiredName(company, "Company Name");
    if (companyErr) errors.company = companyErr;

    const emailErr = validateRequiredEmail(email);
    if (emailErr) errors.email = emailErr;

    const phoneErr = validatePhone(phone);
    if (phoneErr) errors.phone = phoneErr;

    if (!tier) errors.tier = "Partnership tier is required";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setIsLoading(false);
      return;
    }

    try {
      await partnersService.submit({
        name: company,
        contactEmail: email,
        contactPhone: phone,
        contactName: data.get("contactName") as string,
        website: data.get("website") as string,
        description: data.get("vision") as string,
        tier: tier ? tier.toUpperCase() : undefined,
        logo: logoFile,
      });
      form.reset();
      setTier("");
      setPhone("");
      setLogoFile(null);
      setLogoPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      const responseData = err?.response?.data;
      const validationErrors: { field: string; message: string }[] =
        responseData?.errors ?? [];

      if (validationErrors.length > 0) {
        const fieldMap: Record<string, string> = {};
        const unmapped: string[] = [];

        for (const ve of validationErrors) {
          if (ve.field === "name") fieldMap.company = ve.message;
          else if (ve.field === "contactEmail") fieldMap.email = ve.message;
          else if (ve.field === "contactName") fieldMap.contactName = ve.message;
          else if (ve.field === "contactPhone") fieldMap.phone = ve.message;
          else if (ve.field === "website") fieldMap.website = ve.message;
          else if (ve.field === "tier") fieldMap.tier = ve.message;
          else unmapped.push(ve.message);
        }

        if (Object.keys(fieldMap).length > 0) setFieldErrors(fieldMap);
        if (unmapped.length > 0) setError(unmapped[0]);
        else if (Object.keys(fieldMap).length === 0)
          setError(responseData?.message ?? "Failed to submit request. Please try again.");
      } else {
        setError(responseData?.message ?? "Failed to submit request. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section
      id="sponsorship-form"
      className={cn(
        "bg-[#110E08] border border-primary/20 my-10 sm:my-20 2xl:my-28",
        "w-[calc(100%-2rem)] max-w-4xl 2xl:max-w-6xl mx-auto py-12 sm:py-20 lg:py-24 2xl:py-32",
        "scroll-mt-20 2xl:scroll-mt-24",
      )}
    >
      <Container size="narrow">
        <SlideUp>
          <div className="text-left sm:text-center">
            <h2
              className={cn(
                "font-display text-[28px] sm:text-[32px] text-foreground xl:text-[48px]",
                "2xl:text-[64px] font-semibold leading-tight xl:leading-14 2xl:leading-20",
              )}
            >
              Request Partnership Package
            </h2>
            <p
              className={cn(
                "mx-auto mt-4 max-w-121 2xl:max-w-160 text-base 2xl:text-[24px]",
                "leading-6 2xl:leading-9 text-foreground-muted font-inter",
              )}
            >
              Complete the form below to receive our detailed partnership
              brochure and schedule a private consultation with our directors.
            </p>
          </div>
        </SlideUp>

        <SlideUp delay={0.2}>
          <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-5 2xl:gap-7">
            {/* Row 1 — Company Name + Website */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:gap-8">
              <Field id="sp-company" label="Company Name *" error={fieldErrors.company}>
                <InputIcon icon={Building2} />
                <input
                  id="sp-company"
                  name="company"
                  type="text"
                  placeholder="e.g. Zoma Real Estate"
                  required
                  className={cn(inputBase, fieldErrors.company && inputError)}
                />
              </Field>

              <Field id="sp-website" label="Website" error={fieldErrors.website}>
                <InputIcon icon={Globe} />
                <input
                  id="sp-website"
                  name="website"
                  type="url"
                  placeholder="https://company.com"
                  className={cn(inputBase, fieldErrors.website && inputError)}
                />
              </Field>
            </div>

            {/* Row 2 — Contact Name + Email */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:gap-8">
              <Field id="sp-contact" label="Contact Name" error={fieldErrors.contactName}>
                <InputIcon icon={User} />
                <input
                  id="sp-contact"
                  name="contactName"
                  type="text"
                  placeholder="e.g. Selam Bekele"
                  className={cn(inputBase, fieldErrors.contactName && inputError)}
                />
              </Field>

              <Field id="sp-email" label="Business Email *" error={fieldErrors.email}>
                <InputIcon icon={Mail} />
                <input
                  id="sp-email"
                  name="email"
                  type="email"
                  placeholder="contact@company.com"
                  required
                  className={cn(inputBase, fieldErrors.email && inputError)}
                />
              </Field>
            </div>

            {/* Row 3 — Phone + Tier */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:gap-8">
              <Field id="sp-phone" label="Phone Number" error={fieldErrors.phone}>
                <InputIcon icon={Phone} />
                <input
                  id="sp-phone"
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

              <TierSelectField
                value={tier}
                onChange={(v) => {
                  setTier(v as TierId | "");
                  setFieldErrors((prev) => ({ ...prev, tier: "" }));
                }}
                error={fieldErrors.tier}
              />
            </div>

            {/* Row 4 — Strategic vision */}
            <Textarea
              id="sp-vision"
              name="vision"
              label="Strategic Vision"
              placeholder="Tell us about your partnership goals, target audience, and what you hope to achieve through this collaboration..."
              rows={4}
              maxLength={TEXTAREA_LIMITS.partnerVision}
              showCount
            />

            {/* Row 5 — Logo upload */}
            <div className="flex flex-col gap-1.5 2xl:gap-2.5">
              <label className="text-[10px] 2xl:text-sm font-inter font-semibold uppercase tracking-[1.8px] text-foreground-muted/80">
                Company Logo{" "}
                <span className="normal-case tracking-normal text-foreground-muted/50 font-normal">(Optional)</span>
              </label>

              <input
                ref={fileInputRef}
                id="partner-logo-upload-web"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoChange}
              />

              {logoPreview ? (
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

            {/* Error / Success banners */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="flex items-start gap-3 px-4 py-3 2xl:px-5 2xl:py-4 rounded-lg border border-danger/30 bg-danger/8 text-danger"
                >
                  <AlertCircle className="w-4 h-4 2xl:w-5 2xl:h-5 mt-0.5 shrink-0" />
                  <span className="text-sm 2xl:text-base font-inter">{error}</span>
                </motion.div>
              )}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="flex items-center gap-3 px-4 py-3 2xl:px-5 2xl:py-4 rounded-lg border border-primary/30 bg-primary/8 text-primary"
                >
                  <span className="text-sm 2xl:text-base font-inter font-semibold">
                    ✓ Request submitted successfully! We'll be in touch soon.
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-2 flex justify-center">
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                disabled={isLoading}
                className={cn(
                  "w-full sm:w-auto px-10 sm:px-14 2xl:px-20 h-12 2xl:h-16",
                  "tracking-[2.5px] 2xl:tracking-[4px] font-bold font-inter text-[12px] 2xl:text-base",
                  "shadow-[0_4px_20px_rgba(201,162,75,0.25)] hover:shadow-[0_6px_28px_rgba(201,162,75,0.35)]",
                )}
              >
                Send Request
              </Button>
            </div>
          </form>
        </SlideUp>
      </Container>
    </section>
  );
}

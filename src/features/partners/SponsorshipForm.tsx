"use client";

import { useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { type TierId } from "@/types/partners";
import { cn } from "@/utils/cn";
import { TierSelect } from "./TierSelect";
import { SponsorshipFormProps } from "@/types/partners";
import { SlideUp } from "@/components/ui/animations";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { partnersService } from "@/services/partners";
import {
  validateRequiredName,
  validateRequiredEmail,
  validatePhone,
  sanitizePhone,
} from "@/utils/validation";

// ── Reusable field components ─────────────────────────────────────────────────
function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <Label
      htmlFor={htmlFor}
      className={cn(
        "text-[10px] 2xl:text-base font-inter font-semibold uppercase",
        "tracking-[1.5px] 2xl:tracking-[2px] text-foreground-muted",
      )}
    >
      {children}
    </Label>
  );
}

const fieldBase =
  "border-b border-[#4E4637] bg-transparent py-3 2xl:py-5 text-base 2xl:text-[20px] text-foreground outline-none placeholder:text-[#9A8F7E] focus:border-primary";

// ── Main export ──────────────────────────────────────────────────────────────
export function SponsorshipForm({ selectedTier = "" }: SponsorshipFormProps) {
  const [tier, setTier] = useState<TierId | "">(selectedTier);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [phone, setPhone] = useState("");

  // Logo upload state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    setLogoFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setLogoPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  function clearLogo() {
    setLogoFile(null);
    setLogoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setFieldErrors({});

    const form = e.currentTarget;
    const data = new FormData(form);

    // Client-side validation
    const errors: Record<string, string> = {};
    const company = data.get("company") as string;
    const email = data.get("email") as string;

    const companyErr = validateRequiredName(company, "Company Name");
    if (companyErr) errors.company = companyErr;

    const emailErr = validateRequiredEmail(email);
    if (emailErr) errors.email = emailErr;

    const phoneErr = validatePhone(phone);
    if (phoneErr) errors.phone = phoneErr;

    if (!tier) {
      errors.tier = "Partnership tier is required";
    }

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
      // Clear form on success instead of showing success message
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
        // Map known fields to inline field errors; anything else goes to the banner
        const fieldMap: Record<string, string> = {};
        const unmapped: string[] = [];

        for (const ve of validationErrors) {
          if (ve.field === "name") {
            fieldMap.company = ve.message;
          } else if (ve.field === "contactEmail") {
            fieldMap.email = ve.message;
          } else if (ve.field === "contactName") {
            fieldMap.contactName = ve.message;
          } else if (ve.field === "contactPhone") {
            fieldMap.phone = ve.message;
          } else if (ve.field === "website") {
            fieldMap.website = ve.message;
          } else if (ve.field === "tier") {
            fieldMap.tier = ve.message;
          } else {
            unmapped.push(ve.message);
          }
        }

        if (Object.keys(fieldMap).length > 0) {
          setFieldErrors(fieldMap);
        }
        // Show the first unmapped error (or the top-level message) in the banner
        if (unmapped.length > 0) {
          setError(unmapped[0]);
        } else if (Object.keys(fieldMap).length === 0) {
          setError(responseData?.message ?? "Failed to submit request. Please try again.");
        }
      } else {
        setError(
          responseData?.message ?? "Failed to submit request. Please try again.",
        );
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
        "w-[calc(100%-2rem)] max-w-4xl 2xl:max-w-5xl mx-auto py-12 sm:py-20 lg:py-24 2xl:py-32",
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
          <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-6">

              {/* Row 1 — Company Name + Website */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Input
                    name="company"
                    type="text"
                    placeholder="Company Name"
                    required
                    className={fieldBase}
                  />
                  {fieldErrors.company && (
                    <span className="text-xs text-danger">{fieldErrors.company}</span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Input
                    name="website"
                    type="url"
                    placeholder="Website URL"
                    className={fieldBase}
                  />
                  {fieldErrors.website && (
                    <span className="text-xs text-danger">{fieldErrors.website}</span>
                  )}
                </div>
              </div>

              {/* Row 2 — Contact Name + Email */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Input
                    name="contactName"
                    type="text"
                    placeholder="Contact Name"
                    className={fieldBase}
                  />
                  {fieldErrors.contactName && (
                    <span className="text-xs text-danger">{fieldErrors.contactName}</span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Input
                    name="email"
                    type="email"
                    placeholder="Business Email"
                    required
                    className={fieldBase}
                  />
                  {fieldErrors.email && (
                    <span className="text-xs text-danger">{fieldErrors.email}</span>
                  )}
                </div>
              </div>

              {/* Row 3 — Phone */}
              <div className="flex flex-col gap-2">
                <Input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => {
                    setPhone(sanitizePhone(e.target.value));
                    setFieldErrors((prev) => ({ ...prev, phone: "" }));
                  }}
                  className={fieldBase}
                />
                {fieldErrors.phone && (
                  <span className="text-xs text-danger">{fieldErrors.phone}</span>
                )}
              </div>

              {/* Row 4 — Tier select */}
              <div className="flex flex-col gap-2">
                <FieldLabel htmlFor="tier">Partnership Tier</FieldLabel>
                <TierSelect value={tier} onChange={setTier} required />
                {fieldErrors.tier && (
                  <span className="text-xs text-danger">{fieldErrors.tier}</span>
                )}
              </div>

              {/* Row 5 — Strategic vision */}
              <div className="flex flex-col gap-2 mt-4">
                <Textarea
                  id="vision"
                  name="vision"
                  placeholder="Strategic Vision — Tell us about your partnership goals"
                  rows={3}
                  className={`resize-none ${fieldBase}`}
                />
              </div>

              {/* Row 6 — Logo upload */}
              <div className="flex flex-col gap-2">
                <FieldLabel htmlFor="partner-logo-upload-web">
                  Company Logo (Optional)
                </FieldLabel>
                <div className="flex items-start gap-4">
                  {/* Preview box */}
                  <div className="w-20 h-20 border border-[#4E4637] bg-[#131313] flex items-center justify-center shrink-0 overflow-hidden relative">
                    {logoPreview ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={logoPreview}
                          alt="Logo preview"
                          className="object-contain w-full h-full p-1"
                        />
                        <button
                          type="button"
                          onClick={clearLogo}
                          className="absolute top-1 right-1 bg-background rounded-full p-0.5 border border-border text-foreground-muted hover:text-danger transition-colors cursor-pointer"
                          title="Remove logo"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </>
                    ) : (
                      <ImageIcon className="w-7 h-7 text-foreground/20" />
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <input
                      ref={fileInputRef}
                      id="partner-logo-upload-web"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoChange}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className={cn(
                        "flex items-center gap-2 border border-[#4E4637] px-4 py-2 cursor-pointer",
                        "text-[12px] font-inter font-semibold uppercase tracking-[1.5px]",
                        "text-foreground-muted hover:border-primary hover:text-primary transition-colors",
                      )}
                    >
                      <Upload className="w-3.5 h-3.5" />
                      {logoPreview ? "Replace Logo" : "Upload Logo"}
                    </button>
                    <p className="text-xs text-foreground-muted">
                      PNG, JPG, SVG or WEBP. Max 5 MB.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-center">
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  isLoading={isLoading}
                  disabled={isLoading}
                  style={{ minWidth: '200px' }}
                  className={cn(
                    "w-full sm:w-auto px-8 sm:px-12 2xl:px-16 bg-primary h-12 2xl:h-16",
                    "tracking-[2px] sm:tracking-[3.6px] 2xl:tracking-[4.8px]",
                    "leading-4 font-bold font-inter text-[12px] 2xl:text-[16px]",
                  )}
                >
                  Send Request
                </Button>
              </div>

              {/* Error message */}
              {error && (
                <div className="border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger">
                  {error}
                </div>
              )}

              {/* Success message */}
              {success && (
                <div className="border border-primary/40 bg-primary/10 px-4 py-3 text-sm text-primary">
                  Request submitted successfully!
                </div>
              )}
            </form>
          </SlideUp>
      </Container>
    </section>
  );
}

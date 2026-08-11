"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { TEXTAREA_LIMITS } from "@/constants/textLimits";
import { type TierId, SponsorshipFormProps } from "@/types/partners";
import { cn } from "@/utils/cn";
import { SlideUp } from "@/components/ui/animations";
import { partnersService } from "@/services/partners";
import { FormField, InputIcon, inputBase, inputError } from "@/components/ui/FormField";
import { LogoUploadField } from "@/components/ui/LogoUploadField";
import { TierSelectField } from "./TierSelectField";
import {
  AlertCircle,
  Building2,
  Globe,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  validateRequiredName,
  validateRequiredEmail,
  validatePhone,
  sanitizePhone,
} from "@/utils/validation";

export function SponsorshipForm({ selectedTier = "" }: SponsorshipFormProps) {
  const [tier, setTier] = useState<TierId | "">(selectedTier);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [phone, setPhone] = useState("");

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  function handleLogoSelect(file: File) {
    setLogoFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setLogoPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  function handleLogoClear() {
    setLogoFile(null);
    setLogoPreview(null);
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
          setError(
            responseData?.message ??
              "Failed to submit request. Please try again.",
          );
      } else {
        setError(
          responseData?.message ??
            "Failed to submit request. Please try again.",
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
          <form
            onSubmit={handleSubmit}
            className="mt-12 flex flex-col gap-5 2xl:gap-7"
          >
            {/* Row 1 — Company Name + Website */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:gap-8">
              <FormField
                id="sp-company"
                label="Company Name *"
                error={fieldErrors.company}
              >
                <InputIcon icon={Building2} />
                <input
                  id="sp-company"
                  name="company"
                  type="text"
                  placeholder="e.g. Zoma Real Estate"
                  required
                  className={cn(inputBase, fieldErrors.company && inputError)}
                />
              </FormField>

              <FormField
                id="sp-website"
                label="Website"
                error={fieldErrors.website}
              >
                <InputIcon icon={Globe} />
                <input
                  id="sp-website"
                  name="website"
                  type="url"
                  placeholder="https://company.com"
                  className={cn(inputBase, fieldErrors.website && inputError)}
                />
              </FormField>
            </div>

            {/* Row 2 — Contact Name + Email */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:gap-8">
              <FormField
                id="sp-contact"
                label="Contact Name"
                error={fieldErrors.contactName}
              >
                <InputIcon icon={User} />
                <input
                  id="sp-contact"
                  name="contactName"
                  type="text"
                  placeholder="e.g. Selam Bekele"
                  className={cn(
                    inputBase,
                    fieldErrors.contactName && inputError,
                  )}
                />
              </FormField>

              <FormField
                id="sp-email"
                label="Business Email *"
                error={fieldErrors.email}
              >
                <InputIcon icon={Mail} />
                <input
                  id="sp-email"
                  name="email"
                  type="email"
                  placeholder="contact@company.com"
                  required
                  className={cn(inputBase, fieldErrors.email && inputError)}
                />
              </FormField>
            </div>

            {/* Row 3 — Phone + Tier */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:gap-8">
              <FormField
                id="sp-phone"
                label="Phone Number"
                error={fieldErrors.phone}
              >
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
              </FormField>

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
            <LogoUploadField
              id="partner-logo-upload-web"
              label="Company Logo"
              file={logoFile}
              previewUrl={logoPreview}
              onFileSelect={handleLogoSelect}
              onClear={handleLogoClear}
            />

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
                  <span className="text-sm 2xl:text-base font-inter">
                    {error}
                  </span>
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
                    ✓ Request submitted successfully! We&apos;ll be in touch soon.
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

"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useCategories } from "@/hooks/queries/useNominees";
import { createNominee } from "@/services/nominees";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { TEXTAREA_LIMITS } from "@/constants/textLimits";
import { FormField, InputIcon, inputBase, inputError } from "@/components/ui/FormField";
import { LogoUploadField } from "@/components/ui/LogoUploadField";
import { CategorySelect } from "./CategorySelect";
import { NominationDraftSuccess } from "./NominationDraftSuccess";
import {
  AlertCircle,
  Building2,
  Globe,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import {
  validateRequiredName,
  validateRequiredEmail,
  validatePhone,
  sanitizePhone,
} from "@/utils/validation";

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
  const [draftResult, setDraftResult] = useState<{
    continuationUrl: string;
    companyName: string;
    expiresAt?: string | number | Date;
  } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const { data: categories = [] } = useCategories();

  const nominateMutation = useMutation({
    mutationFn: createNominee,
    onSuccess: (res: any) => {
      const url =
        res?.continuationUrl ||
        (res?.continuationToken
          ? `${window.location.origin}/nominate/continue?token=${res.continuationToken}`
          : "");
      setDraftResult({
        continuationUrl: url,
        companyName: formData.name,
        expiresAt: res?.expiresAt || (Date.now() + 48 * 60 * 60 * 1000),
      });
    },
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  }

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errors: Record<string, string> = {};

    const nameErr = validateRequiredName(formData.name, "Company Name");
    if (nameErr) errors.name = nameErr;

    const emailErr = validateRequiredEmail(formData.email);
    if (emailErr) errors.email = emailErr;

    const contactErr = validateRequiredName(
      formData.contactPerson,
      "Contact Person",
    );
    if (contactErr) errors.contactPerson = contactErr;

    const phoneErr = validatePhone(phone);
    if (phoneErr) errors.phone = phoneErr;

    if (!formData.awardCategoryId)
      errors.awardCategoryId = "Please select a category";

    const reasonErr = validateRequiredName(
      formData.reason,
      "Reason for nomination",
    );
    if (reasonErr) errors.reason = reasonErr;

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    nominateMutation.mutate({ ...formData, phone, logo: logoFile });
  }

  function handleReset() {
    setDraftResult(null);
    setFormData({
      name: "",
      email: "",
      contactPerson: "",
      awardCategoryId: "",
      reason: "",
      website: "",
    });
    setPhone("");
    setLogoFile(null);
    setLogoPreview(null);
    setFieldErrors({});
    nominateMutation.reset();
  }

  if (draftResult) {
    return (
      <NominationDraftSuccess
        companyName={draftResult.companyName}
        continuationUrl={draftResult.continuationUrl}
        expiresAt={draftResult.expiresAt}
        onReset={handleReset}
      />
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-5 2xl:gap-7"
      onSubmit={handleSubmit}
    >
      {/* Row 1 — Company Name + Website */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:gap-8">
        <FormField id="nom-name" label="Company Name *" error={fieldErrors.name}>
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
        </FormField>

        <FormField id="nom-website" label="Website">
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
        </FormField>
      </div>

      {/* Row 2 — Email + Contact Person */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:gap-8">
        <FormField id="nom-email" label="Email Address *" error={fieldErrors.email}>
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
        </FormField>

        <FormField
          id="nom-contact"
          label="Contact Person *"
          error={fieldErrors.contactPerson}
        >
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
        </FormField>
      </div>

      {/* Row 3 — Phone + Category */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:gap-8">
        <FormField id="nom-phone" label="Phone Number" error={fieldErrors.phone}>
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
        </FormField>

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
      <LogoUploadField
        id="nom-logo-upload"
        label="Company Logo"
        file={logoFile}
        previewUrl={logoPreview}
        onFileSelect={handleLogoSelect}
        onClear={handleLogoClear}
      />

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

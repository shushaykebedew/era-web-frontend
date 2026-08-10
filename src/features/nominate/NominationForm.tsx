"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useCategories } from "@/hooks/queries/useNominees";
import { createNominee } from "@/services/nominees";
import { Button } from "@/components/ui/Button";
import { AlertCircle, CheckCircle2, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";

export function NominationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactPerson: "",
    phone: "",
    awardCategoryId: "",
    reason: "",
    website: "",
  });

  const [logo, setLogo] = useState<File | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const { data: categories = [], isLoading: isLoadingCategories } =
    useCategories();

  const nominateMutation = useMutation({
    mutationFn: createNominee,
    onSuccess: () => {
      setIsSuccess(true);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setLogo(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = "Company Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.contactPerson.trim())
      errors.contactPerson = "Contact Person is required";
    if (!formData.awardCategoryId)
      errors.awardCategoryId = "Please select a category";
    if (!formData.reason.trim())
      errors.reason = "Reason for nomination is required";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    nominateMutation.mutate({
      ...formData,
      logo,
    });
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-8 text-center"
      >
        <CheckCircle2 className="w-16 h-16 text-success mb-6" />
        <h3 className="text-2xl font-bold font-display text-primary mb-3">
          Nomination Submitted
        </h3>
        <p className="text-foreground-muted font-inter mb-8">
          Thank you! Your nomination for{" "}
          <span className="text-foreground font-semibold">{formData.name}</span>{" "}
          has been received successfully. Our team will review the details and
          verify the listing.
        </p>
        <Button onClick={() => setIsSuccess(false)} variant="primary">
          Submit Another Nomination
        </Button>
      </motion.div>
    );
  }

  const fieldBase =
    "border-b border-[#4E4637] bg-transparent py-2.5 text-base text-foreground outline-none placeholder:text-[#9A8F7E] focus:border-primary w-full font-inter";

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-6"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2 text-left">
        <label className="text-[10px] font-inter font-semibold uppercase tracking-[1.5px] text-foreground-muted">
          Company Name *
        </label>
        <input
          name="name"
          placeholder="e.g. Zoma Real Estate"
          value={formData.name}
          onChange={handleChange}
          required
          className={cn(fieldBase, fieldErrors.name && "border-red-500")}
        />
        {fieldErrors.name && (
          <p className="text-xs text-red-400 font-inter mt-0.5">
            {fieldErrors.name}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2 text-left">
          <label className="text-[10px] font-inter font-semibold uppercase tracking-[1.5px] text-foreground-muted">
            Email Address *
          </label>
          <input
            name="email"
            type="email"
            placeholder="e.g. contact@zoma.co"
            value={formData.email}
            onChange={handleChange}
            required
            className={cn(fieldBase, fieldErrors.email && "border-red-500")}
          />
          {fieldErrors.email && (
            <p className="text-xs text-red-400 font-inter mt-0.5">
              {fieldErrors.email}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 text-left">
          <label className="text-[10px] font-inter font-semibold uppercase tracking-[1.5px] text-foreground-muted">
            Contact Person *
          </label>
          <input
            name="contactPerson"
            placeholder="e.g. Ruth Elias"
            value={formData.contactPerson}
            onChange={handleChange}
            required
            className={cn(
              fieldBase,
              fieldErrors.contactPerson && "border-red-500",
            )}
          />
          {fieldErrors.contactPerson && (
            <p className="text-xs text-red-400 font-inter mt-0.5">
              {fieldErrors.contactPerson}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2 text-left">
          <label className="text-[10px] font-inter font-semibold uppercase tracking-[1.5px] text-foreground-muted">
            Phone Number
          </label>
          <input
            name="phone"
            placeholder="e.g. +251 911 234 567"
            value={formData.phone}
            onChange={handleChange}
            className={fieldBase}
          />
        </div>

        <div className="flex flex-col gap-2 text-left">
          <label className="text-[10px] font-inter font-semibold uppercase tracking-[1.5px] text-foreground-muted">
            Category *
          </label>
          <select
            name="awardCategoryId"
            value={formData.awardCategoryId}
            onChange={handleChange}
            required
            className={cn(
              fieldBase,
              "bg-[#0c0c0e] py-3 cursor-pointer",
              fieldErrors.awardCategoryId && "border-red-500",
            )}
          >
            <option value="">Select Category...</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id} className="bg-[#0c0c0e]">
                {c.name}
              </option>
            ))}
          </select>
          {fieldErrors.awardCategoryId && (
            <p className="text-xs text-red-400 font-inter mt-0.5">
              {fieldErrors.awardCategoryId}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 text-left">
        <label className="text-[10px] font-inter font-semibold uppercase tracking-[1.5px] text-foreground-muted">
          Reason for Nomination *
        </label>
        <textarea
          name="reason"
          placeholder="Describe why this company deserves this award..."
          value={formData.reason}
          onChange={handleChange}
          required
          rows={5}
          className={cn(
            fieldBase,
            "resize-none border border-[#4E4637] rounded-md p-4 bg-[#14120e] focus:border-primary",
            fieldErrors.reason && "border-red-500",
          )}
        />
        {fieldErrors.reason && (
          <p className="text-xs text-red-400 font-inter mt-0.5">
            {fieldErrors.reason}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2 text-left">
          <label className="text-[10px] font-inter font-semibold uppercase tracking-[1.5px] text-foreground-muted">
            Website
          </label>
          <input
            name="website"
            placeholder="e.g. https://company.com"
            value={formData.website}
            onChange={handleChange}
            className={fieldBase}
          />
        </div>

        <div className="flex flex-col gap-2 text-left">
          <label className="text-[10px] font-inter font-semibold uppercase tracking-[1.5px] text-foreground-muted">
            Company Logo
          </label>
          <div className="relative border-b border-[#4E4637] py-2 flex items-center justify-between">
            <label className="cursor-pointer flex items-center gap-2 text-primary hover:text-primary-light transition-colors text-sm font-semibold font-inter">
              <Upload className="w-4 h-4" />
              <span>Choose Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <span className="text-xs text-foreground-muted truncate max-w-40 font-inter">
              {logo ? logo.name : "No file selected"}
            </span>
          </div>
        </div>
      </div>

      {nominateMutation.isError && (
        <div className="p-3 bg-danger/10 border border-danger/30 rounded text-danger text-sm font-inter flex items-start gap-2">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>
            {(nominateMutation.error as any)?.response?.data?.message ||
              "An error occurred while submitting your nomination."}
          </span>
        </div>
      )}

      <Button
        type="submit"
        isLoading={nominateMutation.isPending}
        className="mt-6 w-full h-13 text-base font-bold uppercase tracking-widest text-[#402D00]"
        variant="primary"
      >
        Submit Nomination
      </Button>
    </motion.form>
  );
}

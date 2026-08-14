"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { validateNominationToken, submitPaymentSlip } from "@/services/nominees";
import { Button } from "@/components/ui/Button";
import { NominationSuccess } from "./NominationSuccess";
import { NominationStepProgress } from "./NominationStepProgress";
import { DeadlineCountdown } from "./DeadlineCountdown";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { FormField } from "@/components/ui/FormField";
import {
  AlertCircle,
  Building2,
  Clock,
  FileCheck,
  Mail,
  Upload,
  User,
  ArrowRight,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import type { Nominee } from "@/types";

export interface PaymentSlipUploadProps {
  token: string;
}

export function PaymentSlipUpload({ token }: PaymentSlipUploadProps) {
  const [slipFile, setSlipFile] = useState<File | null>(null);
  const [slipPreview, setSlipPreview] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);
  const fileInputRef = useState<HTMLInputElement | null>(null)[0];

  const {
    data: nominee,
    isLoading,
    isError,
    error,
  } = useQuery<Nominee | null>({
    queryKey: ["validateNomineeToken", token],
    queryFn: () => validateNominationToken(token),
    enabled: !!token,
    retry: false,
  });

  const uploadMutation = useMutation({
    mutationFn: (file: File) => submitPaymentSlip(token, file),
    onSuccess: () => {
      setIsSubmittedSuccess(true);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
      setFileError("Please upload an image file (JPG, PNG, WebP) or PDF.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFileError("File size must not exceed 5MB.");
      return;
    }

    setFileError(null);
    setSlipFile(file);

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (ev) => setSlipPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setSlipPreview(null);
    }
  };

  const handleFileClear = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setSlipFile(null);
    setSlipPreview(null);
    setFileError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slipFile) {
      setFileError("Proof of payment file is required.");
      return;
    }
    uploadMutation.mutate(slipFile);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <LoadingSpinner className="w-10 h-10 text-primary mb-4" />
        <p className="text-foreground-muted font-inter text-sm">
          Validating your continuation link...
        </p>
      </div>
    );
  }

  if (isError || !nominee) {
    const errorMsg =
      (error as any)?.response?.data?.message ||
      "Invalid or expired continuation link. Please check your email or contact support.";
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-12 text-center max-w-lg mx-auto"
      >
        <div className="p-4 rounded-full bg-danger/10 text-danger mb-4">
          <AlertCircle className="w-12 h-12" />
        </div>
        <h3 className="text-2xl font-display font-bold text-foreground mb-2">
          Unable to Load Nomination
        </h3>
        <p className="text-foreground-muted font-inter text-sm mb-6 leading-relaxed">
          {errorMsg}
        </p>
      </motion.div>
    );
  }

  if (isSubmittedSuccess) {
    return (
      <NominationSuccess
        companyName={nominee.name}
        onReset={() => {
          window.location.href = "/nominate";
        }}
      />
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col gap-5 2xl:gap-8"
      onSubmit={handleSubmit}
    >
      {/* ── Step Progress Indicator ── */}
      <NominationStepProgress currentStep={2} />

      {/* ── Heading ── */}
      <div className="text-center mb-1 2xl:mb-3">
        <span className="text-[10px] sm:text-[11px] 2xl:text-sm font-inter font-semibold uppercase tracking-[2.5px] 2xl:tracking-[3.5px] text-primary/80 mb-1 block">
          Step 2 — Proof of Payment
        </span>
        <h2 className="text-xl sm:text-2xl 2xl:text-4xl font-display font-bold text-foreground uppercase tracking-wide">
          Upload Payment Slip
        </h2>
      </div>

      {/* ── Nominee Info Summary Card with Live Countdown ── */}
      <div className="p-4 sm:p-5 2xl:p-8 rounded-xl 2xl:rounded-2xl bg-[#0f0d0a] border border-primary/20 flex flex-col gap-3.5 2xl:gap-6 font-inter shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 2xl:w-48 2xl:h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between border-b border-primary/10 pb-3 2xl:pb-4 flex-wrap gap-2 relative z-10">
          <span className="text-[11px] sm:text-xs 2xl:text-sm uppercase tracking-wider text-primary font-semibold">
            Nomination Summary
          </span>
          <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs 2xl:text-sm px-2.5 py-0.5 2xl:px-3.5 2xl:py-1 rounded-full bg-warning/10 text-warning font-semibold border border-warning/20">
            <Clock className="w-3 h-3 2xl:w-4 2xl:h-4" /> Status: DRAFT
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 2xl:gap-6 text-[11px] sm:text-xs 2xl:text-base relative z-10">
          <div className="flex items-center gap-2.5 text-foreground">
            <Building2 className="w-4 h-4 2xl:w-5 2xl:h-5 text-primary/70 shrink-0" />
            <span className="font-semibold text-foreground text-xs sm:text-sm 2xl:text-lg">
              {nominee.name}
            </span>
          </div>

          <div className="flex items-center gap-2.5 text-foreground-muted">
            <User className="w-4 h-4 2xl:w-5 2xl:h-5 text-primary/70 shrink-0" />
            <span>{nominee.contactPerson}</span>
          </div>

          <div className="flex items-center gap-2.5 text-foreground-muted">
            <Mail className="w-4 h-4 2xl:w-5 2xl:h-5 text-primary/70 shrink-0" />
            <span>{nominee.email}</span>
          </div>

          {nominee.category?.name && (
            <div className="flex items-center gap-2.5 text-foreground-muted">
              <span className="text-primary font-medium">Category:</span>
              <span>{nominee.category.name}</span>
            </div>
          )}
        </div>

        {/* Digital Countdown Timer Strip */}
        <DeadlineCountdown
          expiresAt={nominee.continuationTokenExpiresAt}
          label="Payment Deadline Remaining:"
        />
      </div>

      {/* ── Payment Slip Upload Box ── */}
      <FormField id="payment-slip-field" label="Proof of Payment Slip *" error={fileError || ""}>
        <div
          className={cn(
            "relative border-2 border-dashed rounded-xl 2xl:rounded-2xl p-5 sm:p-7 2xl:p-12 text-center transition-colors cursor-pointer",
            slipFile
              ? "border-primary/60 bg-primary/5"
              : "border-primary/20 hover:border-primary/40 bg-[#0b0907]",
            fileError && "border-danger/50 bg-danger/5"
          )}
        >
          <input
            id="payment-slip-field"
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileChange}
            disabled={!!slipFile}
            className={cn(
              "absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10",
              slipFile && "pointer-events-none"
            )}
          />

          {/* Top-Right Icon-Only Remove Button */}
          {slipFile && (
            <button
              type="button"
              onClick={handleFileClear}
              className="absolute top-3 right-3 p-1.5 2xl:p-2 rounded-full bg-danger/15 hover:bg-danger/25 border border-danger/30 text-danger shadow-lg transition-all hover:scale-110 cursor-pointer z-30"
              title="Remove selected file"
            >
              <X className="w-4 h-4 2xl:w-5 2xl:h-5" />
            </button>
          )}

          {slipPreview ? (
            <div className="flex flex-col items-center gap-3 2xl:gap-4 relative z-20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slipPreview}
                alt="Payment Slip Preview"
                className="max-h-48 2xl:max-h-64 rounded-lg border border-primary/25 object-contain shadow-xl"
              />
              <span className="text-[11px] sm:text-xs 2xl:text-base text-primary font-semibold font-inter flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5 2xl:w-5 2xl:h-5" /> {slipFile?.name}
              </span>
            </div>
          ) : slipFile ? (
            <div className="flex flex-col items-center gap-2 2xl:gap-3 py-3 2xl:py-6 relative z-20">
              <FileCheck className="w-10 h-10 2xl:w-16 2xl:h-16 text-primary" />
              <span className="text-xs sm:text-sm 2xl:text-lg text-foreground font-semibold font-inter">
                {slipFile.name}
              </span>
              <span className="text-[10px] sm:text-xs 2xl:text-sm text-foreground-muted font-inter">
                {(slipFile.size / 1024).toFixed(1)} KB
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2.5 2xl:gap-4 py-2 2xl:py-4">
              <div className="p-2.5 2xl:p-4 rounded-full bg-primary/10 text-primary">
                <Upload className="w-7 h-7 2xl:w-12 2xl:h-12" />
              </div>
              <div>
                <p className="text-xs sm:text-sm 2xl:text-xl font-semibold font-inter text-foreground mb-0.5">
                  Click or drag file to upload payment proof
                </p>
                <p className="text-[10px] sm:text-xs 2xl:text-base font-inter text-foreground-muted">
                  Supports JPG, PNG, WebP or PDF (Max 5MB)
                </p>
              </div>
            </div>
          )}
        </div>
      </FormField>

      {/* ── Mutation Error ── */}
      <AnimatePresence>
        {uploadMutation.isError && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="flex items-start gap-3 px-3.5 py-2.5 2xl:px-6 2xl:py-4 rounded-lg border border-danger/30 bg-danger/8 text-danger"
          >
            <AlertCircle className="w-3.5 h-3.5 2xl:w-5 2xl:h-5 mt-0.5 shrink-0" />
            <span className="text-xs 2xl:text-base font-inter">
              {(uploadMutation.error as any)?.response?.data?.message ||
                "Failed to upload payment slip. Please try again."}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Submit Button (Centered Luxury CTA) ── */}
      <div className="mt-2 flex justify-center">
        <Button
          type="submit"
          isLoading={uploadMutation.isPending}
          disabled={!slipFile}
          variant="primary"
          className={cn(
            "w-full sm:w-auto px-8 sm:px-14 2xl:px-20 h-11 sm:h-13 2xl:h-16",
            "tracking-wider 2xl:tracking-[2.5px] font-bold font-inter text-[11px] sm:text-xs 2xl:text-base uppercase flex items-center justify-center gap-2 2xl:gap-3",
            "shadow-[0_4px_20px_rgba(201,162,75,0.25)] hover:shadow-[0_6px_28px_rgba(201,162,75,0.35)]"
          )}
        >
          <span>Submit Payment &amp; Finalize Nomination</span>
          <ArrowRight className="w-3.5 h-3.5 2xl:w-5 2xl:h-5 shrink-0" />
        </Button>
      </div>
    </motion.form>
  );
}

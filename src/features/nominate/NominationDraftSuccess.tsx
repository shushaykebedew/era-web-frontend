"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  PartyPopper,
  Copy,
  Check,
  Clock,
  Mail,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { NominationStepProgress } from "./NominationStepProgress";
import { DeadlineCountdown } from "./DeadlineCountdown";

export interface NominationDraftSuccessProps {
  companyName: string;
  continuationUrl: string;
  expiresAt?: string | number | Date;
  onReset: () => void;
}

export function NominationDraftSuccess({
  companyName,
  continuationUrl,
  expiresAt,
  onReset,
}: NominationDraftSuccessProps) {
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(continuationUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleProceed = () => {
    try {
      const url = new URL(continuationUrl);
      router.push(url.pathname + url.search);
    } catch {
      window.location.href = continuationUrl;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-center justify-center py-4 sm:py-6 2xl:py-10 text-center w-full max-w-4xl 2xl:max-w-5xl mx-auto px-2 sm:px-4 2xl:px-8"
    >
      {/* ── Compact Success Banner ── */}
      <div className="flex items-center gap-3 sm:gap-4 2xl:gap-6 mb-6 sm:mb-8 2xl:mb-12 px-1">
        <div className="relative shrink-0">
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl scale-[2] pointer-events-none" />
          <div className="relative w-11 h-11 sm:w-14 sm:h-14 2xl:w-20 2xl:h-20 rounded-full bg-gradient-to-b from-primary/15 to-primary/5 border-2 border-primary/40 flex items-center justify-center shadow-[0_0_20px_rgba(201,162,75,0.12)]">
            <PartyPopper className="w-5 h-5 sm:w-7 sm:h-7 2xl:w-10 2xl:h-10 text-primary" />
          </div>
        </div>
        <div className="text-left">
          <h3 className="text-sm sm:text-lg 2xl:text-3xl font-bold font-display text-foreground uppercase tracking-wide leading-tight">
            Draft <span className="text-primary italic">Saved</span> — <span className="font-semibold">{companyName}</span>
          </h3>
          <p className="text-[10px] sm:text-xs 2xl:text-base text-foreground-muted font-inter mt-0.5 2xl:mt-1.5">
            Complete your payment within 48 hours to finalize this nomination.
          </p>
        </div>
      </div>

      {/* ── Step Progress Indicator ── */}
      <NominationStepProgress currentStep={2} />

      {/* ── Info Cards (Stacked) ── */}
      <div className="flex flex-col gap-4 2xl:gap-7 w-full mb-5 2xl:mb-10">
        {/* Deadline Card with Live Countdown */}
        <div className="p-4 sm:p-5 2xl:p-8 rounded-xl 2xl:rounded-2xl bg-[#0f0d0a] border border-primary/20 text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-28 h-28 2xl:w-40 2xl:h-40 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-start gap-3 2xl:gap-5 relative z-10">
            <div className="p-2 2xl:p-3.5 rounded-lg 2xl:rounded-xl bg-primary/10 text-primary border border-primary/20 shrink-0 mt-0.5">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 2xl:w-7 2xl:h-7" />
            </div>
            <div className="flex-1 font-inter">
              <div className="flex items-center justify-between flex-wrap gap-1.5 mb-1 2xl:mb-3">
                <h4 className="font-semibold text-foreground text-xs sm:text-sm 2xl:text-xl">
                  48-Hour Payment Deadline
                </h4>
                <span className="text-[9px] sm:text-[10px] 2xl:text-sm px-2.5 py-0.5 2xl:px-3.5 2xl:py-1 rounded-full bg-warning/15 text-warning font-semibold tracking-wider uppercase border border-warning/20">
                  Expires in 48h
                </span>
              </div>
              <p className="text-[10px] sm:text-xs 2xl:text-base text-foreground-muted leading-relaxed mb-3 2xl:mb-4">
                Upload your proof of payment within 48 hours. After 48 hours without payment submission, this nomination draft will automatically expire.
              </p>

              {/* Digital Countdown Timer Strip */}
              <DeadlineCountdown expiresAt={expiresAt} label="Time Remaining:" />
            </div>
          </div>
        </div>

        {/* Continuation Link Card */}
        <div className="p-4 sm:p-5 2xl:p-8 rounded-xl 2xl:rounded-2xl bg-[#0f0d0a] border border-primary/20 text-left relative overflow-hidden">
          <div className="flex items-start gap-3 2xl:gap-5">
            <div className="p-2 2xl:p-3.5 rounded-lg 2xl:rounded-xl bg-primary/10 text-primary border border-primary/20 shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 2xl:w-7 2xl:h-7" />
            </div>
            <div className="flex-1 font-inter min-w-0">
              <h4 className="font-semibold text-foreground text-xs sm:text-sm 2xl:text-xl mb-2 2xl:mb-3">
                Secure Continuation Link
              </h4>
              <div className="flex items-center gap-2 2xl:gap-3">
                <div className="flex-1 bg-[#16130d] border border-primary/15 rounded-lg 2xl:rounded-xl px-3 py-2 2xl:px-5 2xl:py-3.5 text-[10px] sm:text-xs 2xl:text-base font-mono text-primary break-all select-all">
                  {continuationUrl}
                </div>
                <button
                  onClick={handleCopy}
                  className="shrink-0 w-9 h-9 2xl:w-12 2xl:h-12 flex items-center justify-center rounded-lg 2xl:rounded-xl bg-primary/10 border border-primary/25 text-primary hover:bg-primary/20 transition-colors cursor-pointer"
                  title="Copy link"
                >
                  {copied ? (
                    <Check className="w-4 h-4 2xl:w-5 2xl:h-5 text-success" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 2xl:w-5 2xl:h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Email Notice ── */}
      <div className="w-full p-3.5 2xl:p-5 rounded-lg 2xl:rounded-xl bg-primary/5 border border-primary/15 mb-7 2xl:mb-12 flex items-center justify-center gap-2 2xl:gap-3 text-[10px] sm:text-xs 2xl:text-base font-inter text-foreground-muted">
        <Mail className="w-3.5 h-3.5 2xl:w-5 2xl:h-5 text-primary shrink-0" />
        <span>We also emailed this continuation link to your registered email address.</span>
      </div>

      {/* ── Action Buttons (Full Width) ── */}
      <div className="flex flex-col sm:flex-row items-center gap-3.5 2xl:gap-5 w-full">
        <Button
          onClick={handleProceed}
          variant="primary"
          className="w-full sm:flex-1 h-11 sm:h-12 2xl:h-16 px-6 2xl:px-10 tracking-wider 2xl:tracking-[2.5px] text-[11px] sm:text-xs 2xl:text-base font-bold font-inter uppercase flex items-center justify-center gap-2 2xl:gap-3 shadow-[0_4px_20px_rgba(201,162,75,0.25)] hover:shadow-[0_6px_28px_rgba(201,162,75,0.35)]"
        >
          <span>Upload Payment Slip</span>
          <ArrowRight className="w-3.5 h-3.5 2xl:w-5 2xl:h-5 shrink-0" />
        </Button>

        <Button
          onClick={onReset}
          variant="outline"
          className="w-full sm:flex-1 h-11 sm:h-12 2xl:h-16 px-6 2xl:px-10 text-[11px] sm:text-xs 2xl:text-base font-inter font-semibold flex items-center justify-center gap-2 2xl:gap-3 border-primary/20 hover:border-primary/40"
        >
          <RotateCcw className="w-3 h-3 2xl:w-4 2xl:h-4 text-foreground-muted shrink-0" />
          <span>Submit Another Nomination</span>
        </Button>
      </div>
    </motion.div>
  );
}

"use client";

import { Button } from "@/components/ui/Button";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export interface NominationSuccessProps {
  companyName: string;
  onReset: () => void;
}

export function NominationSuccess({
  companyName,
  onReset,
}: NominationSuccessProps) {
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
        <span className="text-foreground font-semibold">{companyName}</span> has
        been received. Our team will review and verify the listing.
      </p>
      <Button
        onClick={onReset}
        variant="primary"
        className="px-10 sm:px-14 2xl:px-20 h-12 2xl:h-16 tracking-[2px] 2xl:tracking-[3.6px] text-[12px] 2xl:text-base font-bold font-inter"
      >
        Submit Another Nomination
      </Button>
    </motion.div>
  );
}

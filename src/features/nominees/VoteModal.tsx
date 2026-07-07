"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import type { Nominee } from "@/types";

type VoteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  nominee: Nominee | null;
};

type VoteStep = "confirm" | "success";

export function VoteModal({ isOpen, onClose, nominee }: VoteModalProps) {
  const [step, setStep] = useState<VoteStep>("confirm");

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep("confirm");
    }
  }, [isOpen]);

  if (!nominee) return null;

  const handleConfirm = () => {
    // In a real app, you'd trigger API call here.
    // For now, immediately move to success state.
    setStep("success");
  };

  const handleReturnToDashboard = () => {
    onClose();
    // In a real app, maybe redirect to dashboard
    // window.location.href = "/dashboard";
  };

  const handleViewOtherCategories = () => {
    onClose();
    // Redirect logic would go here
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {step === "confirm" ? (
        <div className="flex flex-col items-center w-full">
          {/* Icon Circle */}
          <div className=" w-16 h-16 lg:w-20 lg:h-20 rounded-full border border-primary/30 bg-[#231F19] flex items-center justify-center mb-6">
            <img
              src="/icons/vote-modal-icon.svg"
              alt=""
              className="h-8 w-8 lg:h-fit lg:w-fit"
            />
          </div>

          {/* Title */}
          <h2 className="font-display text-center text-[24px] sm:text-[32px] 2xl:text-[36px] font-semibold leading-10 text-foreground mb-4">
            Confirm Your Selection
          </h2>

          {/* Description */}
          <p className="font-inter text-center text-foreground-muted text-sm sm:text-base 2xl:text-[20px] leading-relaxed mb-8 max-w-[340px] mx-auto">
            Are you sure you want to vote for{" "}
            <span className="text-primary font-semibold">{nominee.name}</span>?
            Your contribution helps shape the future of architectural excellence
            in Ethiopia.
          </p>

          {/* Buttons */}
          <div className="w-full flex flex-col gap-4">
            <Button
              size="lg"
              className={cn(
                "w-full bg-primary text-[#402D00] hover:bg-primary/90 font-inter  text-[12px] 2xl:text-base",
                "h-10 sm:h-12 font-semibold tracking-[1.2px] leading-4 ",
              )}
              onClick={handleConfirm}
            >
              CONFIRM VOTE
            </Button>
            <Button
              variant="outline"
              size="lg"
              className={cn(
                "w-full text-primary border-primary/50 font-inter  text-[12px] 2xl:text-base",
                "h-10 sm:h-12 font-semibold tracking-[1.2px] leading-4",
              )}
              onClick={onClose}
            >
              CANCEL
            </Button>
          </div>

          {/* Footer Text */}
          <div className="mt-8 pt-6 border-t border-[#4E46374D] w-full">
            <p className="font-inter text-center text-foreground-muted text-[10px] sm:text-xs 2xl:text-sm uppercase tracking-[3px] leading-3.75">
              ERA 2026
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full">
          {/* Icon Badge */}
          <div className="mb-6 flex items-center justify-center">
            <img
              src="/icons/vote-confirm-icon.svg"
              alt=""
              className="h-10 w-10 lg:h-fit lg:w-fit"
            />
          </div>

          {/* Title */}
          <h2 className="font-display text-center text-[24px] sm:text-3xl 2xl:text-[34px] font-semibold text-foreground mb-4 leading-[56px]">
            Excellence Acknowledged
          </h2>

          {/* Description */}
          <p className="font-inter text-center text-foreground-muted text-sm sm:text-base 2xl:text-[20px] leading-7 mb-8 max-w-[473px] mx-auto">
            Thank you for participating in the ERA 2026 Architectural Awards.
            Your contribution helps shape the future of excellence in Ethiopia.
          </p>

          {/* Buttons */}
          <div className="w-full flex flex-col gap-4">
            <Button
              variant="outline"
              size="lg"
              className={cn(
                "w-full border-primary text-primary  text-[12px] 2xl:text-base",
                "h-10 sm:h-12.5 font-semibold tracking-[1.2px]",
              )}
              onClick={handleReturnToDashboard}
            >
              RETURN TO DASHBOARD
            </Button>
            <button
              onClick={handleViewOtherCategories}
              className={cn(
                "mt-2 text-foreground-muted text-[12px] 2xl:text-base font-semibold uppercase font-inter",
                "tracking-[1.2px] leading-4 hover:text-primary transition-colors cursor-pointer",
              )}
            >
              VIEW OTHER CATEGORIES
            </button>
          </div>

          {/* Footer Text */}
          <div className="mt-12 pt-6 border-t border-[#4E46374D] w-full">
            <p className="font-inter text-center text-foreground-muted text-[10px] sm:text-xs 2xl:text-sm uppercase tracking-[3px] leading-3.75">
              ERA 2026
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
}

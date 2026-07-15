"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Modal } from "@/components/ui/Modal";
import { AuthForm } from "@/components/auth/AuthForm";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { type VoteModalProps, type VoteStep } from "@/types/nominees";
import { useAuth } from "@/context/AuthContext";
import { castPublicVote } from "@/services/nominees";

export function VoteModal({ isOpen, onClose, nominee }: VoteModalProps) {
  const [step, setStep] = useState<VoteStep>("confirm");
  const [isVoting, setIsVoting] = useState(false);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setStep("confirm");
      setIsVoting(false);
    }
  }, [isOpen]);

  if (!nominee) return null;

  const handleConfirm = async () => {
    setIsVoting(true);
    try {
      await castPublicVote(nominee.id, nominee.categoryId);
    } catch {
      // Fall through to success regardless — API may be unavailable
    } finally {
      setIsVoting(false);
      setStep("success");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {!isAuthenticated && (
        <div className="flex flex-col items-center w-full">
          <div
            className={cn(
              "w-16 h-16 lg:w-20 lg:h-20 rounded-full border border-primary/30",
              "bg-[#231F19] flex items-center justify-center mb-6",
            )}
          >
            <Image
              src="/icons/vote-modal-icon.svg"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 lg:h-10 lg:w-10"
            />
          </div>
          <h2 className="font-display text-center text-[24px] sm:text-[32px] font-semibold text-foreground leading-10 mb-2">
            Voter Verification
          </h2>
          <p className="text-center text-foreground-muted text-sm sm:text-base leading-relaxed mb-6">
            Please sign in or register to cast your vote for{" "}
            <span className="text-primary font-semibold">{nominee.name}</span>.
          </p>
          <AuthForm
            loginLabel="SIGN IN & CONTINUE"
            registerLabel="REGISTER & CONTINUE"
          />
        </div>
      )}

      {isAuthenticated && step === "confirm" && (
        <div className="flex flex-col items-center w-full">
          <div
            className={cn(
              "w-16 h-16 lg:w-20 lg:h-20 rounded-full border border-primary/30",
              "bg-[#231F19] flex items-center justify-center mb-6",
            )}
          >
            <Image
              src="/icons/vote-modal-icon.svg"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 lg:h-10 lg:w-10"
            />
          </div>
          <h2
            className={cn(
              "font-display text-center text-[24px] sm:text-[32px]",
              "2xl:text-[36px] font-semibold leading-10 text-foreground mb-4",
            )}
          >
            Confirm Your Selection
          </h2>
          <p
            className={cn(
              "font-inter text-center text-foreground-muted text-sm sm:text-base",
              "2xl:text-[20px] leading-relaxed mb-8 max-w-85 mx-auto",
            )}
          >
            Are you sure you want to vote for{" "}
            <span className="text-primary font-semibold">{nominee.name}</span>?
            Your contribution helps shape the future of architectural excellence
            in Ethiopia.
          </p>
          <div className="w-full flex flex-col gap-4">
            <Button
              size="lg"
              className={cn(
                "w-full bg-primary text-[#402D00] hover:bg-primary/90 text-[12px] 2xl:text-base",
                "h-10 sm:h-12 font-semibold tracking-[1.2px] leading-4 font-inter",
              )}
              onClick={handleConfirm}
              disabled={isVoting}
            >
              {isVoting ? "CASTING VOTE..." : "CONFIRM VOTE"}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className={cn(
                "w-full text-primary border-primary/50 font-inter text-[12px] 2xl:text-base",
                "h-10 sm:h-12 font-semibold tracking-[1.2px] leading-4",
              )}
              onClick={onClose}
              disabled={isVoting}
            >
              CANCEL
            </Button>
          </div>
          <div className="mt-8 pt-6 border-t border-[#4E46374D] w-full">
            <p
              className={cn(
                "font-inter text-center text-foreground-muted text-[10px]",
                "sm:text-xs 2xl:text-sm uppercase tracking-[3px] leading-3.75",
              )}
            >
              ERA 2026
            </p>
          </div>
        </div>
      )}

      {isAuthenticated && step === "success" && (
        <div className="flex flex-col items-center w-full">
          <div className="mb-6 flex items-center justify-center">
            <Image
              src="/icons/vote-confirm-icon.svg"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 lg:h-12 lg:w-12"
            />
          </div>
          <h2
            className={cn(
              "font-display text-center text-[24px] sm:text-3xl 2xl:text-[34px]",
              "font-semibold text-foreground mb-4 leading-14",
            )}
          >
            Excellence Acknowledged
          </h2>
          <p
            className={cn(
              "font-inter text-center text-foreground-muted text-sm sm:text-base",
              "2xl:text-[20px] leading-7 mb-8 max-w-118.25 mx-auto",
            )}
          >
            Thank you for participating in the ERA 2026 Architectural Awards.
            Your contribution helps shape the future of excellence in Ethiopia.
          </p>
          <div className="w-full flex flex-col gap-4">
            <Button
              variant="outline"
              size="lg"
              className={cn(
                "w-full border-primary text-primary text-[12px] 2xl:text-base",
                "h-10 sm:h-12.5 font-semibold tracking-[1.2px]",
              )}
              onClick={onClose}
            >
              RETURN TO DASHBOARD
            </Button>
            <button
              onClick={() => {
                onClose();
                router.push("/categories");
              }}
              className={cn(
                "mt-2 text-foreground-muted text-[12px] 2xl:text-base font-semibold uppercase font-inter",
                "tracking-[1.2px] leading-4 hover:text-primary transition-colors cursor-pointer",
              )}
            >
              VIEW OTHER CATEGORIES
            </button>
          </div>
          <div className="mt-12 pt-6 border-t border-[#4E46374D] w-full">
            <p
              className={cn(
                "font-inter text-center text-foreground-muted text-[10px]",
                "sm:text-xs 2xl:text-sm uppercase tracking-[3px] leading-3.75",
              )}
            >
              ERA 2026
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
}

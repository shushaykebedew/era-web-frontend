"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal } from "@/components/ui/Modal";
import { AuthForm } from "@/components/auth/AuthForm";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { type VoteModalProps, type VoteStep } from "@/types/nominees";
import { useAuth } from "@/context/AuthContext";
import { castPublicVote } from "@/services/nominees";
import { nomineeKeys } from "@/hooks/queries/useNominees";

export function VoteModal({
  isOpen,
  onClose,
  nominee,
  onVoteSuccess,
}: VoteModalProps) {
  const [step, setStep] = useState<VoteStep>("confirm");
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  // Reset step whenever the modal opens
  useEffect(() => {
    if (isOpen) setStep("confirm");
  }, [isOpen]);

  const { mutate: submitVote, isPending, error, reset } = useMutation({
    mutationFn: () => castPublicVote(nominee!.id, nominee!.categoryId),
    onSuccess: () => {
      // Invalidate the nominees list so vote counts refresh automatically
      queryClient.invalidateQueries({ queryKey: nomineeKeys.all });
      onVoteSuccess?.();
      setStep("success");
    },
  });

  // Reset mutation error state when modal closes/reopens
  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen, reset]);

  if (!nominee) return null;

  const errorMsg = error
    ? (error as any)?.response?.data?.message ||
      ((error as any)?.response?.status === 409
        ? "You have already voted for a nominee in this category."
        : "Failed to submit vote. Please try again.")
    : null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} ariaLabel="Cast Public Vote">
      {!isAuthenticated && (
        <div className="flex flex-col items-center w-full">
          <div
            className={cn(
              "w-16 h-16 2xl:w-20 2xl:h-20 rounded-full border border-primary/30",
              "bg-[#231F19] flex items-center justify-center mb-6",
            )}
          >
            <Image
              src="/icons/vote-modal-icon.svg"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 2xl:h-10 2xl:w-10"
            />
          </div>
          <h2 className="font-display text-center text-[24px] 2xl:text-[32px] font-semibold text-foreground leading-10 mb-2">
            Voter Verification
          </h2>
          <p className="text-center text-foreground-muted text-sm 2xl:text-base leading-relaxed mb-6">
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
              "w-16 h-16 2xl:w-20 2xl:h-20 rounded-full border border-primary/30",
              "bg-[#231F19] flex items-center justify-center mb-6",
            )}
          >
            <Image
              src="/icons/vote-modal-icon.svg"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 2xl:h-10 2xl:w-10"
            />
          </div>
          <h2
            className={cn(
              "font-display text-center text-[24px]",
              "2xl:text-[36px] font-semibold leading-10 text-foreground mb-4",
            )}
          >
            Confirm Your Selection
          </h2>
          <p
            className={cn(
              "font-inter text-center text-foreground-muted text-sm",
              "2xl:text-[20px] leading-relaxed mb-8 max-w-85 mx-auto",
            )}
          >
            Are you sure you want to vote for{" "}
            <span className="text-primary font-semibold">{nominee.name}</span>?
            Your contribution helps shape the future of architectural excellence
            in Ethiopia.
          </p>
          {errorMsg && (
            <div className="w-full mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded text-foreground-muted/70 text-xs 2xl:text-sm text-center font-inter">
              {errorMsg}
            </div>
          )}
          <div className="w-full flex flex-col gap-4">
            <Button
              size="lg"
              isLoading={isPending}
              spinnerColor="white"
              className={cn(
                "w-full bg-primary text-[#402D00] hover:bg-primary/90 text-[12px] 2xl:text-base",
                "h-10 sm:h-12 font-semibold tracking-[1.2px] leading-4 font-inter",
              )}
              onClick={() => submitVote()}
              disabled={isPending}
            >
              CONFIRM VOTE
            </Button>
            <Button
              variant="outline"
              size="lg"
              className={cn(
                "w-full text-primary border-primary/50 font-inter text-[12px] 2xl:text-base",
                "h-10 sm:h-12 font-semibold tracking-[1.2px] leading-4",
              )}
              onClick={onClose}
              disabled={isPending}
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
              className="h-10 w-10 2xl:h-12 2xl:w-12"
            />
          </div>
          <h2
            className={cn(
              "font-display text-center text-[24px] 2xl:text-[34px]",
              "font-semibold text-foreground mb-4 leading-14",
            )}
          >
            Excellence Acknowledged
          </h2>
          <p
            className={cn(
              "font-inter text-center text-foreground-muted text-sm",
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

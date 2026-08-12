"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal } from "@/components/ui/Modal";
import { AuthForm } from "@/components/auth/AuthForm";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { type VoteModalProps, type VoteStep } from "@/types/nominees";
import { useAuth } from "@/context/AuthContext";
import { castPublicVote } from "@/services/nominees";
import { nomineeKeys, voteKeys } from "@/hooks/queries/useNominees";
import { ShieldCheck, Vote, Trophy } from "lucide-react";
import { motion } from "framer-motion";

type ConfettiParticle = {
  id: number;
  x: number;
  y: number;
  angle: number;
  speed: number;
  size: number;
  color: string;
  rotation: number;
};

function GoldConfetti() {
  const [particles, setParticles] = useState<ConfettiParticle[]>([]);

  useEffect(() => {
    const colors = ["#C9A24B", "#EBC166", "#FFF3D1", "#8F6F2D", "#F7DF94"];
    const generated: ConfettiParticle[] = Array.from({ length: 80 }).map(
      (_, i) => {
        const angle = Math.random() * 360;
        const speed = 8 + Math.random() * 18;
        const size = 3 + Math.random() * 6;
        const color = colors[Math.floor(Math.random() * colors.length)]!;
        return {
          id: i,
          x: 0,
          y: 0,
          angle,
          speed,
          size,
          color,
          rotation: Math.random() * 360,
        };
      },
    );
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-50">
      {particles.map((p) => {
        const rad = (p.angle * Math.PI) / 180;
        const targetX = Math.cos(rad) * p.speed * 15;
        const targetY = Math.sin(rad) * p.speed * 15 + 80;
        return (
          <motion.div
            key={p.id}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0.1, rotate: 0 }}
            animate={{
              x: targetX,
              y: targetY - 30,
              opacity: 0,
              scale: 0.8,
              rotate: p.rotation + 360,
            }}
            transition={{
              duration: 1.2 + Math.random() * 0.6,
              ease: "easeOut",
            }}
            className="absolute rounded-xs"
            style={{
              width: p.size,
              height: p.size * (Math.random() > 0.6 ? 2.5 : 1),
              backgroundColor: p.color,
            }}
          />
        );
      })}
    </div>
  );
}

// ── Icon badge — shared circular icon frame used across all three steps ────────
function IconBadge({
  icon: Icon,
  pulse = false,
}: {
  icon: React.ElementType;
  pulse?: boolean;
}) {
  return (
    <div className="relative w-16 h-16 2xl:w-20 2xl:h-20 mb-6 flex items-center justify-center">
      {pulse && (
        <motion.div
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
          className="absolute inset-0 bg-primary/20 rounded-full"
        />
      )}
      <div
        className={cn(
          "relative w-full h-full rounded-full border border-primary/30",
          "bg-[#231F19] flex items-center justify-center",
        )}
      >
        <Icon
          className="h-7 w-7 2xl:h-9 2xl:w-9 text-primary"
          strokeWidth={1.75}
        />
      </div>
    </div>
  );
}

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

  // Reset to confirm step each time the modal opens
  useEffect(() => {
    if (isOpen) setStep("confirm");
  }, [isOpen]);

  const {
    mutate: submitVote,
    isPending,
    error,
    reset,
  } = useMutation({
    mutationFn: () => castPublicVote(nominee!.id, nominee!.categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: nomineeKeys.all });
      queryClient.invalidateQueries({ queryKey: voteKeys.mine });
      onVoteSuccess?.();
      setStep("success");
    },
  });

  // Reset mutation error state when modal opens
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel="Cast Public Vote"
      showCloseButton={step !== "success"}
    >
      {!isAuthenticated && (
        <div className="flex flex-col items-center w-full">
          <IconBadge icon={ShieldCheck} />
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
          <IconBadge icon={Vote} />
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
            <p className="text-red-400 text-xs sm:text-sm 2xl:text-base font-inter text-center mb-4">
              {errorMsg}
            </p>
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
        <div className="flex flex-col items-center w-full relative">
          <GoldConfetti />

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 15 }}
          >
            <IconBadge icon={Trophy} pulse />
          </motion.div>

          <h2
            className={cn(
              "font-display text-center text-[24px] 2xl:text-[34px]",
              "font-semibold text-primary mb-4 leading-10 tracking-wide uppercase",
            )}
          >
            Vote Confirmed!
          </h2>

          <p
            className={cn(
              "font-inter text-center text-foreground-muted text-sm",
              "2xl:text-[20px] leading-7 mb-8 max-w-118.25 mx-auto",
            )}
          >
            Thank you for casting your vote for{" "}
            <span className="text-foreground font-semibold">
              {nominee.name}
            </span>{" "}
            in the{" "}
            <span className="text-primary font-semibold">
              {nominee.category?.name || "Architectural Awards"}
            </span>{" "}
            category. Your contribution shapes the standard of design excellence
            in Ethiopia.
          </p>

          <div className="w-full flex flex-col gap-4">
            <Button
              variant="outline"
              size="lg"
              className={cn(
                "w-full border-primary text-primary text-[12px] 2xl:text-base cursor-pointer",
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

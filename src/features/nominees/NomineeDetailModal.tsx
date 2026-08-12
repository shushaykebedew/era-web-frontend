"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Globe, Mail, User, Award, ExternalLink, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { VoteModal } from "@/features/nominees/VoteModal";
import { useAuth } from "@/context/AuthContext";
import { useMyVotes } from "@/hooks/queries/useNominees";
import { Modal } from "@/components/ui/Modal";
import type { Nominee } from "@/types";

interface NomineeDetailModalProps {
  nominee: Nominee | null;
  isOpen: boolean;
  onClose: () => void;
}

function useCountUp(target: number, enabled: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setValue(0);
      return;
    }

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced || target === 0) {
      setValue(target);
      return;
    }

    let raf: number;
    const duration = 800;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, enabled]);

  return value;
}

export function NomineeDetailModal({
  nominee,
  isOpen,
  onClose,
}: NomineeDetailModalProps) {
  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { data: myVotes = [] } = useMyVotes(isAuthenticated);
  const displayedVotes = useCountUp(nominee?.votes ?? 0, isOpen);

  const hasVotedThisNominee = myVotes.some(
    (v: any) =>
      v.nomineeId === nominee?.id && v.awardCategoryId === nominee?.categoryId,
  );
  const hasVotedInCategory = myVotes.some(
    (v: any) => v.awardCategoryId === nominee?.categoryId,
  );

  const initials = nominee
    ? nominee.name
        .split(/\s+/)
        .map((w: string) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "";

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
        noPadding
        className="max-h-[90vh] overflow-y-auto"
        ariaLabel="Nominee Details"
      >
        {nominee && (
          <div className="flex flex-col sm:flex-row min-h-0 w-full">
            <div className="flex-shrink-0 w-full sm:w-56 2xl:w-80 bg-[#0a0906] border-b sm:border-b-0 sm:border-r border-primary/10 flex flex-col items-center justify-center gap-5 2xl:gap-7 p-8 2xl:p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,75,0.06)_0%,transparent_70%)] pointer-events-none" />

              <p className="text-[9px] 2xl:text-sm font-inter uppercase tracking-[3px] text-primary/50">
                ERA 2026 Nominee
              </p>

              {nominee.logo ? (
                <div className="relative w-20 h-20 2xl:w-32 2xl:h-32 rounded-full bg-[#0a0906] ring-1 ring-primary/25 flex items-center justify-center overflow-hidden shadow-[0_0_24px_rgba(201,162,75,0.14)]">
                  <Image
                    src={nominee.logo}
                    alt={nominee.name}
                    fill
                    className="object-contain p-2"
                    sizes="(min-width: 1536px) 128px, 80px"
                  />
                </div>
              ) : (
                <div className="relative w-20 h-20 2xl:w-32 2xl:h-32 rounded-full bg-gradient-to-br from-primary/25 to-primary/5 border-2 border-primary/40 flex items-center justify-center shadow-[0_0_24px_rgba(201,162,75,0.14)]">
                  <span className="font-display text-2xl 2xl:text-4xl font-bold text-primary tracking-widest">
                    {initials}
                  </span>
                </div>
              )}

              {nominee.category?.name && (
                <div
                  className="relative inline-flex items-center gap-1 bg-primary/15 text-primary text-[8px] 2xl:text-xs font-semibold uppercase tracking-[0.8px] py-1.5 px-4 whitespace-nowrap -mt-1"
                  style={{
                    clipPath:
                      "polygon(6% 0%, 94% 0%, 100% 50%, 94% 100%, 6% 100%, 0% 50%)",
                  }}
                >
                  <Award className="w-2.5 h-2.5 2xl:w-3.5 2xl:h-3.5" />
                  {nominee.category.name}
                </div>
              )}

              <div className="text-center pt-1">
                <p className="text-[9px] 2xl:text-sm font-inter uppercase tracking-[1.5px] text-foreground-muted/50 mb-0.5 2xl:mb-1.5">
                  Total Votes
                </p>
                <p className="font-display text-2xl 2xl:text-4xl font-bold text-primary tabular-nums">
                  {displayedVotes.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex flex-col flex-1 p-6 sm:p-8 2xl:p-12 min-w-0 gap-4 2xl:gap-6">
              <div className="pr-8 2xl:pr-12">
                <h2 className="font-display text-2xl sm:text-3xl 2xl:text-5xl font-bold text-foreground leading-tight tracking-tight">
                  {nominee.name}
                </h2>
                {nominee.contactPerson && (
                  <div className="flex items-center gap-1.5 mt-2 text-sm 2xl:text-lg text-foreground-muted font-inter">
                    <User className="w-3.5 h-3.5 2xl:w-5 2xl:h-5 text-primary/60 shrink-0" />
                    <span>{nominee.contactPerson}</span>
                  </div>
                )}
              </div>

              <div className="h-px w-full bg-gradient-to-r from-primary/30 via-primary/10 to-transparent" />

              <div>
                <p className="text-[9px] 2xl:text-sm font-inter uppercase tracking-[2px] text-primary/60 mb-2 2xl:mb-3">
                  Nomination Reason
                </p>
                <p className="text-sm 2xl:text-base leading-6 2xl:leading-7 text-foreground-muted font-inter border-l-2 border-primary/25 pl-3.5">
                  {nominee.reason || "-"}
                </p>
              </div>

              {(nominee.email || nominee.website) && (
                <div className="flex flex-col gap-1.5 2xl:gap-2.5 pt-2">
                  {nominee.email && (
                    <a
                      href={"mailto:" + nominee.email}
                      className="flex items-center gap-2 text-xs 2xl:text-sm font-inter text-foreground-muted/60 hover:text-primary transition-colors group"
                    >
                      <Mail className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-primary/40 group-hover:text-primary transition-colors shrink-0" />
                      <span>{nominee.email}</span>
                    </a>
                  )}
                  {nominee.website && (
                    <a
                      href={
                        nominee.website.startsWith("http")
                          ? nominee.website
                          : `https://${nominee.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs 2xl:text-sm font-inter text-foreground-muted/60 hover:text-primary transition-colors group"
                    >
                      <Globe className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-primary/40 group-hover:text-primary transition-colors shrink-0" />
                      <span className="truncate">
                        {nominee.website.replace(
                          /^https?:\/\/(www\.)?/,
                          "",
                        )}
                      </span>
                      <ExternalLink className="w-3 h-3 2xl:w-4 2xl:h-4 opacity-0 group-hover:opacity-60 transition-opacity shrink-0" />
                    </a>
                  )}
                </div>
              )}

              <div className="mt-auto pt-4 border-t border-primary/10 relative group/tooltip">
                <Button
                  size="md"
                  variant={hasVotedThisNominee ? "outline" : "primary"}
                  className={cn(
                    "w-full uppercase font-bold text-xs 2xl:text-sm tracking-[1.5px] rounded-sm transition-all duration-300 2xl:h-14",
                    hasVotedThisNominee
                      ? "bg-primary/10 border-primary/40 text-primary cursor-default"
                      : hasVotedInCategory
                        ? "opacity-50 border-primary/5 cursor-not-allowed pointer-events-none"
                        : "bg-primary hover:bg-primary/90 text-[#402D00] shadow-[0_4px_15px_rgba(201,162,75,0.2)]",
                  )}
                  onClick={() =>
                    !hasVotedInCategory && setIsVoteModalOpen(true)
                  }
                  disabled={hasVotedInCategory}
                >
                  {hasVotedThisNominee ? (
                    <span className="flex items-center gap-2 justify-center">
                      <Check className="w-4 h-4 2xl:w-5 2xl:h-5" /> You
                      Voted For This Nominee
                    </span>
                  ) : (
                    "Cast Vote"
                  )}
                </Button>

                {hasVotedInCategory && !hasVotedThisNominee && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 bg-[#1a1712] border border-primary/30 text-[10px] sm:text-xs text-foreground px-2.5 py-1.5 rounded-sm shadow-xl opacity-0 pointer-events-none group-hover/tooltip:opacity-100 group-active/tooltip:opacity-100 transition-opacity duration-200 text-center z-30 font-inter font-normal tracking-normal normal-case">
                    You have already voted in this category
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-[#1a1712] border-r border-b border-primary/30 transform rotate-45" />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>

      <VoteModal
        isOpen={isVoteModalOpen}
        onClose={() => setIsVoteModalOpen(false)}
        nominee={nominee}
      />
    </>
  );
}
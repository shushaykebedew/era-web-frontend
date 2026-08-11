"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Globe, Mail, User, Award, ExternalLink, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { VoteModal } from "@/features/nominees/VoteModal";
import { useAuth } from "@/context/AuthContext";
import { useMyVotes } from "@/hooks/queries/useNominees";
import type { Nominee } from "@/types";

interface NomineeDetailModalProps {
  nominee: Nominee | null;
  isOpen: boolean;
  onClose: () => void;
}

export function NomineeDetailModal({
  nominee,
  isOpen,
  onClose,
}: NomineeDetailModalProps) {
  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { data: myVotes = [] } = useMyVotes(isAuthenticated);

  const hasVotedThisNominee = myVotes.some(
    (v: any) =>
      v.nomineeId === nominee?.id && v.awardCategoryId === nominee?.categoryId,
  );
  const hasVotedInCategory = myVotes.some(
    (v: any) => v.awardCategoryId === nominee?.categoryId,
  );

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const initials = nominee
    ? nominee.name
        .split(/\s+/)
        .map((w: string) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "";

  return (
    <AnimatePresence>
      {isOpen && nominee && (
        <>
          <motion.div
            key="bd"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            style={{ pointerEvents: "none" }}
          >
            <div
              className={cn(
                "relative w-full max-w-2xl 2xl:max-w-4xl max-h-[90vh] overflow-y-auto",
                "bg-[#0f0e0b] border border-primary/20 rounded-xl",
                "shadow-[0_24px_60px_rgba(0,0,0,0.85)]",
              )}
              style={{ pointerEvents: "auto" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 2xl:w-11 2xl:h-11 flex items-center justify-center rounded-full bg-white/5 cursor-pointer border border-white/10 text-foreground-muted hover:text-foreground hover:bg-white/10 transition-all"
                aria-label="Close"
              >
                <X className="w-3.5 h-3.5 2xl:w-5 2xl:h-5" />
              </button>
              <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-primary/25 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-primary/25 pointer-events-none" />

              <div className="flex flex-col sm:flex-row min-h-0">
                <div className="flex-shrink-0 w-full sm:w-52 2xl:w-80 bg-[#0a0906] border-b sm:border-b-0 sm:border-r border-primary/10 flex flex-col items-center justify-center gap-4 2xl:gap-6 p-8 2xl:p-12 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,75,0.06)_0%,transparent_70%)] pointer-events-none" />
                  {nominee.logo ? (
                    <div className="relative w-28 h-28 2xl:w-44 2xl:h-44 flex items-center justify-center">
                      <Image
                        src={nominee.logo}
                        alt={nominee.name}
                        fill
                        className="object-contain"
                        sizes="(min-width: 1536px) 176px, 112px"
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 2xl:w-32 2xl:h-32 rounded-full bg-gradient-to-br from-primary/25 to-primary/5 border-2 border-primary/40 flex items-center justify-center shadow-[0_0_20px_rgba(201,162,75,0.12)]">
                      <span className="font-display text-2xl 2xl:text-4xl font-bold text-primary tracking-widest">
                        {initials}
                      </span>
                    </div>
                  )}
                  <div className="text-center space-y-1.5 2xl:space-y-3">
                    <p className="text-[9px] 2xl:text-sm font-inter uppercase tracking-[2px] text-primary/50">
                      ERA 2026 Nominee
                    </p>
                    {nominee.category?.name && (
                      <div className="inline-flex items-center gap-1 bg-primary/10 border border-primary/15 text-primary text-[8px] 2xl:text-xs font-semibold uppercase tracking-[0.8px] py-1 px-2 rounded-full">
                        <Award className="w-2.5 h-2.5 2xl:w-3.5 2xl:h-3.5" />
                        {nominee.category.name}
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <p className="text-[9px] 2xl:text-sm font-inter uppercase tracking-[1.5px] text-foreground-muted/50 mb-0.5 2xl:mb-1.5">
                      Total Votes
                    </p>
                    <p className="font-display text-xl 2xl:text-3xl font-bold text-primary">
                      {(nominee.votes ?? 0).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col flex-1 p-6 sm:p-8 2xl:p-12 min-w-0 gap-4 2xl:gap-6">
                  <div className="pr-8 2xl:pr-12">
                    <h2 className="font-display text-2xl sm:text-3xl 2xl:text-5xl font-bold text-foreground leading-tight">
                      {nominee.name}
                    </h2>
                    <div className="flex items-center gap-1.5 mt-2 text-sm 2xl:text-lg text-foreground-muted font-inter">
                      <User className="w-3.5 h-3.5 2xl:w-5 2xl:h-5 text-primary/60 shrink-0" />
                      <span>{nominee.contactPerson}</span>
                    </div>
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
                    <div className="flex flex-col gap-1.5 2xl:gap-2.5">
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
                          href={nominee.website}
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

                  <div className="mt-auto pt-4 border-t border-primary/10">
                    <Button
                      size="md"
                      variant={hasVotedThisNominee ? "outline" : "primary"}
                      className={cn(
                        "w-full uppercase font-bold text-xs 2xl:text-sm tracking-[1.5px] rounded-sm transition-all duration-300 2xl:h-14",
                        hasVotedThisNominee
                          ? "bg-primary/10 border-primary/40 text-primary cursor-default"
                          : hasVotedInCategory
                            ? "opacity-40 border-primary/5 text-foreground-muted cursor-not-allowed"
                            : "bg-primary hover:bg-primary/90 text-[#402D00] shadow-[0_4px_15px_rgba(201,162,75,0.2)]",
                      )}
                      onClick={() =>
                        !hasVotedInCategory && setIsVoteModalOpen(true)
                      }
                      disabled={hasVotedInCategory}
                    >
                      {hasVotedThisNominee ? (
                        <span className="flex items-center gap-2 justify-center">
                          <Check className="w-4 h-4 2xl:w-5 2xl:h-5" /> You Voted For This
                          Nominee
                        </span>
                      ) : (
                        "Cast Vote"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <VoteModal
            isOpen={isVoteModalOpen}
            onClose={() => setIsVoteModalOpen(false)}
            nominee={nominee}
          />
        </>
      )}
    </AnimatePresence>
  );
}

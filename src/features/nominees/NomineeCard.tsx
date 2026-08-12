"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { NomineeCardProps } from "@/types/nominees";
import { VoteModal } from "@/features/nominees/VoteModal";
import { NomineeDetailModal } from "@/features/nominees/NomineeDetailModal";
import { useAuth } from "@/context/AuthContext";
import { useMyVotes } from "@/hooks/queries/useNominees";
import { User, Check, Award, Quote } from "lucide-react";

// ─── Logo panel ───────────────────────────────────────────────────────────────
function LogoPanel({
  logo,
  name,
  initials,
  className,
  onClick,
}: {
  logo?: string;
  name: string;
  initials: string;
  className?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={`View ${name} details`}
      className={cn(
        "group/logo relative overflow-hidden bg-gradient-to-b from-[#080705] to-[#12100c] cursor-pointer",
        className,
      )}
    >
      {/* Background ambient radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(201,162,75,0.1)_0%,transparent_70%)] pointer-events-none transition-opacity duration-500 group-hover/logo:opacity-150" />
      {/* Top shimmer accent line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent pointer-events-none" />

      {/* Logo / monogram wrapper */}
      <div className="absolute inset-0 flex items-center justify-center p-6">
        {logo ? (
          <div className="relative w-20 h-20 2xl:w-28 2xl:h-28 rounded-full overflow-hidden border-2 border-primary/25 p-1 bg-[#12100c] shadow-[0_4px_24px_rgba(0,0,0,0.45)] transition-all duration-500 group-hover/logo:border-primary group-hover/logo:scale-[1.04]">
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image
                src={logo}
                alt={name}
                fill
                className="object-cover transition-transform duration-700 group-hover/logo:scale-105"
                sizes="(min-width: 1536px) 112px, 80px"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2.5">
            <div
              className={cn(
                "w-14 h-14 2xl:w-20 2xl:h-20 rounded-full flex items-center justify-center",
                "bg-gradient-to-br from-primary/20 via-primary/8 to-transparent",
                "border border-primary/35 shadow-[0_4px_20px_rgba(201,162,75,0.1)]",
                "transition-all duration-500 group-hover/logo:border-primary group-hover/logo:scale-[1.04]",
              )}
            >
              <span className="font-display text-xl 2xl:text-2xl font-bold text-primary tracking-widest">
                {initials}
              </span>
            </div>
            <span className="text-[9px] 2xl:text-xs font-inter font-semibold uppercase tracking-[2.5px] text-primary/35">
              ERA 2026
            </span>
          </div>
        )}
      </div>

      {/* Bottom subtle vignette */}
      <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#0f0d0a] to-transparent pointer-events-none" />
    </button>
  );
}

// ─── Category label ───────────────────────────────────────────────────────────
function CategoryLabel({
  name,
  prominent,
}: {
  name: string;
  prominent?: boolean;
}) {
  return (
    <div className="flex items-center gap-1.5 mb-3">
      <Award
        className={cn(
          "w-3.5 h-3.5 2xl:w-4 2xl:h-4 shrink-0",
          prominent ? "text-primary/80" : "text-primary/60",
        )}
      />
      <span className="text-[10px] 2xl:text-xs font-inter font-semibold uppercase tracking-[2px] text-primary/80 group-hover:text-foreground">
        {name}
      </span>
    </div>
  );
}

// ─── Vote row ─────────────────────────────────────────────────────────────────
function VoteRow({
  voteCount,
  hasVotedThisNominee,
  hasVotedInCategory,
  isPending,
  onVote,
}: {
  voteCount: number;
  hasVotedThisNominee: boolean;
  hasVotedInCategory: boolean;
  isPending?: boolean;
  onVote: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 pt-4 border-t border-primary/12 mt-auto">
      <div className="flex flex-col gap-0.5">
        <span className="text-[10px] 2xl:text-xs font-inter uppercase tracking-[1.5px] font-semibold text-foreground-muted/55">
          Standings
        </span>
        <span className="text-[18px] 2xl:text-2xl font-bold font-display text-primary leading-none tabular-nums">
          {voteCount.toLocaleString()}
          <span className="text-[10px] 2xl:text-xs font-inter font-normal text-foreground-muted/55 ml-1.5 uppercase tracking-[1px]">
            votes
          </span>
        </span>
      </div>

      <div className="relative group/tooltip">
        <Button
          size="sm"
          variant={hasVotedThisNominee ? "outline" : "primary"}
          className={cn(
            "h-9 2xl:h-11 px-5 2xl:px-7 uppercase font-bold text-xs 2xl:text-sm tracking-[1.5px] transition-all duration-300",
            hasVotedThisNominee
              ? "bg-primary/8 border-primary/35 text-primary cursor-default"
              : hasVotedInCategory
                ? "opacity-50 border-primary/10 cursor-not-allowed pointer-events-none"
                : "bg-primary hover:bg-[#e5bc64] hover:shadow-[0_4px_16px_rgba(201,162,75,0.3)] text-[#120f0a] border border-primary hover:border-primary-light",
          )}
          onClick={onVote}
          disabled={hasVotedInCategory || isPending}
        >
          {hasVotedThisNominee ? (
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-primary" /> Voted
            </span>
          ) : (
            "Vote"
          )}
        </Button>

        {hasVotedInCategory && !hasVotedThisNominee && (
          <div className="absolute bottom-full right-0 mb-2 w-48 bg-[#1a1712] border border-primary/30 text-[10px] sm:text-xs text-foreground px-2.5 py-1.5 rounded-sm shadow-xl opacity-0 pointer-events-none group-hover/tooltip:opacity-100 group-active/tooltip:opacity-100 transition-opacity duration-200 text-center z-30 font-inter font-normal tracking-normal normal-case">
            You have already voted in this category
            <div className="absolute top-full right-6 -mt-1 w-2 h-2 bg-[#1a1712] border-r border-b border-primary/30 transform rotate-45" />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Reason excerpt ───────────────────────────────────────────────────────────
function ReasonExcerpt({ text }: { text: string }) {
  return (
    <div className="relative bg-primary/[0.035] border-l-2 border-primary/35 rounded-r-md p-3.5 pl-4 2xl:p-4 2xl:pl-5 mb-5 flex-1">
      <Quote className="absolute top-3 right-3 w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-primary/15" />
      <p className="text-xs 2xl:text-base leading-relaxed text-foreground-muted/90 font-inter line-clamp-3 pr-4">
        {text}
      </p>
    </div>
  );
}

// ─── NomineeCard ──────────────────────────────────────────────────────────────
export function NomineeCard({
  nominee,
  variant = "grid",
  className,
}: NomineeCardProps) {
  const { isAuthenticated } = useAuth();
  const { data: myVotes = [] } = useMyVotes(isAuthenticated);

  const hasVotedThisNominee = myVotes.some(
    (v: any) =>
      v.nomineeId === nominee.id && v.awardCategoryId === nominee.categoryId,
  );
  const hasVotedInCategory = myVotes.some(
    (v: any) => v.awardCategoryId === nominee.categoryId,
  );

  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [voteCount, setVoteCount] = useState(nominee.votes ?? 0);

  const handleVoteSuccess = () => setVoteCount((prev) => prev + 1);

  const initials = nominee.name
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const categoryName = nominee.category?.name || "Nominee";

  const openVoteModal = () => {
    if (!hasVotedInCategory) setIsVoteModalOpen(true);
  };

  const openDetailModal = () => setIsDetailModalOpen(true);

  const isFeatured = variant === "featured";

  return (
    <>
      <article
        className={cn(
          "group relative flex flex-col overflow-hidden h-full",
          "bg-[#12100c] rounded-xl transition-all duration-500",
          "hover:-translate-y-0.5",
          isFeatured
            ? cn(
              "border border-primary/25 shadow-md",
              "hover:border-primary/55 hover:shadow-[0_16px_44px_rgba(201,162,75,0.14)]",
            )
            : cn(
              "border border-primary/18",
              "hover:border-primary/40 hover:shadow-[0_10px_32px_rgba(201,162,75,0.1)]",
            ),
          className,
        )}
      >
        <LogoPanel
          logo={nominee.logo}
          name={nominee.name}
          initials={initials}
          onClick={openDetailModal}
          className="w-full h-36 2xl:h-52"
        />

        <div className="flex flex-col flex-1 px-5 2xl:px-7 pt-5 pb-5 2xl:pb-7">
          <CategoryLabel name={categoryName} prominent={isFeatured} />

          <h3
            className="font-display text-lg sm:text-xl 2xl:text-3xl font-bold leading-snug text-foreground group-hover:text-primary transition-colors duration-300 cursor-pointer mb-2 line-clamp-2"
            onClick={openDetailModal}
          >
            {nominee.name}
          </h3>

          <div className="flex items-center gap-1.5 text-xs 2xl:text-sm text-foreground-muted/65 font-inter mb-4">
            <User className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-primary/45 shrink-0" />
            <span className="truncate">{nominee.contactPerson}</span>
          </div>

          <ReasonExcerpt text={nominee.reason} />

          <VoteRow
            voteCount={voteCount}
            hasVotedThisNominee={hasVotedThisNominee}
            hasVotedInCategory={hasVotedInCategory}
            onVote={openVoteModal}
          />
        </div>
      </article>

      <VoteModal
        isOpen={isVoteModalOpen}
        onClose={() => setIsVoteModalOpen(false)}
        nominee={nominee}
        onVoteSuccess={handleVoteSuccess}
      />
      <NomineeDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        nominee={nominee}
      />
    </>
  );
}

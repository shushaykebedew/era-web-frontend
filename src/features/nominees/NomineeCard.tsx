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
import { User, Check, Award } from "lucide-react";

// ─── Logo panel ───────────────────────────────────────────────────────────────
// Defined outside NomineeCard so its reference is stable across re-renders.
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
        "group/logo relative overflow-hidden bg-[#0a0907] cursor-pointer",
        className,
      )}
    >
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(201,162,75,0.09)_0%,transparent_68%)] pointer-events-none" />
      {/* Shimmer line along the top */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none" />

      {/* Logo / monogram */}
      <div className="absolute inset-0 flex items-center justify-center p-6">
        {logo ? (
          <div className="relative w-20 h-20 2xl:w-28 2xl:h-28 rounded-full overflow-hidden border border-primary/20 shadow-[0_0_20px_rgba(201,162,75,0.1)]">
            <Image
              src={logo}
              alt={name}
              fill
              className="object-cover transition-transform duration-700 group-hover/logo:scale-[1.04]"
              sizes="(min-width: 1536px) 112px, 80px"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div
              className={cn(
                "w-12 h-12 2xl:w-16 2xl:h-16 rounded-full flex items-center justify-center",
                "bg-gradient-to-br from-primary/20 via-primary/10 to-transparent",
                "border border-primary/35",
                "shadow-[0_0_24px_rgba(201,162,75,0.12)]",
                "transition-shadow duration-500 group-hover/logo:shadow-[0_0_36px_rgba(201,162,75,0.2)]",
              )}
            >
              <span className="font-display text-lg 2xl:text-2xl font-bold text-primary tracking-widest">
                {initials}
              </span>
            </div>
            <span className="text-[8px] 2xl:text-xs font-inter uppercase tracking-[2.5px] text-primary/30">
              ERA 2026
            </span>
          </div>
        )}
      </div>

      {/* Bottom vignette */}
      <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#0f0d0a]/80 to-transparent pointer-events-none" />
    </button>
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
    <div className="flex items-center justify-between gap-3 pt-4 border-t border-primary/10 mt-auto">
      <div className="flex flex-col gap-0.5">
        <span className="text-xs 2xl:text-sm font-inter uppercase tracking-[1.5px] text-foreground-muted/50">
          Standings
        </span>
        <span className="text-xl 2xl:text-3xl font-semibold font-display text-primary leading-none">
          {voteCount.toLocaleString()}
          <span className="text-xs 2xl:text-sm font-inter font-normal text-foreground-muted/60 ml-1.5 uppercase tracking-[1px]">
            votes
          </span>
        </span>
      </div>

      <Button
        size="sm"
        variant={hasVotedThisNominee ? "outline" : "primary"}
        className={cn(
          "h-9 2xl:h-12 px-6 2xl:px-8 uppercase font-bold text-xs 2xl:text-sm tracking-[1.2px] rounded-sm transition-all duration-300",
          hasVotedThisNominee
            ? "bg-primary/10 border-primary/40 text-primary cursor-default"
            : hasVotedInCategory
              ? "opacity-70 border-primary/10 cursor-not-allowed"
              : "bg-primary hover:bg-primary-light text-[#402D00] shadow-[0_2px_12px_rgba(201,162,75,0.18)] hover:shadow-[0_4px_20px_rgba(201,162,75,0.28)]",
        )}
        onClick={onVote}
        disabled={hasVotedInCategory || isPending}
      >
        {hasVotedThisNominee ? (
          <span className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" /> Voted
          </span>
        ) : (
          "Vote"
        )}
      </Button>
    </div>
  );
}

// ─── NomineeCard ──────────────────────────────────────────────────────────────
export function NomineeCard({ nominee, variant = "grid" }: NomineeCardProps) {
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

  // ─── Featured variant ───────────────────────────────────────────────────
  if (variant === "featured") {
    return (
      <>
        <article
          className={cn(
            "group relative flex flex-col overflow-hidden",
            "bg-[#0f0d0a] border border-primary/20 rounded-sm",
            "transition-all duration-500",
            "hover:border-primary/40 hover:shadow-[0_8px_40px_rgba(201,162,75,0.09)]",
          )}
        >
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary/30 pointer-events-none z-10" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary/30 pointer-events-none z-10" />

          <LogoPanel
            logo={nominee.logo}
            name={nominee.name}
            initials={initials}
            onClick={openDetailModal}
            className="w-full h-32 2xl:h-48"
          />

          <div className="flex flex-col flex-1 px-5 2xl:px-7 pt-5 pb-5 2xl:pb-7">
            <div className="flex items-center gap-1.5 mb-3">
              <Award className="w-3.5 h-3.5 2xl:w-5 2xl:h-5 text-primary/60 shrink-0" />
              <span className="text-xs 2xl:text-base font-inter font-semibold uppercase tracking-[2px] text-primary/70">
                {categoryName}
              </span>
            </div>

            <h3
              className="font-display text-2xl 2xl:text-4xl font-bold leading-snug text-foreground group-hover:text-primary transition-colors duration-300 cursor-pointer mb-2"
              onClick={openDetailModal}
            >
              {nominee.name}
            </h3>

            <div className="flex items-center gap-1.5 text-sm 2xl:text-base text-foreground-muted/70 font-inter mb-4">
              <User className="w-3.5 h-3.5 2xl:w-5 2xl:h-5 text-primary/50 shrink-0" />
              <span className="truncate">{nominee.contactPerson}</span>
            </div>

            <p className="text-sm 2xl:text-base leading-relaxed 2xl:leading-7 text-foreground-muted/80 font-inter line-clamp-3 border-l-2 border-primary/25 pl-3 mb-5 flex-1">
              {nominee.reason}
            </p>

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

  // ─── Grid variant ───────────────────────────────────────────────────────
  return (
    <>
      <article
        className={cn(
          "group relative flex flex-col overflow-hidden",
          "bg-[#0f0d0a] border border-primary/15 rounded-sm",
          "transition-all duration-500",
          "hover:border-primary/35 hover:shadow-[0_6px_32px_rgba(201,162,75,0.08)]",
        )}
      >
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/25 pointer-events-none z-10" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary/25 pointer-events-none z-10" />

        <LogoPanel
          logo={nominee.logo}
          name={nominee.name}
          initials={initials}
          onClick={openDetailModal}
          className="w-full h-32 2xl:h-48"
        />

        <div className="flex flex-col flex-1 px-5 2xl:px-7 pt-5 pb-5 2xl:pb-7">
          <div className="flex items-center gap-1.5 mb-3">
            <div className="w-3.5 h-px 2xl:w-5 bg-primary/40" />
            <span className="text-xs 2xl:text-base font-inter font-semibold uppercase tracking-[2px] text-primary/70">
              {categoryName}
            </span>
          </div>

          <h3
            className="font-display text-2xl 2xl:text-4xl font-bold leading-snug text-foreground group-hover:text-primary transition-colors duration-300 cursor-pointer mb-2"
            onClick={openDetailModal}
          >
            {nominee.name}
          </h3>

          <div className="flex items-center gap-1.5 text-sm 2xl:text-base text-foreground-muted/70 font-inter mb-4">
            <User className="w-3.5 h-3.5 2xl:w-5 2xl:h-5 text-primary/40 shrink-0" />
            <span className="truncate">{nominee.contactPerson}</span>
          </div>

          <p className="text-sm 2xl:text-base leading-6 2xl:leading-7 text-foreground-muted/80 font-inter line-clamp-3 border-l border-primary/20 pl-3 mb-5 flex-1">
            {nominee.reason}
          </p>

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

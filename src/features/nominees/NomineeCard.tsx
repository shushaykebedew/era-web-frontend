"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { NomineeCardProps } from "@/types/nominees";
import { VoteModal } from "@/features/nominees/VoteModal";
import { useAuth } from "@/context/AuthContext";
import { useMyVotes } from "@/hooks/queries/useNominees";

const OVERLAY_GRADIENT =
  "linear-gradient(0deg, #16130D 0%, rgba(22, 19, 13, 0) 50%, rgba(22, 19, 13, 0) 100%)";

export function NomineeCard({ nominee, variant = "grid" }: NomineeCardProps) {
  const href = `/nominees/${nominee.id}`;
  const badgeVariant =
    nominee.status === "past-winner" ? "past-winner" : "nominee";
  const badgeLabel =
    nominee.status === "past-winner" ? "Past Winner" : "Nominee";

  const { isAuthenticated } = useAuth();
  const { data: myVotes = [] } = useMyVotes(isAuthenticated);

  const hasVotedThisNominee = myVotes.some(
    (v: any) => v.nomineeId === nominee.id && v.awardCategoryId === nominee.categoryId
  );
  const hasVotedInCategory = myVotes.some(
    (v: any) => v.awardCategoryId === nominee.categoryId
  );

  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);
  const [voteCount, setVoteCount] = useState(nominee.votes ?? 0);

  const handleVoteSuccess = () => setVoteCount((prev) => prev + 1);

  if (variant === "featured") {
    return (
      <>
        <article className="group flex min-w-0 flex-col bg-background-elevated border border-primary/10 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_4px_20px_rgba(235,193,102,0.05)]">
          <div className="relative block overflow-hidden bg-muted w-full aspect-4/5">
            <div className="absolute left-4 top-4 2xl:left-6 2xl:top-6 z-10">
              <Badge variant={badgeVariant}>{badgeLabel}</Badge>
            </div>
            {nominee.coverImage ? (
              <Image
                src={nominee.coverImage}
                alt={nominee.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="h-full w-full bg-linear-to-br from-muted to-background-muted" />
            )}
          </div>
          <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6 2xl:p-8">
            <h3
              className={cn(
                "mt-1 font-display text-2xl sm:text-3xl lg:text-[32px] 2xl:text-[40px]",
                "leading-tight lg:leading-10 2xl:leading-12 font-semibold",
              )}
            >
              {nominee.name}
            </h3>
            <p className="text-base 2xl:text-[20px] leading-6 2xl:leading-8 text-foreground-muted">
              {nominee.category?.name || nominee.firm}
            </p>
            <div className="mt-auto flex flex-wrap items-center justify-between gap-3 2xl:gap-5 2xl:mt-8">
              <span
                className={cn(
                  "text-[12px] 2xl:text-[16px] font-semibold uppercase tracking-[1.2px]",
                  "2xl:tracking-[1.6px] leading-4 2xl:leading-6 text-primary",
                )}
              >
                {voteCount.toLocaleString()} Votes
              </span>
              <Button
                size="sm"
                variant="outline"
                className={cn(
                  "text-[10px] 2xl:text-[14px] leading-3.75 2xl:leading-5 font-semibold tracking-[1px] 2xl:tracking-[1.5px] h-8 transition-all duration-200",
                  hasVotedThisNominee
                    ? "bg-primary/20 text-primary border border-primary/50 cursor-default"
                    : hasVotedInCategory
                    ? "text-foreground-muted/40 border border-primary/5 opacity-50 cursor-not-allowed"
                    : "text-foreground border border-primary/20 hover:bg-primary hover:text-[#402D00] hover:border-primary cursor-pointer"
                )}
                onClick={() => !hasVotedInCategory && setIsVoteModalOpen(true)}
                disabled={hasVotedInCategory}
              >
                {hasVotedThisNominee ? "Voted" : "Vote"}
              </Button>
            </div>
          </div>
        </article>

        <VoteModal
          isOpen={isVoteModalOpen}
          onClose={() => setIsVoteModalOpen(false)}
          nominee={nominee}
          onVoteSuccess={handleVoteSuccess}
        />
      </>
    );
  }

  // "grid" variant
  return (
    <>
      <article className="group flex min-w-0 flex-col">
        <Link
          href={href}
          className="group relative block overflow-hidden bg-muted border border-primary/40 border-b-primary/10 w-full aspect-4/5"
        >
          <div className="absolute left-4 top-4 2xl:left-6 2xl:top-6 z-10">
            <Badge variant={badgeVariant}>{badgeLabel}</Badge>
          </div>
          {nominee.coverImage ? (
            <Image
              src={nominee.coverImage}
              alt={nominee.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-linear-to-br from-muted to-background-muted" />
          )}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: OVERLAY_GRADIENT }}
            aria-hidden
          />
        </Link>

        {/* Text */}
        <div className="flex flex-1 flex-col pt-4 px-3 pb-3 border border-primary/40 border-t-0 transition-colors duration-300 group-hover:border-primary">
          <p
            className={cn(
              "flex min-w-0 items-center gap-2 2xl:gap-3 text-[10px] 2xl:text-[14px] font-inter",
              "uppercase tracking-[1.5px] 2xl:tracking-[2px] text-primary",
            )}
          >
            <span
              className="h-4 w-0.5 2xl:h-6 2xl:w-1 bg-primary shrink-0"
              aria-hidden
            />
            {nominee.category?.name || nominee.firm}
          </p>
          <h3
            className={cn(
              "mt-2 2xl:mt-3 font-display text-2xl sm:text-3xl lg:text-[32px]",
              "2xl:text-[40px] leading-[1.2] font-semibold text-foreground transition-colors duration-300 group-hover:text-primary",
            )}
          >
            {nominee.name}
          </h3>
          <p className="mt-2 2xl:mt-3 text-sm 2xl:text-[18px] leading-6 2xl:leading-8 text-foreground-muted font-inter">
            {nominee.excerpt}
          </p>
          <div className="mt-5 2xl:mt-8 flex flex-wrap items-center justify-between gap-3 2xl:gap-5">
            <span
              className={cn(
                "text-[12px] 2xl:text-[16px] font-semibold uppercase tracking-[1.2px]",
                "2xl:tracking-[1.6px] leading-4 2xl:leading-6 text-primary",
              )}
            >
              {voteCount.toLocaleString()} Votes
            </span>
            <Button
              size="sm"
              variant="outline"
              className={cn(
                "text-[10px] 2xl:text-[14px] leading-3.75 2xl:leading-5 font-semibold tracking-[1px] 2xl:tracking-[1.5px] h-8 transition-all duration-200",
                hasVotedThisNominee
                  ? "bg-primary/20 text-primary border border-primary/50 cursor-default"
                  : hasVotedInCategory
                  ? "text-foreground-muted/40 border border-primary/5 opacity-50 cursor-not-allowed"
                  : "text-foreground border border-primary/20 hover:bg-primary hover:text-[#402D00] hover:border-primary cursor-pointer"
              )}
              onClick={() => !hasVotedInCategory && setIsVoteModalOpen(true)}
              disabled={hasVotedInCategory}
            >
              {hasVotedThisNominee ? "Voted" : "Vote"}
            </Button>
          </div>
        </div>
      </article>

      <VoteModal
        isOpen={isVoteModalOpen}
        onClose={() => setIsVoteModalOpen(false)}
        nominee={nominee}
        onVoteSuccess={handleVoteSuccess}
      />
    </>
  );
}

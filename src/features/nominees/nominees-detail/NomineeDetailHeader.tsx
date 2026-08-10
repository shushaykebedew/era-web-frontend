"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";
import { cn } from "@/utils/cn";

interface NomineeDetailHeaderProps {
  onVoteClick?: () => void;
  staticMode?: boolean;
  hasVotedThisNominee?: boolean;
  hasVotedInCategory?: boolean;
}

export function NomineeDetailHeader({
  onVoteClick,
  staticMode = false,
  hasVotedThisNominee = false,
  hasVotedInCategory = false,
}: NomineeDetailHeaderProps) {
  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex px-3 sm:px-6 lg:px-10 2xl:px-16",
        "min-w-0 h-16 sm:h-20 2xl:h-28 items-center justify-between gap-2",
        "border-b border-primary/20 bg-background/80 backdrop-blur-[10px]",
      )}
    >
      <Link
        href="/"
        className={cn(
          "shrink-0 font-display text-lg sm:text-2xl lg:text-[32px] 2xl:text-[48px]",
          "font-bold tracking-[1px] sm:tracking-[1.6px] 2xl:tracking-[2.4px]",
          "text-primary leading-tight lg:leading-10 2xl:leading-14",
        )}
      >
        {siteConfig.name}
      </Link>

      {!staticMode && (
        <Button
          size="md"
          variant="outline"
          className={cn(
            "shrink-0 font-semibold transition-all duration-200",
            "text-[10px] sm:text-[12px] 2xl:text-base leading-4 2xl:leading-6",
            "tracking-[1.8px] 2xl:tracking-[2.4px] whitespace-nowrap",
            hasVotedThisNominee
              ? "bg-primary/20 text-primary border border-primary/50 cursor-default"
              : hasVotedInCategory
              ? "text-foreground-muted/40 border border-primary/5 opacity-50 cursor-not-allowed"
              : "border-primary/30 text-primary hover:bg-primary hover:text-[#402D00] hover:border-primary cursor-pointer"
          )}
          onClick={() => !hasVotedInCategory && onVoteClick?.()}
          disabled={hasVotedInCategory}
        >
          {hasVotedThisNominee ? "You Voted For This Project" : "Vote For This Project"}
        </Button>
      )}
    </nav>
  );
}

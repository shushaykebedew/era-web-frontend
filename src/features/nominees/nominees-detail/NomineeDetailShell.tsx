"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { NomineeSidebar } from "../NomineeSidebar";
import { NomineeDetailHeader } from "./NomineeDetailHeader";
import { DetailTab } from "../tabs/DetailTab";
import { VoteModal } from "../VoteModal";
import { type NomineeDetailShellProps } from "@/types/nominees";
import { SlideUp, FadeIn } from "@/components/ui/animations";
import { useAuth } from "@/context/AuthContext";
import { useMyVotes } from "@/hooks/queries/useNominees";

export function NomineeDetailShell({
  nominee,
  category,
}: NomineeDetailShellProps) {
  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);

  const { isAuthenticated } = useAuth();
  const { data: myVotes = [] } = useMyVotes(isAuthenticated);

  const hasVotedThisNominee = myVotes.some(
    (v: any) => v.nomineeId === nominee.id && v.awardCategoryId === nominee.categoryId
  );
  const hasVotedInCategory = myVotes.some(
    (v: any) => v.awardCategoryId === nominee.categoryId
  );

  return (
    <div className="bg-background min-h-screen w-full overflow-x-hidden -mt-16 sm:-mt-20 2xl:-mt-28">
      <NomineeDetailHeader
        onVoteClick={() => setIsVoteModalOpen(true)}
        hasVotedThisNominee={hasVotedThisNominee}
        hasVotedInCategory={hasVotedInCategory}
      />

      {/* ── Hero row: sidebar + cover image side by side ── */}
      <div className="pt-16 sm:pt-20 px-4 sm:px-6 lg:px-10 overflow-hidden">
        <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 gap-6 lg:grid-cols-[minmax(0,478fr)_minmax(0,688fr)] lg:gap-10">
          {/* Sidebar */}
          <NomineeSidebar
            nominee={nominee}
            category={category}
            onVoteClick={() => setIsVoteModalOpen(true)}
          />

          {/* Right — logo showcase */}
          <div className="min-w-0 py-10 lg:py-16">
            <FadeIn delay={0.2}>
              <div className="relative w-full max-w-full flex items-center justify-center bg-[#13110e] border border-primary/20 rounded-lg p-10 min-h-[380px] lg:h-[min(600px,60vh)] shadow-[0_8px_30px_rgba(201,162,75,0.05)] overflow-hidden">
                {/* Grid line background */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,75,0.03)_0%,transparent_75%)] pointer-events-none" />
                
                {/* Gold corner ornaments */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-primary/30" />
                <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-primary/30" />
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-primary/30" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-primary/30" />
                
                {nominee.logo ? (
                  <div className="relative w-4/5 h-4/5 max-h-80 flex items-center justify-center">
                    <Image
                      src={nominee.logo}
                      alt={nominee.name}
                      fill
                      className="object-contain transition-all duration-300 hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 57vw"
                      priority
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-primary/5 border-2 border-primary/50 flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(201,162,75,0.15)]">
                      <span className="font-display text-4xl font-bold text-primary tracking-widest">
                        {nominee.name
                          .split(/\s+/)
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </span>
                    </div>
                    <span className="text-xs font-inter uppercase tracking-[3px] text-primary/70">
                      ERA Nominee
                    </span>
                  </div>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* ── Below-fold: detail content ── */}
      <div className="px-4 sm:px-6 lg:px-10 overflow-hidden">
        <DetailTab nominee={nominee} />
      </div>

      {/* Cast Your Vote */}
      <section className="border-t border-border-strong py-16 sm:py-24 text-center">
        <SlideUp>
          <div className="mx-auto w-full max-w-full sm:max-w-xl lg:max-w-xl 2xl:max-w-4xl px-4 sm:px-6">
            <h2
              className={cn(
                "font-display text-[40px] sm:text-[56px] lg:text-[72px] 2xl:text-[96px]",
                "leading-tight lg:leading-18 2xl:leading-28 text-foreground",
              )}
            >
              Cast Your Vote
            </h2>
            <p
              className={cn(
                "mx-auto mt-5 2xl:mt-8 text-base 2xl:text-[24px] leading-6",
                "2xl:leading-9 text-foreground-muted font-inter",
              )}
            >
              Your voice defines the standard of excellence for the next
              generation of Ethiopian architecture.
            </p>
            <Button
              size="md"
              variant="primary"
              className={cn(
                "mt-10 w-full sm:w-auto px-8 sm:px-12 2xl:px-16 transition-all duration-200",
                "text-sm sm:text-base 2xl:text-[24px] leading-6 2xl:leading-9",
                "tracking-[2px] sm:tracking-[6.4px] 2xl:tracking-[8px]",
                hasVotedThisNominee
                  ? "bg-primary/20 text-primary border border-primary/50 cursor-default"
                  : hasVotedInCategory
                  ? "bg-[#1a1712] text-[#e3dec8]/40 border border-primary/5 opacity-50 cursor-not-allowed"
                  : "bg-[#C9A24B] text-[#402D00] hover:bg-[#C9A24B]/90 cursor-pointer"
              )}
              onClick={() => !hasVotedInCategory && setIsVoteModalOpen(true)}
              disabled={hasVotedInCategory}
            >
              {hasVotedThisNominee ? "YOU VOTED FOR THIS PROJECT" : "VOTE NOW"}
            </Button>
          </div>
        </SlideUp>
      </section>

      <VoteModal
        isOpen={isVoteModalOpen}
        onClose={() => setIsVoteModalOpen(false)}
        nominee={nominee}
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { NomineeSidebar } from "./NomineeSidebar";
import { NomineeDetailHeader } from "./NomineeDetailHeader";
import { DetailTab } from "./tabs/DetailTab";
import { AwardsTab } from "./tabs/AwardsTab";
import { GalleryTab } from "./tabs/GalleryTab";
import { VoteModal } from "./VoteModal";
import { type Tab, type NomineeDetailShellProps } from "@/types/nominees";
import { SlideUp, FadeIn } from "@/components/ui/animations";

export function NomineeDetailShell({
  nominee,
  category,
  prevId,
  nextId,
}: NomineeDetailShellProps) {
  const [activeTab, setActiveTab] = useState<Tab>("detail");
  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);

  return (
    <div className="bg-background min-h-screen w-full overflow-x-hidden -mt-16 sm:-mt-20 2xl:-mt-28">
      <NomineeDetailHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onVoteClick={() => setIsVoteModalOpen(true)}
      />

      {/* ── Hero row: sidebar + cover image side by side ── */}
      <div className="pt-16 sm:pt-20 px-4 sm:px-6 lg:px-10 overflow-hidden">
        <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 gap-6 lg:grid-cols-[minmax(0,478fr)_minmax(0,688fr)] lg:gap-10">
          {/* Sidebar */}
          <NomineeSidebar
            nominee={nominee}
            category={category}
            activeTab={activeTab}
            onVoteClick={() => setIsVoteModalOpen(true)}
          />

          {/* Right — cover image (detail) or tab content top (awards/gallery) */}
          <div className="min-w-0 py-10 lg:py-16">
            {activeTab === "detail" && (
              <FadeIn delay={0.2}>
                <div
                  className={cn(
                    "relative w-full max-w-full overflow-hidden bg-background-elevated aspect-4/5",
                    "sm:aspect-3/4 lg:aspect-auto lg:max-h-215 lg:h-[min(860px,75vh)]",
                  )}
                >
                  {nominee.coverImage ? (
                    <Image
                      src={nominee.coverImage}
                      alt={nominee.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 1024px) 100vw, 57vw"
                      priority
                    />
                  ) : (
                    <div className="h-full w-full bg-background-elevated" />
                  )}
                  {/* Dot indicators */}
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className={cn(
                          "block h-1.5 2xl:h-2 rounded-full",
                          i === 0
                            ? "w-6 2xl:w-8 bg-primary"
                            : "w-1.5 2xl:w-2 bg-foreground-muted/40",
                        )}
                      />
                    ))}
                  </div>
                </div>
              </FadeIn>
            )}

            {activeTab === "awards" && <AwardsTab nominee={nominee} />}
            {activeTab === "gallery" && (
              <GalleryTab nominee={nominee} prevId={prevId} nextId={nextId} />
            )}
          </div>
        </div>
      </div>

      {/* ── Below-fold: detail tab content — full width, normal page flow ── */}
      {activeTab === "detail" && (
        <>
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
                    "mt-10 w-full sm:w-auto bg-[#C9A24B] px-8 sm:px-12 2xl:px-16",
                    "text-sm sm:text-base 2xl:text-[24px] leading-6 2xl:leading-9",
                    "tracking-[2px] sm:tracking-[6.4px] 2xl:tracking-[8px]",
                  )}
                  onClick={() => setIsVoteModalOpen(true)}
                >
                  Vote Now
                </Button>
              </div>
            </SlideUp>
          </section>
        </>
      )}

      <VoteModal
        isOpen={isVoteModalOpen}
        onClose={() => setIsVoteModalOpen(false)}
        nominee={nominee}
      />
    </div>
  );
}

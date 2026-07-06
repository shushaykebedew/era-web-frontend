"use client";

import { useState } from "react";
import Link from "next/link";
import type { Nominee, AwardCategory } from "@/types";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";
import { cn } from "@/utils/cn";
import { NomineeSidebar } from "./NomineeSidebar";
import { DetailTab } from "./tabs/DetailTab";
import { AwardsTab } from "./tabs/AwardsTab";
import { GalleryTab } from "./tabs/GalleryTab";

type Tab = "detail" | "awards" | "gallery";

type NomineeDetailShellProps = {
  nominee: Nominee;
  category?: AwardCategory;
  prevSlug?: string;
  nextSlug?: string;
};

export function NomineeDetailShell({
  nominee,
  category,
  prevSlug,
  nextSlug,
}: NomineeDetailShellProps) {
  const [activeTab, setActiveTab] = useState<Tab>("detail");

  const tabs: { id: Tab; label: string }[] = [
    { id: "detail", label: "Detail" },
    { id: "awards", label: "Awards" },
    { id: "gallery", label: "Gallery" },
  ];

  return (
    <div className="bg-background min-h-screen w-full overflow-x-hidden">
      {/* ── Fixed sub-nav ── */}
      <nav className="fixed inset-x-0 top-0 z-50 flex h-16 sm:h-20 min-w-0 items-center justify-between gap-2 border-b border-primary/20 bg-[#16130DCC] backdrop-blur-[10px] px-3 sm:px-6 lg:px-10 2xl:px-16">
        <Link
          href="/"
          className="shrink-0 font-display text-lg sm:text-2xl lg:text-[32px] font-bold tracking-[1px] sm:tracking-[1.6px] text-primary leading-tight lg:leading-10"
        >
          {siteConfig.name}
        </Link>

        <div className="flex min-w-0 flex-1 items-center justify-end sm:justify-center gap-3 overflow-x-auto sm:gap-6 px-1 sm:px-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "shrink-0 pb-1 transition-colors uppercase font-semibold text-[10px] sm:text-[12px] leading-4 tracking-[1.8px] cursor-pointer whitespace-nowrap",
                activeTab === tab.id
                  ? "border-b border-primary text-primary"
                  : "text-[#EAE1D799] hover:text-primary",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <Button
          size="sm"
          variant="outline"
          className="hidden sm:inline-flex shrink-0 h-8 sm:h-[34px] border-[#EBC1664D] text-primary font-semibold text-[10px] sm:text-[12px] leading-4 tracking-[1.8px] whitespace-nowrap"
          onClick={() => setActiveTab("detail")}
        >
          Vote For This Project
        </Button>
      </nav>

      {/* ── Hero row: sidebar + cover image side by side ── */}
      <div className="pt-16 sm:pt-20 px-4 sm:px-6 lg:px-10 overflow-hidden">
        <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 gap-6 lg:grid-cols-[minmax(0,478fr)_minmax(0,688fr)] lg:gap-10">
          {/* Sidebar */}
          <NomineeSidebar
            nominee={nominee}
            category={category}
            activeTab={activeTab}
          />

          {/* Right — cover image (detail) or tab content top (awards/gallery) */}
          <div className="min-w-0 py-10 lg:py-16">
            {activeTab === "detail" && (
              <div className="relative w-full max-w-full overflow-hidden bg-background-elevated aspect-[4/5] sm:aspect-[3/4] lg:aspect-auto lg:max-h-[860px] lg:h-[min(860px,75vh)]">
                {nominee.coverImage ? (
                  <img
                    src={nominee.coverImage}
                    alt={nominee.name}
                    className="h-full w-full object-cover object-top"
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
                        "block h-1.5 rounded-full",
                        i === 0
                          ? "w-6 bg-primary"
                          : "w-1.5 bg-foreground-muted/40",
                      )}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === "awards" && <AwardsTab nominee={nominee} />}
            {activeTab === "gallery" && (
              <GalleryTab
                nominee={nominee}
                prevSlug={prevSlug}
                nextSlug={nextSlug}
              />
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
            <div className="mx-auto w-full max-w-full sm:max-w-xl lg:max-w-[576px] 2xl:max-w-4xl px-4 sm:px-6">
              <h2 className="font-display text-[40px] sm:text-[56px] lg:text-[72px] leading-tight lg:leading-[72px] text-foreground">
                Cast Your Vote
              </h2>
              <p className="mx-auto mt-5 text-base leading-6 text-foreground-muted font-inter">
                Your voice defines the standard of excellence for the next
                generation of Ethiopian architecture.
              </p>
              <Button
                size="lg"
                variant="primary"
                className="mt-10 w-full sm:w-auto text-sm sm:text-base tracking-[2px] sm:tracking-[6.4px] px-8 sm:px-12 leading-6 bg-[#C9A24B]"
              >
                Vote Now
              </Button>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import type { Nominee, AwardCategory } from "@/types";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
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
    <div className="bg-background min-h-screen">
      {/* ── Fixed sub-nav ── */}
      <nav className="fixed inset-x-0 top-0 z-50 flex h-20 items-center justify-between border-b border-[#EBC16633] bg-[#16130DCC] backdrop-blur-[10px] px-6 lg:px-10">
        <Link
          href="/"
          className="font-display text-[32px] font-bold tracking-[1.6px] text-[#EBC166] leading-10"
        >
          {siteConfig.name}
        </Link>

        <div className="flex items-center gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "pb-0.5 transition-colors uppercase font-semibold text-[12px] leading-4 tracking-[1.8px] cursor-pointer",
                activeTab === tab.id
                  ? "border-b border-[#EBC166] text-[#EBC166]"
                  : "text-[#EAE1D799] hover:text-[#EBC166]",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <Button
          size="sm"
          variant="outline"
          className="h-[34px] border-[#EBC1664D] text-[#EBC166] font-semibold text-[12px] leading-4 tracking-[1.8px]"
          onClick={() => setActiveTab("detail")}
        >
          Vote For This Project
        </Button>
      </nav>

      {/* ── Hero row: sidebar + cover image side by side ── */}
      <div className="pt-20 px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[448px_1fr] lg:gap-10">
          {/* Sidebar */}
          <NomineeSidebar
            nominee={nominee}
            category={category}
            activeTab={activeTab}
          />

          {/* Right — cover image (detail) or tab content top (awards/gallery) */}
          <div className="min-w-0 py-10 lg:py-16">
            {activeTab === "detail" && (
              <div
                className="relative overflow-hidden bg-background-elevated w-full max-w-[688px] max-h-[860px]"
                style={{ height: "min(860px, 75vh)" }}
              >
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
          <div className="px-6 lg:px-10">
            <DetailTab nominee={nominee} />
          </div>

          {/* Cast Your Vote */}
          <section className="border-t border-border-strong py-24 text-center">
            <div className="mx-auto max-w-[576px] px-6">
              <h2 className="font-display text-[72px] leading-[72px] text-[#EAE1D7]">
                Cast Your Vote
              </h2>
              <p className="mx-auto mt-5 text-base leading-6 text-[#D1C5B2CC] font-inter">
                Your voice defines the standard of excellence for the next
                generation of Ethiopian architecture.
              </p>
              <Button
                size="lg"
                variant="primary"
                className="mt-10 text-base tracking-[6.4px] px-12 leading-6 bg-[#C9A24B]"
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

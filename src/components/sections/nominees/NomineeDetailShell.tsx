"use client";

import { useState } from "react";
import Link from "next/link";
import type { Nominee } from "@/types";
import type { AwardCategory } from "@/types";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { NomineeSidebar } from "./NomineeSidebar";
import { DetailTab, AwardsTab, GalleryTab } from "./NomineeDetailContent";

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
    <>
      {/* ── Fixed sub-nav ── */}
      <nav className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b border-border-strong bg-background/90 backdrop-blur-md px-6 lg:px-10">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-2xl font-bold tracking-tight text-primary"
        >
          {siteConfig.name}
        </Link>

        {/* Tab switcher */}
        <div className="flex items-center gap-6 text-[11px] font-inter font-semibold uppercase tracking-[1.5px]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "pb-0.5 transition-colors",
                activeTab === tab.id
                  ? "border-b border-foreground text-foreground"
                  : "text-foreground-muted hover:text-foreground",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Vote CTA */}
        <Button
          size="sm"
          variant="outline"
          className="text-[10px] tracking-[1.5px]"
          onClick={() => setActiveTab("detail")}
        >
          Vote For This Project
        </Button>
      </nav>

      {/* ── Main layout: sidebar + tab content ── */}
      <div className="pt-14 bg-background min-h-screen">
        <div className="mx-auto grid w-full max-w-[1920px] grid-cols-1 gap-0 px-6 lg:grid-cols-[320px_1fr] lg:gap-10 lg:px-10">
          {/* Sidebar — sticky on desktop */}
          <div className="lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] lg:overflow-y-auto">
            <NomineeSidebar nominee={nominee} category={category} />
          </div>

          {/* Tab content */}
          <div className="min-w-0">
            {activeTab === "detail" && <DetailTab nominee={nominee} />}
            {activeTab === "awards" && <AwardsTab nominee={nominee} />}
            {activeTab === "gallery" && (
              <GalleryTab nominee={nominee} prevSlug={prevSlug} nextSlug={nextSlug} />
            )}
          </div>
        </div>
      </div>

      {/* ── Cast Your Vote — only on detail tab ── */}
      {activeTab === "detail" && (
        <section className="bg-background border-t border-border-strong py-24 text-center">
          <div className="mx-auto max-w-lg px-6">
            <h2 className="font-display text-5xl font-bold leading-tight">
              Cast Your Vote
            </h2>
            <p className="mx-auto mt-5 max-w-sm text-sm leading-7 text-foreground-muted">
              Your voice defines the standard of excellence for the next generation of
              Ethiopian architecture.
            </p>
            <Button
              size="lg"
              variant="primary"
              className="mt-10 text-[11px] tracking-[1.5px] px-16"
            >
              Vote Now
            </Button>
          </div>
        </section>
      )}
    </>
  );
}

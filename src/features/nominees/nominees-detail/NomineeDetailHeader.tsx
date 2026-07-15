"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";
import { cn } from "@/utils/cn";
import { type Tab } from "@/types/nominees";

interface NomineeDetailHeaderProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  onVoteClick: () => void;
}

const TABS: { id: Tab; label: string }[] = [
  { id: "detail", label: "Detail" },
  { id: "awards", label: "Awards" },
  { id: "gallery", label: "Gallery" },
];

export function NomineeDetailHeader({
  activeTab,
  onTabChange,
  onVoteClick,
}: NomineeDetailHeaderProps) {
  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex px-3 sm:px-6 lg:px-10 2xl:px-16",
        "min-w-0 h-16 sm:h-20 2xl:h-28 items-center justify-between gap-2",
        "border-b border-primary/20 bg-[#16130DCC] backdrop-blur-[10px]",
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

      <div
        className={cn(
          "flex min-w-0 flex-1 items-center justify-end sm:justify-center",
          "gap-3 overflow-x-auto sm:gap-6 px-1 sm:px-2",
          "[-ms-overflow-style:none] [scrollbar-none] [&::-webkit-scrollbar]:hidden",
        )}
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "shrink-0 pb-1 transition-colors uppercase font-medium text-[10px]",
              "sm:text-[12px] 2xl:text-[16px] leading-4 2xl:leading-6 tracking-[1.8px]",
              "2xl:tracking-[2.4px] cursor-pointer whitespace-nowrap font-inter",
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
        className={cn(
          "hidden sm:inline-flex shrink-0 h-8 sm:h-10 2xl:h-12 border-[#EBC1664D] font-semibold",
          "text-[10px] sm:text-[12px] 2xl:text-[16px] leading-4 2xl:leading-6",
          "tracking-[1.8px] 2xl:tracking-[2.4px] whitespace-nowrap text-primary",
        )}
        onClick={onVoteClick}
      >
        Vote For This Project
      </Button>
    </nav>
  );
}

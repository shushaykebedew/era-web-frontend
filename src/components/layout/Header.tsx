"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { cn } from "@/utils/cn";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { AuthModal } from "@/components/ui/AuthModal";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(64);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const update = () => {
      const h = el.getBoundingClientRect().height;
      setHeaderHeight(h);
      document.documentElement.style.setProperty("--header-height", `${h}px`);
    };

    const observer = new ResizeObserver(update);
    observer.observe(el);
    update();

    return () => observer.disconnect();
  }, []);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex px-4 sm:px-6 md:px-8 lg:px-10 2xl:px-16",
        "min-w-0 h-16 sm:h-20 2xl:h-28 items-center justify-between gap-4 lg:gap-8",
        "border-b border-[#EBC16633] bg-[#16130DCC] backdrop-blur-[10px]",
      )}
    >
      <Link
        href="/"
        className={cn(
          "shrink-0 font-display text-2xl sm:text-[28px] lg:text-[32px] 2xl:text-[48px]",
          "font-bold tracking-[1.4px] sm:tracking-[1.6px] 2xl:tracking-[2.4px]",
          "text-primary leading-tight lg:leading-10 2xl:leading-14",
        )}
      >
        {siteConfig.name}
      </Link>

      <DesktopNav onOpenAuthModal={() => setIsAuthModalOpen(true)} />
      <MobileNav
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        headerHeight={headerHeight}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Auth modal lives at Header level so it survives menu open/close */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
}

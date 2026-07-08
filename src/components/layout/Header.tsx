"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Hide the main header on nominee detail pages since they have their own subnav
  const isNomineeDetail =
    pathname?.startsWith("/nominees/") && pathname !== "/nominees";

  // Close on Escape
  useEffect(() => {
    if (!isMenuOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsMenuOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isMenuOpen]);

  // Close menu and restore scroll on route change
  useEffect(() => {
    queueMicrotask(() => setIsMenuOpen(false));
  }, [pathname]);

  // Lock body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  if (isNomineeDetail) {
    return null;
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-primary/30 h-16 lg:h-20 2xl:h-28">
        <div
          className={cn(
            "flex min-w-0 items-center justify-between h-full gap-3 w-full",
            "mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16",
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              "shrink-0 font-display text-xl sm:text-2xl lg:text-[32px] xl:text-[48px]",
              "2xl:text-[64px] font-bold tracking-tight leading-tight xl:leading-13",
              "2xl:leading-18 text-[#C9A24B]",
            )}
          >
            {siteConfig.name}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden min-w-0 flex-wrap items-center justify-center gap-4 lg:gap-6 xl:gap-10 2xl:gap-14 lg:flex">
            {siteConfig.nav.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href ||
                    pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "whitespace-nowrap text-[12px] 2xl:text-base font-inter font-bold leading-4",
                    "py-2 tracking-[1.2px] uppercase transition-colors hover:text-primary",
                    isActive
                      ? "text-primary border-b-2 border-primary"
                      : "text-foreground-muted",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop vote CTA */}
          <div className="hidden lg:block">
            <Button
              as={Link}
              href={siteConfig.voteCta.href}
              size="sm"
              variant="outline"
              className={cn(
                "text-primary text-base 2xl:text-[20px] px-4 xl:px-6 2xl:px-10",
                "w-auto min-w-0 xl:min-w-41.25 2xl:min-w-60 2xl:py-4",
              )}
            >
              {siteConfig.voteCta.label}
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center text-foreground lg:hidden"
          >
            <Image src="/icons/menu.svg" alt="" width={40} height={24} />
          </button>
        </div>
      </header>

      {/* Mobile menu — sibling of header, outside its stacking context */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          "fixed inset-0 flex flex-col transition-opacity duration-300 lg:hidden",
          isMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        style={{ backgroundColor: "#16130D", zIndex: 9999 }}
      >
        {/* Close button — mirrors the header bar so the icon lands on the exact same spot as the hamburger */}
        <div className="flex h-16 lg:h-20 2xl:h-28 shrink-0 items-center justify-between px-4 sm:px-6 md:px-8">
          {/* Logo placeholder to push close button to the right */}
          <span
            className={cn(
              "font-display text-xl sm:text-2xl font-bold tracking-tight text-[#C9A24B]",
            )}
          >
            {siteConfig.name}
          </span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setIsMenuOpen(false)}
            className="flex h-10 w-10 items-center justify-center text-foreground"
          >
            <Image src="/icons/x-icon.svg" alt="" width={18} height={18} />
          </button>
        </div>

        {/* Nav links centred vertically */}
        <nav className="flex flex-1 flex-col items-center gap-6 mt-6 overflow-y-auto px-4 pb-8">
          {siteConfig.nav.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href ||
                  pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "text-center font-display text-[28px] sm:text-[32px] 2xl:text-[40px]",
                  "font-semibold transition-colors hover:text-primary",
                  isActive ? "text-primary" : "text-[#EAE1D7CC]",
                )}
              >
                {link.label}
              </Link>
            );
          })}

          <Button
            as={Link}
            href={siteConfig.voteCta.href}
            onClick={() => setIsMenuOpen(false)}
            className="mt-6 2xl:mt-10 2xl:text-[20px] 2xl:py-4 2xl:px-10"
          >
            {siteConfig.voteCta.label}
          </Button>
        </nav>
      </div>
    </>
  );
}

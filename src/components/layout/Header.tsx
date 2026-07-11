"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

function DesktopNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden min-w-0 flex-wrap items-center justify-center gap-4 lg:gap-6 xl:gap-10 2xl:gap-14 lg:flex">
        {siteConfig.nav.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "whitespace-nowrap text-[12px] 2xl:text-base font-inter font-bold leading-4",
                "py-1 tracking-[1.2px] uppercase transition-colors hover:text-primary",
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
    </>
  );
}

function MobileNav({ isMenuOpen, setIsMenuOpen }: { isMenuOpen: boolean; setIsMenuOpen: (v: boolean) => void }) {
  const pathname = usePathname();

  useEscapeKey(() => setIsMenuOpen(false), isMenuOpen);
  useBodyScrollLock(isMenuOpen);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname, setIsMenuOpen]);

  return (
    <>
      {/* Mobile nav toggle */}
      <button
        type="button"
        className="flex h-10 w-10 2xl:w-14 2xl:h-14 items-center justify-center rounded-md text-primary lg:hidden cursor-pointer"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-expanded={isMenuOpen}
      >
        <span className="sr-only">Toggle navigation</span>
        {isMenuOpen ? (
          <svg className="h-6 w-6 2xl:h-8 2xl:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6 2xl:h-8 2xl:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile nav drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 sm:top-20 z-40 bg-background/95 backdrop-blur-md lg:hidden">
          <nav className="flex flex-col p-6 overflow-y-auto h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)]">
            <div className="flex flex-col space-y-6 flex-1">
              {siteConfig.nav.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname === link.href || pathname.startsWith(`${link.href}/`);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "text-xl font-bold font-display tracking-wider",
                      isActive ? "text-primary" : "text-foreground-muted",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="mt-8 pt-8 border-t border-border-strong pb-8">
              <Button
                as={Link}
                href={siteConfig.voteCta.href}
                className="w-full justify-center bg-primary text-background"
                size="lg"
              >
                {siteConfig.voteCta.label}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
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

      <DesktopNav />
      <MobileNav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </header>
  );
}

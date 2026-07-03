"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

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
    setIsMenuOpen(false);
  }, [pathname]);

  // Lock body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className="relative w-full backdrop-blur-md bg-background/80 border-b border-primary/30 h-16 lg:h-20"
        style={{ zIndex: 40 }}
      >
        <Container
          as="div"
          size="wide"
          className="flex items-center justify-between h-full"
        >
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-2xl lg:text-[32px] xl:text-[48px] font-bold tracking-[-2.4] leading-[18px] xl:leading-[52px] text-[#EBC166]"
          >
            {siteConfig.name}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-4 lg:gap-6 xl:gap-10 lg:flex">
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
                    "text-[12px] font-inter font-bold leading-4 py-2 tracking-[1.2px] uppercase transition-colors hover:text-primary",
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
              className="text-primary text-base w-[165px]"
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
            className="text-foreground lg:hidden"
          >
            <img src="/icons/menu.svg" alt="" />
          </button>
        </Container>
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
        {/* Close button */}
        <div className="flex justify-end px-6 py-6">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setIsMenuOpen(false)}
            className="text-foreground"
          >
            <img src="/icons/x-icon.svg" alt="" />
          </button>
        </div>

        {/* Nav links centred vertically */}
        <nav className="flex flex-1 flex-col items-center gap-6 mt-6">
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
                  "font-display text-[32px] font-semibold transition-colors hover:text-primary",
                  isActive ? "text-[#EBC166]" : "text-[#EAE1D7CC]",
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
            className="mt-6"
          >
            {siteConfig.voteCta.label}
          </Button>
        </nav>
      </div>
    </>
  );
}

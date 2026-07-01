"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="relative z-50 w-full backdrop-blur-md bg-[#16130DCC] border-b border-[#EBC1664D] h-20">
      <Container
        as="div"
        size="wide"
        className="flex items-center justify-between h-full"
      >
        <Link
          href="/"
          className="font-display text-[48px] font-bold tracking-[-2.4] leading-[52px] text-primary"
        >
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
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

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="text-foreground lg:hidden"
        >
          <Menu className="h-7 w-7" strokeWidth={1.5} />
        </button>
      </Container>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        pathname={pathname}
      />
    </header>
  );
}

function MobileMenu({
  isOpen,
  onClose,
  pathname,
}: {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col bg-[#16130DCC] transition-opacity duration-300 lg:hidden",
        isOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0",
      )}
    >
      <Container className="flex justify-end py-6">
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="text-foreground"
        >
          <X className="h-7 w-7" strokeWidth={1.5} />
        </button>
      </Container>

      <nav className="flex flex-1 flex-col items-center justify-center gap-8 px-6">
        {siteConfig.nav.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname === link.href || pathname.startsWith(`${link.href}/`);

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "font-display text-3xl font-semibold transition-colors hover:text-primary",
                isActive ? "text-primary" : "text-foreground",
              )}
            >
              {link.label}
            </Link>
          );
        })}

        <Button
          as={Link}
          href={siteConfig.voteCta.href}
          onClick={onClose}
          className="mt-6"
        >
          {siteConfig.voteCta.label}
        </Button>
      </nav>
    </div>
  );
}

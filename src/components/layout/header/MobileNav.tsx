"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useAuth } from "@/context/AuthContext";
import { getUserInitials } from "@/utils/user";

export function MobileNav({
  isMenuOpen,
  setIsMenuOpen,
  headerHeight,
  onOpenAuthModal,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: (v: boolean) => void;
  headerHeight: number;
  onOpenAuthModal: () => void;
}) {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useEscapeKey(() => setIsMenuOpen(false), isMenuOpen);
  useBodyScrollLock(isMenuOpen);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname, setIsMenuOpen]);

  const drawer = (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed",
            top: `var(--header-height, ${headerHeight}px)`,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#16130d",
            zIndex: 40,
            willChange: "transform",
          }}
        >
          <nav
            style={{ height: "100%", overflowY: "auto" }}
            className="flex flex-col p-6"
          >
            <div className="flex flex-col items-center justify-center space-y-6 flex-1">
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
                      "text-xl font-bold font-display tracking-wider text-center",
                      isActive ? "text-primary" : "text-foreground-muted",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="pt-8 pb-8 flex flex-col gap-4 w-full">
              {isAuthenticated && user ? (
                <div className="bg-[#231F19] border border-primary/20 p-4 rounded flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-[#402D00] flex items-center justify-center font-bold text-sm">
                      {getUserInitials(user.fullName)}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-foreground leading-tight">
                        {user.fullName}
                      </p>
                      <p className="text-xs text-foreground-muted font-inter">
                        @{user.username}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="text-xs font-bold text-red-400 hover:text-red-300 font-inter uppercase tracking-wider cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  className="w-full justify-center text-primary border-primary/30"
                  size="lg"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenAuthModal();
                  }}
                >
                  Sign In
                </Button>
              )}

              <Button
                as={Link}
                href={siteConfig.voteCta.href}
                className="w-full justify-center bg-primary text-[#402D00] font-semibold"
                size="lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {siteConfig.voteCta.label}
              </Button>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-md text-primary xl:hidden cursor-pointer"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
      >
        <span className="sr-only">Toggle navigation</span>
        {isMenuOpen ? (
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {mounted && createPortal(drawer, document.body)}
    </>
  );
}

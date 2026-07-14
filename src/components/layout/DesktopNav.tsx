"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { useAuth } from "@/context/AuthContext";

export function DesktopNav({
  onOpenAuthModal,
}: {
  onOpenAuthModal: () => void;
}) {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      {/* Desktop nav links */}
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

      {/* Desktop auth controls */}
      <div className="hidden lg:flex items-center gap-4">
        {isAuthenticated && user ? (
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-[#231F19] text-primary text-sm font-semibold tracking-wider font-inter hover:bg-[#2D2820] transition-colors cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-primary text-[#402D00] flex items-center justify-center font-bold text-xs">
                {user.fullName
                  ? user.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .substring(0, 2)
                  : "U"}
              </div>
              <span className="truncate max-w-30">{user.fullName}</span>
            </button>

            {isDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-48 z-20 bg-[#16130D] border border-primary/30 shadow-xl rounded py-1 font-inter">
                  <div className="px-4 py-2 border-b border-primary/10">
                    <p className="text-[10px] text-foreground-muted uppercase tracking-wider font-bold">
                      Logged in as
                    </p>
                    <p className="text-sm font-semibold text-foreground truncate">
                      {user.username}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <Button
            size="sm"
            variant="outline"
            className="text-foreground-muted hover:border-primary text-base"
            onClick={onOpenAuthModal}
          >
            Sign In
          </Button>
        )}

        <Button
          as={Link}
          href={siteConfig.voteCta.href}
          size="sm"
          className="text-[#402D00] bg-primary hover:bg-primary/95 text-base px-6 font-semibold"
        >
          {siteConfig.voteCta.label}
        </Button>
      </div>
    </>
  );
}

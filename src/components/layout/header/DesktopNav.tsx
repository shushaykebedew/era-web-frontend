"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { useAuth } from "@/context/AuthContext";
import { getUserInitials } from "@/utils/user";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { User } from "lucide-react";

export function DesktopNav({
  onOpenAuthModal,
}: {
  onOpenAuthModal: () => void;
}) {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const is2xl = useMediaQuery("(min-width: 1536px)");

  useEffect(() => {
    if (!isDropdownOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <>
      {/* Desktop nav links */}
      <nav className="hidden min-w-0 flex-wrap items-center justify-center gap-4 xl:gap-10 2xl:gap-14 xl:flex">
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
                "group relative whitespace-nowrap text-[12px] 2xl:text-[18px] font-inter font-bold leading-4",
                "py-2 tracking-[1.2px] uppercase transition-colors hover:text-primary",
                isActive ? "text-primary" : "text-foreground-muted",
              )}
            >
              {link.label}
              <span
                className={cn(
                  "absolute left-0 bottom-0 h-0.5 bg-primary transition-all duration-300",
                  isActive ? "w-full" : "w-0 group-hover:w-full",
                )}
              />
            </Link>
          );
        })}
      </nav>

      {/* Desktop auth controls */}
      <div className="hidden xl:flex items-center gap-4">
        {isAuthenticated && user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen((v) => !v)}
              aria-label="User navigation menu"
              aria-expanded={isDropdownOpen}
              className="flex items-center gap-2 focus:outline-none cursor-pointer group"
            >
              <div className="relative w-8 h-8 2xl:w-11 2xl:h-11 rounded-full bg-gradient-to-br from-primary to-[#8F6F2D] text-[#402D00] flex items-center justify-center ring-2 ring-primary/20 group-hover:ring-primary/60 transition-all duration-300 shadow-md">
                <User className="w-4 h-4 2xl:w-6 2xl:h-6" />
              </div>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-58 2xl:w-72 z-20 bg-[#1a1712] border border-primary/30 shadow-[0_8px_32px_rgba(0,0,0,0.6)] rounded-lg py-2 font-inter animate-in fade-in-0 slide-in-from-top-2 duration-250">
                <div className="px-4 py-3 border-b border-primary/10 flex flex-col items-start gap-2">
                  <span className="text-[10px] 2xl:text-[12px] uppercase tracking-widest font-semibold text-primary font-inter">
                    Voter Profile
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-8.5 h-8.5 2xl:w-10 2xl:h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mt-0.5 shrink-0">
                      <User className="w-4 h-4 2xl:w-6 2xl:h-6" />
                    </div>

                    <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                      <span className="text-sm 2xl:text-base font-semibold text-foreground truncate mt-0.5 leading-snug">
                        {user.fullName}
                      </span>
                      <span className="text-xs 2xl:text-sm text-foreground-muted truncate leading-none">
                        {user.username ? `@${user.username}` : (user.phone || "")}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => {
                      logout();
                      setIsDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-xs 2xl:text-sm uppercase tracking-wider font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors cursor-pointer font-inter"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 2xl:w-5 2xl:h-5 shrink-0"
                      aria-hidden="true"
                    >
                      <path
                        d="M12 3.5V11.5"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />
                      <path
                        d="M7.05 6.85C5.17 8.39 4 10.74 4 13.35C4 17.77 7.58 21.35 12 21.35C16.42 21.35 20 17.77 20 13.35C20 10.74 18.83 8.39 16.95 6.85"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />
                    </svg>
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Button
            size={is2xl ? "md" : "sm"}
            variant="outline"
            className="text-foreground-muted hover:border-primary hover:text-primary text-base whitespace-nowrap transition-colors"
            onClick={onOpenAuthModal}
          >
            Sign In
          </Button>
        )}

        <Button
          as={Link}
          href={siteConfig.voteCta.href}
          size={is2xl ? "md" : "sm"}
          className="text-[#402D00] bg-primary hover:bg-primary/90 hover:shadow-[0_0_20px_-4px] hover:shadow-primary/60 text-base px-6 font-semibold whitespace-nowrap transition-all duration-300"
        >
          {siteConfig.voteCta.label}
        </Button>
      </div>
    </>
  );
}

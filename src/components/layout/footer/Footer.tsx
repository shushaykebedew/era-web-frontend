"use client";

import Link from "next/link";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { cn } from "@/utils/cn";

export function Footer() {
  const year = new Date().getFullYear();

  const socialLinks = [
    {
      href: "https://www.facebook.com/profile.php?id=61575298067788",
      label: "Facebook",
      icon: (
        <svg
          className="w-4 h-4 sm:w-4.5 sm:h-4.5 2xl:w-6 2xl:h-6 shrink-0"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      href: "https://instagram.com",
      label: "Instagram",
      icon: (
        <svg
          className="w-3.5 h-3.5 sm:w-4 sm:h-4 2xl:w-6 2xl:h-6 shrink-0"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.01 3.71.054 1.14.053 1.62.25 2.03.412.56.216.96.472 1.38.89.42.418.676.817.89 1.378.161.411.358.892.412 2.03.044.928.055 1.282.055 3.71s-.011 2.784-.055 3.71c-.054 1.14-.251 1.62-.412 2.03-.216.56-.472.96-.89 1.38-.418.42-.817.676-1.378.89-.411.161-.892.358-2.03.412-.928.044-1.282.055-3.71.055s-2.784-.011-3.71-.055c-1.14-.054-1.62-.251-2.03-.412-.56-.216-.96-.472-1.38-.89-.42-.418-.676-.817-.89-1.378-.161-.411-.358-.892-.412-2.03-.044-.928-.055-1.282-.055-3.71s.011-2.784.055-3.71c.054-1.14.251-1.62.412-2.03.216-.56.472-.96.89-1.38.418-.42.817-.676 1.378-.89.411-.161.892-.358 2.03-.412.93-.044 1.283-.055 3.71-.055m0-1.87c-2.472 0-2.782.01-3.748.054-1.206.055-2.029.246-2.748.528-.744.288-1.374.675-2.002 1.302-.627.628-1.014 1.258-1.302 2.002-.282.718-.472 1.542-.528 2.748-.044.966-.054 1.276-.054 3.748s.01 2.782.054 3.748c.056 1.206.246 2.029.528 2.748.288.744.675 1.374 1.302 2.002.628.627 1.258 1.014 2.002 1.302.718.282 1.542.472 2.748.528.966.044 1.276.054 3.748.054s2.782-.01 3.748-.054c1.206-.056 2.029-.246 2.748-.528.744-.288 1.374-.675 2.002-1.302.627-.628 1.014-1.258 1.302-2.002.282-.718.472-1.542.528-2.748.044-.966.054-1.276.054-3.748s-.01-2.782-.054-3.748c-.055-1.206-.246-2.029-.528-2.748-.288-.744-.675-1.374-1.302-2.002-.628-.627-1.258-1.014-2.002-1.302-.718-.282-1.542-.472-2.748-.528-.966-.044-1.276-.054-3.748-.054zM12 5.83c-3.407 0-6.17 2.763-6.17 6.17 0 3.407 2.763 6.17 6.17 6.17 3.407 0 6.17-2.763 6.17-6.17 0-3.407-2.763-6.17-6.17-6.17m0 10.47c-2.375 0-4.302-1.927-4.302-4.302 0-2.375 1.927-4.302 4.302-4.302 2.375 0 4.302 1.927 4.302 4.302 0 2.375-1.927 4.302-4.302 4.302m7.852-10.42a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      href: "https://linkedin.com",
      label: "LinkedIn",
      icon: (
        <svg
          className="w-3.5 h-3.5 sm:w-4 sm:h-4 2xl:w-6 2xl:h-6 shrink-0"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      href: "mailto:hello@ethiorealestateawards.com",
      label: "Email",
      icon: (
        <svg
          className="w-3.5 h-3.5 sm:w-4 sm:h-4 2xl:w-6 2xl:h-6 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-primary/20 bg-[#110E08] pt-10 pb-10 sm:pt-14 2xl:pt-18 font-inter text-left">
      {/* top hairline gradient */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      {/* soft ambient glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <Container size="wide">
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 2xl:gap-10 border-b border-primary/10 pb-12 sm:pb-16 2xl:pb-20">
          {/* Column 1: Branding & Description (5 cols on md+) */}
          <div className="md:col-span-5 flex flex-col gap-4 2xl:gap-6">
            <Link
              href="/"
              className={cn(
                "font-display text-2xl sm:text-[32px] 2xl:text-[48px] font-bold",
                "text-primary leading-tight flex items-center gap-2 2xl:gap-3 w-fit",
              )}
            >
              ERA
              <span className="relative flex h-2.5 w-2.5 2xl:h-4 2xl:w-4">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-full w-full rounded-full bg-primary" />
              </span>
            </Link>
            <p className="text-xs sm:text-sm 2xl:text-xl text-foreground-muted leading-relaxed 2xl:leading-loose max-w-sm 2xl:max-w-md">
              {siteConfig.description}
            </p>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-[10px] 2xl:text-base uppercase tracking-widest font-semibold text-primary/90 mt-2">
              {siteConfig.tagline}
            </span>
          </div>

          {/* Columns 2 & 3 — always side by side (flex row at every breakpoint) */}
          <div className="md:col-span-7 flex flex-row gap-6 sm:gap-10">
            {/* Column 2: Navigation Links */}
            <div className="flex-1 flex flex-col gap-4 2xl:gap-6">
              <div className="flex flex-col gap-2">
                <h4 className="text-xs 2xl:text-base uppercase tracking-widest font-bold text-foreground">
                  Explore
                </h4>
                <span className="h-px w-6 bg-primary/60" />
              </div>
              <nav className="flex flex-col gap-2.5 2xl:gap-4">
                {siteConfig.nav.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-xs sm:text-sm 2xl:text-lg text-foreground-muted hover:text-primary hover:translate-x-0.5 transition-all duration-200 w-fit"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Column 3: Legal & Resources */}
            <div className="flex-1 flex flex-col gap-4 2xl:gap-6">
              <div className="flex flex-col gap-2">
                <h4 className="text-xs 2xl:text-base uppercase tracking-widest font-bold text-foreground">
                  Platform & Legal
                </h4>
                <span className="h-px w-10 bg-primary/60" />
              </div>
              <nav className="flex flex-col gap-2.5 2xl:gap-4">
                {siteConfig.footerLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-xs sm:text-sm 2xl:text-base text-foreground-muted hover:text-primary hover:translate-x-0.5 transition-all duration-200 w-fit"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom Footer Metadata Row */}
        <div className="mt-8 2xl:mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left: Copyright */}
          <p className="text-xs 2xl:text-base text-foreground-muted text-center sm:text-left leading-normal">
            &copy; {year} {siteConfig.fullName}. All rights reserved.
          </p>

          {/* Right: Social Icons + Back to top */}
          <div className="flex items-center gap-3 sm:gap-4 2xl:gap-5">
            {socialLinks.map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={cn(
                  "flex h-8 w-8 sm:h-9 sm:w-9 2xl:h-12 2xl:w-12 items-center justify-center rounded-full border border-primary/20",
                  "text-foreground-muted/80 bg-[#1a1712] hover:text-primary  hover:border-primary",
                  "transition-all duration-300 active:scale-95 shadow-sm cursor-pointer",
                )}
              >
                {icon}
              </a>
            ))}

            <span className="hidden sm:block h-6 w-px bg-primary/15 mx-1" />

            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className="flex h-8 w-8 sm:h-9 sm:w-9 2xl:h-12 2xl:w-12 items-center justify-center rounded-full border border-primary/20 bg-[#1a1712] text-foreground-muted/80 hover:text-primary hover:border-primary transition-all duration-300 active:scale-95 shadow-sm cursor-pointer"
            >
              <svg
                className="w-4 h-4 2xl:w-5 2xl:h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M12 19V5" />
                <path d="m5 12 7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
}

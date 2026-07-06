import Link from "next/link";
import { Globe, Share2, Mail } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { cn } from "@/utils/cn";

const SOCIAL_ICONS = [
  {
    href: siteConfig.social.website,
    src: "/icons/globe-footer.svg",
    label: "Website",
  },
  {
    href: siteConfig.social.share,
    src: "/icons/share.svg",
    label: "Share",
  },
  {
    href: siteConfig.social.email,
    src: "/icons/email.svg",
    label: "Email",
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#EBC1664D] bg-[#110E08] py-12 sm:py-16 2xl:py-24">
      <Container className="flex flex-col items-center text-center">
        <div
          className={cn(
            "font-display text-2xl sm:text-[32px] 2xl:text-[40px] font-semibold",
            "text-primary leading-10 2xl:leading-[48px] flex items-center gap-2 2xl:gap-3",
          )}
        >
          ERA{" "}
          <span className="w-4 h-4 2xl:w-6 2xl:h-6 rounded-full bg-primary"></span>
        </div>

        <nav className="mt-6 2xl:mt-10 flex flex-wrap items-center justify-center gap-x-8 2xl:gap-x-12 gap-y-3 2xl:gap-y-5">
          {siteConfig.footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[10px] sm:text-[11px] xl:text-[12px] 2xl:text-base text-[#D1C5B2]",
                "font-semibold leading-4 2xl:leading-6 tracking-[1.2px] 2xl:tracking-[1.6px]",
                "font-inter transition-colors hover:text-primary",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p
          className={cn(
            "mt-6 2xl:mt-10 max-w-md 2xl:max-w-xl text-[11px] sm:text-sm xl:text-base",
            "2xl:text-[20px] text-[#D1C5B2] font-inter leading-6 2xl:leading-8",
          )}
        >
          &copy; {year} {siteConfig.fullName}. {siteConfig.tagline}.
        </p>

        <div className="mt-6 2xl:mt-10 flex items-center gap-5 2xl:gap-8">
          {SOCIAL_ICONS.map(({ href, src, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className={cn(
                "flex h-10 w-10 2xl:h-14 2xl:w-14 items-center justify-center",
                "border border-[#EBC16633] transition-opacity hover:opacity-70",
              )}
            >
              <img src={src} alt="" className="w-5 h-5 2xl:w-7 2xl:h-7" />
            </a>
          ))}
        </div>
      </Container>
    </footer>
  );
}

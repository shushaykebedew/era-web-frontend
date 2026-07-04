import Link from "next/link";
import { Globe, Share2, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";

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
    <footer className="border-t border-[#EBC1664D] bg-[#110E08] py-16">
      <Container className="flex flex-col items-center text-center">
        <div className="font-display text-2xl sm:text-[32px] font-semibold text-primary leading-10 flex items-center gap-2">
          ERA <span className="w-4 h-4 rounded-full bg-primary"></span>
        </div>

        <nav className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {siteConfig.footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[10px] sm:text-[11px] xl:text-[12px] text-[#D1C5B2] font-semibold leading-4 tracking-[1.2px] font-inter transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="mt-6 max-w-md text-[11px] xl:text-base  text-[#D1C5B2] font-inter leading-6">
          &copy; {year} {siteConfig.fullName}. {siteConfig.tagline}.
        </p>

        <div className="mt-6 flex items-center gap-5">
          {SOCIAL_ICONS.map(({ href, src, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center border border-[#EBC16633] transition-opacity hover:opacity-70"
            >
              <img src={src} alt="" />
            </a>
          ))}
        </div>
      </Container>
    </footer>
  );
}

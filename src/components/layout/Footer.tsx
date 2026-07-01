import Link from "next/link";
import { Globe, Share2, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";

const SOCIAL_ICONS = [
  { icon: Globe, href: siteConfig.social.website, label: "Website" },
  { icon: Share2, href: siteConfig.social.share, label: "Share" },
  { icon: Mail, href: siteConfig.social.email, label: "Email" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#EBC1664D] bg-[#110E08] py-16">
      <Container className="flex flex-col items-center text-center">
        <div className="font-display text-[32px] font-semibold text-[#EBC166] leading-10 flex items-center gap-2">
          ERA <span className="w-4 h-4 rounded-full bg-[#EBC166]"></span>
        </div>

        <nav className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {siteConfig.footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[12px] text-[#D1C5B2] font-semibold leading-4 tracking-[1.2px] font-inter transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="mt-6 max-w-md text-base  text-[#D1C5B2] font-inter leading-6">
          &copy; {year} {siteConfig.fullName}. {siteConfig.tagline}.
        </p>

        <div className="mt-6 flex items-center gap-5">
          {SOCIAL_ICONS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="text-primary h-10 w-10 flex items-center justify-center transition-opacity hover:opacity-70 border border-[#EBC16633]"
            >
              <Icon className="h-5 w-5" strokeWidth={1.5} />
            </a>
          ))}
        </div>
      </Container>
    </footer>
  );
}

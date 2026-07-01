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
    <footer className="border-t border-border bg-background-muted py-16">
      <Container className="flex flex-col items-center text-center">
        <Link href="/" className="font-display text-3xl font-bold text-primary">
          {siteConfig.name}
        </Link>

        <nav className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {siteConfig.footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-foreground-muted transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="mt-6 max-w-md text-sm text-muted-foreground">
          &copy; {year} {siteConfig.fullName}. {siteConfig.tagline}. All rights reserved.
        </p>

        <div className="mt-6 flex items-center gap-5">
          {SOCIAL_ICONS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="text-primary transition-opacity hover:opacity-70"
            >
              <Icon className="h-5 w-5" strokeWidth={1.5} />
            </a>
          ))}
        </div>
      </Container>
    </footer>
  );
}

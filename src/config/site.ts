/**
 * Central, non-visual site configuration.
 * Keeping this separate from `data/` lets us change brand-level constants
 * (name, nav links, social, ceremony date) from one place without touching
 * component code.
 */

export type NavLink = {
  label: string;
  href: string;
};

export const siteConfig = {
  name: "ERA 2026",
  fullName: "Ethiopia Real Estate Awards",
  description:
    "The ultimate recognition for Ethiopian real estate visionaries and masters of design.",
  tagline: "Excellence in Architecture",
  ceremonyDate: "2026-09-12T18:00:00+03:00",
  voteCta: {
    label: "Vote Now",
    href: "/nominees",
  },
  nav: [
    { label: "The Awards", href: "/about" },
    { label: "Nominees", href: "/nominees" },
    { label: "Gallery", href: "/gallery" },
    { label: "Archives", href: "/archives" },
    { label: "Partners", href: "/partners" },
  ] satisfies NavLink[],
  footerLinks: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Excellence", href: "/terms" },
    { label: "Press Kit", href: "/press" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavLink[],
  social: {
    website: "https://example.com",
    share: "#",
    email: "mailto:hello@example.com",
  },
} as const;

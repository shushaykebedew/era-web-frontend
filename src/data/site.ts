import { NavLink } from "@/types/marketing";

export const siteConfig = {
  name: "ERA 2026",
  fullName: "Ethiopia Real Estate Awards",
  description:
    "The ultimate recognition for Ethiopian real estate visionaries and masters of design.",
  tagline: "Excellence in Architecture",
  ceremonyDate: "2026-09-12T18:00:00+03:00",
  nominateYear: "2026",
  contactEmail: "mailto:hello@example.com",
  voteCta: {
    label: "Vote Now",
    href: "/nominees",
  },
  nominateCta: {
    label: "Nominate for 2026",
    href: "/nominees",
  },
  nav: [
    { label: "Awards", href: "/awards" },
    { label: "Categories", href: "/categories" },
    { label: "Nominees", href: "/nominees" },
    { label: "Gallery", href: "/gallery" },
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
  socialIcons: [
    { href: "https://example.com", icon: "/icons/globe-footer.svg", label: "Website" },
    { href: "#",                   icon: "/icons/share.svg",        label: "Share" },
    { href: "mailto:hello@example.com", icon: "/icons/email.svg",   label: "Email" },
  ],
} as const;

import type { Metadata } from "next";
import { PartnersPageContent } from "@/features/partners/PartnersPageContent";

// Force server-render on every request so partner data is always live.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Partner with Ethiopia's Architectural Legacy. Explore sponsorship tiers and confirmed partners.",
};

export default function PartnersPage() {
  return <PartnersPageContent />;
}

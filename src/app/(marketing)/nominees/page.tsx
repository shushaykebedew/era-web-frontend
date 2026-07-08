import type { Metadata } from "next";
import { NomineesSection } from "@/features/nominees/NomineesSection";

export const metadata: Metadata = {
  title: "Nominees",
  description:
    "Browse every nominee competing across all Ethiopia Real Estate Awards categories.",
};

export default function NomineesPage() {
  return <NomineesSection />;
}

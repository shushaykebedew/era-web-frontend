"use client";

import { useState } from "react";
import { PartnersTierCards } from "./PartnersTierCards";
import { type TierId } from "@/types/partners";
import { SponsorshipForm } from "./SponsorshipForm";

export function PartnersPageClient({
  confirmedPartnersSlot,
}: {
  confirmedPartnersSlot: React.ReactNode;
}) {
  const [selectedTier, setSelectedTier] = useState<TierId | "">("");

  function handleSelectTier(id: TierId) {
    setSelectedTier(id);
    document
      .getElementById("sponsorship-form")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <PartnersTierCards onSelectTier={handleSelectTier} />
      {confirmedPartnersSlot}
      <SponsorshipForm selectedTier={selectedTier} />
    </>
  );
}

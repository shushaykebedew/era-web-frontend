"use client";

import { useState } from "react";
import { PartnersTierCards, type TierId } from "./PartnersTierCards";
import { ConfirmedPartners } from "./ConfirmedPartners";
import { SponsorshipForm } from "./SponsorshipForm";

/**
 * Thin client shell that coordinates the selected-tier state between
 * PartnersTierCards (which emits it) and SponsorshipForm (which consumes it).
 * Keeping this here means the page file stays a server component.
 */
export function PartnersPageClient() {
  const [selectedTier, setSelectedTier] = useState<TierId | "">("");

  function handleSelectTier(id: TierId) {
    setSelectedTier(id);
    document.getElementById("sponsorship-form")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <PartnersTierCards onSelectTier={handleSelectTier} />
      <ConfirmedPartners />
      <SponsorshipForm selectedTier={selectedTier} />
    </>
  );
}

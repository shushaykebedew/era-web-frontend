import { PartnersPageClient } from "@/features/partners/PartnersPageClient";
import { ConfirmedPartners } from "@/features/partners/ConfirmedPartners";
import { PageHeader } from "@/components/ui/PageHeader";

export function PartnersPageContent() {
  return (
    <>
      {/* ── Hero ── */}
      <PageHeader
        eyebrow="Strategic Industry Alignment"
        title="Partner with Ethiopia's Built Environment Legacy"
      // description="Align your brand with the nation's premier real estate honors. Connect with key industry leaders, elevate corporate prestige, and shape the future of urban transformation."
      />

      {/* ── Interactive sections (client) ── */}
      <PartnersPageClient confirmedPartnersSlot={<ConfirmedPartners />} />
    </>
  );
}
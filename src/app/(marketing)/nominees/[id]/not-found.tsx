import { NotFound } from "@/components/ui/NotFound";
import { NomineeDetailHeader } from "@/features/nominees/nominees-detail/NomineeDetailHeader";

export default function NomineeNotFound() {
  return (
    <div className="-mt-16 sm:-mt-20 2xl:-mt-28">
      <NomineeDetailHeader staticMode />
      <div className="pt-16 sm:pt-20 2xl:pt-28">
        <NotFound
          title="Nominee Not Found"
          description="The nominee you're looking for doesn't exist or has been removed. Browse all nominees below."
          primaryAction={{ label: "View All Nominees", href: "/nominees" }}
          secondaryAction={{ label: "Browse Categories", href: "/categories" }}
        />
      </div>
    </div>
  );
}

import { NotFound } from "@/components/ui/NotFound";

export default function AwardCategoryNotFound() {
  return (
    <NotFound
      title="Award Category Not Found"
      description="The award category you're looking for doesn't exist or has been removed. Browse all categories below."
      primaryAction={{ label: "View All Categories", href: "/categories" }}
      secondaryAction={{ label: "View Nominees", href: "/nominees" }}
    />
  );
}

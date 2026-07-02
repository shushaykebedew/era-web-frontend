import Link from "next/link";
import type { AwardCategory } from "@/types";
import { CategoryIcon } from "@/components/ui/CategoryIcon";

type CategoryCardProps = {
  category: AwardCategory;
  variant?: "compact" | "feature";
};

export function CategoryCard({
  category,
  variant = "compact",
}: CategoryCardProps) {
  const href = `/awards/${category.slug}`;

  if (variant === "feature") {
    return (
      <Link
        href={href}
        className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden bg-muted p-8 transition-transform duration-300 hover:-translate-y-1"
        style={
          category.coverImage
            ? {
                backgroundImage: `url(${category.coverImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="relative z-10">
          <p className="mb-2 text-[12px] font-inter font-semibold uppercase tracking-[1.2px] leading-4 text-[#EBC166]">
            {category.tagline}
          </p>
          <h3 className="font-display text-[32px] text-[#EAE1D7] font-semibold leading-10 tracking-0">
            {category.name}
          </h3>
          <span className="mt-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-[1px] text-[#EAE1D7B2] leading-[15px]">
            See Nominees
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group flex flex-col min-h-100 justify-between bg-[#16161A] hover:bg-[#252529] p-8 border border-[#252529] transition-colors duration-300"
    >
      <div>
        <CategoryIcon icon={category.icon} className="h-8 w-8 text-primary" />
        <p className="mt-12 font-inter  mb-2 text-[12px] font-semibold uppercase tracking-[1.2px] leading-4 text-[#EBC166]">
          {category.tagline}
        </p>
        <h3 className="mt-2 font-display text-[32px] font-bold leading-10 text-[#EAE1D7]">
          {category.name}
        </h3>
        <p className="mt-3 text-base font-inter leading-6 text-[#D1C5B2]">
          {category.description}
        </p>
      </div>

      <span className="mt-8 inline-flex items-center gap-2 text-[12px] font-inter font-semibold tracking-[1.2px] text-[#EBC166]">
        View Nominees
        <img
          src="/icons/forward-arrow.svg"
          className="h-2.5 w-2.5 transition-transform duration-200 group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}

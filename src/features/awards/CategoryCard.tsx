import Link from "next/link";
import type { AwardCategory } from "@/types";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { cn } from "@/utils/cn";

type CategoryCardProps = {
  category: AwardCategory;
  variant?: "compact" | "feature";
};

export function CategoryCard({
  category,
  variant = "compact",
}: CategoryCardProps) {
  const href = `/categories/${category.slug}`;

  if (variant === "feature") {
    return (
      <Link
        href={href}
        className={cn(
          "group relative flex min-h-50 sm:min-h-60 lg:min-h-65",
          "2xl:min-h-80 flex-col justify-end overflow-hidden bg-muted p-5",
          "sm:p-6 lg:p-8 transition-transform duration-300 hover:-translate-y-1",
        )}
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
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
        <div className="relative z-10">
          <p
            className={cn(
              "mb-2 2xl:mb-4 text-[12px] 2xl:text-[16px] font-inter font-semibold uppercase",
              "tracking-[1.2px] 2xl:tracking-[1.6px] leading-4 2xl:leading-6 text-primary",
            )}
          >
            {category.tagline}
          </p>
          <h3
            className={cn(
              "font-display text-2xl sm:text-[32px] 2xl:text-[40px] text-foreground",
              "font-semibold leading-tight sm:leading-10 2xl:leading-12",
            )}
          >
            {category.name}
          </h3>
          <span
            className={cn(
              "mt-4 2xl:mt-6 inline-flex items-center gap-2 2xl:gap-3 text-[10px] 2xl:text-[14px]",
              "uppercase tracking-[1px] 2xl:tracking-[1.5px] text-foreground/70",
              "leading-3.75 2xl:leading-5 hover:text-primary",
            )}
          >
            See Nominees
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col min-h-70 lg:min-h-90 xl:min-h-100 2xl:min-h-120",
        "justify-between bg-[#16161A] hover:bg-[#252529] p-5 sm:p-6 lg:p-8 2xl:p-10",
        "border border-[#252529] transition-colors duration-300",
      )}
    >
      <div>
        <CategoryIcon
          icon={category.icon}
          className="h-6 w-6 xl:h-8 xl:w-8 2xl:h-12 2xl:w-12 text-primary"
        />
        <p
          className={cn(
            "mt-12 2xl:mt-16 font-inter mb-2 2xl:mb-4 text-[12px] 2xl:text-[16px] font-semibold",
            "uppercase tracking-[1.2px] 2xl:tracking-[1.6px] leading-4 2xl:leading-6 text-primary",
          )}
        >
          {category.tagline}
        </p>
        <h3
          className={cn(
            "mt-2 font-display text-2xl sm:text-[32px] 2xl:text-[40px] font-bold",
            "leading-tight sm:leading-10 2xl:leading-12 text-foreground",
          )}
        >
          {category.name}
        </h3>
        <p className="mt-3 text-base 2xl:text-[20px] font-inter leading-6 2xl:leading-8 text-foreground-muted">
          {category.description}
        </p>
      </div>

      <span
        className={cn(
          "mt-8 2xl:mt-12 inline-flex items-center gap-2 2xl:gap-3 text-[12px] 2xl:text-[16px]",
          "font-inter font-semibold tracking-[1.2px] 2xl:tracking-[1.6px] text-primary",
        )}
      >
        View Nominees
        <img
          src="/icons/forward-arrow.svg"
          className="h-2.5 w-2.5 2xl:w-4 2xl:h-4 transition-transform duration-200 group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}

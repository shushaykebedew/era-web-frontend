import { cn } from "@/utils/cn";
import { Eyebrow } from "./Eyebrow";
import { SectionHeadingProps } from "@/types/ui";

/** Standard eyebrow + heading + description block reused across sections. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {eyebrow && (
        <Eyebrow
          align={align}
          className={cn(
            align === "center" && "mb-4 justify-center",
            align === "left" && "mb-4",
          )}
        >
          {eyebrow}
        </Eyebrow>
      )}
      <h2
        className={cn(
          "font-display font-bold text-3xl sm:text-4xl lg:text-[48px] 2xl:text-[64px] leading-tight",
          "lg:leading-12 xl:leading-14 2xl:leading-20 text-foreground",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 w-full max-w-md lg:max-w-md 2xl:max-w-150 text-sm",
            "sm:text-base 2xl:text-[20px] text-foreground-muted",
            "leading-6 2xl:leading-8 font-inter",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

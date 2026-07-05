import { cn } from "@/utils/cn";
import { Eyebrow } from "./Eyebrow";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

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
      <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-[48px] leading-tight lg:leading-12 xl:leading-[56px] tracking-0 text-foreground">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 w-full max-w-md lg:max-w-[448px] text-sm sm:text-base text-foreground-muted tracking-0 leading-6 font-inter",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

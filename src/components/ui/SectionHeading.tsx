import { cn } from "@/lib/cn";
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
      <h2 className="font-display text-4xl font-semibold leading-[56px] tracking-0 sm:text-[48px] text-[#EAE1D7]">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-[448] text-base text-[#D1C5B2] tracking-0 leading-6 font-inter",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

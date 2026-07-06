import { Container } from "@/components/ui/Container";
import { Countdown } from "@/components/ui/Countdown";
import { siteConfig } from "@/data/site";
import { cn } from "@/utils/cn";

function TimeCounter() {
  return (
    <div
      className={cn(
        "relative z-10 min-h-[180px] sm:min-h-[220px] xl:min-h-[266px] 2xl:min-h-[340px]",
        "border-y border-[#EBC1661A] bg-[#110E08] flex items-center py-10 sm:py-12 xl:py-0",
      )}
    >
      <Container className="text-center">
        <h3
          className={cn(
            "mb-8 2xl:mb-12 font-inter font-semibold",
            "text-[12px] xl:text-base 2xl:text-[24px] leading-4 2xl:leading-6",
            "tracking-[1.2px] 2xl:tracking-[1.6px] uppercase mx-auto text-primary",
          )}
        >
          GALA CEREMONY BEGINS IN
        </h3>
        <Countdown targetDate={siteConfig.ceremonyDate} />
      </Container>
    </div>
  );
}

export default TimeCounter;

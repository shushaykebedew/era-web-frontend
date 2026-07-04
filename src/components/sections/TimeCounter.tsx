import { Container } from "../ui/Container";
import { Countdown } from "../ui/Countdown";
import { siteConfig } from "@/config/site";

function TimeCounter() {
  return (
    <div className="relative z-10 min-h-[180px] sm:min-h-[220px] xl:min-h-[266px] border-y border-[#EBC1661A] bg-[#110E08] flex items-center py-10 sm:py-12 xl:py-0">
      <Container className="text-center">
        <h3 className="mb-8 font-inter font-semibold text-[12px] xl:text-base leading-4 tracking-[1.2px] uppercase mx-auto text-primary">
          GALA CEREMONY BEGINS IN
        </h3>
        <Countdown targetDate={siteConfig.ceremonyDate} />
      </Container>
    </div>
  );
}

export default TimeCounter;

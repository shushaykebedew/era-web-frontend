import { Container } from "../ui/Container";
import { Countdown } from "../ui/Countdown";
import { siteConfig } from "@/config/site";

function TimeCounter() {
  return (
    <div className="relative z-10 h-[266px] border-y border-[#EBC1661A] bg-[#110E08] flex items-center">
      <Container className="text-center">
        <Countdown targetDate={siteConfig.ceremonyDate} />
      </Container>
    </div>
  );
}

export default TimeCounter;

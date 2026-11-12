import { HeroSection } from "@/components/sections/HeroSection";
import { HumanVisualSection } from "@/components/sections/HumanVisualSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ServicesOverviewSection } from "@/components/sections/ServicesOverviewSection";
import { WhySection } from "@/components/sections/WhySection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <HumanVisualSection />
      <PortfolioSection />
      <ServicesOverviewSection />
      <WhySection />
      <ProcessSection />
      <AboutSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}

import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { WhyUs } from "@/components/sections/WhyUs";
import { IndustryGrid } from "@/components/sections/IndustryGrid";
import { StartupJourneySection } from "@/components/sections/StartupJourneySection";
import { RetainerBand } from "@/components/sections/RetainerBand";
import { ApproachSection } from "@/components/sections/ApproachSection";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { ConsultationBand } from "@/components/sections/ConsultationBand";
import { usePageMeta } from "@/hooks/usePageMeta";
import { hero } from "@/content/homepage";
import { site } from "@/content/site";

/**
 * Homepage — follows the one-line blueprint from the brief:
 * Header → Hero → Trust Strip → What We Do → Why VidhiSetu → Industry Expertise
 * → Startup Legal Journey → Legal Retainer → Our Approach → Blog
 * → Consultation CTA → Footer
 */
export default function HomePage() {
  usePageMeta({ title: `${site.name} — ${site.tagline}`, description: hero.supporting });

  return (
    <>
      <Hero />
      <TrustStrip />
      <WhatWeDo />
      <WhyUs />
      <IndustryGrid />
      <StartupJourneySection />
      <RetainerBand />
      <ApproachSection />
      <BlogPreview />
      <ConsultationBand />
    </>
  );
}

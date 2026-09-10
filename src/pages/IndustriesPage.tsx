import { PageHero } from "@/components/common/PageHero";
import { IndustryGrid } from "@/components/sections/IndustryGrid";
import { ConsultationBand } from "@/components/sections/ConsultationBand";
import { usePageMeta } from "@/hooks/usePageMeta";
import { site } from "@/content/site";

export default function IndustriesPage() {
  usePageMeta({
    title: `Industries — ${site.name}`,
    description:
      "Legal counsel for startups, MSMEs, education, F&B, SaaS, e-commerce, healthcare, real estate and hospitality.",
  });

  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Legal Counsel Built Around Your Industry."
        lead="Sector context changes the advice. Each of these practices has its own regulatory shape, contracting norms and failure modes — and we advise against that reality rather than in the abstract."
        crumbs={[{ label: "Home", href: "/" }, { label: "Industries" }]}
      />
      <IndustryGrid showCta={false} />
      <ConsultationBand />
    </>
  );
}

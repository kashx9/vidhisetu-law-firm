import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/common/PageHero";
import { Section, SectionHeading } from "@/components/common/Section";
import { Reveal } from "@/components/common/Reveal";
import { ConsultationBand } from "@/components/sections/ConsultationBand";
import { usePageMeta } from "@/hooks/usePageMeta";
import { startupJourney } from "@/content/startupJourney";
import { getIndustry } from "@/content/industries";
import { site } from "@/content/site";

export default function StartupLegalPage() {
  const startups = getIndustry("startups");

  usePageMeta({
    title: `Startup Legal Services — ${site.name}`,
    description:
      "From incorporation to investment — incorporation, structuring, founder documentation, contracts, IP, compliance, fundraising and due diligence.",
  });

  return (
    <>
      <PageHero
        eyebrow="Startup Legal"
        title="From Incorporation to Investment — We Build the Legal Foundation."
        lead="A single, continuous engagement across the nine stages where early-stage companies most often accumulate legal debt."
        crumbs={[{ label: "Home", href: "/" }, { label: "Startup Legal Services" }]}
      >
        <Button asChild variant="accent" size="lg">
          <Link to="/contact?topic=startup-investment">
            {site.cta.primary.label}
            <ArrowRight aria-hidden />
          </Link>
        </Button>
      </PageHero>

      <Section>
        <SectionHeading
          eyebrow="The Journey"
          headline="Nine Stages, One Continuous Engagement."
          supporting="Each stage builds on the last. Skipping one usually means paying for it later, at investor timelines rather than your own."
        />

        <ol className="mt-14 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
          {startupJourney.map((stage, index) => (
            <Reveal
              as="li"
              key={stage.step}
              delay={index * 35}
              className="flex h-full flex-col bg-background p-8"
            >
              <span className="font-display text-3xl text-accent/35">{stage.step}</span>
              <h3 className="mt-4 font-display text-xl text-primary">{stage.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{stage.summary}</p>
              <ul className="mt-6 space-y-2 border-t border-border pt-5">
                {stage.includes.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-xs leading-relaxed text-muted-foreground/85"
                  >
                    <span aria-hidden className="mt-1.5 h-px w-3 shrink-0 bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </Section>

      {startups ? (
        <Section tone="sand">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionHeading eyebrow="Common Findings" headline="What We See Most Often." />
              <ul className="mt-8 space-y-4">
                {startups.risks.map((risk) => (
                  <li
                    key={risk}
                    className="border-b border-border pb-4 text-[0.9375rem] leading-relaxed text-foreground/85"
                  >
                    {risk}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading eyebrow="Scope" headline="What Founders Engage Us For." />
              <ul className="mt-8 space-y-4">
                {startups.needs.map((need) => (
                  <li
                    key={need}
                    className="border-b border-border pb-4 text-[0.9375rem] leading-relaxed text-foreground/85"
                  >
                    {need}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      ) : null}

      <ConsultationBand />
    </>
  );
}

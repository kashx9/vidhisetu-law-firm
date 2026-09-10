import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/common/PageHero";
import { Section, SectionHeading } from "@/components/common/Section";
import { Reveal } from "@/components/common/Reveal";
import { usePageMeta } from "@/hooks/usePageMeta";
import { practiceAreas } from "@/content/practiceAreas";
import { retainerInclusions } from "@/content/retainers";
import { getIcon } from "@/lib/icons";
import { site } from "@/content/site";

export default function PracticeAreasPage() {
  usePageMeta({
    title: `Practice Areas — ${site.name}`,
    description:
      "Corporate and commercial, contracts, startup and investment, IP, compliance, employment, disputes and legal due diligence.",
  });

  return (
    <>
      <PageHero
        eyebrow="Practice Areas"
        title="Legal Advice That Moves With Your Business."
        lead="Eight practice areas, one standard of advice: commercially aware, plainly explained and built to be acted on."
        crumbs={[{ label: "Home", href: "/" }, { label: "Practice Areas" }]}
      />

      <Section>
        <div className="grid gap-px bg-border md:grid-cols-2">
          {practiceAreas.map((area, index) => {
            const Icon = getIcon(area.icon);
            return (
              <Reveal key={area.slug} delay={index * 35}>
                <Link
                  to={`/practice-areas/${area.slug}`}
                  className="group flex h-full flex-col bg-background p-8 transition-colors hover:bg-card md:p-10"
                >
                  <div className="flex items-start justify-between gap-6">
                    <Icon aria-hidden className="h-7 w-7 text-accent" strokeWidth={1.25} />
                    <ArrowUpRight
                      aria-hidden
                      className="h-4 w-4 text-muted-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                    />
                  </div>
                  <h2 className="mt-6 font-display text-2xl leading-snug text-primary">
                    {area.headline}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {area.summary}
                  </p>
                  <ul className="mt-6 space-y-1.5 border-t border-border pt-5">
                    {area.services.slice(0, 3).map((service) => (
                      <li
                        key={service}
                        className="text-xs leading-relaxed text-muted-foreground/80"
                      >
                        — {service}
                      </li>
                    ))}
                  </ul>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section tone="ink">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            eyebrow="Legal Retainers"
            headline="Or Engage Us Continuously, Across All Eight."
            supporting="A retainer gives you access to every practice area under one arrangement, with predictable cost and a team that already knows your business."
            tone="dark"
          />
          <div>
            <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {retainerInclusions.map((item) => (
                <li
                  key={item}
                  className="border-t border-primary-foreground/15 pt-3 text-sm text-primary-foreground/75"
                >
                  {item}
                </li>
              ))}
            </ul>
            <Button asChild variant="accent" size="lg" className="mt-10">
              <Link to="/legal-retainers">
                Explore Legal Retainers
                <ArrowRight aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/common/Section";
import { Reveal } from "@/components/common/Reveal";
import { industries } from "@/content/industries";
import { sections } from "@/content/homepage";
import { getIcon } from "@/lib/icons";
import { useSpotlight } from "@/components/motion/useSpotlight";

/**
 * Section 06 — Industry Expertise.
 * Each card leads to a dedicated industry page, as the brief specifies.
 */
export function IndustryGrid({ showCta = true }: { showCta?: boolean }) {
  const { industries: copy } = sections;
  const grid = useSpotlight<HTMLDivElement>();

  return (
    <Section tone="sand">
      <SectionHeading
        eyebrow={copy.eyebrow}
        headline={copy.headline}
        supporting={copy.supporting}
      />

      <div ref={grid} className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry, index) => {
          const Icon = getIcon(industry.icon);
          return (
            <Reveal key={industry.slug} delay={(index % 3) * 80} className="h-full">
              <Link
                to={`/industries/${industry.slug}`}
                className="spotlight group flex h-full flex-col bg-background p-7 transition-colors duration-300 hover:bg-card focus-visible:bg-card"
              >
                <div className="flex items-start justify-between gap-4">
                  <Icon
                    aria-hidden
                    className="h-6 w-6 text-accent transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-6 group-focus-visible:-rotate-6"
                    strokeWidth={1.25}
                  />
                  <ArrowUpRight
                    aria-hidden
                    className="h-4 w-4 text-muted-foreground/40 transition-[transform,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent group-focus-visible:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:text-accent"
                  />
                </div>
                <h3 className="mt-6 font-display text-xl leading-snug text-primary">
                  {industry.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {industry.summary}
                </p>
              </Link>
            </Reveal>
          );
        })}
      </div>

      {showCta ? (
        <div className="mt-12">
          <Button asChild variant="outline" size="lg">
            <Link to={copy.cta.href}>
              {copy.cta.label}
              <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>
      ) : null}
    </Section>
  );
}

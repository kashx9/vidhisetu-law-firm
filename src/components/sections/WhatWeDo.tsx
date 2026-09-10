import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/common/Section";
import { Reveal } from "@/components/common/Reveal";
import { featuredPracticeAreas } from "@/content/practiceAreas";
import { sections } from "@/content/homepage";
import { getIcon } from "@/lib/icons";

/** Section 04 — What We Do. Eight practice areas in a hairline grid. */
export function WhatWeDo() {
  const areas = featuredPracticeAreas();
  const { whatWeDo } = sections;

  return (
    <Section id="what-we-do">
      <SectionHeading
        eyebrow={whatWeDo.eyebrow}
        headline={whatWeDo.headline}
        supporting={whatWeDo.supporting}
      />

      <div className="mt-14 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">
        {areas.map((area, index) => {
          const Icon = getIcon(area.icon);
          return (
            <Reveal key={area.slug} delay={index * 40}>
              <Link
                to={`/practice-areas/${area.slug}`}
                className="group flex h-full flex-col border-b border-r border-border bg-card p-7 transition-colors hover:bg-secondary/40"
              >
                <Icon aria-hidden className="h-6 w-6 text-accent" strokeWidth={1.25} />
                <h3 className="mt-6 font-display text-xl leading-snug text-primary">
                  {area.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {area.summary}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-[0.75rem] uppercase tracking-eyebrow text-accent">
                  Read more
                  <ArrowUpRight
                    aria-hidden
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-12">
        <Button asChild variant="outline" size="lg">
          <Link to={whatWeDo.cta.href}>
            {whatWeDo.cta.label}
            <ArrowRight aria-hidden />
          </Link>
        </Button>
      </div>
    </Section>
  );
}

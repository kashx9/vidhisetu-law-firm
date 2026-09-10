import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/common/Section";
import { Reveal } from "@/components/common/Reveal";
import { startupJourney } from "@/content/startupJourney";
import { sections } from "@/content/homepage";

/**
 * Section 07 — Featured Startup Legal Section.
 * The nine stages read as a single continuous track rather than nine services.
 */
export function StartupJourneySection() {
  const { startup } = sections;

  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow={startup.eyebrow}
            headline={startup.headline}
            supporting={startup.supporting}
          />
          <Button asChild size="lg" className="mt-9">
            <Link to={startup.cta.href}>
              {startup.cta.label}
              <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>

        <ol className="relative border-l border-border pl-8">
          {startupJourney.map((stage, index) => (
            <Reveal
              as="li"
              key={stage.step}
              delay={index * 30}
              className="relative block pb-8 last:pb-0"
            >
              <span
                aria-hidden
                className="absolute -left-[2.125rem] top-1.5 h-2 w-2 rounded-full border border-accent bg-background"
              />
              <div className="flex items-baseline gap-4">
                <span className="font-display text-sm text-accent">{stage.step}</span>
                <h3 className="font-display text-xl text-primary">{stage.title}</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{stage.summary}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}

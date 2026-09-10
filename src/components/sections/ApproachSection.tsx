import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/common/Section";
import { Reveal } from "@/components/common/Reveal";
import { approachSteps } from "@/content/approach";
import { sections } from "@/content/homepage";

/** Section 09 — Our Approach. Understand → Assess → Advise → Execute → Support. */
export function ApproachSection({ showCta = true }: { showCta?: boolean }) {
  const { approach } = sections;

  return (
    <Section tone="sand">
      <SectionHeading
        eyebrow={approach.eyebrow}
        headline={approach.headline}
        supporting={approach.supporting}
      />

      <ol className="mt-14 grid gap-px bg-border md:grid-cols-3 lg:grid-cols-5">
        {approachSteps.map((step, index) => (
          <Reveal
            as="li"
            key={step.number}
            delay={index * 45}
            className="flex h-full flex-col bg-background p-7"
          >
            <span className="font-display text-4xl text-accent/35">{step.number}</span>
            <h3 className="mt-5 font-display text-xl text-primary">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.summary}</p>
          </Reveal>
        ))}
      </ol>

      {showCta ? (
        <div className="mt-12">
          <Button asChild variant="outline" size="lg">
            <Link to={approach.cta.href}>
              {approach.cta.label}
              <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>
      ) : null}
    </Section>
  );
}

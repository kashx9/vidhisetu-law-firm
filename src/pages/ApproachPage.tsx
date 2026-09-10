import { PageHero } from "@/components/common/PageHero";
import { Section, SectionHeading } from "@/components/common/Section";
import { Reveal } from "@/components/common/Reveal";
import { ConsultationBand } from "@/components/sections/ConsultationBand";
import { usePageMeta } from "@/hooks/usePageMeta";
import { approachSteps, approachPrinciples } from "@/content/approach";
import { site } from "@/content/site";

export default function ApproachPage() {
  usePageMeta({
    title: `Our Approach — ${site.name}`,
    description: "Understand → Assess → Advise → Execute → Support.",
  });

  return (
    <>
      <PageHero
        eyebrow="Our Approach"
        title="A Clear, Practical Approach to Legal Problems."
        lead="Understand → Assess → Advise → Execute → Support. The same five steps on every matter, whether it is a single contract review or a multi-year advisory relationship."
        crumbs={[{ label: "Home", href: "/" }, { label: "Our Approach" }]}
      />

      <Section>
        <ol className="space-y-px bg-border">
          {approachSteps.map((step, index) => (
            <Reveal
              as="li"
              key={step.number}
              delay={index * 40}
              className="grid gap-6 bg-background py-10 md:grid-cols-[6rem_1fr_1.4fr] md:gap-10 md:py-12"
            >
              <span className="font-display text-5xl leading-none text-accent/35">
                {step.number}
              </span>
              <div>
                <h2 className="font-display text-2xl text-primary">{step.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-accent">{step.summary}</p>
              </div>
              <p className="text-[1.0625rem] leading-relaxed text-muted-foreground">
                {step.detail}
              </p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section tone="sand">
        <SectionHeading eyebrow="Principles" headline="What Sits Underneath the Method." />
        <div className="mt-14 grid gap-px bg-border md:grid-cols-3">
          {approachPrinciples.map((principle, index) => (
            <Reveal key={principle.title} delay={index * 50}>
              <div className="h-full bg-background p-8">
                <h3 className="font-display text-xl text-primary">{principle.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {principle.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <ConsultationBand />
    </>
  );
}

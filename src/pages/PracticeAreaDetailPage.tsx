import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageHero } from "@/components/common/PageHero";
import { Section, SectionHeading } from "@/components/common/Section";
import { Reveal } from "@/components/common/Reveal";
import { InsightCard } from "@/components/common/InsightCard";
import { usePageMeta } from "@/hooks/usePageMeta";
import { getPracticeArea, practiceAreas } from "@/content/practiceAreas";
import { getIndustry } from "@/content/industries";
import { approachSteps } from "@/content/approach";
import { site } from "@/content/site";
import { useInsights } from "@/features/blog/useInsights";
import { getIcon } from "@/lib/icons";

export default function PracticeAreaDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const area = slug ? getPracticeArea(slug) : undefined;
  const { insights } = useInsights();

  usePageMeta({
    title: area ? `${area.headline} — ${site.name}` : site.name,
    description: area?.summary,
  });

  if (!area) return <Navigate to="/practice-areas" replace />;

  const related = insights.filter((post) => post.practiceArea === area.slug).slice(0, 3);
  const others = practiceAreas.filter((item) => item.slug !== area.slug).slice(0, 4);

  return (
    <>
      <PageHero
        eyebrow="Practice Area"
        title={area.headline}
        lead={area.intro}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Practice Areas", href: "/practice-areas" },
          { label: area.title },
        ]}
      >
        <Button asChild variant="accent" size="lg">
          <Link to={`/contact?topic=${area.slug}`}>
            {site.cta.primary.label}
            <ArrowRight aria-hidden />
          </Link>
        </Button>
      </PageHero>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow="Scope" headline="What This Covers." />
            <ul className="mt-8 space-y-4">
              {area.services.map((service) => (
                <li key={service} className="flex items-start gap-3 border-b border-border pb-4">
                  <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-accent" />
                  <span className="text-[0.9375rem] leading-relaxed text-foreground/85">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:pt-2">
            <div className="border border-border bg-card p-8">
              <h3 className="eyebrow text-accent">Typical Situations</h3>
              <ul className="mt-6 space-y-4">
                {area.situations.map((situation) => (
                  <li key={situation} className="text-sm leading-relaxed text-muted-foreground">
                    “{situation}”
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 border border-border bg-secondary/40 p-8">
              <h3 className="eyebrow text-accent">What You Receive</h3>
              <ul className="mt-6 space-y-3">
                {area.deliverables.map((deliverable) => (
                  <li
                    key={deliverable}
                    className="flex gap-3 text-sm leading-relaxed text-foreground/80"
                  >
                    <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-accent" />
                    {deliverable}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="sand">
        <SectionHeading eyebrow="How We Work On It" headline="The Same Five Steps, Every Matter." />
        <ol className="mt-12 grid gap-px bg-border md:grid-cols-3 lg:grid-cols-5">
          {approachSteps.map((step) => (
            <li key={step.number} className="bg-background p-6">
              <span className="font-display text-3xl text-accent/35">{step.number}</span>
              <h3 className="mt-4 font-display text-lg text-primary">{step.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{step.summary}</p>
            </li>
          ))}
        </ol>
      </Section>

      {area.relatedIndustries.length ? (
        <Section>
          <SectionHeading
            eyebrow="Sector Context"
            headline="Where This Comes Up Most."
            supporting="The advice changes with the operating reality. These sectors raise this practice area most often."
          />
          <div className="mt-12 grid gap-px bg-border sm:grid-cols-3">
            {area.relatedIndustries.map((industrySlug) => {
              const industry = getIndustry(industrySlug);
              if (!industry) return null;
              const Icon = getIcon(industry.icon);
              return (
                <Link
                  key={industrySlug}
                  to={`/industries/${industrySlug}`}
                  className="group bg-background p-7 transition-colors hover:bg-card"
                >
                  <Icon aria-hidden className="h-6 w-6 text-accent" strokeWidth={1.25} />
                  <h3 className="mt-5 font-display text-lg text-primary group-hover:text-accent">
                    {industry.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {industry.summary}
                  </p>
                </Link>
              );
            })}
          </div>
        </Section>
      ) : null}

      {area.faqs.length ? (
        <Section tone="sand">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionHeading eyebrow="Questions" headline="What Clients Ask Us." />
            <Accordion type="single" collapsible className="border-t border-border">
              {area.faqs.map((faq) => (
                <AccordionItem key={faq.question} value={faq.question}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Section>
      ) : null}

      {related.length ? (
        <Section>
          <SectionHeading eyebrow="Insights" headline="Further Reading." />
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {related.map((insight, index) => (
              <Reveal key={insight.id} delay={index * 50}>
                <InsightCard insight={insight} />
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}

      <Section tone="ink">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-end lg:gap-20">
          <SectionHeading
            eyebrow="Next Step"
            headline={`Speak to us about ${area.title.toLowerCase()}.`}
            supporting={site.contact.responsePromise}
            tone="dark"
          />
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Button asChild variant="accent" size="lg">
              <Link to={`/contact?topic=${area.slug}`}>{site.cta.primary.label}</Link>
            </Button>
            <Button asChild variant="onDark" size="lg">
              <a href={`tel:${site.contact.phoneHref}`}>Call {site.contact.phone}</a>
            </Button>
          </div>
        </div>

        <div className="mt-16 border-t border-primary-foreground/15 pt-10">
          <p className="eyebrow text-accent">Other Practice Areas</p>
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  to={`/practice-areas/${other.slug}`}
                  className="text-sm text-primary-foreground/65 transition-colors hover:text-accent"
                >
                  {other.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}

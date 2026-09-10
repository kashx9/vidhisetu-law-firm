import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageHero } from "@/components/common/PageHero";
import { Section, SectionHeading } from "@/components/common/Section";
import { Reveal } from "@/components/common/Reveal";
import { usePageMeta } from "@/hooks/usePageMeta";
import { retainerPlans, retainerInclusions, retainerFaqs, showPricing } from "@/content/retainers";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export default function RetainersPage() {
  usePageMeta({
    title: `Legal Retainers — ${site.name}`,
    description:
      "Ongoing legal advisory for businesses that want continuous access to legal advice and proactive risk management.",
  });

  return (
    <>
      <PageHero
        eyebrow="Legal Retainers"
        title="Your Business Doesn't Need a Lawyer Only When Something Goes Wrong."
        lead="A retainer makes legal advice continuous rather than reactive — an ongoing legal partnership for businesses that want proactive risk management and predictable cost."
        crumbs={[{ label: "Home", href: "/" }, { label: "Legal Retainers" }]}
      >
        <Button asChild variant="accent" size="lg">
          <Link to="/contact?topic=legal-retainer">
            Discuss a Retainer
            <ArrowRight aria-hidden />
          </Link>
        </Button>
      </PageHero>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHeading
            eyebrow="What's Included"
            headline="Legal Support That Is Always On."
            supporting="Every retainer covers the recurring legal work a business generates simply by operating."
          />
          <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {retainerInclusions.map((item) => (
              <li key={item} className="flex items-start gap-3 border-t border-border pt-4">
                <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span className="text-sm leading-relaxed text-foreground/85">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="sand">
        <SectionHeading
          eyebrow="Retainer Options"
          headline="Three Levels of Engagement."
          supporting="Scope, not seniority, is what changes between them. The same team handles every level."
        />

        <div className="mt-14 grid gap-px bg-border lg:grid-cols-3">
          {retainerPlans.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 60}>
              <div
                className={cn(
                  "flex h-full flex-col p-8",
                  plan.highlighted ? "bg-primary text-primary-foreground" : "bg-background",
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3
                    className={cn(
                      "font-display text-2xl",
                      plan.highlighted && "text-primary-foreground",
                    )}
                  >
                    {plan.name}
                  </h3>
                  {plan.highlighted ? <Badge variant="accent">Most chosen</Badge> : null}
                </div>

                <p
                  className={cn(
                    "mt-3 text-sm leading-relaxed",
                    plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground",
                  )}
                >
                  {plan.positioning}
                </p>

                <p
                  className={cn(
                    "mt-6 border-t pt-4 text-xs uppercase tracking-eyebrow",
                    plan.highlighted
                      ? "border-primary-foreground/20 text-accent"
                      : "border-border text-accent",
                  )}
                >
                  {plan.bestFor}
                </p>

                {showPricing ? (
                  <p
                    className={cn(
                      "mt-4 font-display text-xl",
                      plan.highlighted ? "text-primary-foreground" : "text-primary",
                    )}
                  >
                    {plan.indicativeFee}
                  </p>
                ) : null}

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                      <span
                        className={cn(
                          "text-sm leading-relaxed",
                          plan.highlighted ? "text-primary-foreground/80" : "text-muted-foreground",
                        )}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  variant={plan.highlighted ? "accent" : "outline"}
                  className="mt-8 w-full"
                >
                  <Link to="/contact?topic=legal-retainer">Discuss {plan.name}</Link>
                </Button>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-xs leading-relaxed text-muted-foreground">
          Retainer scope and fees are agreed in writing before any engagement begins. Litigation,
          transactions and due diligence are typically scoped separately and quoted in advance.
        </p>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading eyebrow="Questions" headline="Before You Commit." />
          <Accordion type="single" collapsible className="border-t border-border">
            {retainerFaqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>
    </>
  );
}

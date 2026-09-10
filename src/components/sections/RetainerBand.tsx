import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/common/Section";
import { retainerInclusions } from "@/content/retainers";
import { sections } from "@/content/homepage";

/** Section 08 — Legal Retainer / Ongoing Advisory. */
export function RetainerBand() {
  const { retainer } = sections;

  return (
    <Section tone="ink">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            eyebrow={retainer.eyebrow}
            headline={retainer.headline}
            supporting={retainer.supporting}
            tone="dark"
          />
          <Button asChild variant="accent" size="lg" className="mt-9">
            <Link to={retainer.cta.href}>
              {retainer.cta.label}
              <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>

        <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:mt-2">
          {retainerInclusions.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 border-t border-primary-foreground/15 pt-4"
            >
              <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span className="text-sm leading-relaxed text-primary-foreground/80">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/common/Section";
import { retainerInclusions } from "@/content/retainers";
import { sections } from "@/content/homepage";
import { dur, ease, enterFrom, gsap, onEnter, stagger, useMotion } from "@/lib/motion";

/** Section 08 — Legal Retainer / Ongoing Advisory. */
export function RetainerBand() {
  const { retainer } = sections;

  // The CTA takes the standard enter; the inclusions follow one by one, each
  // tick scaling in as its line arrives.
  const ref = useMotion<HTMLElement>((scope) => {
    gsap.from("[data-retainer='cta']", { ...enterFrom, delay: 0.5, scrollTrigger: onEnter(scope) });
    const tl = gsap.timeline({ scrollTrigger: onEnter("[data-retainer='list']") });
    tl.from("[data-retainer='item']", { ...enterFrom, stagger: stagger.items }, 0).from(
      "[data-retainer='tick']",
      { scale: 0, transformOrigin: "50% 50%", duration: dur.base, ease: ease.out, stagger: stagger.items },
      0.15,
    );
  });

  return (
    <Section ref={ref} tone="ink">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            eyebrow={retainer.eyebrow}
            headline={retainer.headline}
            supporting={retainer.supporting}
            tone="dark"
          />
          <Button asChild variant="accent" size="lg" className="mt-9" data-retainer="cta">
            <Link to={retainer.cta.href}>
              {retainer.cta.label}
              <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>

        <ul data-retainer="list" className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:mt-2">
          {retainerInclusions.map((item) => (
            <li
              key={item}
              data-retainer="item"
              className="flex items-start gap-3 border-t border-primary-foreground/15 pt-4"
            >
              <Check data-retainer="tick" aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span className="text-sm leading-relaxed text-primary-foreground/80">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

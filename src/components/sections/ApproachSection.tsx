import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/common/Section";
import { Reveal } from "@/components/common/Reveal";
import { approachSteps } from "@/content/approach";
import { sections } from "@/content/homepage";
import { dur, ease, enter, gsap, mq, onEnter, stagger, useMotion } from "@/lib/motion";

/**
 * Section 09 — Our Approach. Understand → Assess → Advise → Execute → Support.
 *
 * Desktop: a sticky sequence. The section pins and, as you scroll, a gold line
 * fills across the five steps; each step it reaches turns its numeral from
 * faded to solid gold and brings its text to full strength.
 *
 * Below desktop: the standard enter, with a gold line down the left edge that
 * fills on scroll.
 */
export function ApproachSection({ showCta = true }: { showCta?: boolean }) {
  const { approach } = sections;

  const ref = useMotion<HTMLElement>((scope) => {
    const mm = gsap.matchMedia();
    const numbers = gsap.utils.toArray<HTMLElement>("[data-step='number']");
    const steps = gsap.utils.toArray<HTMLElement>("[data-step='item']");

    // The numerals slide in once as the steps arrive.
    gsap.from(numbers, {
      y: enter.y,
      duration: dur.slow,
      ease: ease.out,
      stagger: stagger.items,
      scrollTrigger: onEnter("[data-step='list']"),
    });

    mm.add(mq.desktop, () => {
      const texts = steps.map((step) => step.querySelectorAll("[data-step='text']"));
      gsap.set(texts.slice(1), { opacity: 0.4 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: scope,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 0.6,
        },
      });

      tl.fromTo("[data-step='fill-x']", { scaleX: 0 }, { scaleX: 1, duration: steps.length }, 0);
      numbers.forEach((number, index) => {
        tl.to(number, { opacity: 1, duration: 0.5 }, index);
        if (index > 0) tl.to(texts[index], { opacity: 1, duration: 0.5 }, index);
      });

      return () => gsap.set([...numbers, ...texts], { clearProps: "opacity" });
    });

    mm.add(mq.belowDesktop, () => {
      gsap.fromTo(
        "[data-step='fill-y']",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-step='list']",
            start: "top 75%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        },
      );
    });

    return () => mm.revert();
  });

  return (
    <Section ref={ref} tone="sand" className="lg:flex lg:min-h-screen lg:flex-col lg:justify-center">
      <SectionHeading
        eyebrow={approach.eyebrow}
        headline={approach.headline}
        supporting={approach.supporting}
      />

      <div className="relative mt-14">
        {/* Connecting line — across the top on desktop, down the left below it. */}
        <span aria-hidden className="absolute inset-x-0 -top-px hidden h-px bg-border lg:block" />
        <span
          aria-hidden
          data-step="fill-x"
          className="absolute inset-x-0 -top-px z-10 hidden h-px origin-left bg-accent lg:block"
        />
        <span
          aria-hidden
          data-step="fill-y"
          className="absolute -left-px bottom-0 top-0 z-10 w-px origin-top bg-accent md:hidden"
        />

        <ol data-step="list" className="grid gap-px bg-border md:grid-cols-3 lg:grid-cols-5">
          {approachSteps.map((step, index) => (
            <Reveal
              as="li"
              key={step.number}
              delay={index * 80}
              data-step="item"
              className="flex h-full flex-col bg-background p-7"
            >
              <span
                data-step="number"
                className="font-display text-4xl text-accent opacity-[0.35]"
              >
                {step.number}
              </span>
              <h3 data-step="text" className="mt-5 font-display text-xl text-primary">
                {step.title}
              </h3>
              <p data-step="text" className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {step.summary}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>

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

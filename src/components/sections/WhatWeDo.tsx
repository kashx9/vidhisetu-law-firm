import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, SectionHeading } from "@/components/common/Section";
import { featuredPracticeAreas } from "@/content/practiceAreas";
import { sections } from "@/content/homepage";
import { getIcon } from "@/lib/icons";
import { gsap, ScrollTrigger, useMotion } from "@/lib/motion";

/** Pixels per second the rail drifts. Slow enough to read a card in passing. */
const DRIFT_SPEED = 38;

/**
 * Section 04 — What We Do. The practice areas as a self-scrolling rail.
 *
 * The rail drifts sideways on its own and stops under the cursor, so a card
 * can be read and clicked without chasing it. The list is rendered twice and
 * the scroll position wraps at the seam, which is what makes the loop endless.
 *
 * It is driven by the viewport's own `scrollLeft` rather than a transform, so
 * the drift and a person's own scrolling, dragging or trackpad swipe are the
 * same gesture and cannot fight each other. The scrollbar is hidden, not
 * disabled — see `.no-scrollbar` in index.css.
 */
export function WhatWeDo() {
  const areas = featuredPracticeAreas();
  const { whatWeDo } = sections;

  const ref = useMotion<HTMLElement>((scope) => {
    const viewport = scope.querySelector<HTMLElement>("[data-rail='viewport']");
    if (!viewport) return;

    const items = gsap.utils.toArray<HTMLElement>("[data-rail='item']", scope);
    // The second copy's first card sits exactly one loop along, which is a
    // precise measurement where dividing the scroll width is half a pixel out
    // and would drift over time.
    const seam = () => items[areas.length].offsetLeft - items[0].offsetLeft;

    // Hovering ramps the drift down rather than cutting it, so a card does not
    // stop dead under the cursor.
    const rate = { current: 1 };
    const ease = (to: number) =>
      gsap.to(rate, { current: to, duration: 0.45, ease: "power2.out", overwrite: true });

    const drift = (_time: number, delta: number) => {
      if (rate.current <= 0.001) return;
      viewport.scrollLeft += (DRIFT_SPEED * rate.current * delta) / 1000;
    };

    // Wrap at the seam, whoever moved it — the ticker or the reader.
    const wrap = () => {
      const loop = seam();
      if (loop <= 0) return;
      if (viewport.scrollLeft >= loop) viewport.scrollLeft -= loop;
      else if (viewport.scrollLeft < 0) viewport.scrollLeft += loop;
    };

    const pause = () => ease(0);
    const resume = () => ease(1);

    // No reason to move a rail nobody is looking at.
    const onScreen = ScrollTrigger.create({
      trigger: scope,
      start: "top bottom",
      end: "bottom top",
      onToggle: (self) => {
        rate.current = self.isActive ? 1 : 0;
      },
    });

    gsap.ticker.add(drift);
    viewport.addEventListener("scroll", wrap, { passive: true });
    viewport.addEventListener("pointerenter", pause);
    viewport.addEventListener("pointerleave", resume);
    // Keyboard users tabbing into a card get the same courtesy.
    viewport.addEventListener("focusin", pause);
    viewport.addEventListener("focusout", resume);

    return () => {
      onScreen.kill();
      gsap.ticker.remove(drift);
      viewport.removeEventListener("scroll", wrap);
      viewport.removeEventListener("pointerenter", pause);
      viewport.removeEventListener("pointerleave", resume);
      viewport.removeEventListener("focusin", pause);
      viewport.removeEventListener("focusout", resume);
    };
  });

  return (
    <section ref={ref} id="what-we-do" className="overflow-hidden py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow={whatWeDo.eyebrow}
          headline={whatWeDo.headline}
          supporting={whatWeDo.supporting}
        />
      </Container>

      <div
        data-rail="viewport"
        className="no-scrollbar mt-14 overflow-x-auto overscroll-x-contain"
      >
        <ol className="flex w-max gap-px border-y border-border bg-border">
          {/* Rendered twice: the second pass is the one the rail wraps onto. */}
          {[0, 1].map((copy) =>
            areas.map((area) => {
              const Icon = getIcon(area.icon);
              const duplicate = copy === 1;
              return (
                <li
                  key={`${copy}-${area.slug}`}
                  data-rail="item"
                  className="w-[19rem] shrink-0"
                  aria-hidden={duplicate || undefined}
                >
                  <Link
                    to={`/practice-areas/${area.slug}`}
                    // The copy is scenery, not a second set of tab stops.
                    tabIndex={duplicate ? -1 : undefined}
                    className="group flex h-full min-h-[18rem] flex-col bg-card p-7 transition-colors hover:bg-secondary/40"
                  >
                    <Icon aria-hidden className="h-6 w-6 text-accent" strokeWidth={1.25} />
                    <h3 className="mt-6 font-display text-xl leading-snug text-primary">
                      {area.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {area.headline}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-[0.75rem] uppercase tracking-eyebrow text-accent">
                      Read more
                      <ArrowUpRight
                        aria-hidden
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </Link>
                </li>
              );
            }),
          )}
        </ol>
      </div>

      <Container className="mt-12">
        <Button asChild variant="outline" size="lg">
          <Link to={whatWeDo.cta.href}>
            {whatWeDo.cta.label}
            <ArrowRight aria-hidden />
          </Link>
        </Button>
      </Container>
    </section>
  );
}

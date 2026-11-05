import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, SectionHeading } from "@/components/common/Section";
import { startupJourney } from "@/content/startupJourney";
import { sections } from "@/content/homepage";
import { enterFrom, gsap, mq, onEnter, stagger, useMotion } from "@/lib/motion";

/**
 * Section 07 — Featured Startup Legal Section. The signature moment.
 *
 * Desktop (≥1024px): the section pins and the nine stages travel sideways as
 * you scroll. A gold line runs through the stage markers and fills from the
 * first to the last — the bridge being built. The stage in focus sits at full
 * opacity, the rest at half.
 *
 * Below desktop: the stages stack, and a vertical gold line on the left fills
 * as you scroll. Without JavaScript the desktop track simply scrolls sideways.
 */
export function StartupJourneySection() {
  const { startup } = sections;

  const ref = useMotion<HTMLElement>((scope) => {
    const mm = gsap.matchMedia();
    const stages = gsap.utils.toArray<HTMLElement>("[data-journey='stage']");

    mm.add(mq.desktop, () => {
      const viewport = scope.querySelector<HTMLElement>("[data-journey='viewport']");
      const track = scope.querySelector<HTMLElement>("[data-journey='track']");
      if (!viewport || !track) return;

      // The track is driven by the pin now, not by its own scrollbar.
      viewport.style.overflowX = "hidden";
      const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

      let current = -1;
      const focus = (progress: number) => {
        const index = Math.min(stages.length - 1, Math.round(progress * (stages.length - 1)));
        if (index === current) return;
        current = index;
        stages.forEach((stage, i) =>
          gsap.to(stage, { opacity: i === index ? 1 : 0.5, duration: 0.3, overwrite: "auto" }),
        );
      };
      focus(0);

      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: scope,
            start: "top top",
            end: () => `+=${distance() + window.innerHeight * 0.35}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => focus(self.progress),
          },
        })
        .to(track, { x: () => -distance() }, 0)
        .fromTo("[data-journey='fill-x']", { scaleX: 0 }, { scaleX: 1 }, 0);

      return () => {
        viewport.style.overflowX = "";
        gsap.set(stages, { clearProps: "opacity" });
      };
    });

    mm.add(mq.belowDesktop, () => {
      gsap.fromTo(
        "[data-journey='fill-y']",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-journey='track']",
            start: "top 75%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        },
      );
      stages.forEach((stage) =>
        gsap.from(stage, { ...enterFrom, scrollTrigger: onEnter(stage) }),
      );
    });

    // The CTA arrives just after the heading.
    gsap.from("[data-journey='cta']", { ...enterFrom, delay: stagger.items * 4, scrollTrigger: onEnter(scope) });

    return () => mm.revert();
  });

  return (
    <section ref={ref} className="overflow-hidden bg-background py-20 md:py-28 lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:py-24">
      <Container>
        <div className="flex flex-col gap-9 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <SectionHeading
            eyebrow={startup.eyebrow}
            headline={startup.headline}
            supporting={startup.supporting}
          />
          <div data-journey="cta" className="shrink-0">
            <Button asChild size="lg">
              <Link to={startup.cta.href}>
                {startup.cta.label}
                <ArrowRight aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </Container>

      <Container className="mt-12 lg:mt-16">
        <div data-journey="viewport" className="lg:no-scrollbar lg:overflow-x-auto">
          <ol
            data-journey="track"
            className="relative pl-8 lg:flex lg:w-max lg:gap-0 lg:pl-0 lg:pt-10 lg:will-change-transform"
          >
            {/* Vertical rail and its gold fill (stacked layout). */}
            <span aria-hidden className="absolute bottom-0 left-0 top-0 w-px bg-border lg:hidden" />
            <span
              aria-hidden
              data-journey="fill-y"
              className="absolute bottom-0 left-0 top-0 w-px origin-top bg-accent lg:hidden"
            />
            {/* Horizontal rail and its gold fill (desktop track). */}
            <span
              aria-hidden
              className="absolute left-0 right-0 top-[0.8125rem] hidden h-px bg-border lg:block"
            />
            <span
              aria-hidden
              data-journey="fill-x"
              className="absolute left-0 right-0 top-[0.8125rem] hidden h-px origin-left bg-accent lg:block"
            />

            {startupJourney.map((stage) => (
              <li
                key={stage.step}
                data-journey="stage"
                className="relative block pb-8 last:pb-0 lg:w-[19rem] lg:shrink-0 lg:pb-0 lg:pr-10"
              >
                <span
                  aria-hidden
                  className="absolute -left-[2.125rem] top-1.5 h-2 w-2 rounded-full border border-accent bg-background lg:-top-8 lg:left-0 lg:h-2.5 lg:w-2.5"
                />
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-sm text-accent">{stage.step}</span>
                  <h3 className="font-display text-xl text-primary">{stage.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{stage.summary}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

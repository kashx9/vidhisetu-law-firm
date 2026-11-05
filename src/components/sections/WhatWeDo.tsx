import * as React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, SectionHeading } from "@/components/common/Section";
import { featuredPracticeAreas } from "@/content/practiceAreas";
import { sections } from "@/content/homepage";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import {
  dur,
  ease,
  enterFrom,
  gsap,
  mq,
  onEnter,
  ScrollTrigger,
  SplitText,
  stagger,
  useMotion,
} from "@/lib/motion";

/**
 * Section 04 — What We Do.
 *
 * Desktop: the heading and statement pin while the statement's words resolve
 * from muted to full ink as you scroll. Below it, the practice areas become a
 * list with a detail panel — hovering or focusing an area crossfades its
 * description into the panel.
 *
 * Below desktop: the original swipeable rail, with the standard enter. The list
 * is rendered twice and the scroll position wraps at the seam, which is what
 * lets a reader swipe it endlessly.
 */
export function WhatWeDo() {
  const areas = featuredPracticeAreas();
  const { whatWeDo } = sections;
  const [active, setActive] = React.useState(0);

  const ref = useMotion<HTMLElement>((scope) => {
    const mm = gsap.matchMedia();

    // ── Desktop: pinned statement ─────────────────────────────────────────
    mm.add(mq.desktop, () => {
      const statement = scope.querySelector<HTMLElement>("[data-motion='supporting']");
      const heading = scope.querySelector<HTMLElement>("h2");
      const pinned = scope.querySelector<HTMLElement>("[data-wwd='statement']");
      if (!statement || !heading || !pinned) return;

      const split = SplitText.create(statement, { type: "words", aria: "auto" });
      // Animate between the two real colours the page already uses.
      const muted = getComputedStyle(statement).color;
      const ink = getComputedStyle(heading).color;
      gsap.set(split.words, { color: muted, opacity: 0.3 });

      gsap.to(split.words, {
        color: ink,
        opacity: 1,
        ease: "none",
        stagger: 0.1,
        scrollTrigger: {
          trigger: pinned,
          start: "top 18%",
          end: "+=60%",
          pin: true,
          scrub: 0.6,
        },
      });

      gsap.from("[data-wwd='list'] > li", {
        ...enterFrom,
        stagger: stagger.items / 2,
        scrollTrigger: onEnter("[data-wwd='list']"),
      });
      gsap.from("[data-wwd='panel']", { ...enterFrom, scrollTrigger: onEnter("[data-wwd='panel']") });

      return () => split.revert();
    });

    // ── Below desktop: standard enter on the statement, swipe rail ────────
    mm.add(mq.belowDesktop, () => {
      gsap.from("[data-motion='supporting']", { ...enterFrom, scrollTrigger: onEnter(scope) });
      gsap.from("[data-rail='viewport']", {
        ...enterFrom,
        scrollTrigger: onEnter("[data-rail='viewport']"),
      });
    });

    return () => mm.revert();
  });

  // The rail's seam wrap is not motion — it is how the endless swipe works — so
  // it runs regardless of the reduced-motion preference.
  const rail = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const viewport = rail.current;
    if (!viewport) return;
    const items = viewport.querySelectorAll<HTMLElement>("[data-rail='item']");
    const wrap = () => {
      const loop = items[areas.length].offsetLeft - items[0].offsetLeft;
      if (loop <= 0) return;
      if (viewport.scrollLeft >= loop) viewport.scrollLeft -= loop;
      else if (viewport.scrollLeft < 0) viewport.scrollLeft += loop;
    };
    viewport.addEventListener("scroll", wrap, { passive: true });
    return () => viewport.removeEventListener("scroll", wrap);
  }, [areas.length]);

  // Crossfade the detail panels when the active area changes.
  const panels = React.useRef<HTMLDivElement>(null);
  const firstPanel = React.useRef(true);
  React.useEffect(() => {
    const root = panels.current;
    if (!root) return;
    const all = root.querySelectorAll<HTMLElement>("[data-wwd='detail']");
    if (firstPanel.current) {
      firstPanel.current = false;
      return;
    }
    all.forEach((panel, index) => {
      const on = index === active;
      gsap.to(panel, {
        autoAlpha: on ? 1 : 0,
        y: on ? 0 : 8,
        duration: on ? dur.base : dur.fast,
        ease: ease.out,
        overwrite: true,
      });
    });
  }, [active]);

  // Refresh pins when the list's own height settles after fonts.
  React.useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section ref={ref} id="what-we-do" className="overflow-hidden py-20 md:py-28">
      <Container>
        <div data-wwd="statement" className="bg-background">
          <SectionHeading
            eyebrow={whatWeDo.eyebrow}
            headline={whatWeDo.headline}
            supporting={whatWeDo.supporting}
            scrubSupporting
          />
        </div>
      </Container>

      {/* ── Desktop: hover list with a detail panel ───────────────────────── */}
      <Container className="mt-16 hidden lg:block">
        <div className="grid grid-cols-[0.9fr_1.1fr] gap-px border-y border-border bg-border">
          <ol data-wwd="list" className="bg-background py-4">
            {areas.map((area, index) => (
              <li key={area.slug}>
                <Link
                  to={`/practice-areas/${area.slug}`}
                  onPointerEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  aria-describedby={`wwd-detail-${area.slug}`}
                  className={cn(
                    "group flex items-center gap-4 py-2.5 pr-6 font-display text-xl leading-snug transition-colors duration-300",
                    index === active ? "text-primary" : "text-primary/45 hover:text-primary",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "h-px w-6 origin-left bg-accent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      index === active ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                  {area.title}
                </Link>
              </li>
            ))}
          </ol>

          <div ref={panels} data-wwd="panel" className="relative bg-card">
            {areas.map((area, index) => {
              const Icon = getIcon(area.icon);
              const on = index === active;
              return (
                <div
                  key={area.slug}
                  id={`wwd-detail-${area.slug}`}
                  data-wwd="detail"
                  aria-hidden={!on}
                  className="absolute inset-0 flex flex-col p-12"
                  style={on ? undefined : { opacity: 0, visibility: "hidden" }}
                >
                  <Icon aria-hidden className="h-8 w-8 text-accent" strokeWidth={1.25} />
                  <h3 className="mt-8 font-display text-3xl leading-snug text-primary">
                    {area.title}
                  </h3>
                  <p className="mt-4 max-w-md flex-1 text-[1.0625rem] leading-relaxed text-muted-foreground">
                    {area.headline}
                  </p>
                  <Link
                    to={`/practice-areas/${area.slug}`}
                    tabIndex={on ? undefined : -1}
                    className="group/more mt-6 inline-flex items-center gap-1.5 self-start text-[0.75rem] uppercase tracking-eyebrow text-accent"
                  >
                    <span className="link-sweep">Read more</span>
                    <ArrowUpRight
                      aria-hidden
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover/more:-translate-y-0.5 group-hover/more:translate-x-0.5"
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </Container>

      {/* ── Below desktop: the swipe rail ──────────────────────────────────── */}
      <div
        ref={rail}
        data-rail="viewport"
        className="no-scrollbar mt-14 overflow-x-auto overscroll-x-contain lg:hidden"
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

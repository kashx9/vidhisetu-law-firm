import * as React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Container, Eyebrow } from "./Section";
import { gsap, lineSweep, revealHeading, useMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

/**
 * The masthead used at the top of every inner page. Dark ink band with a
 * hairline rule — deliberately quiet, no imagery, no gradient.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
  className?: string;
}) {
  // Masthead entrance, played on mount rather than on scroll — it is already in
  // view. The rule grid behind it drifts on scroll for a little depth.
  const ref = useMotion<HTMLDivElement>(
    (scope) => {
      const cleanup = revealHeading(scope.querySelector("h1"), (lines) =>
        gsap
          .timeline({ defaults: { duration: 0.9 } })
          .from("[data-motion='crumbs'] > *", { opacity: 0, y: 8, stagger: 0.04, duration: 0.5 })
          .from(".eyebrow", { opacity: 0, duration: 0.6 }, 0.1)
          .from(".eyebrow > span", { scaleX: 0, transformOrigin: "left center" }, 0.1)
          .from(lines, lineSweep, 0.15)
          .from("[data-motion='lead']", { opacity: 0, y: 14 }, 0.45)
          .from("[data-motion='hero-cta']", { opacity: 0, y: 14 }, 0.6),
      );

      gsap.to("[data-motion='grid']", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: { trigger: scope, start: "top top", end: "bottom top", scrub: true },
      });

      return cleanup;
    },
    [title],
  );

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden bg-primary text-primary-foreground", className)}
    >
      {/* Faint rule grid — texture without imagery. */}
      <div
        aria-hidden
        data-motion="grid"
        // Overscanned top and bottom so the parallax drift never exposes an edge.
        className="pointer-events-none absolute inset-x-0 -inset-y-[20%] opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <Container className="relative py-16 md:py-24">
        {crumbs?.length ? (
          <nav
            aria-label="Breadcrumb"
            data-motion="crumbs"
            className="mb-8 flex flex-wrap items-center gap-1.5 text-[0.8125rem]"
          >
            {crumbs.map((crumb, index) => (
              <React.Fragment key={`${crumb.label}-${index}`}>
                {index > 0 ? (
                  <ChevronRight aria-hidden className="h-3.5 w-3.5 text-primary-foreground/40" />
                ) : null}
                {crumb.href ? (
                  <Link
                    to={crumb.href}
                    className="text-primary-foreground/60 transition-colors hover:text-accent"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-primary-foreground/90">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        ) : null}

        <div className="max-w-3xl">
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h1 className="mt-4 font-display text-[2.25rem] leading-[1.12] text-primary-foreground md:text-[3.25rem]">
            {title}
          </h1>
          {lead ? (
            <p
              data-motion="lead"
              className="mt-6 text-lg leading-relaxed text-primary-foreground/70"
            >
              {lead}
            </p>
          ) : null}
          {children ? (
            <div data-motion="hero-cta" className="mt-8">
              {children}
            </div>
          ) : null}
        </div>
      </Container>
    </div>
  );
}

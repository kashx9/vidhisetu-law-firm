import * as React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Container, Eyebrow } from "./Section";
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
  return (
    <div className={cn("relative overflow-hidden bg-primary text-primary-foreground", className)}>
      {/* Faint rule grid — texture without imagery. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
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
            <p className="mt-6 text-lg leading-relaxed text-primary-foreground/70">{lead}</p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </Container>
    </div>
  );
}

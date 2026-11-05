import * as React from "react";
import { dur, enterFrom, eyebrowIn, gsap, onEnter, revealHeading, useMotion, wordRise } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Constrained content column. Width comes from tailwind.config container. */
export function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-auto w-full max-w-[1200px] px-6 md:px-8", className)} {...props} />;
}

type Tone = "paper" | "sand" | "ink" | "card";

const toneClasses: Record<Tone, string> = {
  paper: "bg-background",
  sand: "bg-secondary/50",
  ink: "bg-primary text-primary-foreground",
  card: "bg-card",
};

/** Forwards its ref so a caller can hand the band itself to GSAP. */
export const Section = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & { tone?: Tone }
>(function Section({ tone = "paper", className, children, ...props }, ref) {
  return (
    <section
      ref={ref}
      className={cn("py-20 md:py-28", toneClasses[tone], className)}
      {...props}
    >
      <Container>{children}</Container>
    </section>
  );
});

export function Eyebrow({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span className={cn("eyebrow", className)}>
      <span aria-hidden data-eyebrow="rule" className="h-px w-6 bg-current opacity-60" />
      <span data-eyebrow="label">{children}</span>
    </span>
  );
}

/**
 * The standard section header: eyebrow, display headline and optional
 * supporting line. `align` handles the few centred sections.
 */
export function SectionHeading({
  eyebrow,
  headline,
  supporting,
  align = "left",
  tone = "light",
  className,
  children,
  scrubSupporting = false,
}: {
  eyebrow?: string;
  headline: string;
  supporting?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  children?: React.ReactNode;
  /** The caller animates the supporting line itself (What We Do scrubs it). */
  scrubSupporting?: boolean;
}) {
  // Every section headline on the site enters the same way: the eyebrow rule
  // draws out and its label fades in, the headline's words rise and un-blur
  // one after another, then the supporting line takes the standard enter.
  const ref = useMotion<HTMLDivElement>(
    (scope) =>
      revealHeading(scope.querySelector("h2"), (words) => {
        const tl = gsap
          .timeline({ scrollTrigger: onEnter(scope) })
          .add(eyebrowIn(scope), 0)
          .from(words, wordRise, 0.25);
        if (!scrubSupporting) {
          tl.from("[data-motion='supporting']", { ...enterFrom }, `-=${dur.base * 0.6}`);
        }
        return tl;
      }),
    [headline, scrubSupporting],
  );

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Eyebrow className={tone === "dark" ? "text-accent" : undefined}>{eyebrow}</Eyebrow>
      ) : null}
      <h2
        className={cn(
          "max-w-3xl font-display text-3xl leading-[1.15] md:text-[2.75rem]",
          tone === "dark" && "text-primary-foreground",
        )}
      >
        {headline}
      </h2>
      {supporting ? (
        <p
          data-motion="supporting"
          className={cn(
            "max-w-2xl text-[1.0625rem] leading-relaxed",
            tone === "dark" ? "text-primary-foreground/70" : "text-muted-foreground",
          )}
        >
          {supporting}
        </p>
      ) : null}
      {children}
    </div>
  );
}

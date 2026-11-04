import * as React from "react";
import { gsap, useMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Restrained scroll reveal — a short fade and rise, once, on entry.
 *
 * Used in every grid on the site, so it stays quiet: the interest comes from
 * the stagger across a row, not from any single card's movement. `delay` is in
 * milliseconds, which is what the call sites pass (`index * 40`).
 *
 * The hidden state is set by GSAP in a layout effect rather than by a class, so
 * the server-rendered markup is fully visible. See src/lib/motion.ts.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** Render as something other than a div — e.g. "li" inside an <ol>. */
  as?: "div" | "li" | "article" | "section";
}) {
  const ref = useMotion<HTMLElement>((scope) => {
    gsap.from(scope, {
      opacity: 0,
      y: 18,
      duration: 0.85,
      delay: delay / 1000,
      scrollTrigger: { trigger: scope, start: "top 90%", once: true },
    });
  }, [delay]);

  return (
    <Tag ref={ref as React.Ref<never>} className={className ? cn(className) : undefined}>
      {children}
    </Tag>
  );
}

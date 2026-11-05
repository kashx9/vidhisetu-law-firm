import * as React from "react";
import { enterFrom, gsap, onEnter, useMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * The standard enter — fade, 24px rise and an 8px blur that clears, once, when
 * the element reaches 85% of the viewport.
 *
 * Used in every grid on the site, so the interest comes from the stagger across
 * a row rather than any single card. `delay` is in milliseconds (call sites
 * pass `index * 80`, the shared item stagger).
 *
 * The hidden state is set by GSAP in a layout effect rather than by a class, so
 * the server-rendered markup is fully visible. See src/lib/motion.ts.
 */
export const Reveal = React.forwardRef<
  HTMLElement,
  {
    children: React.ReactNode;
    delay?: number;
    className?: string;
    /** Render as something other than a div — e.g. "li" inside an <ol>. */
    as?: "div" | "li" | "article" | "section";
  } & Omit<React.HTMLAttributes<HTMLElement>, "children">
>(function Reveal({ children, delay = 0, className, as: Tag = "div", ...rest }, forwarded) {
  const ref = useMotion<HTMLElement>(
    (scope) => {
      gsap.from(scope, { ...enterFrom, delay: delay / 1000, scrollTrigger: onEnter(scope) });
    },
    [delay],
  );

  const setRef = (node: HTMLElement | null) => {
    (ref as React.MutableRefObject<HTMLElement | null>).current = node;
    if (typeof forwarded === "function") forwarded(node);
    else if (forwarded) forwarded.current = node;
  };

  return (
    <Tag ref={setRef as React.Ref<never>} className={className ? cn(className) : undefined} {...rest}>
      {children}
    </Tag>
  );
});

import * as React from "react";
import { dur, ease, gsap, hasFinePointer, prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Magnetic pull for the primary call to action — adapted from React Bits
 * "Magnet", rebuilt on GSAP. The child drifts toward the cursor by at most
 * `strength` pixels and settles back on leave. Off on touch and under reduced
 * motion, where the wrapper is inert.
 */
export function Magnetic({
  children,
  strength = 8,
  className,
}: {
  children: React.ReactNode;
  /** Maximum travel in px. Keep it between 6 and 10. */
  strength?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;

    const toX = gsap.quickTo(el, "x", { duration: dur.base, ease: ease.out });
    const toY = gsap.quickTo(el, "y", { duration: dur.base, ease: ease.out });

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      toX(gsap.utils.clamp(-1, 1, dx) * strength);
      toY(gsap.utils.clamp(-1, 1, dy) * strength * 0.6);
    };
    const onLeave = () => {
      toX(0);
      toY(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      gsap.set(el, { clearProps: "transform" });
    };
  }, [strength]);

  return (
    <span ref={ref} className={cn("inline-flex will-change-transform", className)}>
      {children}
    </span>
  );
}

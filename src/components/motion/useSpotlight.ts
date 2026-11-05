import * as React from "react";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";

/**
 * Cursor-following gold glow for card grids — adapted from React Bits
 * "Spotlight Card". One delegated listener on the grid writes the pointer
 * position into `--mx` / `--my` on whichever `.spotlight` card is under it; the
 * glow itself is pure CSS (see `.spotlight` in index.css), so moving the mouse
 * never re-renders React. Inert on touch and under reduced motion.
 */
export function useSpotlight<T extends HTMLElement>() {
  const ref = React.useRef<T>(null);

  React.useEffect(() => {
    const root = ref.current;
    if (!root || !hasFinePointer() || prefersReducedMotion()) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      const card = (event.target as Element | null)?.closest?.<HTMLElement>(".spotlight");
      if (!card || !root.contains(card)) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        card.style.setProperty("--my", `${event.clientY - rect.top}px`);
      });
    };

    root.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(frame);
      root.removeEventListener("pointermove", onMove);
    };
  }, []);

  return ref;
}

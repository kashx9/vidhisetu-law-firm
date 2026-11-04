/**
 * MOTION LAYER — GSAP, in one place.
 *
 * Two rules the whole site follows:
 *
 * 1. Nothing is hidden by CSS. Every "from" state is set inside a layout
 *    effect, so the server-rendered HTML and a no-JS visitor see the finished
 *    page. Animation is an enhancement, never a prerequisite for reading.
 * 2. `prefers-reduced-motion: reduce` skips setup entirely — the element keeps
 *    its resting style rather than animating to it.
 *
 * Components animate by calling `useMotion`, which hands back a ref and runs
 * the callback in a `gsap.context()` scoped to that element. The context is
 * reverted on unmount, so route changes leave no ScrollTriggers behind.
 */

import * as React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

/**
 * ScrollTrigger schedules work on `requestAnimationFrame` the moment it is
 * registered, so the SSR smoke harness — a bare jsdom window — must not reach
 * this. Both checks together are the real test for "can animate".
 */
const isBrowser =
  typeof window !== "undefined" && typeof window.requestAnimationFrame === "function";

if (isBrowser) {
  gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);
  // A single editorial easing and tempo for the whole site. Individual tweens
  // override it where a different character is wanted.
  gsap.defaults({ ease: "power3.out", duration: 0.8 });
}

export { gsap, ScrollTrigger, SplitText };

/** `useLayoutEffect`, but silent during server rendering. */
export const useIsomorphicLayoutEffect = isBrowser ? React.useLayoutEffect : React.useEffect;

export const prefersReducedMotion = () =>
  isBrowser && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type MotionSetup<T extends HTMLElement> = (
  scope: T,
) => void | (() => void) | Array<() => void> | undefined;

/**
 * Scope a GSAP context to one element.
 *
 * Inside the callback, selector strings passed to gsap are resolved within the
 * returned ref's element, so `gsap.from(".eyebrow", …)` cannot reach another
 * section. Returning a function from the callback adds extra cleanup — needed
 * for `SplitText`, which has to be reverted by hand.
 */
export function useMotion<T extends HTMLElement = HTMLDivElement>(
  setup: MotionSetup<T>,
  deps: React.DependencyList = [],
) {
  const ref = React.useRef<T>(null);

  useIsomorphicLayoutEffect(() => {
    const scope = ref.current;
    if (!scope || !isBrowser || prefersReducedMotion()) return;

    const ctx = gsap.context(() => setup(scope), scope);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

/**
 * Animate a heading as masked lines — each line in a clipping wrapper, so the
 * text rises out of nothing rather than fading through the background. It is
 * the one flourish the display serif earns.
 *
 * `build` receives the lines and returns the animation to play. It is called
 * again whenever the lines have to be re-measured, which matters: a heading
 * split before Playfair Display has loaded wraps at the wrong words, and the
 * masks would then crop the wrong places. `autoSplit` re-splits on the font
 * load and on resize, and GSAP reverts the previous animation for us.
 *
 * Once the entrance has finished, re-splits are left alone — a resize should
 * not replay the headline. Returns the cleanup the caller must run.
 */
export function revealHeading(
  el: Element | null,
  build: (lines: Element[]) => gsap.core.Animation | undefined,
) {
  if (!el) return () => {};

  let played = false;

  const split = SplitText.create(el, {
    type: "lines",
    mask: "lines",
    linesClass: "motion-line",
    // Mirrors the original sentence onto the element as a label, so screen
    // readers read the headline rather than the split fragments.
    aria: "auto",
    autoSplit: true,
    onSplit: (self) => {
      if (played) return;
      const animation = build(self.lines);
      animation?.eventCallback("onComplete", () => {
        played = true;
      });
      return animation;
    },
  });

  return () => split.revert();
}

/** The shared line entrance: a sweep up from behind the mask. */
export const lineSweep = {
  yPercent: 118,
  duration: 1,
  stagger: 0.085,
  ease: "expo.out",
} as const;

/**
 * Count a number up to the value already written in the markup.
 *
 * The element's own text is the source of truth — "35+" counts to 35 and keeps
 * the plus, "₹2.4Cr" keeps the prefix and the unit — so the content file stays
 * the only place a figure is edited.
 */
export function countUp(el: HTMLElement, trigger: gsap.DOMTarget) {
  // Read the authored figure from a data attribute rather than from the live
  // text, and stash it there on the first run. The counter writes to this same
  // element, so a second setup pass — React's double-invoked effects in dev,
  // or a remount — would otherwise read a half-counted value and count to that.
  el.dataset.countTo ??= el.textContent ?? "";
  const final = el.dataset.countTo;
  const match = final.match(/-?[\d,.]+/);
  if (!match) return;

  const digits = match[0];
  const target = Number(digits.replace(/,/g, ""));
  if (!Number.isFinite(target)) return;

  const decimals = (digits.split(".")[1] ?? "").length;
  const prefix = final.slice(0, match.index);
  const suffix = final.slice((match.index ?? 0) + digits.length);
  const proxy = { value: 0 };

  gsap.to(proxy, {
    value: target,
    duration: 1.6,
    ease: "power2.out",
    scrollTrigger: { trigger, start: "top 90%", once: true },
    onUpdate: () => {
      el.textContent = `${prefix}${proxy.value.toFixed(decimals)}${suffix}`;
    },
    onComplete: () => {
      // Restore the authored string exactly, separators and all.
      el.textContent = final;
    },
  });
}

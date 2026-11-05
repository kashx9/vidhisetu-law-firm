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
 * Every tween uses the tokens below (ease, dur, stagger, enter). Consistency of
 * tempo is what makes the motion read as one system rather than many effects.
 */

import * as React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";

/* ───────────────────────────────── tokens ───────────────────────────────── */

export const ease = {
  /** CSS equivalent: cubic-bezier(0.22, 1, 0.36, 1) */
  out: "expo.out",
  inOut: "power3.inOut",
} as const;

/** Seconds. */
export const dur = { fast: 0.3, base: 0.6, slow: 1.2 } as const;
export const stagger = { words: 0.06, items: 0.08 } as const;
/** Pixels. */
export const enter = { y: 24, blur: 8 } as const;

/** Breakpoints used with gsap.matchMedia(). */
export const mq = {
  motion: "(prefers-reduced-motion: no-preference)",
  desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  belowDesktop: "(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)",
  finePointer: "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
} as const;

/* ───────────────────────────────── setup ────────────────────────────────── */

/**
 * ScrollTrigger schedules work on `requestAnimationFrame` the moment it is
 * registered, so the SSR smoke harness — a bare jsdom window — must not reach
 * this. Both checks together are the real test for "can animate".
 */
export const isBrowser =
  typeof window !== "undefined" && typeof window.requestAnimationFrame === "function";

if (isBrowser) {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, DrawSVGPlugin);
  gsap.defaults({ ease: ease.out, duration: dur.base });
}

export { gsap, ScrollTrigger, SplitText };

/** `useLayoutEffect`, but silent during server rendering. */
export const useIsomorphicLayoutEffect = isBrowser ? React.useLayoutEffect : React.useEffect;

export const prefersReducedMotion = () =>
  isBrowser && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** True on devices with a precise hovering pointer — gates magnet, tilt and glows. */
export const hasFinePointer = () =>
  isBrowser && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

type MotionSetup<T extends HTMLElement> = (scope: T) => void | (() => void) | undefined;

/**
 * Scope a GSAP context to one element (via `useGSAP`).
 *
 * Inside the callback, selector strings passed to gsap are resolved within the
 * returned ref's element, so `gsap.from(".eyebrow", …)` cannot reach another
 * section. Returning a function adds extra cleanup — needed for `SplitText`
 * and for event listeners.
 */
export function useMotion<T extends HTMLElement = HTMLDivElement>(
  setup: MotionSetup<T>,
  deps: React.DependencyList = [],
) {
  const ref = React.useRef<T>(null);

  useGSAP(
    () => {
      const scope = ref.current;
      if (!scope || !isBrowser || prefersReducedMotion()) return;
      return setup(scope);
    },
    { scope: ref, dependencies: deps as unknown[] },
  );

  return ref;
}

/* ──────────────────────────────── presets ───────────────────────────────── */

/** The standard enter: fade, rise and un-blur. The blur is cleared afterwards. */
export const enterFrom = {
  opacity: 0,
  y: enter.y,
  filter: `blur(${enter.blur}px)`,
  duration: dur.base,
  ease: ease.out,
  clearProps: "filter",
} as const;

/** ScrollTrigger config for a one-shot entrance. */
export const onEnter = (trigger: gsap.DOMTarget, start = "top 85%") => ({
  trigger,
  start,
  once: true,
});

/**
 * Split a heading into words that rise and un-blur, one after another.
 *
 * `build` receives the words and returns the animation to play. `autoSplit`
 * re-splits once Playfair Display has loaded (and on resize), and GSAP reverts
 * the previous animation for us. Once the entrance has played, re-splits are
 * left alone so a resize does not replay the headline.
 */
export function revealHeading(
  el: Element | null,
  build: (words: Element[]) => gsap.core.Animation | undefined,
) {
  if (!el) return () => {};

  let played = false;

  const split = SplitText.create(el, {
    type: "words",
    wordsClass: "motion-word",
    // Mirrors the original sentence onto the element as a label, so screen
    // readers read the headline rather than the split fragments.
    aria: "auto",
    autoSplit: true,
    onSplit: (self) => {
      if (played) return;
      const animation = build(self.words);
      animation?.eventCallback("onComplete", () => {
        played = true;
      });
      return animation;
    },
  });

  return () => split.revert();
}

/** The shared word entrance used by every split heading. */
export const wordRise = {
  opacity: 0,
  y: enter.y,
  filter: `blur(${enter.blur}px)`,
  duration: dur.base,
  stagger: stagger.words,
  ease: ease.out,
  clearProps: "filter",
} as const;

/**
 * Eyebrow entrance: the leading rule draws out, then the label fades in.
 * Returns a timeline so callers can place it inside their own sequence.
 */
export function eyebrowIn(scope: Element) {
  const tl = gsap.timeline();
  const rule = scope.querySelector(".eyebrow > [data-eyebrow='rule']");
  const label = scope.querySelector(".eyebrow > [data-eyebrow='label']");
  if (rule) tl.from(rule, { scaleX: 0, transformOrigin: "left center", duration: dur.base, ease: ease.inOut });
  if (label) tl.from(label, { opacity: 0, duration: dur.base }, "-=0.25");
  return tl;
}

/**
 * Count a number up to the value already written in the markup.
 *
 * The element's own text is the source of truth — "35+" counts to 35 and keeps
 * the plus — so the content file stays the only place a figure is edited.
 */
export function countUp(el: HTMLElement, trigger: gsap.DOMTarget) {
  // Read the authored figure from a data attribute rather than from the live
  // text, and stash it there on the first run, so a second setup pass reads the
  // real figure rather than a half-counted one.
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
    duration: dur.slow * 1.3,
    ease: ease.out,
    scrollTrigger: { trigger, start: "top 90%", once: true },
    onUpdate: () => {
      el.textContent = `${prefix}${proxy.value.toFixed(decimals)}${suffix}`;
    },
    onComplete: () => {
      el.textContent = final;
    },
  });
}

import * as React from "react";
import Lenis from "lenis";
import { gsap, isBrowser, prefersReducedMotion, ScrollTrigger } from "@/lib/motion";

/**
 * Site-wide smooth scrolling (Lenis), synced to ScrollTrigger.
 *
 * Lenis drives the native scroll position, so `position: sticky`, pinning and
 * keyboard scrolling keep working. It is skipped entirely under
 * `prefers-reduced-motion`, leaving the browser's own scrolling in place.
 */

let instance: Lenis | null = null;

/** The live Lenis instance, or null when smooth scrolling is off. */
export const getLenis = () => instance;

/** Height of the fixed header, used as the offset for every anchor jump. */
export const headerOffset = () =>
  document.querySelector<HTMLElement>("[data-site-header]")?.offsetHeight ?? 0;

/** Scroll to an element or position, through Lenis when it is running. */
export function scrollToTarget(target: HTMLElement | number, immediate = false) {
  const offset = typeof target === "number" ? 0 : -headerOffset();
  if (instance) {
    instance.scrollTo(target, { offset, immediate, force: true });
    return;
  }
  const top =
    typeof target === "number"
      ? target
      : target.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: immediate || prefersReducedMotion() ? "auto" : "smooth" });
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    if (!isBrowser) return;

    const refresh = () => ScrollTrigger.refresh();
    // Triggers measured before the web fonts arrive are measured against the
    // fallback face's line breaks, so re-measure once the real faces are in.
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    // Same-page anchor links (#consultation, #what-we-do…) go through the
    // shared scroller with the header offset applied.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
      const link = (event.target as Element | null)?.closest?.("a[href*='#']");
      if (!(link instanceof HTMLAnchorElement)) return;
      const url = new URL(link.href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;
      event.preventDefault();
      scrollToTarget(target);
      history.replaceState(null, "", url.hash);
      // Move focus for keyboard and screen-reader users, without a jump.
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };
    document.addEventListener("click", onClick);

    let tick: ((time: number) => void) | null = null;

    if (!prefersReducedMotion()) {
      instance = new Lenis({
        lerp: 0.11,
        wheelMultiplier: 1,
        // Scrollable children (select menus, the mobile sheet, the practice
        // rail) keep their own scrolling.
        allowNestedScroll: true,
        prevent: (node) =>
          node instanceof Element &&
          !!node.closest("[data-lenis-prevent], [data-radix-select-viewport], [role='dialog']"),
      });
      instance.on("scroll", ScrollTrigger.update);
      tick = (time) => instance?.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
      if (tick) gsap.ticker.remove(tick);
      instance?.destroy();
      instance = null;
    };
  }, []);

  return <>{children}</>;
}

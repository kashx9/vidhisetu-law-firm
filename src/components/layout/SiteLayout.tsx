import * as React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { StickyConsultBar } from "./StickyConsultBar";
import {
  dur,
  ease,
  gsap,
  prefersReducedMotion,
  ScrollTrigger,
  useIsomorphicLayoutEffect,
} from "@/lib/motion";
import { SmoothScroll, scrollToTarget } from "@/providers/SmoothScroll";

/**
 * Restores the top of the page on navigation, and plays the route transition:
 * a cream veil that lifts off the incoming page. Skipped on first load (the
 * hero has its own entrance) and under reduced motion.
 */
function RouteTransition() {
  const { pathname } = useLocation();
  const veil = React.useRef<HTMLDivElement>(null);
  const first = React.useRef(true);

  useIsomorphicLayoutEffect(() => {
    scrollToTarget(0, true);

    if (!first.current && veil.current && !prefersReducedMotion()) {
      gsap.fromTo(
        veil.current,
        { autoAlpha: 1 },
        { autoAlpha: 0, duration: dur.base, ease: ease.out, overwrite: true },
      );
    }
    first.current = false;

    // The new route's triggers were measured against the old scroll position
    // and the old page height, so re-measure once it has mounted.
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <div
      ref={veil}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] bg-background"
      style={{ opacity: 0, visibility: "hidden" }}
    />
  );
}

export function SiteLayout() {
  return (
    <SmoothScroll>
      <div className="flex min-h-screen flex-col">
        <RouteTransition />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1 pb-16 lg:pb-0">
          <Outlet />
        </main>
        <Footer />
        <StickyConsultBar />
        <Toaster
          position="bottom-right"
          toastOptions={{
            classNames: {
              toast: "rounded-sm border border-border bg-card font-sans text-sm text-foreground",
            },
          }}
        />
      </div>
    </SmoothScroll>
  );
}

import * as React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { StickyConsultBar } from "./StickyConsultBar";

/** Restores the top of the page on navigation, except when returning via history. */
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

export function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
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
  );
}

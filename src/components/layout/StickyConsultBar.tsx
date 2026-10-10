import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Mobile conversion bar. Appears once the reader is past the hero, keeping
 * click-to-call, email and the consultation CTA permanently within reach —
 * the conversion features called for in the brief. Hidden on the contact page,
 * where the form is already on screen.
 */
export function StickyConsultBar() {
  const [visible, setVisible] = React.useState(false);
  const { pathname } = useLocation();

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/contact" || pathname.startsWith("/blog/studio")) return null;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur transition-transform duration-300 lg:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="flex items-stretch">
        <a
          href={`tel:${site.contact.phoneHref}`}
          className="flex flex-1 flex-col items-center justify-center gap-1 py-3 text-[0.6875rem] uppercase tracking-eyebrow text-muted-foreground"
        >
          <Phone aria-hidden className="h-4 w-4 text-accent" />
          Call
        </a>
        <a
          href={`mailto:${site.contact.email}`}
          className="flex flex-1 flex-col items-center justify-center gap-1 border-x border-border py-3 text-[0.6875rem] uppercase tracking-eyebrow text-muted-foreground"
        >
          <Mail aria-hidden className="h-4 w-4 text-accent" />
          Email
        </a>
        <Link
          to={site.cta.primary.href}
          className="flex flex-[1.6] items-center justify-center bg-primary px-4 text-center text-[0.8125rem] font-medium text-primary-foreground"
        >
          {site.cta.primary.label}
        </Link>
      </div>
    </div>
  );
}

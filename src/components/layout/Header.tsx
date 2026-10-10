import * as React from "react";
import { Link, NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/Section";
import { Logo } from "@/components/common/Logo";
import { primaryNav } from "@/content/navigation";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Sticky header. Transparent-to-solid on scroll, dropdown panels for the two
 * menus that have children, and a full-screen sheet on mobile.
 * "Book a Consultation" is the only filled button in the header.
 */
export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);
  const location = useLocation();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close everything on navigation.
  React.useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [location.pathname]);

  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors duration-300",
        scrolled
          ? "border-border bg-background/95 backdrop-blur"
          : "border-transparent bg-background",
      )}
    >
      <Container className="flex h-20 items-center justify-between gap-8">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {primaryNav.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-1 py-2 text-[0.9375rem] transition-colors hover:text-accent",
                    location.pathname.startsWith(item.href) ? "text-accent" : "text-primary",
                  )}
                  aria-expanded={openMenu === item.label}
                >
                  {item.label}
                  <ChevronDown
                    aria-hidden
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200",
                      openMenu === item.label && "rotate-180",
                    )}
                  />
                </Link>

                {openMenu === item.label ? (
                  <div className="absolute left-1/2 top-full z-50 w-[22rem] -translate-x-1/2 pt-2">
                    <div className="animate-fade-up border border-border bg-card p-2 shadow-lg">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="block px-4 py-2.5 text-sm text-primary transition-colors hover:bg-secondary/60 hover:text-accent"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <RouterNavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "py-2 text-[0.9375rem] transition-colors hover:text-accent",
                    isActive ? "text-accent" : "text-primary",
                  )
                }
              >
                {item.label}
              </RouterNavLink>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <Button asChild size="sm">
            <Link to={site.cta.primary.href}>{site.cta.primary.label}</Link>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="-mr-2 p-2 text-primary lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {mobileOpen ? (
        <div className="fixed inset-x-0 bottom-0 top-20 z-40 overflow-y-auto border-t border-border bg-background lg:hidden">
          <Container className="py-6">
            <ul className="divide-y divide-border">
              {primaryNav.map((item) => (
                <li key={item.label} className="py-1">
                  <MobileNavItem item={item} />
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3">
              <Button asChild size="lg">
                <Link to={site.cta.primary.href}>{site.cta.primary.label}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={`tel:${site.contact.phoneHref}`}>Call {site.contact.phone}</a>
              </Button>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}

function MobileNavItem({ item }: { item: (typeof primaryNav)[number] }) {
  const [open, setOpen] = React.useState(false);

  if (!item.children) {
    return (
      <Link to={item.href} className="block py-3 font-display text-lg text-primary">
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <Link to={item.href} className="block py-3 font-display text-lg text-primary">
          {item.label}
        </Link>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="p-2 text-muted-foreground"
          aria-label={`${open ? "Collapse" : "Expand"} ${item.label}`}
          aria-expanded={open}
        >
          <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
        </button>
      </div>
      {open ? (
        <ul className="mb-3 space-y-1 border-l border-border pl-4">
          {item.children.map((child) => (
            <li key={child.href}>
              <Link to={child.href} className="block py-2 text-sm text-muted-foreground">
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

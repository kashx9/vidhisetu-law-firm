import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import { Container } from "@/components/common/Section";
import { Logo } from "@/components/common/Logo";
import { footerNav, legalNav } from "@/content/navigation";
import { site } from "@/content/site";
import { getIcon, type IconName } from "@/lib/icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-sm">
            <Logo tone="dark" />
            <p className="mt-6 text-sm leading-relaxed text-primary-foreground/60">
              {site.footerStatement}
            </p>

            <div className="mt-8 space-y-3 text-sm">
              <a
                href={`tel:${site.contact.phoneHref}`}
                className="flex items-center gap-3 text-primary-foreground/80 transition-colors hover:text-accent"
              >
                <Phone aria-hidden className="h-4 w-4 text-accent" />
                {site.contact.phone}
              </a>
              <a
                href={`mailto:${site.contact.email}`}
                className="flex items-center gap-3 text-primary-foreground/80 transition-colors hover:text-accent"
              >
                <Mail aria-hidden className="h-4 w-4 text-accent" />
                {site.contact.email}
              </a>
            </div>

            <div className="mt-8 flex gap-3">
              {site.social.map((social) => {
                const Icon = getIcon(social.icon as IconName);
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center border border-primary-foreground/20 text-primary-foreground/70 transition-colors hover:border-accent hover:text-accent"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {footerNav.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="eyebrow text-accent">{column.title}</h3>
              <ul className="mt-6 space-y-3">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.href}-${link.label}`}>
                    <Link
                      to={link.href}
                      className="text-sm text-primary-foreground/65 transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 grid gap-10 border-t border-primary-foreground/15 pt-10 md:grid-cols-2">
          {site.offices.map((office) => (
            <div key={office.city}>
              <p className="eyebrow text-accent">{office.label}</p>
              <address className="mt-3 text-sm not-italic leading-relaxed text-primary-foreground/60">
                {office.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>
          ))}
        </div>

        <p className="mt-12 border-t border-primary-foreground/15 pt-8 text-xs leading-relaxed text-primary-foreground/45">
          {site.disclaimer}
        </p>

        <div className="mt-8 flex flex-col gap-4 text-xs text-primary-foreground/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {site.copyrightFrom}–{year} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className="transition-colors hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to={site.cta.login.href} className="transition-colors hover:text-accent">
                {site.cta.login.label}
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}

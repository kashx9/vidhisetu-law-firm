import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/common/Section";
import { hero } from "@/content/homepage";
import { site } from "@/content/site";

/**
 * Section 02 — Hero.
 * Editorial composition rather than stock imagery: a two-column split with an
 * asymmetric rule structure on the right. Restrained, no gradient, no gavel.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <Container className="relative grid gap-16 py-20 md:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-20">
        <div className="animate-fade-up">
          <Eyebrow>{hero.eyebrow}</Eyebrow>

          <h1 className="mt-6 max-w-[18ch] font-display text-[2.5rem] leading-[1.08] text-primary md:text-[3.5rem] lg:text-[4rem]">
            {hero.headline}
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {hero.supporting}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link to={site.cta.primary.href}>
                {site.cta.primary.label}
                <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to={site.cta.secondary.href}>{site.cta.secondary.label}</Link>
            </Button>
          </div>

          <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-8">
            {hero.markers.map((marker) => (
              <div key={marker.label}>
                <dt className="sr-only">{marker.label}</dt>
                <dd>
                  <span className="block font-display text-3xl text-primary">{marker.value}</span>
                  <span className="mt-2 block text-xs leading-snug text-muted-foreground">
                    {marker.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Editorial mark — an architectural arch built from hairlines. */}
        <div className="relative hidden lg:block">
          <div className="relative aspect-[4/5] w-full border border-border bg-card">
            <svg viewBox="0 0 400 500" className="h-full w-full" aria-hidden>
              <defs>
                <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path
                    d="M40 0 L0 0 0 40"
                    fill="none"
                    className="stroke-border"
                    strokeWidth="0.75"
                  />
                </pattern>
              </defs>
              <rect width="400" height="500" fill="url(#hero-grid)" opacity="0.7" />
              <path
                d="M70 430 L70 220 A130 130 0 0 1 330 220 L330 430"
                className="fill-none stroke-primary"
                strokeWidth="1.25"
              />
              <path
                d="M120 430 L120 235 A80 80 0 0 1 280 235 L280 430"
                className="fill-none stroke-accent"
                strokeWidth="1"
              />
              <line
                x1="40"
                y1="430"
                x2="360"
                y2="430"
                className="stroke-primary"
                strokeWidth="1.75"
              />
              <line
                x1="200"
                y1="90"
                x2="200"
                y2="430"
                className="stroke-accent"
                strokeWidth="0.75"
                strokeDasharray="4 6"
              />
            </svg>
            <div className="absolute bottom-8 left-8 right-8 border-t border-border pt-5">
              <p className="font-display text-lg italic leading-snug text-primary">
                “Vidhi” is law. “Setu” is the bridge.
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Between what the law requires and what your business is trying to do.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

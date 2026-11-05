import { Mail, Phone } from "lucide-react";
import { Section, SectionHeading } from "@/components/common/Section";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { sections } from "@/content/homepage";
import { site } from "@/content/site";
import { dur, ease, enterFrom, gsap, onEnter, stagger, useMotion } from "@/lib/motion";

/** Section 11 — Consultation CTA. Short form, kept above the footer. */
export function ConsultationBand() {
  const { consultation } = sections;

  // The bridge closes: a smaller echo of the hero arch draws itself in as the
  // band arrives, and the form's fields follow with the standard enter.
  const ref = useMotion<HTMLElement>((scope) => {
    gsap
      .timeline({ scrollTrigger: onEnter(scope, "top 70%") })
      .from("[data-echo='outer']", { drawSVG: "0% 0%", duration: dur.slow, ease: ease.inOut }, 0)
      .from("[data-echo='base']", { drawSVG: "50% 50%", duration: dur.slow, ease: ease.inOut }, 0)
      .from("[data-echo='inner']", { drawSVG: "0% 0%", duration: dur.slow, ease: ease.inOut }, 0.35)
      .from(
        "[data-echo='centre']",
        { scaleY: 0, svgOrigin: "200 430", duration: dur.slow, ease: ease.inOut },
        0.7,
      );
    gsap.from("[data-consult='contact'] > *", {
      ...enterFrom,
      stagger: stagger.items,
      scrollTrigger: onEnter("[data-consult='contact']"),
    });
    gsap.from("form > *", {
      ...enterFrom,
      stagger: stagger.items / 2,
      scrollTrigger: onEnter("form"),
    });
  });

  return (
    <Section ref={ref} tone="ink" id="consultation" className="overflow-hidden">
      <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="relative">
          <SectionHeading
            eyebrow={consultation.eyebrow}
            headline={consultation.headline}
            supporting={consultation.supporting}
            tone="dark"
          />

          <div
            data-consult="contact"
            className="mt-10 space-y-4 border-t border-primary-foreground/15 pt-8"
          >
            <a
              href={`tel:${site.contact.phoneHref}`}
              className="flex items-center gap-3 text-sm text-primary-foreground/80 transition-colors hover:text-accent"
            >
              <Phone aria-hidden className="h-4 w-4 text-accent" />
              {site.contact.phone}
            </a>
            <a
              href={`mailto:${site.contact.email}`}
              className="flex items-center gap-3 text-sm text-primary-foreground/80 transition-colors hover:text-accent"
            >
              <Mail aria-hidden className="h-4 w-4 text-accent" />
              {site.contact.email}
            </a>
            <p className="text-xs text-primary-foreground/50">{site.contact.officeHours}</p>
          </div>

          {/* Echo of the hero arch — the other end of the bridge. */}
          <svg
            viewBox="30 80 340 360"
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-0 hidden w-56 lg:block"
          >
            <path
              data-echo="outer"
              d="M70 430 L70 220 A130 130 0 0 1 330 220 L330 430"
              className="fill-none stroke-primary-foreground/25"
              strokeWidth="1.5"
            />
            <path
              data-echo="inner"
              d="M120 430 L120 235 A80 80 0 0 1 280 235 L280 430"
              className="fill-none stroke-accent/70"
              strokeWidth="1.25"
            />
            <line
              data-echo="base"
              x1="40"
              y1="430"
              x2="360"
              y2="430"
              className="stroke-primary-foreground/25"
              strokeWidth="2"
            />
            <line
              data-echo="centre"
              x1="200"
              y1="90"
              x2="200"
              y2="430"
              className="stroke-accent/70"
              strokeWidth="1"
              strokeDasharray="4 6"
            />
          </svg>
        </div>

        <ConsultationForm tone="dark" />
      </div>
    </Section>
  );
}

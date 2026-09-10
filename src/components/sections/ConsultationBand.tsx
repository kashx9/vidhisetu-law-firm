import { Mail, Phone } from "lucide-react";
import { Section, SectionHeading } from "@/components/common/Section";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { sections } from "@/content/homepage";
import { site } from "@/content/site";

/** Section 11 — Consultation CTA. Short form, kept above the footer. */
export function ConsultationBand() {
  const { consultation } = sections;

  return (
    <Section tone="ink" id="consultation">
      <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow={consultation.eyebrow}
            headline={consultation.headline}
            supporting={consultation.supporting}
            tone="dark"
          />

          <div className="mt-10 space-y-4 border-t border-primary-foreground/15 pt-8">
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
        </div>

        <ConsultationForm tone="dark" />
      </div>
    </Section>
  );
}

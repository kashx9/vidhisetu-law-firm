import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { Section, SectionHeading } from "@/components/common/Section";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { usePageMeta } from "@/hooks/usePageMeta";
import { consultationProcess } from "@/content/consultation";
import { site } from "@/content/site";

export default function ContactPage() {
  usePageMeta({
    title: `Book a Consultation — ${site.name}`,
    description:
      "Tell us what you are dealing with. We will tell you whether it needs legal work, what that work involves and what it is likely to cost.",
  });

  return (
    <>
      <PageHero
        eyebrow="Book a Consultation"
        title="Have a Legal Issue? Let's Discuss It Before It Becomes a Legal Problem."
        lead="Tell us what you are dealing with. We will tell you whether it needs legal work, what that work involves and what it is likely to cost — before you commit to anything."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Consultation Enquiry"
              headline="Tell Us About the Matter."
              supporting="Fields marked with an asterisk are required. Please keep the description brief and avoid confidential material — this form is not a privileged channel."
              className="mb-10"
            />
            <ConsultationForm />
          </div>

          <aside className="space-y-10">
            <div className="border border-border bg-card p-8">
              <p className="eyebrow text-accent">Direct Contact</p>
              <div className="mt-6 space-y-4">
                <a
                  href={`tel:${site.contact.phoneHref}`}
                  className="flex items-start gap-3 text-sm text-foreground/85 transition-colors hover:text-accent"
                >
                  <Phone aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {site.contact.phone}
                </a>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="flex items-start gap-3 text-sm text-foreground/85 transition-colors hover:text-accent"
                >
                  <Mail aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {site.contact.email}
                </a>
                <a
                  href={`https://wa.me/${site.contact.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-start gap-3 text-sm text-foreground/85 transition-colors hover:text-accent"
                >
                  <MessageCircle aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  WhatsApp
                </a>
              </div>
              <p className="mt-6 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
                {site.contact.officeHours}
              </p>
            </div>

            {site.offices.map((office) => (
              <div key={office.city} className="border border-border bg-card p-8">
                <p className="eyebrow text-accent">{office.label}</p>
                <address className="mt-6 flex items-start gap-3 text-sm not-italic leading-relaxed text-muted-foreground">
                  <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>
                    {office.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </address>
              </div>
            ))}
          </aside>
        </div>
      </Section>

      <Section tone="ink">
        <SectionHeading
          eyebrow="What Happens Next"
          headline="The Consultation Process."
          tone="dark"
        />
        <ol className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
          {consultationProcess.map((step) => (
            <li key={step.step} className="border-t border-primary-foreground/20 pt-6">
              <span className="font-display text-3xl text-accent/50">{step.step}</span>
              <h3 className="mt-4 font-display text-lg text-primary-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/65">{step.body}</p>
            </li>
          ))}
        </ol>

        <p className="mt-14 max-w-3xl border-t border-primary-foreground/15 pt-8 text-xs leading-relaxed text-primary-foreground/45">
          {site.disclaimer}
        </p>
      </Section>
    </>
  );
}

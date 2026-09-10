import { Section, SectionHeading } from "@/components/common/Section";
import { Reveal } from "@/components/common/Reveal";
import { differentiators } from "@/content/whyUs";
import { sections } from "@/content/homepage";
import { getIcon } from "@/lib/icons";

/** Section 05 — Why Clients Choose VidhiSetu. Dark band, six differentiators. */
export function WhyUs() {
  const { whyUs } = sections;

  return (
    <Section tone="ink">
      <SectionHeading
        eyebrow={whyUs.eyebrow}
        headline={whyUs.headline}
        supporting={whyUs.supporting}
        tone="dark"
      />

      <div className="mt-16 grid gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {differentiators.map((item, index) => {
          const Icon = getIcon(item.icon);
          return (
            <Reveal key={item.title} delay={index * 50}>
              <div className="border-t border-primary-foreground/20 pt-6">
                <Icon aria-hidden className="h-6 w-6 text-accent" strokeWidth={1.25} />
                <h3 className="mt-5 font-display text-xl text-primary-foreground">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-primary-foreground/65">
                  {item.body}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

import { Section, SectionHeading } from "@/components/common/Section";
import { Reveal } from "@/components/common/Reveal";
import { differentiators, outcomes } from "@/content/whyUs";
import { sections } from "@/content/homepage";
import { getIcon } from "@/lib/icons";
import { gsap, useMotion } from "@/lib/motion";
import { useSpotlight } from "@/components/motion/useSpotlight";

/** Section 05 — Why Clients Choose VidhiSetu. Dark band, six differentiators. */
export function WhyUs() {
  const { whyUs } = sections;

  // The dark band opens: it arrives inset and slightly small, then scales up
  // into full bleed as it reaches the middle of the screen. Scrubbed, so the
  // reader is doing the opening rather than watching it happen.
  const ref = useMotion<HTMLElement>((scope) => {
    gsap.from(scope, {
      scale: 0.9,
      opacity: 0.35,
      ease: "power1.out",
      scrollTrigger: {
        trigger: scope,
        start: "top bottom",
        end: "top 30%",
        scrub: 0.4,
      },
    });
  });

  const grid = useSpotlight<HTMLDivElement>();

  return (
    <Section ref={ref} tone="ink">
      <SectionHeading
        eyebrow={whyUs.eyebrow}
        headline={whyUs.headline}
        supporting={whyUs.supporting}
        tone="dark"
      />

      <div ref={grid} className="mt-16 grid gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {differentiators.map((item, index) => {
          const Icon = getIcon(item.icon);
          return (
            <Reveal key={item.title} delay={index * 80} className="h-full">
              <div className="spotlight h-full border-t border-primary-foreground/20 pt-6 transition-colors duration-300 hover:border-accent/60">
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

      <div className="mt-20 border-t border-primary-foreground/20 pt-10">
        <p className="eyebrow text-accent">What Clients Gain</p>
        <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
          {outcomes.map((outcome) => (
            <li
              key={outcome}
              className="font-display text-lg text-primary-foreground/85 md:text-xl"
            >
              {outcome}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

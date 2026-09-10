import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/common/PageHero";
import { Section, SectionHeading } from "@/components/common/Section";
import { Reveal } from "@/components/common/Reveal";
import { WhyUs } from "@/components/sections/WhyUs";
import { usePageMeta } from "@/hooks/usePageMeta";
import { aboutIntro, philosophy, values, team, engagementModel } from "@/content/about";
import { getPracticeArea } from "@/content/practiceAreas";
import { site } from "@/content/site";

export default function AboutPage() {
  usePageMeta({ title: `About Us — ${site.name}`, description: aboutIntro.lead });

  return (
    <>
      <PageHero
        eyebrow={aboutIntro.eyebrow}
        title={aboutIntro.headline}
        lead={aboutIntro.lead}
        crumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHeading eyebrow="The Firm" headline="Why VidhiSetu Exists." />
          <div className="space-y-5">
            {aboutIntro.body.map((paragraph) => (
              <p key={paragraph} className="text-[1.0625rem] leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="sand">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHeading eyebrow={philosophy.eyebrow} headline={philosophy.headline} />
          <div className="space-y-5">
            {philosophy.body.map((paragraph) => (
              <p key={paragraph} className="text-[1.0625rem] leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <Reveal key={value.title} delay={index * 40}>
              <div className="h-full bg-background p-7">
                <h3 className="font-display text-lg text-primary">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{value.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <WhyUs />

      <Section>
        <SectionHeading
          eyebrow="Team"
          headline="The People Who Will Actually Handle Your Matter."
          supporting="The advocate you meet at the consultation is the advocate who stays on the file."
        />

        <div className="mt-14 grid gap-px bg-border sm:grid-cols-2">
          {team.map((member, index) => (
            <Reveal key={member.name} delay={index * 50}>
              <article className="flex h-full flex-col gap-6 bg-background p-8 sm:flex-row">
                <div
                  aria-hidden
                  className="flex h-20 w-20 shrink-0 items-center justify-center border border-border bg-primary font-display text-2xl text-accent"
                >
                  {member.initials}
                </div>
                <div>
                  <h3 className="font-display text-xl text-primary">{member.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-eyebrow text-accent">
                    {member.role}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {member.focus.map((slug) => {
                      const area = getPracticeArea(slug);
                      if (!area) return null;
                      return (
                        <li key={slug}>
                          <Link
                            to={`/practice-areas/${slug}`}
                            className="border border-border px-2 py-1 text-[0.6875rem] uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                          >
                            {area.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  {member.barEnrolment ? (
                    <p className="mt-4 text-xs text-muted-foreground/70">
                      Enrolled with the {member.barEnrolment}
                    </p>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="ink">
        <SectionHeading eyebrow="How We Work" headline="Four Ways Clients Engage Us." tone="dark" />
        <div className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {engagementModel.map((model) => (
            <div key={model.title} className="border-t border-primary-foreground/20 pt-6">
              <h3 className="font-display text-xl text-primary-foreground">{model.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-primary-foreground/65">
                {model.body}
              </p>
            </div>
          ))}
        </div>
        <Button asChild variant="accent" size="lg" className="mt-12">
          <Link to={site.cta.primary.href}>
            {site.cta.primary.label}
            <ArrowRight aria-hidden />
          </Link>
        </Button>
      </Section>
    </>
  );
}

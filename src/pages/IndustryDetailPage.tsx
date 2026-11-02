import { Link, Navigate, useParams } from "react-router-dom";
import { AlertTriangle, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/common/PageHero";
import { Section, SectionHeading } from "@/components/common/Section";
import { Reveal } from "@/components/common/Reveal";
import { BlogCard } from "@/components/common/BlogCard";
import { usePageMeta } from "@/hooks/usePageMeta";
import { getIndustry, industries } from "@/content/industries";
import { getPracticeArea } from "@/content/practiceAreas";
import { site } from "@/content/site";
import { useBlogPosts } from "@/features/blog/useBlogPosts";
import { getIcon } from "@/lib/icons";

export default function IndustryDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const industry = slug ? getIndustry(slug) : undefined;
  const { posts } = useBlogPosts();

  usePageMeta({
    title: industry ? `${industry.title} — ${site.name}` : site.name,
    description: industry?.summary,
  });

  if (!industry) return <Navigate to="/industries" replace />;

  const related = posts.filter((post) => post.industry === industry.slug).slice(0, 3);
  const others = industries.filter((item) => item.slug !== industry.slug);
  // The legal team gave some sectors a longer formal designation than fits in
  // the nav or on a card. The detail page is where it is used in full.
  const fullTitle = industry.titleLong ?? industry.title;

  return (
    <>
      <PageHero
        eyebrow="Industry"
        title={fullTitle}
        lead={industry.intro}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
          { label: industry.title },
        ]}
      >
        <Button asChild variant="accent" size="lg">
          <Link to="/contact">
            {site.cta.primary.label}
            <ArrowRight aria-hidden />
          </Link>
        </Button>
      </PageHero>

      <Section>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow="Typical Legal Needs" headline="What This Sector Requires." />
            <ul className="mt-8 space-y-4">
              {industry.needs.map((need) => (
                <li key={need} className="flex items-start gap-3 border-b border-border pb-4">
                  <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-accent" />
                  <span className="text-[0.9375rem] leading-relaxed text-foreground/85">
                    {need}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionHeading eyebrow="Risk" headline="Where Things Go Wrong." />
            <ul className="mt-8 space-y-4">
              {industry.risks.map((risk) => (
                <li key={risk} className="flex items-start gap-3 border-b border-border pb-4">
                  <AlertTriangle
                    aria-hidden
                    className="mt-1 h-4 w-4 shrink-0 text-destructive/70"
                  />
                  <span className="text-[0.9375rem] leading-relaxed text-foreground/85">
                    {risk}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="sand">
        <SectionHeading eyebrow="Relevant Services" headline={`How We Support ${fullTitle}.`} />
        <div className="mt-12 grid gap-px bg-border sm:grid-cols-2">
          {industry.services.map((service, index) => {
            // Several service names here span two practice areas, so a card
            // links out only where the legal team's naming maps cleanly to one.
            const area = service.slug ? getPracticeArea(service.slug) : undefined;
            const Icon = getIcon(area?.icon ?? "scale");
            const body = (
              <>
                <div className="flex items-start justify-between gap-4">
                  <Icon aria-hidden className="h-6 w-6 text-accent" strokeWidth={1.25} />
                  {area ? (
                    <ArrowUpRight
                      aria-hidden
                      className="h-4 w-4 text-muted-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                    />
                  ) : null}
                </div>
                <h3 className="mt-6 font-display text-xl text-primary">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </>
            );
            return (
              <Reveal key={service.title} delay={index * 40}>
                {area ? (
                  <Link
                    to={`/practice-areas/${area.slug}`}
                    className="group flex h-full flex-col bg-background p-8 transition-colors hover:bg-card"
                  >
                    {body}
                  </Link>
                ) : (
                  <div className="flex h-full flex-col bg-background p-8">{body}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </Section>

      {related.length ? (
        <Section>
          <SectionHeading eyebrow="From the Blog" headline="Written for This Sector." />
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {related.map((post, index) => (
              <Reveal key={post.id} delay={index * 50}>
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}

      <Section tone="ink">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-end lg:gap-20">
          <SectionHeading
            eyebrow="Next Step"
            headline="Tell us what your business is dealing with."
            supporting={site.contact.responsePromise}
            tone="dark"
          />
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Button asChild variant="accent" size="lg">
              <Link to="/contact">{site.cta.primary.label}</Link>
            </Button>
            <Button asChild variant="onDark" size="lg">
              <a href={`tel:${site.contact.phoneHref}`}>Call {site.contact.phone}</a>
            </Button>
          </div>
        </div>

        <div className="mt-16 border-t border-primary-foreground/15 pt-10">
          <p className="eyebrow text-accent">Other Industries</p>
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  to={`/industries/${other.slug}`}
                  className="text-sm text-primary-foreground/65 transition-colors hover:text-accent"
                >
                  {other.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}

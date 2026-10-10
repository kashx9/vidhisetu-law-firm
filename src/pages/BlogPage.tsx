import * as React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { PenLine, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHero } from "@/components/common/PageHero";
import { Section } from "@/components/common/Section";
import { BlogCard } from "@/components/common/BlogCard";
import { CoverArt } from "@/components/common/CoverArt";
import { Reveal } from "@/components/common/Reveal";
import { usePageMeta } from "@/hooks/usePageMeta";
import { blogCategories } from "@/content/blog/categories";
import { industries } from "@/content/industries";
import { site } from "@/content/site";
import { filterPosts, useBlogPosts } from "@/features/blog/useBlogPosts";
import { cn } from "@/lib/utils";

/**
 * Blog listing — search, practice-area (category) filters and industry
 * filters, as the brief requires. Filter state lives in the URL so a filtered
 * view can be linked to and shared.
 */
export default function BlogPage() {
  const [params, setParams] = useSearchParams();
  const { posts, loading } = useBlogPosts();

  const query = params.get("q") ?? "";
  const category = params.get("category") ?? "all";
  const industry = params.get("industry") ?? "all";

  usePageMeta({
    title: `Blog — ${site.name}`,
    description: "Practical legal commentary for business decision-makers.",
  });

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (!value || value === "all") next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const results = React.useMemo(
    () => filterPosts(posts, { query, category, industry }),
    [posts, query, category, industry],
  );

  const hasFilters = query !== "" || category !== "all" || industry !== "all";
  const [lead, ...rest] = results;
  const showLead = !hasFilters && lead;

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Legal Insights for Better Business Decisions."
        lead="Practical commentary on the legal questions our clients ask most often, written for business decision-makers rather than lawyers."
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />

      {/* Filter bar */}
      <div className="sticky top-20 z-20 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto w-full max-w-[1200px] px-6 py-4 md:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-sm">
              <Search
                aria-hidden
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                value={query}
                onChange={(event) => update("q", event.target.value)}
                placeholder="Search the blog"
                aria-label="Search the blog"
                className="pl-9"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => update("q", "")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : null}
            </div>

            <div className="flex items-center gap-3">
              <Select value={industry} onValueChange={(value) => update("industry", value)}>
                <SelectTrigger className="w-[15rem]">
                  <SelectValue placeholder="All industries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All industries</SelectItem>
                  {industries.map((item) => (
                    <SelectItem key={item.slug} value={item.slug}>
                      {item.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button asChild variant="ghost" size="sm" className="hidden shrink-0 lg:inline-flex">
                <Link to="/blog/studio">
                  <PenLine aria-hidden />
                  Blog Studio
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            <FilterChip active={category === "all"} onClick={() => update("category", "all")}>
              All
            </FilterChip>
            {blogCategories.map((item) => (
              <FilterChip
                key={item.slug}
                active={category === item.slug}
                onClick={() => update("category", item.slug)}
              >
                {item.label}
              </FilterChip>
            ))}
          </div>
        </div>
      </div>

      <Section>
        <div className="flex items-baseline justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {loading
              ? "Loading…"
              : `${results.length} ${results.length === 1 ? "article" : "articles"}`}
            {hasFilters ? " matching your filters" : ""}
          </p>
          {hasFilters ? (
            <button
              type="button"
              onClick={() => setParams(new URLSearchParams(), { replace: true })}
              className="text-xs uppercase tracking-eyebrow text-accent hover:underline"
            >
              Clear filters
            </button>
          ) : null}
        </div>

        {!loading && results.length === 0 ? (
          <div className="mt-16 border border-border bg-card px-8 py-20 text-center">
            <p className="font-display text-2xl text-primary">No posts match that search.</p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              Try a broader term, or clear the filters. If you are looking for advice on a specific
              matter, a consultation will get you a faster answer than an article.
            </p>
            <Button asChild className="mt-8">
              <Link to="/contact">{site.cta.primary.label}</Link>
            </Button>
          </div>
        ) : null}

        {showLead ? (
          <Link
            to={`/blog/${lead.slug}`}
            className="group mt-10 grid gap-8 border-b border-border pb-12 md:grid-cols-2 md:items-center md:gap-12"
          >
            <div className="order-2 md:order-1">
              <span className="eyebrow">Latest</span>
              <h2 className="mt-4 font-display text-3xl leading-snug text-primary transition-colors group-hover:text-accent md:text-4xl">
                {lead.title}
              </h2>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted-foreground">
                {lead.excerpt}
              </p>
            </div>
            <div className="order-1 md:order-2">
              <CoverArt
                seed={lead.slug}
                label={lead.cover?.caption}
                image={lead.cover?.image}
                alt={lead.cover?.alt}
                aspect="aspect-[16/11]"
                className="border border-border"
              />
            </div>
          </Link>
        ) : null}

        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {(showLead ? rest : results).map((post, index) => (
            <Reveal key={post.id} delay={index * 40}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "shrink-0 whitespace-nowrap border px-3 py-1.5 text-[0.6875rem] uppercase tracking-eyebrow transition-colors",
        active
          ? "border-accent bg-accent/10 text-accent"
          : "border-border text-muted-foreground hover:border-accent/50 hover:text-accent",
      )}
    >
      {children}
    </button>
  );
}

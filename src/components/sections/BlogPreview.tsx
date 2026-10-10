import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/common/Section";
import { BlogCard } from "@/components/common/BlogCard";
import { Reveal } from "@/components/common/Reveal";
import { blogCategories } from "@/content/blog/categories";
import { sections } from "@/content/homepage";
import { useBlogPosts } from "@/features/blog/useBlogPosts";

/**
 * Section 10 — Blog.
 * Three featured articles in a clean editorial layout, plus the category rail.
 */
export function BlogPreview() {
  const { posts, loading } = useBlogPosts();
  const { blog: copy } = sections;
  const featured = posts.slice(0, 3);

  return (
    <Section>
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading
          eyebrow={copy.eyebrow}
          headline={copy.headline}
          supporting={copy.supporting}
        />
        <Button asChild variant="outline" className="shrink-0">
          <Link to={copy.cta.href}>
            {copy.cta.label}
            <ArrowRight aria-hidden />
          </Link>
        </Button>
      </div>

      <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-y border-border py-4">
        {blogCategories.map((category) => (
          <li key={category.slug}>
            <Link
              to={`/blog?category=${category.slug}`}
              className="text-xs uppercase tracking-eyebrow text-muted-foreground transition-colors hover:text-accent"
            >
              {category.label}
            </Link>
          </li>
        ))}
      </ul>

      {loading ? (
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {[0, 1, 2].map((index) => (
            <div key={index} className="animate-pulse">
              <div className="aspect-[16/10] bg-muted" />
              <div className="mt-6 h-3 w-24 bg-muted" />
              <div className="mt-4 h-5 w-full bg-muted" />
              <div className="mt-2 h-5 w-2/3 bg-muted" />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {featured.map((post, index) => (
            <Reveal key={post.id} delay={index * 60}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}

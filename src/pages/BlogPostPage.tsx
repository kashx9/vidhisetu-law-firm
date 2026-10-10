import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container, Section, SectionHeading } from "@/components/common/Section";
import { CoverArt } from "@/components/common/CoverArt";
import { Markdown } from "@/components/common/Markdown";
import { BlogCard } from "@/components/common/BlogCard";
import { usePageMeta } from "@/hooks/usePageMeta";
import { categoryLabel } from "@/content/blog/categories";
import { getAuthor } from "@/content/blog/authors";
import { getPracticeArea } from "@/content/practiceAreas";
import { getIndustry } from "@/content/industries";
import { site } from "@/content/site";
import { useBlogPost, useBlogPosts } from "@/features/blog/useBlogPosts";
import { formatDate, readingTime } from "@/lib/utils";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { post, loading } = useBlogPost(slug);
  const { posts } = useBlogPosts();

  usePageMeta({
    title: post ? `${post.seo?.title ?? post.title} — ${site.name}` : `Blog — ${site.name}`,
    description: post?.seo?.description ?? post?.excerpt,
  });

  if (loading) {
    return (
      <Container className="py-32">
        <div className="mx-auto max-w-3xl animate-pulse space-y-4">
          <div className="h-3 w-32 bg-muted" />
          <div className="h-10 w-full bg-muted" />
          <div className="h-10 w-2/3 bg-muted" />
        </div>
      </Container>
    );
  }

  // Drafts and archived posts are not publicly readable.
  if (!post || post.status !== "published") return <Navigate to="/blog" replace />;

  const author = getAuthor(post.authorId);
  const practiceArea = post.practiceArea ? getPracticeArea(post.practiceArea) : undefined;
  const industry = post.industry ? getIndustry(post.industry) : undefined;

  const related = posts
    .filter((other) => other.id !== post.id && other.category === post.category)
    .slice(0, 3);

  return (
    <>
      <article>
        <Container className="pt-12 md:pt-16">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-eyebrow text-muted-foreground transition-colors hover:text-accent"
          >
            <ArrowLeft aria-hidden className="h-3.5 w-3.5" />
            All Posts
          </Link>

          <header className="mt-8 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="accent">{categoryLabel(post.category)}</Badge>
              <span className="text-xs text-muted-foreground">
                {formatDate(post.publishedAt)} · {readingTime(post.body)} min read
              </span>
            </div>

            <h1 className="mt-6 font-display text-[2.25rem] leading-[1.15] text-primary md:text-[3rem]">
              {post.title}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>

            {author ? (
              <div className="mt-8 flex items-center gap-4 border-t border-border pt-6">
                <span
                  aria-hidden
                  className="flex h-11 w-11 items-center justify-center border border-border bg-primary font-display text-sm text-accent"
                >
                  {author.initials}
                </span>
                <div>
                  <p className="text-sm font-medium text-primary">{author.name}</p>
                  <p className="text-xs text-muted-foreground">{author.role}</p>
                </div>
              </div>
            ) : null}
          </header>
        </Container>

        <Container className="mt-12">
          <CoverArt
            seed={post.slug}
            label={post.cover?.caption}
            image={post.cover?.image}
            alt={post.cover?.alt}
            aspect="aspect-[21/9]"
            className="border border-border"
          />
        </Container>

        <Container className="py-14 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
            <div className="min-w-0 max-w-[68ch]">
              <Markdown>{post.body}</Markdown>

              {post.tags.length ? (
                <ul className="mt-12 flex flex-wrap gap-2 border-t border-border pt-8">
                  {post.tags.map((tag) => (
                    <li
                      key={tag}
                      className="border border-border px-2.5 py-1 text-[0.6875rem] uppercase tracking-[0.1em] text-muted-foreground"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              ) : null}

              <p className="mt-10 border-l-2 border-accent bg-secondary/40 p-6 text-xs leading-relaxed text-muted-foreground">
                This article is general commentary and not legal advice. It does not take account of
                your circumstances, and it should not be relied on without advice on the specific
                matter. {site.disclaimer}
              </p>
            </div>

            <aside className="space-y-8 lg:sticky lg:top-32 lg:self-start">
              {practiceArea ? (
                <div className="border border-border bg-card p-6">
                  <p className="eyebrow text-accent">Related Practice</p>
                  <h2 className="mt-4 font-display text-lg text-primary">
                    {practiceArea.headline}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {practiceArea.summary}
                  </p>
                  <Button asChild variant="outline" size="sm" className="mt-5 w-full">
                    <Link to={`/practice-areas/${practiceArea.slug}`}>View practice area</Link>
                  </Button>
                </div>
              ) : null}

              {industry ? (
                <div className="border border-border bg-card p-6">
                  <p className="eyebrow text-accent">Sector</p>
                  <h2 className="mt-4 font-display text-lg text-primary">{industry.title}</h2>
                  <Button asChild variant="outline" size="sm" className="mt-5 w-full">
                    <Link to={`/industries/${industry.slug}`}>View industry page</Link>
                  </Button>
                </div>
              ) : null}

              <div className="border border-border bg-primary p-6 text-primary-foreground">
                <p className="eyebrow text-accent">Have a matter like this?</p>
                <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">
                  A thirty-minute consultation will tell you whether this needs legal work, and what
                  that work involves.
                </p>
                <Button asChild variant="accent" size="sm" className="mt-5 w-full">
                  <Link to="/contact">{site.cta.primary.label}</Link>
                </Button>
              </div>
            </aside>
          </div>
        </Container>
      </article>

      {related.length ? (
        <Section tone="sand">
          <SectionHeading eyebrow="More in this area" headline={categoryLabel(post.category)} />
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {related.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          <Button asChild variant="outline" size="lg" className="mt-12">
            <Link to="/blog">
              View All Posts
              <ArrowRight aria-hidden />
            </Link>
          </Button>
        </Section>
      ) : null}
    </>
  );
}

import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { CoverArt } from "@/components/common/CoverArt";
import { categoryLabel } from "@/content/blog/categories";
import { getAuthor } from "@/content/blog/authors";
import { formatDate, readingTime } from "@/lib/utils";
import type { BlogPost } from "@/features/blog/types";

/** Standard article card, used on the homepage, the listing and related rails. */
export function BlogCard({
  post,
  variant = "default",
}: {
  post: BlogPost;
  variant?: "default" | "lead";
}) {
  const author = getAuthor(post.authorId);
  const isLead = variant === "lead";

  return (
    <article className="group h-full">
      <Link to={`/blog/${post.slug}`} className="flex h-full flex-col">
        <CoverArt
          seed={post.slug}
          label={post.cover?.caption}
          image={post.cover?.image}
          alt={post.cover?.alt}
          aspect={isLead ? "aspect-[16/9]" : "aspect-[16/10]"}
          className="border border-border"
        />

        <div className="flex flex-1 flex-col pt-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="accent">{categoryLabel(post.category)}</Badge>
            <span className="text-xs text-muted-foreground">
              {formatDate(post.publishedAt)} · {readingTime(post.body)} min read
            </span>
          </div>

          <h3
            className={
              isLead
                ? "mt-4 font-display text-2xl leading-snug text-primary transition-colors group-hover:text-accent md:text-3xl"
                : "mt-4 font-display text-xl leading-snug text-primary transition-colors group-hover:text-accent"
            }
          >
            {post.title}
          </h3>

          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>

          {author ? (
            <p className="mt-5 border-t border-border pt-4 text-xs text-muted-foreground">
              {author.name} · {author.role}
            </p>
          ) : null}
        </div>
      </Link>
    </article>
  );
}

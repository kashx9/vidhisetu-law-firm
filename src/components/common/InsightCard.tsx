import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { CoverArt } from "@/components/common/CoverArt";
import { categoryLabel } from "@/content/insights/categories";
import { getAuthor } from "@/content/insights/authors";
import { formatDate, readingTime } from "@/lib/utils";
import type { Insight } from "@/features/blog/types";

/** Standard article card, used on the homepage, the listing and related rails. */
export function InsightCard({
  insight,
  variant = "default",
}: {
  insight: Insight;
  variant?: "default" | "lead";
}) {
  const author = getAuthor(insight.authorId);
  const isLead = variant === "lead";

  return (
    <article className="group h-full">
      <Link to={`/insights/${insight.slug}`} className="flex h-full flex-col">
        <CoverArt
          seed={insight.slug}
          label={insight.cover?.caption}
          image={insight.cover?.image}
          alt={insight.cover?.alt}
          aspect={isLead ? "aspect-[16/9]" : "aspect-[16/10]"}
          className="border border-border"
        />

        <div className="flex flex-1 flex-col pt-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="accent">{categoryLabel(insight.category)}</Badge>
            <span className="text-xs text-muted-foreground">
              {formatDate(insight.publishedAt)} · {readingTime(insight.body)} min read
            </span>
          </div>

          <h3
            className={
              isLead
                ? "mt-4 font-display text-2xl leading-snug text-primary transition-colors group-hover:text-accent md:text-3xl"
                : "mt-4 font-display text-xl leading-snug text-primary transition-colors group-hover:text-accent"
            }
          >
            {insight.title}
          </h3>

          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
            {insight.excerpt}
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

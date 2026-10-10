import * as React from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Download, Eye, Plus, RotateCcw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Container } from "@/components/common/Section";
import { StudioGate } from "@/pages/studio/StudioGate";
import { usePageMeta } from "@/hooks/usePageMeta";
import { categoryLabel } from "@/content/blog/categories";
import { getAuthor } from "@/content/blog/authors";
import { site } from "@/content/site";
import { exportPosts, postRepository, resetLocalPosts } from "@/features/blog/blogStore";
import {
  statusLabels,
  statusTransitions,
  type BlogPost,
  type PostStatus,
} from "@/features/blog/types";
import { useBlogPosts } from "@/features/blog/useBlogPosts";
import { canPublish, currentSession } from "@/features/blog/auth";
import { formatDate } from "@/lib/utils";

/**
 * BLOG STUDIO — the authoring dashboard.
 * Lists every post in every state and drives the draft → review → publish flow.
 */
export default function StudioPage() {
  usePageMeta({ title: `Blog Studio — ${site.name}` });
  return (
    <StudioGate>
      <StudioDashboard />
    </StudioGate>
  );
}

function StudioDashboard() {
  const { posts, loading } = useBlogPosts({ includeUnpublished: true });
  const [filter, setFilter] = React.useState<PostStatus | "all">("all");
  const [query, setQuery] = React.useState("");
  const session = currentSession();
  const mayPublish = canPublish();

  const counts = React.useMemo(() => {
    const base: Record<string, number> = { all: posts.length };
    for (const post of posts) base[post.status] = (base[post.status] ?? 0) + 1;
    return base;
  }, [posts]);

  const visible = posts.filter((post) => {
    if (filter !== "all" && post.status !== filter) return false;
    if (!query.trim()) return true;
    return post.title.toLowerCase().includes(query.trim().toLowerCase());
  });

  const move = async (post: BlogPost, status: PostStatus) => {
    if (status === "published" && !mayPublish) {
      toast.error("Only an editor can publish.", {
        description: "Ask an editor to publish it, or sign in with an editor account.",
      });
      return;
    }
    await postRepository.setStatus(post.id, status);
    toast.success(`"${post.title}" moved to ${statusLabels[status].toLowerCase()}.`);
  };

  const remove = async (post: BlogPost) => {
    if (!mayPublish) {
      toast.error("Only an editor can delete a post.");
      return;
    }
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone from the Studio.`)) return;
    await postRepository.remove(post.id);
    toast.success("BlogPost deleted.");
  };

  const exportJson = async () => {
    const json = await exportPosts();
    await navigator.clipboard.writeText(json).catch(() => undefined);
    toast.success("Blog JSON copied to clipboard.", {
      description: "Paste it into src/content/blog/posts.ts or POST it to your CMS.",
    });
  };

  return (
    <Container className="py-12 md:py-16">
      <header className="flex flex-col gap-6 border-b border-border pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Blog Studio</p>
          <h1 className="mt-3 font-display text-3xl text-primary md:text-4xl">
            Write, review and publish.
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {session?.role === "editor"
              ? "As an editor you can write, publish, archive and delete posts."
              : "As an author you can write and edit drafts, and send them to an editor for review."}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="ghost" size="sm" onClick={exportJson}>
            <Download aria-hidden />
            Export JSON
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (
                window.confirm("Discard all Studio drafts and edits, and restore seeded posts?")
              ) {
                resetLocalPosts();
                toast.success("Studio content reset to the seeded posts.");
              }
            }}
          >
            <RotateCcw aria-hidden />
            Reset
          </Button>
          <Button asChild size="sm">
            <Link to="/blog/studio/new">
              <Plus aria-hidden />
              New post
            </Link>
          </Button>
        </div>
      </header>

      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {(["all", "draft", "in_review", "published", "archived"] as const).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setFilter(status)}
              aria-pressed={filter === status}
              className={
                filter === status
                  ? "border border-accent bg-accent/10 px-3 py-1.5 text-[0.6875rem] uppercase tracking-eyebrow text-accent"
                  : "border border-border px-3 py-1.5 text-[0.6875rem] uppercase tracking-eyebrow text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent"
              }
            >
              {status === "all" ? "All" : statusLabels[status]}
              <span className="ml-2 opacity-60">{counts[status] ?? 0}</span>
            </button>
          ))}
        </div>

        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Filter by title"
          className="lg:max-w-xs"
          aria-label="Filter by title"
        />
      </div>

      <div className="mt-8 overflow-x-auto border border-border">
        <table className="w-full min-w-[52rem] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/60 text-left">
              <th className="px-5 py-3 text-[0.6875rem] uppercase tracking-eyebrow text-muted-foreground">
                Title
              </th>
              <th className="px-5 py-3 text-[0.6875rem] uppercase tracking-eyebrow text-muted-foreground">
                Category
              </th>
              <th className="px-5 py-3 text-[0.6875rem] uppercase tracking-eyebrow text-muted-foreground">
                Author
              </th>
              <th className="px-5 py-3 text-[0.6875rem] uppercase tracking-eyebrow text-muted-foreground">
                Date
              </th>
              <th className="px-5 py-3 text-[0.6875rem] uppercase tracking-eyebrow text-muted-foreground">
                Status
              </th>
              <th className="px-5 py-3 text-right text-[0.6875rem] uppercase tracking-eyebrow text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center text-muted-foreground">
                  Loading…
                </td>
              </tr>
            ) : visible.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center text-muted-foreground">
                  Nothing here yet.
                </td>
              </tr>
            ) : (
              visible.map((post) => (
                <tr key={post.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-4">
                    <Link
                      to={`/blog/studio/${post.id}`}
                      className="font-medium text-primary hover:text-accent"
                    >
                      {post.title}
                    </Link>
                    <span className="mt-1 block text-xs text-muted-foreground">/{post.slug}</span>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">
                    {categoryLabel(post.category)}
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">
                    {getAuthor(post.authorId)?.name ?? "—"}
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">
                    {formatDate(post.publishedAt)}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={post.status} />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap items-center justify-end gap-2">
                      {post.status === "published" ? (
                        <Button asChild variant="ghost" size="sm">
                          <Link to={`/blog/${post.slug}`}>
                            <Eye aria-hidden />
                            View
                          </Link>
                        </Button>
                      ) : null}
                      {statusTransitions[post.status].map((next) => (
                        <Button
                          key={next}
                          variant={next === "published" ? "accent" : "outline"}
                          size="sm"
                          onClick={() => void move(post, next)}
                        >
                          {next === "in_review"
                            ? "Send for review"
                            : next === "published"
                              ? "Publish"
                              : next === "draft"
                                ? "Back to draft"
                                : "Archive"}
                        </Button>
                      ))}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => void remove(post)}
                        aria-label={`Delete ${post.title}`}
                      >
                        <Trash2 aria-hidden className="text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-10 border border-border bg-secondary/40 p-6">
        <h2 className="font-display text-lg text-primary">How publishing works</h2>
        <ol className="mt-4 grid gap-3 text-sm leading-relaxed text-muted-foreground md:grid-cols-2">
          <li>
            <strong className="text-primary">1. Draft.</strong> An author writes in the editor.
            Nothing is public.
          </li>
          <li>
            <strong className="text-primary">2. Review.</strong> "Send for review" hands it to an
            editor.
          </li>
          <li>
            <strong className="text-primary">3. Publish.</strong> An editor publishes; the post
            appears on /blog and the homepage immediately.
          </li>
          <li>
            <strong className="text-primary">4. Archive.</strong> Retires a post without deleting
            it.
          </li>
        </ol>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          Content is currently stored in this browser only. See{" "}
          <code className="rounded-sm bg-muted px-1.5 py-0.5">src/features/blog/blogStore.ts</code>{" "}
          to point the same interface at a real backend.
        </p>
      </div>
    </Container>
  );
}

export function StatusBadge({ status }: { status: PostStatus }) {
  const variant = status === "published" ? "accent" : status === "in_review" ? "solid" : "outline";
  return <Badge variant={variant}>{statusLabels[status]}</Badge>;
}

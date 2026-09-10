import * as React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, ImageIcon, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Container } from "@/components/common/Section";
import { Markdown } from "@/components/common/Markdown";
import { CoverArt } from "@/components/common/CoverArt";
import { StudioGate } from "@/pages/studio/StudioGate";
import { StatusBadge } from "@/pages/studio/StudioPage";
import { usePageMeta } from "@/hooks/usePageMeta";
import { insightCategories } from "@/content/insights/categories";
import { authors } from "@/content/insights/authors";
import { industries } from "@/content/industries";
import { practiceAreas } from "@/content/practiceAreas";
import { site } from "@/content/site";
import { insightRepository } from "@/features/blog/blogStore";
import { canPublish, currentSession } from "@/features/blog/auth";
import type { Insight, InsightStatus } from "@/features/blog/types";
import { readingTime, slugify } from "@/lib/utils";

/** Cover images are inlined as data URLs, so keep them small. */
const MAX_COVER_BYTES = 1_500_000;

const NONE = "__none__";

const blankInsight = (authorId: string): Insight => ({
  id: "",
  slug: "",
  title: "",
  excerpt: "",
  body: "## Start here\n\nWrite the article in Markdown. Headings, lists, tables, quotes and links all render on the published page.\n",
  category: insightCategories[0].slug,
  tags: [],
  authorId,
  publishedAt: new Date().toISOString().slice(0, 10),
  status: "draft",
  featured: false,
  cover: { alt: "", caption: "" },
});

export default function StudioEditorPage() {
  usePageMeta({ title: `Insights Studio — ${site.name}` });
  return (
    <StudioGate>
      <Editor />
    </StudioGate>
  );
}

function Editor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const session = currentSession();
  const mayPublish = canPublish();
  const isNew = !id || id === "new";

  const [draft, setDraft] = React.useState<Insight>(() =>
    blankInsight(session?.authorId ?? authors[0].id),
  );
  const [loading, setLoading] = React.useState(!isNew);
  const [slugLocked, setSlugLocked] = React.useState(!isNew);
  const [saving, setSaving] = React.useState(false);
  const [tagInput, setTagInput] = React.useState("");

  React.useEffect(() => {
    if (isNew) return;
    void insightRepository.findById(id!).then((found) => {
      if (found) {
        setDraft(found);
        setTagInput(found.tags.join(", "));
      }
      setLoading(false);
    });
  }, [id, isNew]);

  const set = <K extends keyof Insight>(key: K, value: Insight[K]) =>
    setDraft((current) => ({ ...current, [key]: value }));

  const onTitleChange = (title: string) => {
    setDraft((current) => ({
      ...current,
      title,
      slug: slugLocked ? current.slug : slugify(title),
    }));
  };

  const onCoverUpload = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file.");
      return;
    }
    if (file.size > MAX_COVER_BYTES) {
      toast.error("That image is too large.", {
        description: "Cover images must be under 1.5 MB. Compress it and try again.",
      });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setDraft((current) => ({
        ...current,
        cover: { ...current.cover, image: String(reader.result), alt: current.cover?.alt ?? "" },
      }));
      toast.success("Cover image attached.");
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    if (draft.title.trim().length < 6) return "Give the article a title.";
    if (draft.excerpt.trim().length < 20)
      return "Write a one-line excerpt — it appears on every card.";
    if (draft.body.trim().length < 100) return "The body is still very short.";
    if (draft.cover?.image && !draft.cover.alt?.trim())
      return "Add alt text describing the cover image.";
    return null;
  };

  const persist = async (status: InsightStatus) => {
    const problem = validate();
    if (problem) {
      toast.error(problem);
      return;
    }
    if (status === "published" && !mayPublish) {
      toast.error("Only an editor can publish.");
      return;
    }

    setSaving(true);
    try {
      const saved = await insightRepository.save({
        ...draft,
        id: draft.id || undefined,
        slug: draft.slug || slugify(draft.title),
        status,
        tags: tagInput
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      });
      toast.success(
        status === "published"
          ? "Published. It is live on /insights now."
          : status === "in_review"
            ? "Sent for review."
            : "Draft saved.",
      );
      navigate(`/insights/studio/${saved.id}`, { replace: true });
      setDraft(saved);
    } catch (error) {
      toast.error("Could not save.", { description: String(error) });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-24">
        <p className="text-sm text-muted-foreground">Loading…</p>
      </Container>
    );
  }

  return (
    <Container className="py-10 md:py-14">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <Link
            to="/insights/studio"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-eyebrow text-muted-foreground transition-colors hover:text-accent"
          >
            <ArrowLeft aria-hidden className="h-3.5 w-3.5" />
            All insights
          </Link>
          <h1 className="mt-4 font-display text-2xl text-primary md:text-3xl">
            {isNew ? "New insight" : "Edit insight"}
          </h1>
          <p className="mt-2 text-xs text-muted-foreground">
            {draft.body.trim().split(/\s+/).filter(Boolean).length} words ·{" "}
            {readingTime(draft.body)} min read
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={draft.status} />
          <Button
            variant="outline"
            size="sm"
            disabled={saving}
            onClick={() => void persist("draft")}
          >
            Save draft
          </Button>
          <Button
            variant="subtle"
            size="sm"
            disabled={saving}
            onClick={() => void persist("in_review")}
          >
            Send for review
          </Button>
          <Button
            variant="accent"
            size="sm"
            disabled={saving || !mayPublish}
            onClick={() => void persist("published")}
            title={mayPublish ? undefined : "Editors only"}
          >
            Publish
          </Button>
        </div>
      </div>

      <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
        {/* ─────────────────────────── main column ─────────────────────────── */}
        <div className="min-w-0 space-y-8">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={draft.title}
              onChange={(event) => onTitleChange(event.target.value)}
              placeholder="What should this article be called?"
              className="h-12 font-display text-lg"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="slug">URL slug</Label>
              <label className="flex items-center gap-2 text-xs text-muted-foreground">
                <Checkbox
                  checked={slugLocked}
                  onCheckedChange={(checked) => setSlugLocked(checked === true)}
                />
                Edit manually
              </label>
            </div>
            <Input
              id="slug"
              value={draft.slug}
              disabled={!slugLocked}
              onChange={(event) => set("slug", slugify(event.target.value))}
            />
            <p className="text-xs text-muted-foreground">
              /insights/{draft.slug || "your-article-slug"}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={draft.excerpt}
              onChange={(event) => set("excerpt", event.target.value)}
              rows={3}
              placeholder="One or two sentences. This is what appears on cards and in search results."
            />
          </div>

          <div>
            <Tabs defaultValue="write">
              <div className="flex items-center justify-between gap-4">
                <TabsList>
                  <TabsTrigger value="write">Write</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <span className="text-xs text-muted-foreground">Markdown supported</span>
              </div>

              <TabsContent value="write">
                <Textarea
                  value={draft.body}
                  onChange={(event) => set("body", event.target.value)}
                  rows={26}
                  className="font-mono text-[0.8125rem] leading-relaxed"
                  spellCheck
                />
              </TabsContent>

              <TabsContent value="preview">
                <div className="border border-border bg-card p-8">
                  <h2 className="font-display text-3xl leading-snug text-primary">
                    {draft.title || "Untitled"}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {draft.excerpt}
                  </p>
                  <div className="mt-8 border-t border-border pt-8">
                    <Markdown>{draft.body}</Markdown>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* ──────────────────────────── sidebar ────────────────────────────── */}
        <aside className="space-y-6">
          <Panel title="Classification">
            <Field label="Category">
              <Select value={draft.category} onValueChange={(value) => set("category", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {insightCategories.map((category) => (
                    <SelectItem key={category.slug} value={category.slug}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field label="Practice area (optional)">
              <Select
                value={draft.practiceArea ?? NONE}
                onValueChange={(value) => set("practiceArea", value === NONE ? undefined : value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="None" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={NONE}>None</SelectItem>
                  {practiceAreas.map((area) => (
                    <SelectItem key={area.slug} value={area.slug}>
                      {area.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field label="Industry (optional)">
              <Select
                value={draft.industry ?? NONE}
                onValueChange={(value) => set("industry", value === NONE ? undefined : value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="None" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={NONE}>None</SelectItem>
                  {industries.map((industry) => (
                    <SelectItem key={industry.slug} value={industry.slug}>
                      {industry.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field label="Tags">
              <Input
                value={tagInput}
                onChange={(event) => setTagInput(event.target.value)}
                placeholder="term sheet, fundraising"
              />
              <p className="mt-1.5 text-xs text-muted-foreground">Comma separated.</p>
            </Field>
          </Panel>

          <Panel title="Publication">
            <Field label="Author">
              <Select value={draft.authorId} onValueChange={(value) => set("authorId", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {authors.map((author) => (
                    <SelectItem key={author.id} value={author.id}>
                      {author.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field label="Publication date">
              <Input
                type="date"
                value={draft.publishedAt.slice(0, 10)}
                onChange={(event) => set("publishedAt", event.target.value)}
              />
            </Field>

            <label className="flex items-start gap-3 pt-1">
              <Checkbox
                checked={draft.featured}
                onCheckedChange={(checked) => set("featured", checked === true)}
              />
              <span className="text-xs leading-relaxed text-muted-foreground">
                Feature this article — it takes the lead position on the Insights page.
              </span>
            </label>
          </Panel>

          <Panel title="Cover">
            <CoverArt
              seed={draft.slug || "preview"}
              label={draft.cover?.caption}
              image={draft.cover?.image}
              alt={draft.cover?.alt}
              className="border border-border"
            />

            <div className="mt-4 flex flex-wrap gap-2">
              <label className="inline-flex cursor-pointer items-center gap-2 border border-border px-3 py-2 text-xs text-primary transition-colors hover:border-accent hover:text-accent">
                <Upload aria-hidden className="h-3.5 w-3.5" />
                Upload image
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(event) => onCoverUpload(event.target.files?.[0])}
                />
              </label>
              {draft.cover?.image ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    set("cover", { ...draft.cover, image: undefined, alt: draft.cover?.alt ?? "" })
                  }
                >
                  <Trash2 aria-hidden />
                  Remove
                </Button>
              ) : null}
            </div>

            <p className="mt-2 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
              <ImageIcon aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              Under 1.5 MB. With no image, the generated editorial artwork above is used.
            </p>

            <div className="mt-4 space-y-4">
              <Field label="Alt text">
                <Input
                  value={draft.cover?.alt ?? ""}
                  onChange={(event) => set("cover", { ...draft.cover, alt: event.target.value })}
                  placeholder="Describe the image"
                />
              </Field>
              <Field label="Caption label">
                <Input
                  value={draft.cover?.caption ?? ""}
                  onChange={(event) =>
                    set("cover", {
                      ...draft.cover,
                      alt: draft.cover?.alt ?? "",
                      caption: event.target.value,
                    })
                  }
                  placeholder="Fundraising"
                />
              </Field>
            </div>
          </Panel>

          <Panel title="SEO">
            <Field label="Meta title">
              <Input
                value={draft.seo?.title ?? ""}
                onChange={(event) => set("seo", { ...draft.seo, title: event.target.value })}
                placeholder="Defaults to the article title"
              />
            </Field>
            <Field label="Meta description">
              <Textarea
                value={draft.seo?.description ?? ""}
                onChange={(event) => set("seo", { ...draft.seo, description: event.target.value })}
                rows={3}
                placeholder="Defaults to the excerpt"
              />
            </Field>
          </Panel>
        </aside>
      </div>
    </Container>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border border-border bg-card p-5">
      <h2 className="eyebrow text-accent">{title}</h2>
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

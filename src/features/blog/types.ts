/**
 * Shared types for the blog subsystem.
 *
 * The same `BlogPost` shape is used by the published mock data in
 * src/content/blog/posts.ts and by the authoring flow in the Blog Studio,
 * so a drafted post and a seeded post are indistinguishable to the
 * rendering layer.
 */

/** A post moves left to right. Only `published` posts appear on public pages. */
export type PostStatus = "draft" | "in_review" | "published" | "archived";

export const statusLabels: Record<PostStatus, string> = {
  draft: "Draft",
  in_review: "In review",
  published: "Published",
  archived: "Archived",
};

/** Which transitions the UI offers from each state. */
export const statusTransitions: Record<PostStatus, PostStatus[]> = {
  draft: ["in_review"],
  in_review: ["published", "draft"],
  published: ["archived"],
  archived: ["draft"],
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  /** One or two sentences. Used on cards, listings and meta description. */
  excerpt: string;
  /** Markdown. Rendered with react-markdown + remark-gfm. */
  body: string;

  /** Category slug from src/content/blog/categories.ts. */
  category: string;
  /** Optional industry slug from src/content/industries.ts. */
  industry?: string;
  /** Optional practice-area slug — cross-links the post to a service page. */
  practiceArea?: string;
  tags: string[];

  /** Author id from src/content/blog/authors.ts. */
  authorId: string;

  /** ISO date. Sorting and display both use this. */
  publishedAt: string;
  updatedAt?: string;

  status: PostStatus;
  /** At most one or two posts should carry this; it drives the lead card. */
  featured: boolean;

  /** Cover image. `image` may be a URL or a data URL from the upload field. */
  cover?: {
    image?: string;
    alt: string;
    /** Fallback used when no image is set — see CoverArt component. */
    caption?: string;
  };

  seo?: {
    title?: string;
    description?: string;
  };

  /** Set by the store on records created through the Studio. */
  source?: "seed" | "studio";
};

/** The subset of fields the Studio editor collects. */
export type BlogPostDraft = Omit<BlogPost, "id" | "source"> & { id?: string };

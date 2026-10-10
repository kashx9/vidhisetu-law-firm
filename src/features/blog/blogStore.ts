/**
 * ════════════════════════════════════════════════════════════════════════════
 *  BLOG STORE — how a blog post gets from an author's head onto the site
 * ════════════════════════════════════════════════════════════════════════════
 *
 *  PUBLISHING FLOW
 *  ───────────────
 *  1. An author opens  /blog/studio  and clicks "New post".
 *  2. They fill in the editor (title, category, cover, markdown body) and can
 *     preview it exactly as it will appear on the public page.
 *  3. Saving stores it as a `draft`.
 *  4. "Send for review" moves it to `in_review`.
 *  5. A reviewer publishes it — status `published`, and it appears immediately
 *     on /blog and in the homepage blog section.
 *  6. `archived` retires a post without deleting it.
 *
 *  Only `published` posts are ever returned to public pages. Drafts and
 *  in-review posts exist only inside the Studio.
 *
 *  WHERE THE DATA LIVES
 *  ────────────────────
 *  Everything goes through the `BlogPostRepository` interface below, so the
 *  storage layer is swappable without touching a single component:
 *
 *    LocalDraftRepository  (default, active now)
 *        Seeded posts from src/content/blog/posts.ts, with anything
 *        created or edited in the Studio layered on top in localStorage.
 *        Nothing leaves the browser. Editing posts.ts never destroys drafts,
 *        and clearing drafts never destroys posts.ts.
 *
 *    HttpRepository  (stubbed, for later)
 *        Point VITE_BLOG_API at a real endpoint and set
 *        VITE_BLOG_BACKEND=http. The five methods below are the entire
 *        contract your backend needs to satisfy — a CMS, a headless API, or
 *        an Odoo endpoint would all fit behind it.
 *
 *  AUTHENTICATION
 *  ──────────────
 *  The Studio is gated by `canAuthor()` in src/features/blog/auth.ts, which is
 *  currently a mock. Replace that one function with a real session check and
 *  the whole authoring surface is protected.
 */

import { seedPosts } from "@/content/blog/posts";
import { slugify } from "@/lib/utils";
import type { BlogPost, BlogPostDraft, PostStatus } from "./types";

const STORAGE_KEY = "vidhisetu.blog.posts.v1";

export interface BlogPostRepository {
  /** Every record, including drafts. Studio only. */
  listAll(): Promise<BlogPost[]>;
  /** Published records only, newest first. Public pages. */
  listPublished(): Promise<BlogPost[]>;
  findBySlug(slug: string): Promise<BlogPost | null>;
  findById(id: string): Promise<BlogPost | null>;
  /** Creates when `id` is absent, updates when present. */
  save(input: BlogPostDraft): Promise<BlogPost>;
  setStatus(id: string, status: PostStatus): Promise<BlogPost>;
  remove(id: string): Promise<void>;
}

/* ────────────────────────────── change events ────────────────────────────── */

type Listener = () => void;
const listeners = new Set<Listener>();

export function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const emit = () => listeners.forEach((listener) => listener());

/* ─────────────────────────── local (mock) backend ────────────────────────── */

type LocalState = {
  /** Records created in the Studio. */
  created: BlogPost[];
  /** Edits applied to seeded records, keyed by seed id. */
  overrides: Record<string, Partial<BlogPost>>;
  /** Seed ids the author has deleted from the Studio. */
  deleted: string[];
};

const emptyState: LocalState = { created: [], overrides: {}, deleted: [] };

function readState(): LocalState {
  if (typeof window === "undefined") return emptyState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState;
    return { ...emptyState, ...(JSON.parse(raw) as LocalState) };
  } catch {
    // Corrupt or unavailable storage must never break the public site.
    return emptyState;
  }
}

function writeState(state: LocalState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn("[blog] could not persist to localStorage", error);
  }
  emit();
}

/** Seeds + created records, with overrides applied and deletions removed. */
function materialise(state: LocalState): BlogPost[] {
  const seeds = seedPosts
    .filter((post) => !state.deleted.includes(post.id))
    .map((post) => ({ ...post, ...(state.overrides[post.id] ?? {}) }));
  return [...seeds, ...state.created];
}

const byNewest = (a: BlogPost, b: BlogPost) =>
  new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();

class LocalDraftRepository implements BlogPostRepository {
  async listAll() {
    return materialise(readState()).sort(byNewest);
  }

  async listPublished() {
    return materialise(readState())
      .filter((post) => post.status === "published")
      .sort(byNewest);
  }

  async findBySlug(slug: string) {
    return materialise(readState()).find((post) => post.slug === slug) ?? null;
  }

  async findById(id: string) {
    return materialise(readState()).find((post) => post.id === id) ?? null;
  }

  async save(input: BlogPostDraft) {
    const state = readState();
    const now = new Date().toISOString();

    // Updating an existing record.
    if (input.id) {
      const seed = seedPosts.find((post) => post.id === input.id);
      if (seed) {
        const { id: _ignored, ...patch } = input;
        state.overrides[input.id] = { ...patch, updatedAt: now };
        writeState(state);
        return { ...seed, ...state.overrides[input.id] } as BlogPost;
      }

      const index = state.created.findIndex((post) => post.id === input.id);
      if (index >= 0) {
        const updated: BlogPost = {
          ...state.created[index],
          ...input,
          id: input.id,
          updatedAt: now,
          source: "studio",
        };
        state.created[index] = updated;
        writeState(state);
        return updated;
      }
    }

    // Creating a new record.
    const created: BlogPost = {
      ...input,
      id: `studio-${Date.now().toString(36)}`,
      slug: input.slug || slugify(input.title),
      updatedAt: now,
      source: "studio",
    };
    state.created.push(created);
    writeState(state);
    return created;
  }

  async setStatus(id: string, status: PostStatus) {
    const existing = await this.findById(id);
    if (!existing) throw new Error(`BlogPost ${id} not found`);
    // Publishing stamps the date so the post sorts correctly in the listing.
    const publishedAt =
      status === "published" && existing.status !== "published"
        ? new Date().toISOString().slice(0, 10)
        : existing.publishedAt;
    return this.save({ ...existing, status, publishedAt });
  }

  async remove(id: string) {
    const state = readState();
    if (seedPosts.some((post) => post.id === id)) {
      state.deleted.push(id);
      delete state.overrides[id];
    } else {
      state.created = state.created.filter((post) => post.id !== id);
    }
    writeState(state);
  }
}

/** Drops every Studio edit and returns the site to the seeded posts. */
export function resetLocalPosts() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
  emit();
}

/** Exports Studio content as JSON, ready to be pasted into posts.ts or POSTed. */
export async function exportPosts() {
  const all = await postRepository.listAll();
  return JSON.stringify(all, null, 2);
}

/* ──────────────────────────── http backend (stub) ─────────────────────────── */

class HttpRepository implements BlogPostRepository {
  constructor(private readonly baseUrl: string) {}

  private async request<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...init,
    });
    if (!response.ok) throw new Error(`Blog API ${response.status}: ${response.statusText}`);
    return (await response.json()) as T;
  }

  listAll() {
    return this.request<BlogPost[]>("/blog");
  }
  listPublished() {
    return this.request<BlogPost[]>("/posts?status=published");
  }
  findBySlug(slug: string) {
    return this.request<BlogPost | null>(`/blog/by-slug/${slug}`);
  }
  findById(id: string) {
    return this.request<BlogPost | null>(`/blog/${id}`);
  }
  async save(input: BlogPostDraft) {
    const result = await this.request<BlogPost>(input.id ? `/blog/${input.id}` : "/blog", {
      method: input.id ? "PUT" : "POST",
      body: JSON.stringify(input),
    });
    emit();
    return result;
  }
  async setStatus(id: string, status: PostStatus) {
    const result = await this.request<BlogPost>(`/blog/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    emit();
    return result;
  }
  async remove(id: string) {
    await this.request<void>(`/blog/${id}`, { method: "DELETE" });
    emit();
  }
}

/* ───────────────────────────────── selection ─────────────────────────────── */

function createRepository(): BlogPostRepository {
  const backend = import.meta.env.VITE_BLOG_BACKEND;
  const apiUrl = import.meta.env.VITE_BLOG_API;
  if (backend === "http" && apiUrl) return new HttpRepository(apiUrl);
  return new LocalDraftRepository();
}

export const postRepository = createRepository();

/**
 * React bindings for the blog post repository.
 * Components never talk to the store directly — they use these hooks, so
 * swapping the backend stays invisible to the UI.
 */

import * as React from "react";
import { postRepository, subscribe } from "./blogStore";
import type { BlogPost } from "./types";

type Query = { includeUnpublished?: boolean };

export function useBlogPosts({ includeUnpublished = false }: Query = {}) {
  const [posts, setPosts] = React.useState<BlogPost[]>([]);
  const [loading, setLoading] = React.useState(true);

  const load = React.useCallback(async () => {
    const data = includeUnpublished
      ? await postRepository.listAll()
      : await postRepository.listPublished();
    setPosts(data);
    setLoading(false);
  }, [includeUnpublished]);

  React.useEffect(() => {
    void load();
    const unsubscribe = subscribe(() => void load());
    return () => {
      unsubscribe();
    };
  }, [load]);

  return { posts, loading, reload: load };
}

export function useBlogPost(slug: string | undefined) {
  const [post, setPost] = React.useState<BlogPost | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let active = true;
    if (!slug) {
      setPost(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    void postRepository.findBySlug(slug).then((result) => {
      if (!active) return;
      setPost(result);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [slug]);

  return { post, loading };
}

export function useBlogPostById(id: string | undefined) {
  const [post, setPost] = React.useState<BlogPost | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let active = true;
    if (!id) {
      setPost(null);
      setLoading(false);
      return;
    }
    void postRepository.findById(id).then((result) => {
      if (!active) return;
      setPost(result);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [id]);

  return { post, loading };
}

/**
 * Client-side search and filtering for the /blog listing.
 * Search covers title, excerpt, tags and body so a reader can find a post by a
 * phrase they half-remember from it.
 */
export function filterPosts(
  posts: BlogPost[],
  { query, category, industry }: { query: string; category: string; industry: string },
) {
  const needle = query.trim().toLowerCase();
  return posts.filter((post) => {
    if (category !== "all" && post.category !== category) return false;
    if (industry !== "all" && post.industry !== industry) return false;
    if (!needle) return true;
    const haystack = [post.title, post.excerpt, post.body, ...post.tags].join(" ").toLowerCase();
    return haystack.includes(needle);
  });
}

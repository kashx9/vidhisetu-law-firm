/**
 * React bindings for the insights repository.
 * Components never talk to the store directly — they use these hooks, so
 * swapping the backend stays invisible to the UI.
 */

import * as React from "react";
import { insightRepository, subscribe } from "./blogStore";
import type { Insight } from "./types";

type Query = { includeUnpublished?: boolean };

export function useInsights({ includeUnpublished = false }: Query = {}) {
  const [insights, setInsights] = React.useState<Insight[]>([]);
  const [loading, setLoading] = React.useState(true);

  const load = React.useCallback(async () => {
    const data = includeUnpublished
      ? await insightRepository.listAll()
      : await insightRepository.listPublished();
    setInsights(data);
    setLoading(false);
  }, [includeUnpublished]);

  React.useEffect(() => {
    void load();
    const unsubscribe = subscribe(() => void load());
    return () => {
      unsubscribe();
    };
  }, [load]);

  return { insights, loading, reload: load };
}

export function useInsight(slug: string | undefined) {
  const [insight, setInsight] = React.useState<Insight | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let active = true;
    if (!slug) {
      setInsight(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    void insightRepository.findBySlug(slug).then((result) => {
      if (!active) return;
      setInsight(result);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [slug]);

  return { insight, loading };
}

export function useInsightById(id: string | undefined) {
  const [insight, setInsight] = React.useState<Insight | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let active = true;
    if (!id) {
      setInsight(null);
      setLoading(false);
      return;
    }
    void insightRepository.findById(id).then((result) => {
      if (!active) return;
      setInsight(result);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [id]);

  return { insight, loading };
}

/**
 * Client-side search and filtering for the /insights listing.
 * Search covers title, excerpt, tags and body so a reader can find a post by a
 * phrase they half-remember from it.
 */
export function filterInsights(
  insights: Insight[],
  { query, category, industry }: { query: string; category: string; industry: string },
) {
  const needle = query.trim().toLowerCase();
  return insights.filter((post) => {
    if (category !== "all" && post.category !== category) return false;
    if (industry !== "all" && post.industry !== industry) return false;
    if (!needle) return true;
    const haystack = [post.title, post.excerpt, post.body, ...post.tags].join(" ").toLowerCase();
    return haystack.includes(needle);
  });
}

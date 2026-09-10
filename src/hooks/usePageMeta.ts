import * as React from "react";

/**
 * Sets document title and meta description per page. Small enough not to need
 * a helmet library; swap for react-helmet-async if SSR is added later.
 */
export function usePageMeta({ title, description }: { title: string; description?: string }) {
  React.useEffect(() => {
    document.title = title;
    if (!description) return;

    let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.name = "description";
      document.head.appendChild(tag);
    }
    tag.content = description;
  }, [title, description]);
}

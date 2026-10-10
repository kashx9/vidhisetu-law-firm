import { Link } from "react-router-dom";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Wordmark — type only, no symbol. The firm name and descriptor both come from
 * src/content/site.ts. If a real logo asset arrives later, render it here in
 * place of (or beside) the name.
 */
export function Logo({
  tone = "light",
  showDescriptor = true,
  className,
}: {
  tone?: "light" | "dark";
  showDescriptor?: boolean;
  className?: string;
}) {
  const onDark = tone === "dark";

  return (
    <Link
      to="/"
      className={cn("group inline-flex flex-col leading-none", className)}
      aria-label={`${site.name} — home`}
    >
      <span
        className={cn(
          "font-display text-[1.5rem] tracking-tight transition-colors",
          onDark
            ? "text-primary-foreground group-hover:text-accent"
            : "text-primary group-hover:text-accent",
        )}
      >
        {site.name}
      </span>
      {showDescriptor ? (
        <span
          className={cn(
            "mt-1.5 font-sans text-[0.5625rem] uppercase tracking-eyebrow",
            onDark ? "text-primary-foreground/50" : "text-muted-foreground",
          )}
        >
          {site.descriptor}
        </span>
      ) : null}
    </Link>
  );
}

import { Link } from "react-router-dom";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Wordmark. "Setu" means bridge, so the mark is a single span over a baseline —
 * two piers, one arch. Replace the <svg> when the real logo asset arrives; the
 * name and descriptor come from src/content/site.ts.
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
      className={cn("group inline-flex items-center gap-3", className)}
      aria-label={`${site.name} — home`}
    >
      <svg viewBox="0 0 40 32" className="h-8 w-10 shrink-0" aria-hidden>
        <path
          d="M4 24 C 4 10, 36 10, 36 24"
          className="fill-none stroke-accent transition-[stroke-width] duration-200 group-hover:stroke-[2.25]"
          strokeWidth="1.75"
        />
        <line
          x1="2"
          y1="24"
          x2="38"
          y2="24"
          className={onDark ? "stroke-primary-foreground" : "stroke-primary"}
          strokeWidth="1.75"
        />
        <line x1="12" y1="24" x2="12" y2="30" className="stroke-accent" strokeWidth="1.25" />
        <line x1="28" y1="24" x2="28" y2="30" className="stroke-accent" strokeWidth="1.25" />
      </svg>

      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.375rem] tracking-tight",
            onDark ? "text-primary-foreground" : "text-primary",
          )}
        >
          {site.name}
        </span>
        {showDescriptor ? (
          <span
            className={cn(
              "mt-1 font-sans text-[0.5625rem] uppercase tracking-eyebrow",
              onDark ? "text-primary-foreground/50" : "text-muted-foreground",
            )}
          >
            {site.descriptor}
          </span>
        ) : null}
      </span>
    </Link>
  );
}

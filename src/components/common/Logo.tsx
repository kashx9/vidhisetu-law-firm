import { Link } from "react-router-dom";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Brand lockup: the V mark followed by the firm name in letterspaced caps.
 *
 * The mark is public/logo-mark.png — the V and swoosh cropped out of the supplied
 * logo artwork. The name beside it is live text rather than part of the image,
 * because the artwork's own wordmark is #d9d1d1, which sits at roughly 1.4:1
 * against the ivory background and cannot be read. As text it inherits the brand
 * ink colour, stays sharp at any size, and is available to screen readers.
 *
 * On dark surfaces (the footer) the mark is omitted: its swoosh is black and
 * would disappear into the navy. The wordmark alone carries the brand there.
 * To show the mark on dark too, supply a light variant of the artwork and
 * render it under `onDark`.
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
      {!onDark ? (
        <img
          src="/logo-mark.png"
          alt=""
          width={381}
          height={257}
          className="h-9 w-auto shrink-0 md:h-11"
        />
      ) : null}

      <span className="flex flex-col leading-none">
        <span
          className={cn(
            // The trailing negative margin cancels the letterspacing after the
            // final letter, so the wordmark optically aligns with the descriptor.
            "-mr-[0.2em] font-display text-[0.9375rem] uppercase tracking-[0.2em] transition-colors md:text-[1.0625rem]",
            onDark
              ? "text-primary-foreground group-hover:text-accent"
              : "text-primary group-hover:text-accent",
          )}
        >
          {site.wordmark}
        </span>

        {showDescriptor ? (
          <span
            className={cn(
              "-mr-[0.18em] mt-1.5 font-sans text-[0.5625rem] uppercase tracking-eyebrow",
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

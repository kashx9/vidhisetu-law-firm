import { cn } from "@/lib/utils";

/**
 * Editorial placeholder art for blog cards and article headers.
 *
 * The brief rules out gavels, courthouses and generic lawyer stock imagery, so
 * until real photography or illustration is supplied we generate a restrained
 * geometric composition instead. It is deterministic — the same slug always
 * produces the same artwork — so listings look designed rather than random.
 *
 * When a post has `cover.image`, that image is used and this is skipped.
 */

const compositions = [
  // Concentric arcs
  (id: string) => (
    <g key={id}>
      <circle cx="120" cy="90" r="70" className="fill-none stroke-current" strokeWidth="0.75" />
      <circle cx="120" cy="90" r="46" className="fill-none stroke-current" strokeWidth="0.75" />
      <circle cx="120" cy="90" r="22" className="fill-none stroke-current" strokeWidth="0.75" />
      <line x1="0" y1="90" x2="240" y2="90" className="stroke-current" strokeWidth="0.5" />
    </g>
  ),
  // Column of rules
  (id: string) => (
    <g key={id}>
      {Array.from({ length: 9 }, (_, i) => (
        <line
          key={i}
          x1="40"
          y1={30 + i * 15}
          x2={200 - i * 14}
          y2={30 + i * 15}
          className="stroke-current"
          strokeWidth="0.75"
        />
      ))}
    </g>
  ),
  // Nested frames
  (id: string) => (
    <g key={id}>
      {Array.from({ length: 5 }, (_, i) => (
        <rect
          key={i}
          x={40 + i * 14}
          y={22 + i * 12}
          width={160 - i * 28}
          height={136 - i * 24}
          className="fill-none stroke-current"
          strokeWidth="0.75"
        />
      ))}
    </g>
  ),
  // Diagonal weave
  (id: string) => (
    <g key={id}>
      {Array.from({ length: 14 }, (_, i) => (
        <line
          key={i}
          x1={-20 + i * 22}
          y1="0"
          x2={40 + i * 22}
          y2="180"
          className="stroke-current"
          strokeWidth="0.6"
        />
      ))}
      <rect
        x="70"
        y="50"
        width="100"
        height="80"
        className="fill-none stroke-current"
        strokeWidth="1"
      />
    </g>
  ),
  // Bracketed rule
  (id: string) => (
    <g key={id}>
      <path d="M50 30 H30 V150 H50" className="fill-none stroke-current" strokeWidth="1" />
      <path d="M190 30 H210 V150 H190" className="fill-none stroke-current" strokeWidth="1" />
      {Array.from({ length: 6 }, (_, i) => (
        <line
          key={i}
          x1="62"
          y1={48 + i * 17}
          x2="178"
          y2={48 + i * 17}
          className="stroke-current"
          strokeWidth="0.6"
        />
      ))}
    </g>
  ),
];

const hash = (value: string) =>
  value.split("").reduce((total, char) => (total * 31 + char.charCodeAt(0)) % 100000, 7);

export function CoverArt({
  seed,
  label,
  image,
  alt,
  className,
  aspect = "aspect-[16/10]",
}: {
  seed: string;
  label?: string;
  image?: string;
  alt?: string;
  className?: string;
  aspect?: string;
}) {
  if (image) {
    return (
      <div className={cn("overflow-hidden bg-muted", aspect, className)}>
        <img src={image} alt={alt ?? ""} className="h-full w-full object-cover" loading="lazy" />
      </div>
    );
  }

  const index = hash(seed) % compositions.length;

  return (
    <div className={cn("relative overflow-hidden bg-primary", aspect, className)}>
      <svg
        viewBox="0 0 240 180"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full text-accent/45"
        aria-hidden
      >
        {compositions[index](seed)}
      </svg>
      {label ? (
        <span className="absolute bottom-3 left-4 font-sans text-[0.625rem] uppercase tracking-eyebrow text-primary-foreground/60">
          {label}
        </span>
      ) : null}
    </div>
  );
}

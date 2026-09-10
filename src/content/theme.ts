/**
 * ─────────────────────────────────────────────────────────────────────────────
 * DESIGN TOKENS — single source of truth for the whole site's look & feel.
 * ─────────────────────────────────────────────────────────────────────────────
 * Change a value here and it propagates to every page, section and shadcn/ui
 * component. Nothing else needs to be touched.
 *
 * Colours are HSL triplets ("H S% L%") because shadcn/ui composes them as
 * `hsl(var(--token) / <alpha>)`, which is what enables `bg-primary/10` etc.
 *
 * The current palette is a deliberately restrained, "basic law-firm" system:
 * ivory paper, deep navy ink and a single brass accent. Replace the values in
 * `palette` when the real design system arrives.
 */

export const palette = {
  /** Page paper. Warm ivory rather than pure white — reads as premium print. */
  background: "40 37% 97%",
  /** Body copy / headings. Near-black navy, never pure #000. */
  foreground: "216 46% 12%",

  /** Raised surfaces: cards, dropdowns, sheets. */
  card: "0 0% 100%",
  cardForeground: "216 46% 12%",
  popover: "0 0% 100%",
  popoverForeground: "216 46% 12%",

  /** Brand navy. Buttons, footer, dark editorial bands. */
  primary: "213 50% 16%",
  primaryForeground: "40 37% 97%",

  /** Warm sand. Quiet fills, chips, alternating bands. */
  secondary: "38 30% 91%",
  secondaryForeground: "213 50% 16%",

  /** Brass. Rules, eyebrows, numerals, hover states. Used sparingly. */
  accent: "38 45% 45%",
  accentForeground: "40 37% 97%",

  /** Low-emphasis surfaces and text. */
  muted: "40 24% 93%",
  mutedForeground: "42 6% 41%",

  destructive: "0 55% 39%",
  destructiveForeground: "40 37% 97%",

  border: "38 25% 85%",
  input: "38 25% 85%",
  ring: "38 45% 45%",
} as const;

export const typography = {
  /** Editorial serif for display headings. */
  display: "'Playfair Display', 'Iowan Old Style', Georgia, serif",
  /** Clean sans for UI and body copy. */
  sans: "'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
} as const;

export const shape = {
  /** Restrained radius — avoids the rounded "SaaS card" look the brief rules out. */
  radius: "0.25rem",
  /** Max width of the reading/content column. */
  container: "1200px",
} as const;

/** Applied to <html> at boot, before React paints. See src/main.tsx. */
export function applyThemeTokens(root: HTMLElement = document.documentElement) {
  const vars: Record<string, string> = {
    "--background": palette.background,
    "--foreground": palette.foreground,
    "--card": palette.card,
    "--card-foreground": palette.cardForeground,
    "--popover": palette.popover,
    "--popover-foreground": palette.popoverForeground,
    "--primary": palette.primary,
    "--primary-foreground": palette.primaryForeground,
    "--secondary": palette.secondary,
    "--secondary-foreground": palette.secondaryForeground,
    "--accent": palette.accent,
    "--accent-foreground": palette.accentForeground,
    "--muted": palette.muted,
    "--muted-foreground": palette.mutedForeground,
    "--destructive": palette.destructive,
    "--destructive-foreground": palette.destructiveForeground,
    "--border": palette.border,
    "--input": palette.input,
    "--ring": palette.ring,
    "--radius": shape.radius,
    "--font-display": typography.display,
    "--font-sans": typography.sans,
  };
  for (const [key, value] of Object.entries(vars)) root.style.setProperty(key, value);
}

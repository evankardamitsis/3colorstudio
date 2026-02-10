/**
 * 3colorstudio design system — token reference
 * Use these in components and Tailwind (@theme in globals.css maps these to utilities).
 *
 * Typography roles:
 * - heading  → Staatliches (headings)
 * - body     → Inter (body text)
 * - accent   → Reenie Beanie (decorative / handwritten)
 * - display  → Krona One (display / impact)
 */

export const fonts = {
  heading: "var(--font-heading)",
  body: "var(--font-body)",
  accent: "var(--font-accent)",
  display: "var(--font-display)",
} as const;

export type FontRole = keyof typeof fonts;

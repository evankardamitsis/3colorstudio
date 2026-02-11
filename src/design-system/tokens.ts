/**
 * 3colorstudio design system — token reference
 *
 * Typography:
 * - heading → Schnyder (add font file to src/assets/fonts/) or Libre Baskerville fallback
 * - body    → Raleway
 */

export const fonts = {
  heading: "var(--font-heading)",
  body: "var(--font-body)",
} as const;

export type FontRole = keyof typeof fonts;

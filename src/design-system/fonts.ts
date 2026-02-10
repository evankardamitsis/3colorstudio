/**
 * 3colorstudio design system — typography
 * Font roles: headings (Staatliches), body (Inter), accent (Reenie Beanie), display (Krona One)
 */

import {
  Staatliches,
  Inter,
  Reenie_Beanie,
  Krona_One,
} from "next/font/google";

export const fontHeading = Staatliches({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const fontAccent = Reenie_Beanie({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-accent",
  display: "swap",
});

export const fontDisplay = Krona_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

/** All font CSS variable class names for the root layout */
export const fontVariables = [
  fontHeading.variable,
  fontBody.variable,
  fontAccent.variable,
  fontDisplay.variable,
].join(" ");

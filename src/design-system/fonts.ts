/**
 * 3colorstudio design system — typography
 * Raleway (body), Schnyder (headings)
 *
 * To use Schnyder: add Schnyder-Regular.woff2 to src/assets/fonts/,
 * then replace fontHeading below with:
 *
 *   import localFont from "next/font/local";
 *   export const fontHeading = localFont({
 *     src: "../assets/fonts/Schnyder-Regular.woff2",
 *     variable: "--font-heading",
 *     display: "swap",
 *     fallback: ["Georgia", "serif"],
 *   });
 */

import { Raleway, Libre_Baskerville } from "next/font/google";

export const fontBody = Raleway({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

/** Headings: Schnyder preferred. Using Libre Baskerville until you add Schnyder-Regular.woff2 to src/assets/fonts/ */
export const fontHeading = Libre_Baskerville({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

/** All font CSS variable class names for the root layout */
export const fontVariables = [
  fontHeading.variable,
  fontBody.variable,
].join(" ");

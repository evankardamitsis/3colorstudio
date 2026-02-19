/**
 * 3colorstudio design system — typography
 * Raleway (body), Schnyder (headings)
 */

import { Raleway } from "next/font/google";
import localFont from "next/font/local";

export const fontBody = Raleway({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

/** Headings: Schnyder M Demi */
export const fontHeading = localFont({
  src: "../assets/fonts/Schnyder-MDemi-Web.woff2",
  variable: "--font-heading",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

/** All font CSS variable class names for the root layout */
export const fontVariables = [fontHeading.variable, fontBody.variable].join(
  " ",
);

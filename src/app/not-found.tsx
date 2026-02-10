import Link from "next/link";
import { Section } from "@/components/Section";

export default function NotFound() {
  return (
    <Section className="pt-20 md:pt-28 text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
        404
      </h1>
      <p className="mt-4 text-neutral-600 dark:text-neutral-400">
        This page could not be found.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
      >
        Back to home
      </Link>
    </Section>
  );
}

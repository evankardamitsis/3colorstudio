import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { TextBlock } from "@/components/TextBlock";
import { getTextBlocksByLocationKeys } from "@/lib/contentful/data";
import { siteConfig } from "@/config/site";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About",
  description: `Learn more about ${siteConfig.name} — who we are and how we work.`,
};

export default async function AboutPage() {
  const textBlocks = await getTextBlocksByLocationKeys(["about.intro"]);

  const introBlock = textBlocks.find((b) => b.locationKey === "about.intro");

  return (
    <Section className="pt-20 md:pt-28">
      <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-neutral-900 dark:text-neutral-100 mb-12">
        About
      </h1>

      {introBlock ? (
        <TextBlock block={introBlock} className="max-w-2xl" />
      ) : (
        <div className="max-w-2xl space-y-6">
          <h2 className="font-heading text-2xl md:text-3xl font-normal text-neutral-800 dark:text-neutral-200">
            Studio
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            We’re a small studio with a big focus on craft and collaboration.
            Based between two cities, we work with clients worldwide to create
            brands and experiences that are bold, clear, and lasting.
          </p>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Our work spans brand identity, digital product design, art direction,
            and editorial. We believe in thoughtful process, strong concepts,
            and execution that stands the test of time.
          </p>
        </div>
      )}
    </Section>
  );
}

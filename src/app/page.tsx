import Link from "next/link";
import { Section } from "@/components/Section";
import { ProjectGrid } from "@/components/ProjectGrid";
import { TextBlock } from "@/components/TextBlock";
import { getFeaturedProjects, getTextBlocksByLocationKeys } from "@/lib/contentful/data";

export const revalidate = 60;

export default async function HomePage() {
  const [featuredProjects, textBlocks] = await Promise.all([
    getFeaturedProjects(),
    getTextBlocksByLocationKeys(["home.hero", "home.services", "home.cta"]),
  ]);

  const heroBlock = textBlocks.find((b) => b.locationKey === "home.hero");
  const servicesBlock = textBlocks.find((b) => b.locationKey === "home.services");
  const ctaBlock = textBlocks.find((b) => b.locationKey === "home.cta");

  return (
    <>
      {/* Hero */}
      <Section className="pt-20 md:pt-28">
        {heroBlock ? (
          <TextBlock block={heroBlock} headingSize="large" />
        ) : (
          <div>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-neutral-900 dark:text-neutral-100">
              We craft brands and experiences that stand out.
            </h1>
            <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
              3colorstudio is a design studio focused on identity, digital, and
              editorial work. We partner with ambitious clients to create work
              that is bold, clear, and lasting.
            </p>
          </div>
        )}
      </Section>

      {/* Featured projects */}
      <Section className="border-t border-neutral-200 dark:border-neutral-800">
        <h2 className="font-heading text-2xl font-normal text-neutral-900 dark:text-neutral-100 mb-10">
          Featured projects
        </h2>
        <ProjectGrid projects={featuredProjects} priorityIndex={0} />
        {featuredProjects.length > 0 && (
          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              View all projects
              <span className="ml-1.5" aria-hidden>→</span>
            </Link>
          </div>
        )}
      </Section>

      {/* Services teaser */}
      <Section className="border-t border-neutral-200 dark:border-neutral-800">
        {servicesBlock ? (
          <TextBlock block={servicesBlock} />
        ) : (
          <div>
<h2 className="font-heading text-2xl md:text-3xl font-normal text-neutral-800 dark:text-neutral-200 mb-4">
            What we do
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
              Brand identity and strategy, digital product design, art direction,
              and editorial design. From concept to launch, we bring clarity and
              craft to every step.
            </p>
          </div>
        )}
      </Section>

      {/* CTA */}
      <Section className="border-t border-neutral-200 dark:border-neutral-800">
        {ctaBlock ? (
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <TextBlock block={ctaBlock} />
            <Link
              href="/contact"
              className="shrink-0 inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-neutral-900 dark:bg-white dark:text-neutral-900 rounded-lg hover:opacity-90 transition-opacity"
            >
              Get in touch
            </Link>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-normal text-neutral-800 dark:text-neutral-200 mb-4">
                Start a project
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Have an idea or a brief? We’d love to hear from you. Get in
                touch for a conversation.
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-neutral-900 dark:bg-white dark:text-neutral-900 rounded-lg hover:opacity-90 transition-opacity"
            >
              Get in touch
            </Link>
          </div>
        )}
      </Section>
    </>
  );
}

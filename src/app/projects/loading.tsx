import { Section } from "@/components/Section";

export default function ProjectsLoading() {
  return (
    <Section className="pt-20 md:pt-28">
      <div className="animate-pulse space-y-10">
        <div className="h-10 w-48 bg-neutral-200 dark:bg-neutral-700 rounded" />
        <div className="h-4 w-full max-w-xl bg-neutral-200 dark:bg-neutral-700 rounded" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <div className="aspect-4/3 bg-neutral-200 dark:bg-neutral-700 rounded-lg" />
              <div className="h-5 w-3/4 bg-neutral-200 dark:bg-neutral-700 rounded" />
              <div className="h-4 w-1/2 bg-neutral-200 dark:bg-neutral-700 rounded" />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

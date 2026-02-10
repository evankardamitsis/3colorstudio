import { Section } from "@/components/Section";

export default function Loading() {
  return (
    <Section className="pt-20 md:pt-28">
      <div className="animate-pulse space-y-6">
        <div className="h-10 w-3/4 max-w-md bg-neutral-200 dark:bg-neutral-700 rounded" />
        <div className="h-4 w-full max-w-2xl bg-neutral-200 dark:bg-neutral-700 rounded" />
        <div className="h-4 w-full max-w-xl bg-neutral-200 dark:bg-neutral-700 rounded" />
      </div>
    </Section>
  );
}

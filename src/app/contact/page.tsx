import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name} to start a project or say hello.`,
};

export default function ContactPage() {
  return (
    <Section className="pt-20 md:pt-28">
      <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-neutral-900 dark:text-neutral-100 mb-4">
        Contact
      </h1>
      <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-xl mb-12">
        Have a project in mind or want to say hello? Fill out the form below and
        we’ll get back to you.
      </p>

      <form className="max-w-xl space-y-6" noValidate>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            autoComplete="name"
            className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 focus:border-transparent"
            placeholder="Your name"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 focus:border-transparent"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 focus:border-transparent resize-y min-h-[120px]"
            placeholder="Tell us about your project..."
          />
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-neutral-900 dark:bg-white dark:text-neutral-900 rounded-lg hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-900"
        >
          Send message
        </button>
      </form>

      <p className="mt-8 text-sm text-neutral-500 dark:text-neutral-400">
        This form is for display only. Backend submission is not implemented yet.
      </p>
    </Section>
  );
}

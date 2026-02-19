import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.name}.`,
};

export default function PrivacyPage() {
  return (
    <Section className="pt-20 md:pt-28">
      <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-neutral-900 dark:text-neutral-100 mb-12">
        Privacy Policy
      </h1>

      <div className="max-w-2xl space-y-8 prose prose-neutral dark:prose-invert">
        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Last updated: {new Date().toLocaleDateString("en-GB")}
        </p>

        <section>
          <h2 className="font-heading text-xl md:text-2xl font-normal text-neutral-900 dark:text-neutral-100 mb-4">
            1. Introduction
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {siteConfig.name} respects your privacy. This privacy policy explains
            how we collect, use, and protect your personal information when you
            visit our website or contact us.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl md:text-2xl font-normal text-neutral-900 dark:text-neutral-100 mb-4">
            2. Information We Collect
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
            We may collect:
          </p>
          <ul className="list-disc list-inside text-neutral-600 dark:text-neutral-400 space-y-2">
            <li>Name and contact details when you reach out to us</li>
            <li>Email address when you subscribe or correspond with us</li>
            <li>Usage data such as pages visited and time spent on the site</li>
            <li>Technical data including IP address and browser type</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl md:text-2xl font-normal text-neutral-900 dark:text-neutral-100 mb-4">
            3. How We Use Your Information
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            We use your information to respond to enquiries, improve our website,
            and communicate with you about our services. We do not sell your
            personal information to third parties.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl md:text-2xl font-normal text-neutral-900 dark:text-neutral-100 mb-4">
            4. Cookies
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Our website may use cookies and similar technologies to enhance your
            experience. You can configure your browser to refuse cookies, though
            some features may not function correctly.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl md:text-2xl font-normal text-neutral-900 dark:text-neutral-100 mb-4">
            5. Data Security
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            We take reasonable measures to protect your personal information from
            unauthorized access, alteration, or destruction. However, no method of
            transmission over the internet is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl md:text-2xl font-normal text-neutral-900 dark:text-neutral-100 mb-4">
            6. Your Rights
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Depending on your location, you may have the right to access, correct,
            or delete your personal data. To exercise these rights or for any
            privacy-related questions, please contact us.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl md:text-2xl font-normal text-neutral-900 dark:text-neutral-100 mb-4">
            7. Changes
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            We may update this privacy policy from time to time. Changes will be
            posted on this page with an updated revision date.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl md:text-2xl font-normal text-neutral-900 dark:text-neutral-100 mb-4">
            8. Contact
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            For any questions about this privacy policy, please contact us at{" "}
            <a
              href="mailto:hello@3colorstudio.com"
              className="text-[#E04855] hover:underline"
            >
              hello@3colorstudio.com
            </a>
            .
          </p>
        </section>
      </div>
    </Section>
  );
}

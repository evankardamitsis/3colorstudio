import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms and conditions for using ${siteConfig.name}.`,
};

export default function TermsPage() {
  return (
    <Section className="pt-20 md:pt-28">
      <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-neutral-900 dark:text-neutral-100 mb-12">
        Terms & Conditions
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
            Welcome to {siteConfig.name}. By accessing and using this website, you
            accept and agree to be bound by these terms and conditions. If you do
            not agree with any part of these terms, please do not use our website.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl md:text-2xl font-normal text-neutral-900 dark:text-neutral-100 mb-4">
            2. Use of Website
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            You may use this website only for lawful purposes and in accordance
            with these terms. You agree not to use the website in any way that
            violates applicable laws or regulations, or that could harm, disable,
            or impair the website or any user.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl md:text-2xl font-normal text-neutral-900 dark:text-neutral-100 mb-4">
            3. Intellectual Property
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            All content on this website, including but not limited to text,
            images, videos, graphics, and logos, is the property of{" "}
            {siteConfig.name} or its licensors and is protected by copyright and
            other intellectual property laws. You may not reproduce, distribute,
            or create derivative works without our prior written consent.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl md:text-2xl font-normal text-neutral-900 dark:text-neutral-100 mb-4">
            4. Services
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            The services and projects displayed on this website are for
            informational purposes. Specific terms for commissioned work or
            projects will be agreed upon separately and in writing.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl md:text-2xl font-normal text-neutral-900 dark:text-neutral-100 mb-4">
            5. Limitation of Liability
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            To the fullest extent permitted by law, {siteConfig.name} shall not be
            liable for any indirect, incidental, special, consequential, or
            punitive damages arising from your use of this website.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl md:text-2xl font-normal text-neutral-900 dark:text-neutral-100 mb-4">
            6. Changes
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            We reserve the right to modify these terms at any time. Changes will
            be effective immediately upon posting to this page. Your continued
            use of the website constitutes acceptance of any changes.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl md:text-2xl font-normal text-neutral-900 dark:text-neutral-100 mb-4">
            7. Contact
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            If you have any questions about these terms and conditions, please
            contact us at{" "}
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

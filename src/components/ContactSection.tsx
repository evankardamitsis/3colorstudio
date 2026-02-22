"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeInUp } from "@/components/animations";

const CONTACT_BUTTON_SVG = "/TextFlex_%20CONTACT%20US%20CONTACT%20US%20CONTACT%20US.svg";

interface ContactSectionProps {
  hideVideo?: boolean;
}

export function ContactSection({ hideVideo = false }: ContactSectionProps) {
  return (
    <section className="relative w-full overflow-x-hidden bg-black pt-32 pb-4 md:py-32 lg:py-40">
      <div className="relative mx-auto w-full max-w-[1600px] px-[10%]">
        {!hideVideo && (
          <FadeInUp>
            <div className="relative mx-auto aspect-4/3 w-full max-w-3xl overflow-hidden">
              <video
                src="/contact_video_square.mp4#t=0.001"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="h-full w-full object-cover object-center"
                aria-hidden
              />
            </div>
          </FadeInUp>
        )}

        <div className={`flex flex-col items-center pb-12 text-center ${hideVideo ? "pt-12 md:pt-16 lg:pt-20" : "pt-24 md:pt-32 lg:pt-40 md:pb-2"}`}>
          <FadeInUp delay={0.1}>
            <h2 className="mb-12 font-heading text-6xl font-normal text-[#E72F4E] md:text-7xl lg:text-8xl">
              Contact <span className="text-4xl md:text-5xl lg:text-6xl">us</span>
            </h2>
          </FadeInUp>
          <FadeInUp delay={0.15}>
            <p className="mb-10 max-w-2xl font-body text-sm leading-relaxed text-[#E72F4E] uppercase md:text-base lg:text-[18px]">
              We would love to hear more about your{" "}
              <strong className="font-semibold">vision</strong> and the experience
              you want your guests to remember. Our{" "}
              <strong className="font-semibold">work</strong> focuses on
              authenticity, atmosphere, and{" "}
              <strong className="font-semibold">storytelling</strong>, creating
              visuals that reflect the true identity of each hospitality brand.
            </p>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <Link
              href="/contact"
              className="inline-block transition-colors duration-300 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E04855] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              aria-label="Contact us"
            >
              <Image
                src={CONTACT_BUTTON_SVG}
                alt="Contact us"
                width={176}
                height={167}
                className="h-auto w-[140px] md:w-[176px]"
              />
            </Link>
          </FadeInUp>
        </div>
      </div>
      {/* Sentinel for Hero side info: hide when this enters view (end of ContactSection) */}
      <div id="contact-section-end" aria-hidden className="absolute bottom-0 left-0 h-px w-px" />
    </section>
  );
}

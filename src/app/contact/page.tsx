import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/config/site";

const HERO_EMAIL = "hello@3colorstudio.com";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name} to start a project or say hello.`,
};

export default function ContactPage() {
  return (
    <>
      {/* Left: vertical email text */}
      <div className="hero-side-info-left fixed bottom-24 left-[10%] z-10">
        <a
          href={`mailto:${HERO_EMAIL}`}
          className="contact-title block origin-left -rotate-90 whitespace-nowrap text-[10px] font-medium uppercase tracking-widest text-cream/90 transition-colors duration-150 hover:text-[#E72F4E]"
        >
          Email us at {HERO_EMAIL}
        </a>
      </div>

      {/* Right: vertical follow text + social icons */}
      <div className="hero-side-info-right group fixed bottom-24 right-[10%] z-20 flex-col items-end gap-2">
        <span className="contact-title block origin-right rotate-90 whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.25em] text-white transition-colors duration-150 hover:text-[#E72F4E] group-hover:text-[#E72F4E]">
          FOLLOW 3.COLORSTUDIO
        </span>
        <div className="flex flex-col items-end gap-2 mr-[-8px]">
          {siteConfig.links.instagram && siteConfig.links.instagram !== "#" ? (
            <a
              href={siteConfig.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block cursor-pointer transition-all duration-150 hover:filter-[brightness(0)_saturate(100%)_invert(27%)_sepia(95%)_saturate(1352%)_hue-rotate(330deg)_brightness(95%)_contrast(90%)]"
              aria-label="Instagram"
            >
              <Image
                src="/instagram.svg"
                alt=""
                width={24}
                height={24}
                className="h-4 w-4 block"
                aria-hidden
              />
            </a>
          ) : (
            <span className="inline-block h-4 w-4">
              <Image
                src="/instagram.svg"
                alt=""
                width={24}
                height={24}
                className="h-4 w-4 block"
                aria-hidden
              />
            </span>
          )}
        </div>
      </div>

      {/* Main contact content */}
      <section className="relative w-full overflow-x-hidden bg-black min-h-screen flex flex-col">
        <div className="relative mx-auto w-full max-w-[1600px] px-[10%] flex-1 flex flex-col justify-center py-32">
          {/* Contact heading and content - positioned just above video */}
          <div className="relative mx-auto w-full max-w-3xl flex flex-col items-center text-center mb-[-40px] md:mb-[-60px] z-10">
            <h1 className="contact-title mb-12 text-6xl font-normal text-[#E04855] md:text-7xl lg:text-8xl">
              Contact <span className="text-4xl md:text-5xl lg:text-6xl">us</span>
            </h1>

            {/* Email section */}
            <div className="mb-12">
              <p className="contact-title mb-4 text-sm font-medium uppercase tracking-wider text-white md:text-base">
                Email Us
              </p>
              <a
                href={`mailto:${HERO_EMAIL}`}
                className="font-body text-sm font-medium uppercase tracking-wider text-white transition-colors duration-150 hover:text-[#E72F4E] md:text-base"
              >
                {HERO_EMAIL.toUpperCase()}
              </a>
            </div>

            {/* Social section */}
            <div className="mb-12">
              <p className="contact-title mb-6 text-sm font-medium uppercase tracking-wider text-white md:text-base">
                Find Us On Social
              </p>
              <div className="flex items-center justify-center gap-6">
                {siteConfig.links.instagram && siteConfig.links.instagram !== "#" ? (
                  <a
                    href={siteConfig.links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block cursor-pointer transition-all duration-150 hover:filter-[brightness(0)_saturate(100%)_invert(27%)_sepia(95%)_saturate(1352%)_hue-rotate(330deg)_brightness(95%)_contrast(90%)]"
                    aria-label="Instagram"
                  >
                    <Image
                      src="/instagram.svg"
                      alt="Instagram"
                      width={32}
                      height={32}
                      className="h-8 w-8"
                    />
                  </a>
                ) : (
                  <span className="inline-block h-8 w-8">
                    <Image
                      src="/instagram.svg"
                      alt=""
                      width={32}
                      height={32}
                      className="h-8 w-8"
                      aria-hidden
                    />
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Central video/image */}
          <div className="relative mx-auto aspect-4/3 w-full max-w-3xl overflow-hidden">
            <video
              src="/contact_video_square.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover object-center"
              aria-hidden
            />
          </div>
        </div>
      </section>
    </>
  );
}

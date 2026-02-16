import Image from "next/image";
import Link from "next/link";

const CONTACT_IMG = "/contact_img.png";
const CONTACT_BUTTON_SVG = "/TextFlex_%20CONTACT%20US%20CONTACT%20US%20CONTACT%20US.svg";

export function ContactSection() {
  return (
    <section className="relative w-full overflow-x-hidden bg-black pt-32 pb-4 md:py-32 lg:py-40">
      <div className="relative mx-auto w-full max-w-[1600px] px-[10%]">
        <div className="relative mx-auto aspect-4/3 w-full max-w-3xl overflow-hidden">
          <Image
            src={CONTACT_IMG}
            alt=""
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 48rem"
            priority={false}
          />
        </div>

        <div className="flex flex-col items-center pt-24 pb-12 text-center md:pt-32 md:pb-2 lg:pt-40 ">
          <h2 className="mb-12 font-heading text-4xl font-normal text-[#E04855] md:text-5xl lg:text-6xl">
            Contact <span className="text-2xl md:text-3xl lg:text-4xl">us</span>
          </h2>
          <p className="mb-10 max-w-2xl font-body text-sm leading-relaxed text-[#E04855] uppercase md:text-base">
            We would love to hear more about your{" "}
            <strong className="font-semibold">vision</strong> and the experience
            you want your guests to remember. Our{" "}
            <strong className="font-semibold">work</strong> focuses on
            authenticity, atmosphere, and{" "}
            <strong className="font-semibold">storytelling</strong>, creating
            visuals that reflect the true identity of each hospitality brand.
          </p>
          <Link
            href="/contact"
            className="inline-block transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E04855] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
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
        </div>
      </div>
      {/* Sentinel for Hero side info: hide when this enters view (end of ContactSection) */}
      <div id="contact-section-end" aria-hidden className="absolute bottom-0 left-0 h-px w-px" />
    </section>
  );
}

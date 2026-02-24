import { Hero } from "@/components/Hero";
import { WhatWeDo } from "@/components/WhatWeDo";
import { ProjectsHomeMarquee } from "@/components/ProjectsHomeMarquee";
import { ProjectCategories } from "@/components/ProjectCategories";
import { ContactSection } from "@/components/ContactSection";
import { HotelBrands } from "@/components/HotelBrands";
import { getHomepage, getProjectCategories } from "@/lib/contentful/data";

export const revalidate = 60;

export default async function HomePage() {
  const [homepage, projectCategories] = await Promise.all([
    getHomepage(),
    getProjectCategories(),
  ]);

  return (
    <>
      <Hero
        heroImage={homepage.heroImage ?? undefined}
        heroVideo={homepage.heroVideo ?? undefined}
      />

      <WhatWeDo
        images={
          homepage.homepageReels?.length
            ? homepage.homepageReels
            : undefined
        }
      />

      <ProjectsHomeMarquee />

      <ProjectCategories categories={projectCategories} />

      <ContactSection />

      <HotelBrands logos={homepage.hotelLogos?.length ? homepage.hotelLogos : undefined} />
    </>
  );
}

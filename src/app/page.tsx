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
        heroImage={homepage.heroImage}
        heroVideo={homepage.heroVideo}
      />

      <WhatWeDo images={homepage.homepageReels} />

      <ProjectsHomeMarquee />

      <ProjectCategories categories={projectCategories} />

      <ContactSection />

      <HotelBrands />
    </>
  );
}

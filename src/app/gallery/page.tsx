import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { CtaSection } from "@/components/ui/cta-section";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description:
    "Photos of Cedarville Hotel, our rooms, and the beautiful Les Cheneaux Islands area.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        title="Photo Gallery"
        subtitle="See what awaits you at Cedarville Hotel and the Les Cheneaux Islands."
      />

      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-4 text-center">
          <p className="text-ch-gray text-lg py-12">
            Gallery coming soon — check back for photos of our rooms, property,
            and the beautiful Les Cheneaux Islands area.
          </p>
        </div>
      </section>

      <CtaSection variant="boxed" />
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/client";
import { allAttractionsQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { theme } from "@/lib/theme";
import { PageHero } from "@/components/ui/page-hero";
import { CtaSection } from "@/components/ui/cta-section";
import { MapPinIcon } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Trip Planner",
  description:
    "Plan your perfect Upper Peninsula getaway — local attractions, activities, and things to do near Cedarville Hotel and the Les Cheneaux Islands.",
};

interface Attraction {
  _id: string;
  title: string;
  description?: string;
  image?: { asset: { _ref: string } };
  distance?: string;
  order: number;
}

const fallbackAttractions: Attraction[] = [
  {
    _id: "1",
    title: "Les Cheneaux Islands",
    description:
      "Explore 36 islands by kayak, boat, or guided tour. World-class paddling, fishing, and wildlife viewing on Lake Huron.",
    order: 0,
  },
  {
    _id: "2",
    title: "Kewadin Hessel Casino",
    description:
      "Try your luck at the nearby casino featuring slots, table games, dining, and entertainment.",
    distance: "7 miles",
    order: 1,
  },
  {
    _id: "3",
    title: "Snowmobile Trails",
    description:
      "Access 100+ miles of groomed snowmobile trails right from the hotel. Winter wonderland adventure awaits.",
    order: 2,
  },
  {
    _id: "4",
    title: "Boating & Kayaking",
    description:
      "Launch from the Cedarville marina and explore the sheltered waters of the Les Cheneaux chain. Boat rentals available locally.",
    order: 3,
  },
  {
    _id: "5",
    title: "Lake Huron Beaches",
    description:
      "Hunt for Petoskey stones and fossils on the sandy shores. Crystal-clear waters for swimming in summer months.",
    order: 4,
  },
  {
    _id: "6",
    title: "Fishing",
    description:
      "Year-round fishing — bass, pike, walleye, and perch in summer; ice fishing in winter. Charter services available.",
    order: 5,
  },
];

export default async function TripPlannerPage() {
  const attractions: Attraction[] = await sanityFetch(allAttractionsQuery) ?? [];

  const displayAttractions =
    attractions.length > 0 ? attractions : fallbackAttractions;

  return (
    <>
      <PageHero
        title="Plan Your Perfect UP Getaway"
        subtitle="Discover everything the Les Cheneaux Islands and Michigan's Upper Peninsula have to offer."
      />

      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayAttractions.map((attraction) => (
              <div
                key={attraction._id}
                className="bg-ch-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {attraction.image && (
                  <div className="aspect-[4/3] relative bg-ch-gray-light">
                    <Image
                      src={urlFor(attraction.image)
                        .width(600)
                        .height(450)
                        .url()}
                      alt={attraction.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-heading text-lg font-bold text-ch-heading">
                      {attraction.title}
                    </h3>
                    {attraction.distance && (
                      <span className="flex items-center gap-1 text-xs text-ch-gray shrink-0 mt-1">
                        <MapPinIcon className="w-3.5 h-3.5" />
                        {attraction.distance}
                      </span>
                    )}
                  </div>
                  {attraction.description && (
                    <p className="text-sm text-ch-gray leading-relaxed">
                      {attraction.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title="Ready for Your UP Adventure?"
        secondaryText="Contact Us"
        secondaryUrl="/contact"
      />
    </>
  );
}

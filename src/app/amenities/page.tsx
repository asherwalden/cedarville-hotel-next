import type { Metadata } from "next";
import Image from "next/image";
import { sanityFetch } from "@/sanity/client";
import { allAmenitiesQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { PageHero } from "@/components/ui/page-hero";
import { CtaSection } from "@/components/ui/cta-section";
import { PortableText } from "next-sanity";
import { amenityIcons } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Amenities",
  description:
    "In-room and on-site amenities at Cedarville Hotel — Starlink WiFi, Roku TVs, complimentary continental breakfast, pet-friendly rooms, and more.",
};

interface Amenity {
  _id: string;
  title: string;
  description?: Array<{ _type: string; [key: string]: unknown }>;
  image?: { asset: { _ref: string } };
  icon?: string;
  notice?: string;
  order: number;
}

export default async function AmenitiesPage() {
  const amenities: Amenity[] = await sanityFetch(allAmenitiesQuery) ?? [];

  // Fallback amenities when Sanity isn't populated
  const displayAmenities =
    amenities.length > 0
      ? amenities
      : [
          {
            _id: "1",
            title: "Continental Breakfast",
            icon: "breakfast",
            order: 0,
          },
          { _id: "2", title: "Starlink WiFi", icon: "wifi", order: 1 },
          { _id: "3", title: "Roku Smart TVs", icon: "tv", order: 2 },
          {
            _id: "4",
            title: "Pet-Friendly Rooms",
            icon: "dog",
            notice: "$20 per dog per night",
            order: 3,
          },
          {
            _id: "5",
            title: "Conference / Meeting Room",
            notice: "$75/day",
            order: 4,
          },
          { _id: "6", title: "Free Parking", icon: "parking", order: 5 },
          { _id: "7", title: "Guest Laundry", order: 6 },
          {
            _id: "8",
            title: "Student & Extended Stay Discounts",
            notice: "10% military/first responder, 15% student",
            order: 7,
          },
        ];

  return (
    <>
      <PageHero
        title="Hotel Amenities"
        subtitle="Everything you need for a comfortable stay in the Les Cheneaux Islands."
      />

      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(displayAmenities as Amenity[]).map((amenity) => {
              const IconComponent = amenity.icon
                ? amenityIcons[amenity.icon]
                : null;
              return (
                <div
                  key={amenity._id}
                  className="bg-ch-white rounded-lg overflow-hidden shadow-sm flex flex-col sm:flex-row"
                >
                  {amenity.image && (
                    <div className="sm:w-48 aspect-[4/3] sm:aspect-auto relative bg-ch-gray-light shrink-0">
                      <Image
                        src={urlFor(amenity.image).width(400).height(300).url()}
                        alt={amenity.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 200px"
                      />
                    </div>
                  )}
                  <div className="p-6 flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {IconComponent && (
                        <IconComponent className="w-6 h-6 text-ch-secondary shrink-0" />
                      )}
                      <h3 className="font-heading text-lg font-bold text-ch-heading">
                        {amenity.title}
                      </h3>
                    </div>
                    {amenity.description && (
                      <div className="prose prose-sm max-w-none text-ch-dark mb-2">
                        <PortableText value={amenity.description} />
                      </div>
                    )}
                    {amenity.notice && (
                      <p className="text-sm text-ch-accent font-medium">
                        {amenity.notice}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CtaSection variant="boxed" />
    </>
  );
}

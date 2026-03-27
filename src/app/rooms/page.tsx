import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/client";
import { allAccommodationsQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { theme } from "@/lib/theme";
import { PageHero } from "@/components/ui/page-hero";
import {
  WifiIcon,
  TvIcon,
  FridgeIcon,
  MicrowaveIcon,
  CoffeeIcon,
  SnowflakeIcon,
  SparklesIcon,
  UtensilsIcon,
  BedIcon,
  UsersIcon,
  PhoneIcon,
  MailIcon,
  DogIcon,
} from "@/lib/icons";

export const metadata: Metadata = {
  title: "Rooms & Accommodations",
  description:
    "Browse our comfortable rooms and units at Cedarville Hotel. Dog-friendly options available. Free WiFi, Roku TVs, and complimentary breakfast included.",
};

interface Accommodation {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  image?: { asset: { _ref: string } };
  pricePerNight?: number;
  priceNote?: string;
  maxOccupancy?: number;
  bedConfiguration?: string;
  dogFriendly?: boolean;
  badge?: string;
  amenities?: string[];
}

const standardAmenities = [
  { icon: WifiIcon, label: "Starlink WiFi" },
  { icon: TvIcon, label: "Roku Smart TV" },
  { icon: FridgeIcon, label: "Mini Fridge" },
  { icon: MicrowaveIcon, label: "Microwave" },
  { icon: CoffeeIcon, label: "Coffee & Supplies" },
  { icon: UtensilsIcon, label: "Complimentary Breakfast" },
  { icon: SnowflakeIcon, label: "Air Conditioning" },
  { icon: SparklesIcon, label: "Housekeeping" },
];

const badgeColors: Record<string, string> = {
  "dog-friendly": "bg-ch-secondary text-ch-white",
  "best-value": "bg-ch-accent text-ch-primary-dark",
  "family-favorite": "bg-ch-primary text-ch-white",
  "most-popular": "bg-ch-primary-dark text-ch-white",
};

const badgeLabels: Record<string, string> = {
  "dog-friendly": "Dog Friendly",
  "best-value": "Best Value",
  "family-favorite": "Family Favorite",
  "most-popular": "Most Popular",
};

export default async function RoomsPage() {
  const rooms: Accommodation[] = await sanityFetch(allAccommodationsQuery) ?? [];

  return (
    <>
      <PageHero
        title="Find Your Perfect Room"
        subtitle="Comfortable accommodations with genuine small-town hospitality in the heart of the Les Cheneaux Islands."
      />

      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Room Grid */}
            <div className="lg:col-span-2">
              {rooms.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {rooms.map((room) => (
                    <Link
                      key={room._id}
                      href={`/rooms/${room.slug.current}`}
                      className="bg-ch-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
                    >
                      <div className="aspect-[800/520] relative bg-ch-gray-light">
                        {room.image ? (
                          <Image
                            src={urlFor(room.image)
                              .width(800)
                              .height(520)
                              .url()}
                            alt={room.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-ch-gray">
                            <BedIcon className="w-12 h-12" />
                          </div>
                        )}
                        {room.badge && (
                          <span
                            className={`absolute top-3 left-3 px-3 py-1 rounded text-xs font-semibold ${
                              badgeColors[room.badge] || "bg-ch-primary text-ch-white"
                            }`}
                          >
                            {badgeLabels[room.badge] || room.badge}
                          </span>
                        )}
                      </div>
                      <div className="p-5">
                        <h3 className="font-heading text-lg font-bold text-ch-heading mb-2">
                          {room.title}
                        </h3>
                        {room.pricePerNight && (
                          <p className="text-ch-accent font-semibold mb-2">
                            ${room.pricePerNight}
                            <span className="text-ch-gray text-sm font-normal">
                              /night
                            </span>
                          </p>
                        )}
                        <div className="flex flex-wrap gap-3 text-sm text-ch-gray mb-3">
                          {room.maxOccupancy && (
                            <span className="flex items-center gap-1">
                              <UsersIcon className="w-4 h-4" />
                              Sleeps {room.maxOccupancy}
                            </span>
                          )}
                          {room.bedConfiguration && (
                            <span className="flex items-center gap-1">
                              <BedIcon className="w-4 h-4" />
                              {room.bedConfiguration}
                            </span>
                          )}
                        </div>
                        {room.excerpt && (
                          <p className="text-sm text-ch-gray line-clamp-2">
                            {room.excerpt}
                          </p>
                        )}
                        <span className="inline-block mt-3 text-ch-primary font-semibold text-sm group-hover:text-ch-secondary transition-colors">
                          View Details →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-ch-gray">
                  <BedIcon className="w-12 h-12 mx-auto mb-4" />
                  <p className="text-lg">Rooms coming soon.</p>
                  <p className="text-sm mt-2">
                    In the meantime, you can book directly.
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Standard Amenities */}
              <div className="bg-ch-white rounded-lg p-6 shadow-sm">
                <h3 className="font-heading text-lg font-bold text-ch-heading mb-4">
                  Every Room Includes
                </h3>
                <ul className="space-y-3">
                  {standardAmenities.map((amenity) => (
                    <li
                      key={amenity.label}
                      className="flex items-center gap-3 text-sm text-ch-dark"
                    >
                      <amenity.icon className="w-5 h-5 text-ch-secondary shrink-0" />
                      {amenity.label}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Book CTA */}
              <div className="bg-ch-primary-dark text-ch-white rounded-lg p-6">
                <h3 className="font-heading text-lg font-bold mb-3">
                  Ready to Book?
                </h3>
                <p className="text-sm text-ch-white/80 mb-4">
                  Reserve your room today and experience Les Cheneaux Islands.
                </p>
                <a
                  href={theme.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-ch-accent text-ch-primary-dark font-semibold px-6 py-3 rounded text-center hover:bg-ch-accent-hover transition-colors"
                >
                  Book Your Stay
                </a>
              </div>

              {/* Contact */}
              <div className="bg-ch-white rounded-lg p-6 shadow-sm">
                <h3 className="font-heading text-lg font-bold text-ch-heading mb-3">
                  Need Help?
                </h3>
                <div className="space-y-2 text-sm text-ch-dark">
                  <a
                    href={`tel:${theme.phone.replace(/[^0-9+]/g, "")}`}
                    className="flex items-center gap-2 hover:text-ch-primary transition-colors"
                  >
                    <PhoneIcon className="w-4 h-4" />
                    {theme.phone}
                  </a>
                  <a
                    href={`mailto:${theme.email}`}
                    className="flex items-center gap-2 hover:text-ch-primary transition-colors"
                  >
                    <MailIcon className="w-4 h-4" />
                    {theme.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

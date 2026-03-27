import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/client";
import { accommodationBySlugQuery, allAccommodationsQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { theme } from "@/lib/theme";
import { PortableText } from "next-sanity";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SchemaMarkup } from "@/components/seo/schema-markup";
import { amenityIcons, amenityLabels } from "@/lib/icons";
import { BedIcon, UsersIcon, PhoneIcon } from "@/lib/icons";

interface Room {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  description?: Array<{ _type: string; [key: string]: unknown }>;
  image?: { asset: { _ref: string } };
  gallery?: Array<{ asset: { _ref: string } }>;
  pricePerNight?: number;
  priceNote?: string;
  bookingUrl?: string;
  maxOccupancy?: number;
  bedConfiguration?: string;
  roomSize?: string;
  dogFriendly?: boolean;
  badge?: string;
  amenities?: string[];
  virtualTourUrl?: string;
}

export async function generateStaticParams() {
  const rooms = await sanityFetch<Array<{ slug: { current: string } }>>(
    allAccommodationsQuery
  );
  if (!rooms) return [];
  return rooms.map((room) => ({ slug: room.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const room = await sanityFetch<Room>(accommodationBySlugQuery, { slug });
  if (!room) return { title: "Room Not Found" };
  return {
    title: room.title,
    description:
      room.excerpt ||
      `${room.title} at ${theme.name}. ${room.bedConfiguration || ""} — book your stay today.`,
  };
}

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const room = await sanityFetch<Room>(accommodationBySlugQuery, { slug });
  if (!room) notFound();

  const bookingUrl = room.bookingUrl || theme.bookingUrl;

  return (
    <>
      <SchemaMarkup
        type="hotelRoom"
        data={{
          name: room.title,
          url: `${theme.url}/rooms/${room.slug.current}`,
          ...(room.pricePerNight && {
            offers: {
              "@type": "Offer",
              price: room.pricePerNight,
              priceCurrency: "USD",
            },
          }),
          ...(room.maxOccupancy && {
            occupancy: {
              "@type": "QuantitativeValue",
              value: room.maxOccupancy,
            },
          }),
          ...(room.bedConfiguration && { bed: room.bedConfiguration }),
          petsAllowed: room.dogFriendly || false,
        }}
      />

      {/* Hero Image */}
      <section className="relative bg-ch-primary-dark min-h-[40vh] md:min-h-[50vh] overflow-hidden">
        {room.image && (
          <Image
            src={urlFor(room.image).width(1920).height(800).url()}
            alt={room.title}
            fill
            className="object-cover opacity-60"
            priority
            sizes="100vw"
          />
        )}
        <div className="relative max-w-[1200px] mx-auto px-4 pt-8 pb-16 flex flex-col justify-end min-h-[40vh] md:min-h-[50vh]">
          <Breadcrumb items={[{ label: "Rooms", href: "/rooms" }, { label: room.title }]} />
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-ch-white mt-3">
            {room.title}
          </h1>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Key Features */}
              <div className="flex flex-wrap gap-6 bg-ch-white rounded-lg p-6 shadow-sm">
                {room.maxOccupancy && (
                  <div className="flex items-center gap-2">
                    <UsersIcon className="w-5 h-5 text-ch-primary" />
                    <div>
                      <p className="text-xs text-ch-gray uppercase tracking-wide">
                        Sleeps
                      </p>
                      <p className="font-semibold text-ch-heading">
                        {room.maxOccupancy}
                      </p>
                    </div>
                  </div>
                )}
                {room.bedConfiguration && (
                  <div className="flex items-center gap-2">
                    <BedIcon className="w-5 h-5 text-ch-primary" />
                    <div>
                      <p className="text-xs text-ch-gray uppercase tracking-wide">
                        Bed
                      </p>
                      <p className="font-semibold text-ch-heading">
                        {room.bedConfiguration}
                      </p>
                    </div>
                  </div>
                )}
                {room.pricePerNight && (
                  <div>
                    <p className="text-xs text-ch-gray uppercase tracking-wide">
                      From
                    </p>
                    <p className="font-semibold text-ch-accent text-lg">
                      ${room.pricePerNight}
                      <span className="text-sm text-ch-gray font-normal">
                        /night
                      </span>
                    </p>
                  </div>
                )}
              </div>

              {/* Description */}
              {room.description && (
                <div className="prose max-w-none text-ch-dark">
                  <h2 className="font-heading text-xl font-bold text-ch-heading">
                    About This Room
                  </h2>
                  <PortableText value={room.description} />
                </div>
              )}

              {/* Amenities Grid */}
              {room.amenities && room.amenities.length > 0 && (
                <div>
                  <h2 className="font-heading text-xl font-bold text-ch-heading mb-4">
                    Room Amenities
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {room.amenities.map((key) => {
                      const IconComponent = amenityIcons[key];
                      return (
                        <div
                          key={key}
                          className="flex items-center gap-2 bg-ch-white rounded-lg px-4 py-3 shadow-sm"
                        >
                          {IconComponent && (
                            <IconComponent className="w-5 h-5 text-ch-secondary shrink-0" />
                          )}
                          <span className="text-sm text-ch-dark">
                            {amenityLabels[key] || key}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Gallery */}
              {room.gallery && room.gallery.length > 0 && (
                <div>
                  <h2 className="font-heading text-xl font-bold text-ch-heading mb-4">
                    Photos
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {room.gallery.map((img, i) => (
                      <div
                        key={i}
                        className="aspect-[4/3] relative rounded-lg overflow-hidden bg-ch-gray-light"
                      >
                        <Image
                          src={urlFor(img).width(400).height(300).url()}
                          alt={`${room.title} photo ${i + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Sidebar */}
            <div className="space-y-6">
              <div className="sticky top-[110px] space-y-6">
                {/* Booking Card */}
                <div className="bg-ch-white rounded-lg p-6 shadow-md border border-ch-gray-light">
                  {room.pricePerNight && (
                    <p className="text-2xl font-bold text-ch-heading mb-1">
                      ${room.pricePerNight}
                      <span className="text-sm text-ch-gray font-normal">
                        /night
                      </span>
                    </p>
                  )}
                  {room.priceNote && (
                    <p className="text-xs text-ch-gray mb-4">{room.priceNote}</p>
                  )}
                  <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-ch-accent text-ch-primary-dark font-semibold px-6 py-3 rounded text-center text-lg hover:bg-ch-accent-hover transition-colors mb-4"
                  >
                    Book This Room
                  </a>
                  <ul className="space-y-2 text-sm text-ch-gray">
                    <li>✓ Free cancellation</li>
                    <li>✓ Best price guarantee</li>
                    <li>✓ Instant confirmation</li>
                  </ul>
                </div>

                {/* Help */}
                <div className="bg-ch-bg-alt rounded-lg p-6">
                  <h3 className="font-semibold text-ch-heading mb-2">
                    Need Help Booking?
                  </h3>
                  <a
                    href={`tel:${theme.phone.replace(/[^0-9+]/g, "")}`}
                    className="flex items-center gap-2 text-ch-primary hover:text-ch-secondary transition-colors"
                  >
                    <PhoneIcon className="w-4 h-4" />
                    {theme.phone}
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

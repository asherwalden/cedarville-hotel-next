import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/client";
import { siteSettingsQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { theme } from "@/lib/theme";
import { CtaSection } from "@/components/ui/cta-section";
import { SchemaMarkup } from "@/components/seo/schema-markup";
import type { SiteSettings } from "@/lib/types";

export default async function HomePage() {
  const settings: SiteSettings | null = await sanityFetch(siteSettingsQuery) ?? null;

  const heroTagline =
    settings?.heroTagline || theme.tagline;
  const heroDescription =
    settings?.heroDescription || theme.description;
  const urgencyBanner =
    settings?.urgencyBanner ||
    "Continental Breakfast & Starlink WiFi Included";
  const valueProps = settings?.valueProps || [
    {
      title: "Island Life",
      description:
        "Explore the Les Cheneaux Islands — 36 islands of pristine beauty, world-class kayaking, and unforgettable sunsets on Lake Huron.",
      linkUrl: "/trip-planner",
      linkText: "Plan Your Adventure →",
    },
    {
      title: "Relax & Recharge",
      description:
        "Unwind in our comfortable rooms with complimentary breakfast, Starlink WiFi, and Roku smart TVs. Small-town hospitality at its finest.",
      linkUrl: "/rooms",
      linkText: "View Our Rooms →",
    },
    {
      title: "Year-Round Adventure",
      description:
        "From summer boating to winter snowmobiling, Cedarville offers four seasons of outdoor excitement in Michigan's Upper Peninsula.",
      linkUrl: "/trip-planner",
      linkText: "Discover Activities →",
    },
  ];

  return (
    <>
      <SchemaMarkup type="hotel" />

      {/* Hero Section */}
      <section className="relative bg-ch-primary-dark text-ch-white min-h-[60vh] md:min-h-[75vh] flex items-center overflow-hidden">
        {settings?.heroImage && (
          <Image
            src={urlFor(settings.heroImage)
              .width(1920)
              .height(1080)
              .url()}
            alt={`${theme.name} — ${heroTagline}`}
            fill
            className="object-cover opacity-40"
            priority
            sizes="100vw"
          />
        )}
        <div className="relative max-w-[1200px] mx-auto px-4 py-20 text-center">
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            {heroTagline}
          </h1>
          <p className="text-lg md:text-xl text-ch-white/85 max-w-2xl mx-auto mb-8">
            {heroDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={theme.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-ch-accent text-ch-primary-dark font-semibold px-8 py-3.5 rounded text-lg hover:bg-ch-accent-hover transition-colors"
            >
              Book Your Stay
            </a>
            <Link
              href="/rooms"
              className="inline-block border-2 border-ch-white text-ch-white font-semibold px-8 py-3.5 rounded text-lg hover:bg-ch-white/10 transition-colors"
            >
              View Rooms
            </Link>
          </div>
        </div>
      </section>

      {/* Urgency Banner */}
      <div className="bg-ch-secondary text-ch-white py-3 text-center">
        <p className="text-sm md:text-base font-medium tracking-wide">
          ✦ {urgencyBanner} ✦
        </p>
      </div>

      {/* Value Props */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valueProps.map((prop, i) => (
              <div
                key={i}
                className="bg-ch-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="aspect-[600/440] relative bg-ch-gray-light">
                  {prop.image && (
                    <Image
                      src={urlFor(prop.image).width(600).height(440).url()}
                      alt={prop.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold text-ch-heading mb-3">
                    {prop.title}
                  </h3>
                  <p className="text-ch-gray text-sm leading-relaxed mb-4">
                    {prop.description}
                  </p>
                  {prop.linkUrl && (
                    <Link
                      href={prop.linkUrl}
                      className="text-ch-primary font-semibold text-sm hover:text-ch-secondary transition-colors"
                    >
                      {prop.linkText || "Learn More →"}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Map Section */}
      <section className="bg-ch-bg-alt py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-2xl md:text-4xl font-bold text-ch-heading mb-6">
                {settings?.aboutTitle ||
                  "Your Gateway to the Les Cheneaux Islands"}
              </h2>
              <p className="text-ch-dark leading-relaxed mb-6">
                {settings?.aboutDescription ||
                  "Nestled along the shores of Lake Huron in Michigan's Upper Peninsula, Cedarville Hotel is your home base for exploring the stunning Les Cheneaux Islands. Whether you're here for the fishing, kayaking, snowmobiling, or simply to relax, our 12-room hotel offers comfortable accommodations with genuine small-town hospitality."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/rooms"
                  className="inline-block bg-ch-primary text-ch-white font-semibold px-6 py-3 rounded hover:bg-ch-secondary transition-colors text-center"
                >
                  Explore Our Rooms
                </Link>
                <Link
                  href="/trip-planner"
                  className="inline-block border-2 border-ch-primary text-ch-primary font-semibold px-6 py-3 rounded hover:bg-ch-primary hover:text-ch-white transition-colors text-center"
                >
                  Plan Your Trip
                </Link>
              </div>
            </div>
            <div className="aspect-[4/3] relative rounded-lg overflow-hidden bg-ch-gray-light">
              {settings?.propertyMap ? (
                <Image
                  src={urlFor(
                    settings.propertyMap
                  )
                    .width(800)
                    .height(600)
                    .url()}
                  alt="Property map of Cedarville Hotel and surroundings"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2776.5!2d-84.3564!3d45.9983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDU5JzUzLjkiTiA4NMKwMjEnMjMuMCJX!5e0!3m2!1sen!2sus!4v1"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Cedarville Hotel location"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaSection />
    </>
  );
}

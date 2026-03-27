import Link from "next/link";
import { theme } from "@/lib/theme";
import { sanityFetch } from "@/sanity/client";
import { allSisterPropertiesQuery } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import {
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  ClockIcon,
  FacebookIcon,
  InstagramIcon,
} from "@/lib/icons";
import Image from "next/image";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Rooms", href: "/rooms" },
  { label: "Amenities", href: "/amenities" },
  { label: "Trip Planner", href: "/trip-planner" },
  { label: "FAQ", href: "/faq" },
  { label: "Policies", href: "/policies" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

interface SisterProperty {
  _id: string;
  name: string;
  location?: string;
  url?: string;
  image?: { asset: { _ref: string } };
}

export async function Footer() {
  const sisterProperties: SisterProperty[] = await sanityFetch(allSisterPropertiesQuery) ?? [];

  return (
    <footer>
      {/* Sister Properties Cross-Promo */}
      {sisterProperties.length > 0 && (
        <section className="bg-ch-bg-alt py-16">
          <div className="max-w-[1200px] mx-auto px-4">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-ch-heading text-center mb-8">
              Explore Our Sister Properties
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {sisterProperties.map((property) => (
                <a
                  key={property._id}
                  href={property.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-ch-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="aspect-[5/3.6] relative bg-ch-gray-light">
                    {property.image && (
                      <Image
                        src={urlFor(property.image).width(500).height(360).url()}
                        alt={property.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading font-semibold text-ch-heading group-hover:text-ch-primary transition-colors">
                      {property.name}
                    </h3>
                    {property.location && (
                      <p className="text-sm text-ch-gray mt-1">
                        {property.location}
                      </p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Footer */}
      <div className="bg-ch-primary-dark text-ch-bg-main">
        <div className="max-w-[1200px] mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Column 1: Identity */}
            <div>
              <h3 className="font-heading text-xl font-bold mb-4">
                {theme.name}
              </h3>
              <div className="flex items-start gap-2 text-sm text-ch-bg-main/80 mb-4">
                <MapPinIcon className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{theme.address.full}</span>
              </div>
              <div className="flex gap-3 mt-4">
                {theme.social.facebook && (
                  <a
                    href={theme.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ch-bg-main/80 hover:text-ch-accent transition-colors"
                    aria-label="Facebook"
                  >
                    <FacebookIcon className="w-5 h-5" />
                  </a>
                )}
                {theme.social.instagram && (
                  <a
                    href={theme.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ch-bg-main/80 hover:text-ch-accent transition-colors"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>

            {/* Column 2: Contact */}
            <div>
              <h3 className="font-heading text-lg font-semibold mb-4">
                Contact Us
              </h3>
              <ul className="space-y-3 text-sm text-ch-bg-main/80">
                <li className="flex items-center gap-2">
                  <PhoneIcon className="w-4 h-4 shrink-0" />
                  <a
                    href={`tel:${theme.phone.replace(/[^0-9+]/g, "")}`}
                    className="hover:text-ch-accent transition-colors"
                  >
                    {theme.phone}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <PhoneIcon className="w-4 h-4 shrink-0" />
                  <a
                    href={`tel:${theme.phoneTollFree.replace(/[^0-9+]/g, "")}`}
                    className="hover:text-ch-accent transition-colors"
                  >
                    {theme.phoneTollFree}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <MailIcon className="w-4 h-4 shrink-0" />
                  <a
                    href={`mailto:${theme.email}`}
                    className="hover:text-ch-accent transition-colors"
                  >
                    {theme.email}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <ClockIcon className="w-4 h-4 mt-0.5 shrink-0" />
                  <div>
                    <div>{theme.hours.weekday}</div>
                    <div>{theme.hours.weekend}</div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Column 3: Quick Links */}
            <div>
              <h3 className="font-heading text-lg font-semibold mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2 text-sm">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-ch-bg-main/80 hover:text-ch-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Book */}
            <div>
              <h3 className="font-heading text-lg font-semibold mb-4">
                Book Your Stay
              </h3>
              <p className="text-sm text-ch-bg-main/80 mb-4">
                Your gateway to the Les Cheneaux Islands. Reserve your room
                today.
              </p>
              <a
                href={theme.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-ch-accent text-ch-primary-dark font-semibold px-6 py-2.5 rounded text-sm hover:bg-ch-accent-hover transition-colors"
              >
                Book Now
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-ch-bg-main/20 text-center text-sm text-ch-bg-main/60">
            <p>
              &copy; {new Date().getFullYear()} {theme.name} — JJ Resort
              Properties. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile bottom bar spacer */}
      <div className="md:hidden h-14" />
    </footer>
  );
}

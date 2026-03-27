import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/client";
import { siteSettingsQuery } from "@/sanity/queries";
import { theme } from "@/lib/theme";
import { PageHero } from "@/components/ui/page-hero";
import {
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  ClockIcon,
  ExternalLinkIcon,
} from "@/lib/icons";
import { ContactForm } from "./contact-form";
import type { SiteSettings } from "@/lib/types";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${theme.name} — your gateway to the Les Cheneaux Islands. Call, email, or visit us in ${theme.address.city}, ${theme.address.state}.`,
};

export default async function ContactPage() {
  const settings: SiteSettings | null = await sanityFetch(siteSettingsQuery) ?? null;

  const locationBlurb =
    settings?.contactLocationBlurb ||
    "We're located on M-134 in Cedarville, Michigan — the gateway to the Les Cheneaux Islands in the eastern Upper Peninsula. Easy access from I-75.";

  const mapsUrl =
    settings?.googleMapsEmbedUrl ||
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2776.5!2d-84.3564!3d45.9983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDU5JzUzLjkiTiA4NMKwMjEnMjMuMCJX!5e0!3m2!1sen!2sus!4v1";

  return (
    <>
      <PageHero
        title="Get in Touch"
        subtitle="We'd love to hear from you. Reach out with any questions about your upcoming stay."
      />

      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-ch-heading mb-6">
                Send Us a Message
              </h2>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Info Blocks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-ch-white rounded-lg p-5 shadow-sm">
                  <MapPinIcon className="w-5 h-5 text-ch-secondary mb-2" />
                  <h3 className="font-semibold text-ch-heading text-sm mb-1">
                    Address
                  </h3>
                  <p className="text-sm text-ch-dark">{theme.address.full}</p>
                </div>
                <div className="bg-ch-white rounded-lg p-5 shadow-sm">
                  <PhoneIcon className="w-5 h-5 text-ch-secondary mb-2" />
                  <h3 className="font-semibold text-ch-heading text-sm mb-1">
                    Phone
                  </h3>
                  <p className="text-sm text-ch-dark">{theme.phone}</p>
                  <p className="text-sm text-ch-gray">{theme.phoneTollFree}</p>
                </div>
                <div className="bg-ch-white rounded-lg p-5 shadow-sm">
                  <MailIcon className="w-5 h-5 text-ch-secondary mb-2" />
                  <h3 className="font-semibold text-ch-heading text-sm mb-1">
                    Email
                  </h3>
                  <a
                    href={`mailto:${theme.email}`}
                    className="text-sm text-ch-primary hover:underline"
                  >
                    {theme.email}
                  </a>
                </div>
                <div className="bg-ch-white rounded-lg p-5 shadow-sm">
                  <ClockIcon className="w-5 h-5 text-ch-secondary mb-2" />
                  <h3 className="font-semibold text-ch-heading text-sm mb-1">
                    Front Desk Hours
                  </h3>
                  <p className="text-sm text-ch-dark">{theme.hours.weekday}</p>
                  <p className="text-sm text-ch-dark">{theme.hours.weekend}</p>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-lg overflow-hidden shadow-sm">
                <iframe
                  src={mapsUrl}
                  className="w-full h-[300px] border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${theme.name} location`}
                />
              </div>

              {/* Directions */}
              <div>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${theme.geo.latitude},${theme.geo.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-ch-primary text-ch-white font-semibold px-5 py-2.5 rounded hover:bg-ch-secondary transition-colors text-sm"
                >
                  <ExternalLinkIcon className="w-4 h-4" />
                  Get Directions
                </a>
                <p className="text-sm text-ch-gray mt-3">{locationBlurb}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/client";
import { allPoliciesQuery, siteSettingsQuery } from "@/sanity/queries";
import { PageHero } from "@/components/ui/page-hero";
import { Accordion } from "@/components/ui/accordion";
import { PortableText } from "next-sanity";
import Link from "next/link";
import type { SiteSettings } from "@/lib/types";

export const metadata: Metadata = {
  title: "Policies",
  description:
    "Cedarville Hotel policies — check-in/out times, payment, pet policy, cancellation, smoking, and more.",
};

interface PolicySection {
  _id: string;
  title: string;
  slug?: { current: string };
  content: Array<{ _type: string; [key: string]: unknown }>;
  order: number;
}

interface QuickCard {
  label: string;
  value: string;
}

export default async function PoliciesPage() {
  const [policies, settings] = await Promise.all([
    sanityFetch<PolicySection[]>(allPoliciesQuery).then(r => r ?? []),
    sanityFetch<SiteSettings>(siteSettingsQuery).then(r => r ?? null),
  ]);

  const quickCards = settings?.policyQuickCards || [
    { label: "Check-In", value: "3:00 PM" },
    { label: "Check-Out", value: "11:00 AM" },
    { label: "Min. Age", value: "18+" },
  ];

  const importantNotice = settings?.policyImportantNotice;

  return (
    <>
      <PageHero
        title="Hotel Policies"
        subtitle="Everything you need to know before your stay."
      />

      <section className="py-16">
        <div className="max-w-[800px] mx-auto px-4">
          {/* Quick Reference Cards */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {quickCards.map((card, i) => (
              <div
                key={i}
                className="bg-ch-white rounded-lg p-4 text-center shadow-sm border border-ch-gray-light"
              >
                <p className="text-xs text-ch-gray uppercase tracking-wide mb-1">
                  {card.label}
                </p>
                <p className="text-lg font-bold text-ch-heading">
                  {card.value}
                </p>
              </div>
            ))}
          </div>

          {/* Important Notice */}
          {importantNotice ? (
            <div className="bg-ch-accent/10 border-l-4 border-ch-accent rounded-r-lg p-5 mb-10">
              <h3 className="font-semibold text-ch-heading mb-2">
                Important Requirements
              </h3>
              <div className="prose prose-sm max-w-none text-ch-dark">
                <PortableText value={importantNotice} />
              </div>
            </div>
          ) : (
            <div className="bg-ch-accent/10 border-l-4 border-ch-accent rounded-r-lg p-5 mb-10">
              <h3 className="font-semibold text-ch-heading mb-2">
                Important Requirements
              </h3>
              <ul className="text-sm text-ch-dark space-y-1">
                <li>• Guests must be 18+ with a valid driver&apos;s license</li>
                <li>• Valid credit card required at booking</li>
                <li>
                  • Card charged 1 day before arrival for 100% of reservation
                </li>
              </ul>
            </div>
          )}

          {/* Policy Sections */}
          {policies.length > 0 ? (
            <Accordion items={policies} variant="policy" defaultOpen={0} />
          ) : (
            <p className="text-center text-ch-gray py-12">
              Policies coming soon.
            </p>
          )}

          {/* Help Box */}
          <div className="mt-10 bg-ch-bg-alt rounded-lg p-6 text-center">
            <h3 className="font-heading text-lg font-bold text-ch-heading mb-2">
              Questions About Our Policies?
            </h3>
            <p className="text-sm text-ch-gray mb-4">
              We&apos;re happy to help with any questions about your upcoming stay.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-ch-primary text-ch-white font-semibold px-6 py-2.5 rounded hover:bg-ch-secondary transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

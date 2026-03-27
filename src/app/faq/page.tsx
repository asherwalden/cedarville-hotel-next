import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/client";
import { allFaqsQuery } from "@/sanity/queries";
import { theme } from "@/lib/theme";
import { PageHero } from "@/components/ui/page-hero";
import { Accordion } from "@/components/ui/accordion";
import { CtaSection } from "@/components/ui/cta-section";
import { SchemaMarkup } from "@/components/seo/schema-markup";
import { toPlainText } from "next-sanity";
import { FaqSearch } from "./faq-search";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Frequently asked questions about Cedarville Hotel — check-in times, pet policy, parking, amenities, and more.",
};

interface FaqItem {
  _id: string;
  question: string;
  answer: Array<{ _type: string; [key: string]: unknown }>;
  order: number;
}

export default async function FaqPage() {
  const faqs: FaqItem[] = await sanityFetch(allFaqsQuery) ?? [];

  // Build schema data from FAQ items
  const schemaItems = faqs.map((faq) => ({
    question: faq.question,
    answer: toPlainText(faq.answer),
  }));

  return (
    <>
      <SchemaMarkup type="faqPage" data={{ items: schemaItems }} />

      <PageHero
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about your stay at Cedarville Hotel."
      />

      <section className="py-16">
        <div className="max-w-[800px] mx-auto px-4">
          {faqs.length > 0 ? (
            <>
              <FaqSearch faqs={faqs} />
              <Accordion items={faqs} variant="faq" />
            </>
          ) : (
            <p className="text-center text-ch-gray py-12">
              FAQs coming soon. In the meantime, feel free to{" "}
              <a href="/contact" className="text-ch-primary hover:underline">
                contact us
              </a>
              .
            </p>
          )}
        </div>
      </section>

      <CtaSection
        secondaryText="Contact Us"
        secondaryUrl="/contact"
      />
    </>
  );
}

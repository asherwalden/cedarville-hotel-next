import { theme } from "@/lib/theme";

interface SchemaMarkupProps {
  type: "hotel" | "hotelRoom" | "faqPage" | "breadcrumb";
  data?: Record<string, unknown>;
}

export function SchemaMarkup({ type, data }: SchemaMarkupProps) {
  let schema: Record<string, unknown>;

  switch (type) {
    case "hotel":
      schema = {
        "@context": "https://schema.org",
        "@type": "Hotel",
        name: theme.name,
        url: theme.url,
        telephone: theme.phone,
        email: theme.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: theme.address.street,
          addressLocality: theme.address.city,
          addressRegion: theme.address.state,
          postalCode: theme.address.zip,
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: theme.geo.latitude,
          longitude: theme.geo.longitude,
        },
        amenityFeature: theme.schema.amenityFeatures.map((feature) => ({
          "@type": "LocationFeatureSpecification",
          name: feature,
          value: true,
        })),
        petsAllowed: theme.schema.petsAllowed,
        checkinTime: theme.schema.checkInTime,
        checkoutTime: theme.schema.checkOutTime,
        priceRange: theme.schema.priceRange,
        numberOfRooms: theme.schema.numberOfRooms,
        starRating: {
          "@type": "Rating",
          ratingValue: theme.schema.starRating,
        },
        sameAs: [theme.social.facebook, theme.social.instagram].filter(
          Boolean
        ),
      };
      break;

    case "hotelRoom":
      schema = {
        "@context": "https://schema.org",
        "@type": "HotelRoom",
        ...data,
      };
      break;

    case "faqPage":
      schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: (data?.items as Array<{ question: string; answer: string }>)?.map(
          (item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })
        ),
      };
      break;

    case "breadcrumb":
      schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: (
          data?.items as Array<{ name: string; url: string }>
        )?.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: item.url,
        })),
      };
      break;

    default:
      return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

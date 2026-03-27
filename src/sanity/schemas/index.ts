import { accommodation } from "./accommodation";
import { amenity } from "./amenity";
import { attraction } from "./attraction";
import { blogPost } from "./blog-post";
import { category } from "./category";
import { faqItem } from "./faq-item";
import { policySection } from "./policy-section";
import { sisterProperty } from "./sister-property";
import { siteSettings } from "./site-settings";

export const schemaTypes = [
  // Singletons
  siteSettings,
  // Content types
  accommodation,
  blogPost,
  category,
  faqItem,
  policySection,
  amenity,
  attraction,
  sisterProperty,
];

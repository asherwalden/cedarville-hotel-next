import { groq } from "next-sanity";

// Site Settings (singleton)
export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]`;

// Accommodations
export const allAccommodationsQuery = groq`*[_type == "accommodation"] | order(order asc) {
  _id,
  title,
  slug,
  excerpt,
  image,
  pricePerNight,
  priceNote,
  maxOccupancy,
  bedConfiguration,
  dogFriendly,
  badge,
  amenities,
  order
}`;

export const accommodationBySlugQuery = groq`*[_type == "accommodation" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  description,
  image,
  gallery,
  pricePerNight,
  priceNote,
  bookingUrl,
  maxOccupancy,
  bedConfiguration,
  roomSize,
  dogFriendly,
  badge,
  amenities,
  virtualTourUrl
}`;

// FAQ
export const allFaqsQuery = groq`*[_type == "faqItem"] | order(order asc) {
  _id,
  question,
  answer,
  order
}`;

// Policies
export const allPoliciesQuery = groq`*[_type == "policySection"] | order(order asc) {
  _id,
  title,
  slug,
  content,
  order
}`;

// Amenities
export const allAmenitiesQuery = groq`*[_type == "amenity"] | order(order asc) {
  _id,
  title,
  description,
  image,
  icon,
  notice,
  order
}`;

// Sister Properties
export const allSisterPropertiesQuery = groq`*[_type == "sisterProperty"] | order(order asc) {
  _id,
  name,
  location,
  url,
  image,
  order
}`;

// Attractions
export const allAttractionsQuery = groq`*[_type == "attraction"] | order(order asc) {
  _id,
  title,
  description,
  image,
  distance,
  order
}`;

// Blog
export const allBlogPostsQuery = groq`*[_type == "blogPost"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  categories[]->{ _id, title, slug },
  author,
  publishedAt
}`;

export const blogPostBySlugQuery = groq`*[_type == "blogPost" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  body,
  mainImage,
  categories[]->{ _id, title, slug },
  author,
  publishedAt
}`;

import { defineField, defineType } from "sanity";

export const accommodation = defineType({
  name: "accommodation",
  title: "Rooms & Units",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Room Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Short Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "description",
      title: "Full Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "image",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "gallery",
      title: "Photo Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    // Pricing
    defineField({
      name: "pricePerNight",
      title: "Price Per Night",
      type: "number",
    }),
    defineField({
      name: "priceNote",
      title: "Price Note",
      type: "string",
      description: "e.g. 'Starting from' or 'Seasonal rates apply'",
    }),
    defineField({
      name: "bookingUrl",
      title: "Room-Specific Booking URL",
      type: "url",
      description: "Override the default booking URL for this room",
    }),
    // Room details
    defineField({
      name: "maxOccupancy",
      title: "Max Occupancy",
      type: "number",
    }),
    defineField({
      name: "bedConfiguration",
      title: "Bed Configuration",
      type: "string",
      description: "e.g. '1 King Bed' or '2 Queen Beds'",
    }),
    defineField({
      name: "roomSize",
      title: "Room Size",
      type: "string",
      description: "e.g. '350 sq ft'",
    }),
    defineField({
      name: "dogFriendly",
      title: "Dog Friendly",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
      options: {
        list: [
          { title: "Dog Friendly", value: "dog-friendly" },
          { title: "Best Value", value: "best-value" },
          { title: "Family Favorite", value: "family-favorite" },
          { title: "Most Popular", value: "most-popular" },
        ],
      },
    }),
    defineField({
      name: "amenities",
      title: "Room Amenities",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "WiFi", value: "wifi" },
          { title: "Roku Smart TV", value: "tv" },
          { title: "Air Conditioning", value: "ac" },
          { title: "Heating", value: "heat" },
          { title: "Microwave", value: "microwave" },
          { title: "Mini Fridge", value: "fridge" },
          { title: "Coffee & Supplies", value: "coffee_maker" },
          { title: "Full Kitchen", value: "full_kitchen" },
          { title: "Gas Fireplace", value: "gas_fireplace" },
          { title: "Private Bath", value: "private_bath" },
          { title: "Walk-In Shower", value: "walk_in_shower" },
          { title: "Free Parking", value: "parking" },
          { title: "Charcoal Grill", value: "grill" },
          { title: "Keypad Entry", value: "keypad_entry" },
          { title: "Housekeeping", value: "housekeeping" },
          { title: "Complimentary Breakfast", value: "breakfast" },
          { title: "Room Phone", value: "phone" },
          { title: "Hair Dryer", value: "hairdryer" },
        ],
      },
    }),
    defineField({
      name: "virtualTourUrl",
      title: "Virtual Tour URL",
      type: "url",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Price (Low to High)",
      name: "priceAsc",
      by: [{ field: "pricePerNight", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "bedConfiguration",
      media: "image",
    },
  },
});

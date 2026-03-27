import { defineField, defineType } from "sanity";

export const amenity = defineType({
  name: "amenity",
  title: "Property Amenity",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Amenity Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "icon",
      title: "Icon Key",
      type: "string",
      description: "Key from the icon set (e.g. wifi, tv, coffee_maker)",
    }),
    defineField({
      name: "notice",
      title: "Notice / Caveat",
      type: "string",
      description: "e.g. 'Currently unavailable' or '$20/night fee'",
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
  ],
  preview: {
    select: { title: "title", media: "image" },
  },
});

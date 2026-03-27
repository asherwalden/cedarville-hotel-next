import { defineField, defineType } from "sanity";

export const sisterProperty = defineType({
  name: "sisterProperty",
  title: "Sister Property",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Property Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "e.g. 'Hessel, MI' or 'Paradise, MI'",
    }),
    defineField({
      name: "url",
      title: "Website URL",
      type: "url",
    }),
    defineField({
      name: "image",
      title: "Property Image",
      type: "image",
      options: { hotspot: true },
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
    select: { title: "name", subtitle: "location", media: "image" },
  },
});

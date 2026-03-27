import { defineField, defineType } from "sanity";

export const attraction = defineType({
  name: "attraction",
  title: "Local Attraction",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Attraction Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "distance",
      title: "Distance",
      type: "string",
      description: "e.g. '7 miles' or 'On-site'",
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

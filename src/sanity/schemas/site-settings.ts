import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    // Hero
    defineField({
      name: "heroMediaType",
      title: "Hero Media Type",
      type: "string",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Video", value: "video" },
        ],
      },
      initialValue: "image",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroVideoUrl",
      title: "Hero Video URL",
      type: "url",
    }),
    defineField({
      name: "heroTagline",
      title: "Hero Tagline",
      type: "string",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "urgencyBanner",
      title: "Urgency Banner Text",
      type: "string",
      description: "e.g. 'Continental Breakfast & Starlink WiFi Included'",
    }),
    // Value props
    defineField({
      name: "valueProps",
      title: "Value Propositions",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description", type: "text" },
            { name: "image", title: "Image", type: "image", options: { hotspot: true } },
            { name: "linkUrl", title: "Link URL", type: "string" },
            { name: "linkText", title: "Link Text", type: "string" },
          ],
          preview: {
            select: { title: "title", media: "image" },
          },
        },
      ],
      validation: (rule) => rule.max(3),
    }),
    // About / Map
    defineField({
      name: "aboutTitle",
      title: "About Section Title",
      type: "string",
    }),
    defineField({
      name: "aboutDescription",
      title: "About Section Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "propertyMap",
      title: "Property Map Image",
      type: "image",
      options: { hotspot: true },
    }),
    // Quick reference cards (policies page)
    defineField({
      name: "policyQuickCards",
      title: "Policy Quick Reference Cards",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "value", title: "Value", type: "string" },
          ],
          preview: {
            select: { title: "label", subtitle: "value" },
          },
        },
      ],
      validation: (rule) => rule.max(3),
    }),
    defineField({
      name: "policyImportantNotice",
      title: "Policy Important Notice",
      type: "array",
      of: [{ type: "block" }],
    }),
    // Contact page
    defineField({
      name: "contactLocationBlurb",
      title: "Contact Page Location Blurb",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "googleMapsEmbedUrl",
      title: "Google Maps Embed URL",
      type: "url",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});

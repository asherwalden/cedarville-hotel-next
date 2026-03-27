export interface SanityImage {
  asset: { _ref: string };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

export interface SiteSettings {
  heroMediaType?: "image" | "video";
  heroImage?: SanityImage;
  heroVideoUrl?: string;
  heroTagline?: string;
  heroDescription?: string;
  urgencyBanner?: string;
  valueProps?: Array<{
    title: string;
    description: string;
    image?: SanityImage;
    linkUrl?: string;
    linkText?: string;
  }>;
  aboutTitle?: string;
  aboutDescription?: string;
  propertyMap?: SanityImage;
  policyQuickCards?: Array<{ label: string; value: string }>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  policyImportantNotice?: any[];
  contactLocationBlurb?: string;
  googleMapsEmbedUrl?: string;
}

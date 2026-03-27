/**
 * Theme configuration — the single source of truth for reskinning.
 * To launch a sister property: duplicate this file and update the values.
 */

export const theme = {
  // Property identity
  name: "Cedarville Hotel",
  tagline: "Small Town Comfort. Big Water Fun.",
  description:
    "Your gateway to the Les Cheneaux Islands — where Lake Huron's beauty meets small-town charm in Michigan's Upper Peninsula.",
  url: "https://cedarvillehotel.com",

  // Contact
  phone: "(906) 484-1280",
  phoneTollFree: "1-800-222-2949",
  email: "cedarvillehotel@gmail.com",
  address: {
    street: "106 W M-134",
    city: "Cedarville",
    state: "MI",
    zip: "49719",
    full: "106 W M-134, Cedarville, MI 49719",
  },

  // Hours
  hours: {
    weekday: "Sun–Thu 7am–8pm",
    weekend: "Fri–Sat 7am–10pm",
  },

  // Booking
  bookingUrl:
    "https://reservations.innroad.com/v1/?PropertyID=cedarvillehotel",

  // Geo (for SEO / schema markup)
  geo: {
    latitude: 45.9983,
    longitude: -84.3564,
    region: "US-MI",
    placename: "Cedarville",
  },

  // Social
  social: {
    facebook: "https://www.facebook.com/cedarvillehotel",
    instagram: "https://www.instagram.com/cedarvillehotel",
  },

  // Schema / SEO
  schema: {
    priceRange: "$$",
    starRating: 3,
    numberOfRooms: 12,
    checkInTime: "15:00",
    checkOutTime: "11:00",
    petsAllowed: true,
    amenityFeatures: [
      "WiFi",
      "Parking",
      "Dog-Friendly Rooms",
      "Complimentary Continental Breakfast",
      "Roku Smart TVs",
      "Mini Fridge & Microwave",
      "Island Access",
    ],
  },

  // SEO keywords
  keywords: [
    "Cedarville MI lodging",
    "dog friendly hotel Cedarville",
    "Les Cheneaux Islands lodging",
    "Upper Michigan hotel accommodations",
  ],
} as const;

export type Theme = typeof theme;

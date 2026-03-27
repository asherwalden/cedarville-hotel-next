/**
 * Seed script — populates Sanity with all content from the WordPress theme.
 * Run: npx tsx scripts/seed.ts
 */

import { createClient } from "next-sanity";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

// Helper to create a portable text block from a string
function toBlock(text: string) {
  return [
    {
      _type: "block",
      _key: Math.random().toString(36).slice(2, 10),
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: Math.random().toString(36).slice(2, 10),
          text,
          marks: [],
        },
      ],
    },
  ];
}

// Helper for multi-paragraph portable text
function toBlocks(paragraphs: string[]) {
  return paragraphs.map((text) => ({
    _type: "block" as const,
    _key: Math.random().toString(36).slice(2, 10),
    style: "normal" as const,
    markDefs: [],
    children: [
      {
        _type: "span" as const,
        _key: Math.random().toString(36).slice(2, 10),
        text,
        marks: [],
      },
    ],
  }));
}

// Helper for a list block
function toBulletList(items: string[]) {
  return items.map((text) => ({
    _type: "block" as const,
    _key: Math.random().toString(36).slice(2, 10),
    style: "normal" as const,
    listItem: "bullet" as const,
    level: 1,
    markDefs: [],
    children: [
      {
        _type: "span" as const,
        _key: Math.random().toString(36).slice(2, 10),
        text,
        marks: [],
      },
    ],
  }));
}

async function seed() {
  console.log("🌱 Seeding Sanity content...\n");

  // ============================================================
  // SITE SETTINGS (singleton)
  // ============================================================
  console.log("  → Site Settings");
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    heroMediaType: "image",
    heroTagline: "Small Town Comfort. Big Water Fun.",
    heroDescription:
      "Positioned on the Les Cheneaux Islands in Michigan's eastern Upper Peninsula, Cedarville Hotel puts you steps from Lake Huron, world-class kayaking, and 100+ miles of snowmobile trails. Whether you're here for the water, the wildlife, or simply to unwind — you've found the right place.",
    urgencyBanner: "Continental Breakfast & Starlink WiFi Included",
    valueProps: [
      {
        _key: "vp1",
        title: "Island Life Awaits",
        description:
          "Cedarville sits at the gateway to the Les Cheneaux Islands — a chain of 36 islands known for exceptional kayaking, boating, and fishing. Lake Huron is minutes from your door.",
        linkUrl: "/trip-planner",
        linkText: "Plan Your Adventure →",
      },
      {
        _key: "vp2",
        title: "Relax & Recharge",
        description:
          "After a day on the water or trails, settle into your room with Starlink WiFi and a Roku smart TV. Start every morning right with our complimentary continental breakfast.",
        linkUrl: "/rooms",
        linkText: "View Our Rooms →",
      },
      {
        _key: "vp3",
        title: "Year-Round Adventure",
        description:
          "Summer brings boating, kayaking, and casino nights at Kewadin Hessel (7 miles away). Winter opens 100+ miles of groomed snowmobile trails right from the property.",
        linkUrl: "/trip-planner",
        linkText: "Discover Activities →",
      },
    ],
    aboutTitle: "Find Your Way Around",
    aboutDescription:
      "Cedarville Hotel is a 50-unit hotel in the heart of Michigan's Upper Peninsula, located at the corner of M-134 and M-129. Owned and operated with genuine UP hospitality, we've been welcoming guests to the Les Cheneaux Islands area for years.",
    policyQuickCards: [
      { _key: "qc1", label: "Check-In", value: "After 3:00 PM" },
      { _key: "qc2", label: "Check-Out", value: "Before 10:00 AM" },
      { _key: "qc3", label: "Cancellation", value: "Free 24hrs+ before" },
    ],
    policyImportantNotice: toBlocks([
      "Must be at least 18 years old with valid driver's license.",
      "Valid credit card required even if paying cash.",
      "100% of the total cost of your reservation is due at the time of booking.",
    ]),
    contactLocationBlurb:
      "Located on M-134 in Cedarville, Michigan — gateway to the Les Cheneaux Islands in the eastern Upper Peninsula. Easy access to boating, fishing, kayaking, and year-round outdoor recreation.",
  });

  // ============================================================
  // FAQ ITEMS (15 pairs)
  // ============================================================
  console.log("  → FAQ Items (15)");
  const faqs = [
    { q: "What time is check-in and check-out?", a: "Check-in begins at 3:00 PM. Check-out is by 10:00 AM." },
    { q: "Do you allow pets?", a: "Yes! We allow up to 2 dogs in designated dog-friendly rooms for $20 per dog, per night. Dogs only — no other pets please. Service animals are always welcome at no charge." },
    { q: "Is breakfast included?", a: "Yes, complimentary breakfast is included with your stay." },
    { q: "Do you have WiFi?", a: "Yes, we offer complimentary Starlink high-speed WiFi throughout the property." },
    { q: "What's in the rooms?", a: "Each room includes Starlink WiFi, a Roku TV, mini fridge, microwave, and coffee with supplies." },
    { q: "Is there laundry on-site?", a: "Yes, coin-operated laundry facilities are available on-site for guest use." },
    { q: "Is there a pool or hot tub?", a: "The pool and hot tub are not currently operational. We'll update our site when they're back online!" },
    { q: "Is there an elevator?", a: "The hotel does not have an elevator. Ground-floor accessible rooms are available." },
    { q: "Are you open year-round?", a: "Yes, we're open year-round — come enjoy every season in the U.P.!" },
    { q: "Do you offer military discounts?", a: "Yes, we offer a 10% military discount with valid ID. Thank you for your service." },
    { q: "Do you offer student discounts?", a: "Yes, we offer a 15% student discount with valid student ID." },
    { q: "Do you have a conference room?", a: "Yes, we have a conference room available for meetings and small events. Please call for availability." },
    { q: "What are your front desk hours?", a: "Sun–Thu: 7:00 AM – 8:00 PM | Fri–Sat: 7:00 AM – 10:00 PM" },
    { q: "Is parking available?", a: "Yes, free on-site parking is available." },
    { q: "What is there to do near the hotel?", a: "Plenty! Fishing, boating, hunting, snowmobiling, hiking trails, golf, local restaurants, coffee shops, and more — the eastern U.P. is a year-round playground." },
  ];

  for (let i = 0; i < faqs.length; i++) {
    await client.create({
      _type: "faqItem",
      question: faqs[i].q,
      answer: toBlock(faqs[i].a),
      order: i,
    });
  }

  // ============================================================
  // POLICY SECTIONS (8)
  // ============================================================
  console.log("  → Policy Sections (8)");
  const policies = [
    {
      title: "Check-In & Check-Out",
      slug: "check-in-check-out",
      content: [
        "Check-in begins at 3:00 PM.",
        "Check-out is by 10:00 AM.",
        "Please do not leave food or drinks in refrigeration unless it is beer.",
        "Tip: If you need assistance, call us at (906) 484-1280.",
      ],
    },
    {
      title: "Payment & Refund Policy",
      slug: "payment-refund",
      content: [
        "100% of the total cost of your reservation is due at the time of booking.",
        "As long as you cancel more than 24 hours in advance of your arrival time, you can get 100% refunded.",
        "No refunds for early departures.",
      ],
    },
    {
      title: "Taxes",
      slug: "taxes",
      content: [
        "All room rates are plus tax.",
        "Michigan Sales Tax: 6%",
        "Upper Peninsula Travel & Recreation Tax: 1%",
      ],
    },
    {
      title: "Pet Policy",
      slug: "pet-policy",
      content: [
        "Dogs allowed in designated dog-friendly rooms only.",
        "$20 per dog, per night non-refundable pet fee.",
        "Maximum of two (2) dogs per room.",
        "Dogs only — no cats, birds, or exotic pets.",
        "We reserve the right to refuse a dog based on breed, size, or temperament.",
        "Important: Service animals are always welcome at no charge.",
      ],
    },
    {
      title: "Damages & Maintenance",
      slug: "damages",
      content: [
        "Guests are responsible for any damage to the room or property.",
        "$200 fee if rooms show evidence of smoking or require excessive housekeeping.",
        "Exact replacement costs will be charged for damages (e.g. broken televisions, destroyed bedding).",
        "Please report any issues or damages immediately to the front desk.",
      ],
    },
    {
      title: "Noise & Conduct",
      slug: "noise-conduct",
      content: [
        "Loud music is prohibited at all times.",
        "Quiet hours are enforced after 10:00 PM.",
        "Indoor smoking is forbidden — $200 fee for violations.",
        "$25 fee per cigarette butt found outside of designated ashtrays.",
        "Please be respectful of your neighbors.",
      ],
    },
    {
      title: "Plumbing",
      slug: "plumbing",
      content: [
        "Only toilet paper may be flushed.",
        "Guests are responsible for any septic damages caused by improper use.",
      ],
    },
    {
      title: "Communication Consent",
      slug: "communication",
      content: [
        "By booking, guests authorize the hotel to send text messages and emails about reservations and offers.",
        "Standard message and data rates may apply.",
      ],
    },
  ];

  for (let i = 0; i < policies.length; i++) {
    await client.create({
      _type: "policySection",
      title: policies[i].title,
      slug: { _type: "slug", current: policies[i].slug },
      content: toBlocks(policies[i].content),
      order: i,
    });
  }

  // ============================================================
  // AMENITIES (9)
  // ============================================================
  console.log("  → Amenities (9)");
  const amenities = [
    {
      title: "Continental Breakfast",
      icon: "breakfast",
      description: "Start every morning with our complimentary continental breakfast, served daily for all guests. Fuel up before a day on the islands.",
    },
    {
      title: "Starlink WiFi",
      icon: "wifi",
      description: "Stay connected with high-speed Starlink satellite internet, available throughout the property at no extra charge.",
    },
    {
      title: "Roku Smart TVs",
      icon: "tv",
      description: "Every room includes a Roku smart TV — stream your favorite shows and movies during your stay.",
    },
    {
      title: "Pet-Friendly Rooms",
      icon: "dog",
      description: "We welcome well-behaved dogs in designated pet-friendly rooms.",
      notice: "$20 per night, per dog",
    },
    {
      title: "Conference / Meeting Room",
      icon: undefined,
      description: "Need a space to work or meet? Our conference room is available for rent at $75/day. Great for small business gatherings, retreats, or remote work. Call (906) 484-1280 to reserve.",
      notice: "$75/day",
    },
    {
      title: "Free Parking",
      icon: "parking",
      description: "Free on-site parking including designated spaces for vehicles with trailers. Green zones are designated trailer parking; red zones are no-trailer areas.",
    },
    {
      title: "Guest Laundry",
      icon: undefined,
      description: "Coin-operated laundry facilities are available on-site for guest use.",
    },
    {
      title: "Student & Extended Stay",
      icon: undefined,
      description: "Cedarville Hotel is a proud partner of the Marine Trades Institute and Culinary School. Extended stay accommodations available for students and their families. 10% off for active military and first responders. 15% off for Marine Trades Institute and Culinary School student families.",
    },
    {
      title: "Pool & Hot Tub",
      icon: undefined,
      description: "The pool and hot tub are not currently operational. We'll update this page when they're back online!",
      notice: "Currently unavailable",
    },
  ];

  for (let i = 0; i < amenities.length; i++) {
    const a = amenities[i];
    await client.create({
      _type: "amenity",
      title: a.title,
      icon: a.icon,
      description: toBlock(a.description),
      notice: a.notice,
      order: i,
    });
  }

  // ============================================================
  // ATTRACTIONS (6)
  // ============================================================
  console.log("  → Attractions (6)");
  const attractions = [
    {
      title: "Les Cheneaux Islands",
      description: "A chain of 36 islands just offshore from Cedarville, the Les Cheneaux area is world-renowned for kayaking, boating, and fishing. Rent a kayak or bring your own boat for a day on the water.",
    },
    {
      title: "Kewadin Hessel Casino",
      description: "Try your luck at Kewadin Hessel Casino, just a short drive from the hotel. Slots, table games, and dining on-site.",
      distance: "7 miles",
    },
    {
      title: "Snowmobile Trails",
      description: "Cedarville Hotel offers direct access to 100+ miles of groomed snowmobile trails. Pack your gear and hit the trails right from the property.",
    },
    {
      title: "Boating & Kayaking",
      description: "Launch your boat from nearby public docks, or rent a kayak and explore the islands at your own pace. The Les Cheneaux Islands are a paddler's paradise.",
    },
    {
      title: "Lake Huron Beaches",
      description: "Lake Huron's crystal-clear waters are minutes away. Spend a summer afternoon on the beach or search for Petoskey stones along the shoreline.",
    },
    {
      title: "Fishing",
      description: "The Les Cheneaux Islands area is a premier fishing destination, known for walleye, perch, pike, and bass. Charter fishing and guide services available locally.",
    },
  ];

  for (let i = 0; i < attractions.length; i++) {
    const a = attractions[i];
    await client.create({
      _type: "attraction",
      title: a.title,
      description: a.description,
      distance: a.distance,
      order: i,
    });
  }

  // ============================================================
  // SISTER PROPERTIES (4)
  // ============================================================
  console.log("  → Sister Properties (4)");
  const sisterProperties = [
    { name: "Papin's Resort", location: "Cedarville, MI", url: "https://papinsresort.com" },
    { name: "Tahquamenon Suites", location: "Paradise, MI", url: "https://tahquamenonsuites.com" },
    { name: "Island View Resort", location: "Orr, MN", url: "https://islandviewresort.com" },
    { name: "Waterway Inn", location: "Indian River, MI", url: "https://waterwayinnir.com" },
  ];

  for (let i = 0; i < sisterProperties.length; i++) {
    const sp = sisterProperties[i];
    await client.create({
      _type: "sisterProperty",
      name: sp.name,
      location: sp.location,
      url: sp.url,
      order: i,
    });
  }

  console.log("\n✅ Seeding complete!");
  console.log("   - 1 Site Settings document");
  console.log("   - 15 FAQ items");
  console.log("   - 8 Policy sections");
  console.log("   - 9 Amenities");
  console.log("   - 6 Attractions");
  console.log("   - 4 Sister properties");
  console.log("\nOpen /studio to review and edit the content.");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err.message);
  process.exit(1);
});

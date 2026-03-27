/**
 * Seed rooms — populates Sanity with accommodation data from WordPress DB.
 * Run: npx tsx scripts/seed-rooms.ts
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

// Standard amenities shared across all rooms (from the serialized PHP array)
const standardAmenities = [
  "wifi",
  "tv",
  "ac",
  "heat",
  "microwave",
  "fridge",
  "coffee_maker",
  "private_bath",
  "parking",
  "keypad_entry",
  "housekeeping",
  "breakfast",
];

const rooms = [
  {
    title: "Handicap Access Room",
    slug: "handicap-access",
    excerpt:
      "ADA-accessible room with one queen bed, roll-in shower, and all standard amenities. Ground-floor convenience for a comfortable stay.",
    description: [
      "Our Handicap Access Room is designed for comfort and accessibility. Featuring one queen bed and a roll-in shower, this ground-floor room provides easy access and all the amenities you need for a relaxing stay.",
      "The room includes complimentary Starlink WiFi, a Roku smart TV, mini fridge, microwave, and coffee with supplies. Complimentary continental breakfast is included with your stay.",
    ],
    pricePerNight: 89,
    maxOccupancy: 3,
    bedConfiguration: "1 Queen Bed",
    dogFriendly: false,
    amenities: standardAmenities,
    order: 1,
  },
  {
    title: "Two Queen Beds",
    slug: "two-queen-beds",
    excerpt:
      "Spacious room with two queen beds — perfect for families, friends, or anyone who loves extra space.",
    description: [
      "Our Two Queen Beds room offers plenty of space for families or groups. With two comfortable queen beds, you'll have room to spread out and relax after a day exploring the Les Cheneaux Islands.",
      "Every room includes complimentary Starlink WiFi, a Roku smart TV, mini fridge, microwave, and coffee with supplies. Complimentary continental breakfast is included with your stay.",
    ],
    pricePerNight: 99,
    maxOccupancy: 4,
    bedConfiguration: "2 Queen Beds",
    dogFriendly: true,
    badge: "family-favorite" as const,
    amenities: standardAmenities,
    order: 2,
  },
  {
    title: "Standard King Bed",
    slug: "standard-king-bed",
    excerpt:
      "Comfortable king bed room — ideal for couples or solo travelers looking for extra comfort.",
    description: [
      "Our Standard King Bed room is ideal for couples or solo travelers who want a little extra comfort. The spacious king bed ensures a great night's sleep after a day on the water or trails.",
      "Every room includes complimentary Starlink WiFi, a Roku smart TV, mini fridge, microwave, and coffee with supplies. Complimentary continental breakfast is included with your stay.",
    ],
    pricePerNight: 99,
    maxOccupancy: 3,
    bedConfiguration: "1 King Bed",
    dogFriendly: true,
    badge: "dog-friendly" as const,
    amenities: standardAmenities,
    order: 3,
  },
];

async function seed() {
  console.log("🛏️  Seeding rooms...\n");

  for (const room of rooms) {
    console.log(`  → ${room.title}`);
    await client.create({
      _type: "accommodation",
      title: room.title,
      slug: { _type: "slug", current: room.slug },
      excerpt: room.excerpt,
      description: toBlocks(room.description),
      pricePerNight: room.pricePerNight,
      maxOccupancy: room.maxOccupancy,
      bedConfiguration: room.bedConfiguration,
      dogFriendly: room.dogFriendly,
      badge: room.badge,
      amenities: room.amenities,
      order: room.order,
    });
  }

  console.log("\n✅ 3 rooms seeded!");
  console.log("   Open /studio to add photos and fine-tune details.");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err.message);
  process.exit(1);
});

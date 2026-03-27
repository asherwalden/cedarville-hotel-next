import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/page-hero";
import { DogIcon, PhoneIcon } from "@/lib/icons";
import { theme } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Dog Policy",
  description:
    "Cedarville Hotel dog policy — up to 2 dogs welcome, $20 per dog per night. Dog-friendly rooms available.",
};

export default function DogPolicyPage() {
  return (
    <>
      <PageHero
        title="Dog-Friendly Lodging"
        subtitle="We love dogs! Here's everything you need to know about bringing your furry friend."
      />

      <section className="py-16">
        <div className="max-w-[800px] mx-auto px-4">
          {/* Quick Facts */}
          <div className="bg-ch-secondary/10 border border-ch-secondary/30 rounded-lg p-6 mb-10">
            <div className="flex items-center gap-3 mb-4">
              <DogIcon className="w-8 h-8 text-ch-secondary" />
              <h2 className="font-heading text-xl font-bold text-ch-heading">
                Quick Facts
              </h2>
            </div>
            <ul className="space-y-2 text-ch-dark">
              <li className="flex items-start gap-2">
                <span className="text-ch-secondary font-bold">•</span>
                Up to <strong>2 dogs</strong> per room
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ch-secondary font-bold">•</span>
                <strong>$20 per dog per night</strong> pet fee
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ch-secondary font-bold">•</span>
                Must be noted at time of reservation
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ch-secondary font-bold">•</span>
                Dogs must be leashed in common areas
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ch-secondary font-bold">•</span>
                Owners responsible for any damage
              </li>
            </ul>
          </div>

          <div className="prose max-w-none text-ch-dark space-y-6">
            <h2 className="font-heading text-xl font-bold text-ch-heading">
              Our Dog Policy
            </h2>
            <p>
              At Cedarville Hotel, we understand that dogs are family. We&apos;re
              proud to offer dog-friendly rooms so your four-legged companion
              can join you on your Les Cheneaux Islands adventure.
            </p>

            <h3 className="font-heading text-lg font-bold text-ch-heading">
              Dog-Friendly Rooms
            </h3>
            <p>
              Not all rooms are designated as dog-friendly. Please let us know
              at the time of booking that you will be bringing a dog so we can
              assign you an appropriate room. The pet fee of $20 per dog per
              night will be added to your reservation.
            </p>

            <h3 className="font-heading text-lg font-bold text-ch-heading">
              Guidelines
            </h3>
            <ul>
              <li>
                Dogs must be leashed when outside your room, including hallways,
                lobby, and outdoor areas.
              </li>
              <li>
                Please do not leave your dog unattended in the room for extended
                periods.
              </li>
              <li>
                Clean up after your dog on the hotel grounds. Waste bags are
                available at the front desk.
              </li>
              <li>
                Excessive noise (barking) that disturbs other guests may result
                in a request to make alternative arrangements.
              </li>
              <li>
                Owners are financially responsible for any damage caused by
                their pets.
              </li>
            </ul>

            <h3 className="font-heading text-lg font-bold text-ch-heading">
              Dog-Friendly Activities Nearby
            </h3>
            <p>
              The Les Cheneaux area is a paradise for dogs! Enjoy hiking trails,
              beaches (outside of swimming areas), and scenic walks through
              Cedarville. Many local attractions welcome well-behaved dogs.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href={theme.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-ch-accent text-ch-primary-dark font-semibold px-6 py-3 rounded text-center hover:bg-ch-accent-hover transition-colors"
            >
              Book a Dog-Friendly Room
            </a>
            <Link
              href="/contact"
              className="inline-block border-2 border-ch-primary text-ch-primary font-semibold px-6 py-3 rounded text-center hover:bg-ch-primary hover:text-ch-white transition-colors"
            >
              Questions? Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

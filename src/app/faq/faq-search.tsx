"use client";

import { useState } from "react";
import { SearchIcon } from "@/lib/icons";
import { Accordion } from "@/components/ui/accordion";

interface FaqItem {
  _id: string;
  question: string;
  answer: Array<{ _type: string; [key: string]: unknown }>;
  order: number;
}

export function FaqSearch({ faqs }: { faqs: FaqItem[] }) {
  const [search, setSearch] = useState("");

  if (!search) return (
    <div className="mb-8">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ch-gray" />
        <input
          type="text"
          placeholder="Search FAQs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-ch-gray-light rounded-lg bg-ch-white text-ch-dark placeholder:text-ch-gray focus:outline-none focus:ring-2 focus:ring-ch-primary/30 focus:border-ch-primary"
        />
      </div>
    </div>
  );

  const filtered = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mb-8">
      <div className="relative mb-6">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ch-gray" />
        <input
          type="text"
          placeholder="Search FAQs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-ch-gray-light rounded-lg bg-ch-white text-ch-dark placeholder:text-ch-gray focus:outline-none focus:ring-2 focus:ring-ch-primary/30 focus:border-ch-primary"
        />
      </div>
      {filtered.length > 0 ? (
        <Accordion items={filtered} variant="faq" defaultOpen={0} />
      ) : (
        <p className="text-center text-ch-gray py-8">
          No FAQs match &quot;{search}&quot;. Try a different search term.
        </p>
      )}
    </div>
  );
}

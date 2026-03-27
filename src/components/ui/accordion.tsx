"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/lib/icons";
import { PortableText } from "next-sanity";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PortableTextContent = any[];

interface AccordionItem {
  _id?: string;
  title?: string;
  question?: string;
  content?: PortableTextContent;
  answer?: PortableTextContent;
  slug?: { current: string };
}

interface AccordionProps {
  items: AccordionItem[];
  variant?: "faq" | "policy";
  defaultOpen?: number;
}

export function Accordion({
  items,
  variant = "faq",
  defaultOpen = 0,
}: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const label = item.question || item.title || "";
        const body = item.answer || item.content || [];
        const anchorId = item.slug?.current;

        return (
          <div
            key={item._id || index}
            id={anchorId}
            className={`border rounded-lg overflow-hidden transition-colors ${
              isOpen
                ? "border-ch-primary bg-ch-white shadow-sm"
                : "border-ch-gray-light bg-ch-white"
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between p-4 md:p-5 text-left hover:bg-ch-bg-main/50 transition-colors"
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${index}`}
            >
              <span
                className={`font-semibold text-base md:text-lg ${
                  variant === "faq" ? "font-body" : "font-heading"
                } ${isOpen ? "text-ch-primary" : "text-ch-heading"}`}
              >
                {label}
              </span>
              <ChevronDownIcon
                className={`w-5 h-5 shrink-0 ml-4 transition-transform duration-200 ${
                  isOpen ? "rotate-180 text-ch-primary" : "text-ch-gray"
                }`}
              />
            </button>
            <div
              id={`accordion-panel-${index}`}
              role="region"
              className={`overflow-hidden transition-all duration-200 ${
                isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-4 md:px-5 pb-4 md:pb-5 prose prose-sm max-w-none text-ch-dark">
                <PortableText value={body} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

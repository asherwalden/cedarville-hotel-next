"use client";

import { useState, type FormEvent } from "react";

const subjects = [
  "General Inquiry",
  "Booking Help",
  "Pet Policy Question",
  "Conference / Meeting Room",
  "Student / Extended Stay",
  "Other",
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    // TODO: Wire up form submission (e.g. Vercel Functions API route)
    // For now, simulate success
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="bg-ch-secondary/10 border border-ch-secondary/30 rounded-lg p-8 text-center">
        <h3 className="font-heading text-xl font-bold text-ch-heading mb-2">
          Thank You!
        </h3>
        <p className="text-ch-dark">
          We&apos;ve received your message and will get back to you as soon as
          possible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-ch-heading mb-1.5"
          >
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-2.5 border border-ch-gray-light rounded-lg bg-ch-white text-ch-dark focus:outline-none focus:ring-2 focus:ring-ch-primary/30 focus:border-ch-primary"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-ch-heading mb-1.5"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-2.5 border border-ch-gray-light rounded-lg bg-ch-white text-ch-dark focus:outline-none focus:ring-2 focus:ring-ch-primary/30 focus:border-ch-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-ch-heading mb-1.5"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full px-4 py-2.5 border border-ch-gray-light rounded-lg bg-ch-white text-ch-dark focus:outline-none focus:ring-2 focus:ring-ch-primary/30 focus:border-ch-primary"
          />
        </div>
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-ch-heading mb-1.5"
          >
            Subject <span className="text-red-500">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            required
            className="w-full px-4 py-2.5 border border-ch-gray-light rounded-lg bg-ch-white text-ch-dark focus:outline-none focus:ring-2 focus:ring-ch-primary/30 focus:border-ch-primary"
          >
            <option value="">Select a subject...</option>
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-ch-heading mb-1.5"
        >
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full px-4 py-2.5 border border-ch-gray-light rounded-lg bg-ch-white text-ch-dark focus:outline-none focus:ring-2 focus:ring-ch-primary/30 focus:border-ch-primary resize-y"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-ch-primary text-ch-white font-semibold px-8 py-3 rounded hover:bg-ch-secondary transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

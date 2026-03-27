"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { theme } from "@/lib/theme";
import { MenuIcon, XIcon, PhoneIcon, MapPinIcon } from "@/lib/icons";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Rooms", href: "/rooms" },
  { label: "Amenities", href: "/amenities" },
  {
    label: "Trip Planner",
    href: "/trip-planner",
    children: [
      { label: "Local Attractions", href: "/trip-planner" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-ch-accent focus:text-ch-primary-dark focus:px-4 focus:py-2 focus:rounded">
        Skip to content
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-ch-white/95 backdrop-blur-sm shadow-md"
            : "bg-ch-white shadow-sm"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-4 h-[70px] md:h-[95px] flex items-center justify-between">
          {/* Left: Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 text-ch-primary-dark hover:text-ch-secondary transition-colors"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            <span className="hidden md:inline text-sm font-semibold tracking-wider uppercase font-body">
              Menu
            </span>
          </button>

          {/* Center: Logo */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 text-ch-primary-dark hover:text-ch-primary transition-colors"
          >
            <span className="font-heading text-xl md:text-2xl font-bold tracking-tight">
              {theme.name}
            </span>
          </Link>

          {/* Right: Phone + Location + Book Now */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={`tel:${theme.phone.replace(/[^0-9+]/g, "")}`}
              className="flex items-center gap-1.5 text-ch-dark hover:text-ch-primary transition-colors text-sm"
            >
              <PhoneIcon className="w-4 h-4" />
              <span>{theme.phone}</span>
            </a>
            <span className="text-ch-gray-light">|</span>
            <span className="flex items-center gap-1.5 text-ch-gray text-sm">
              <MapPinIcon className="w-4 h-4" />
              {theme.address.city}, {theme.address.state}
            </span>
            <a
              href={theme.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-ch-accent text-ch-primary-dark font-semibold px-5 py-2.5 rounded text-sm hover:bg-ch-accent-hover transition-colors"
            >
              Book Now
            </a>
          </div>
        </div>
      </header>

      {/* Overlay Navigation */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-ch-primary-dark/90 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        <nav
          className={`relative z-10 flex flex-col items-center justify-center h-full gap-6 transition-transform duration-300 ${
            menuOpen ? "translate-y-0" : "-translate-y-8"
          }`}
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <div key={item.href} className="text-center">
              <Link
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-ch-white text-2xl md:text-3xl font-heading font-semibold hover:text-ch-accent transition-colors"
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="flex gap-4 mt-2 justify-center">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-ch-white/70 text-sm hover:text-ch-accent transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a
            href={theme.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 bg-ch-accent text-ch-primary-dark font-semibold px-8 py-3 rounded text-lg hover:bg-ch-accent-hover transition-colors"
          >
            Book Your Stay
          </a>
        </nav>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-ch-white border-t border-ch-gray-light">
        <div className="grid grid-cols-3 h-14">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col items-center justify-center text-ch-primary-dark text-xs font-medium"
          >
            <MenuIcon className="w-5 h-5 mb-0.5" />
            Menu
          </button>
          <a
            href={`tel:${theme.phone.replace(/[^0-9+]/g, "")}`}
            className="flex flex-col items-center justify-center text-ch-primary-dark text-xs font-medium"
          >
            <PhoneIcon className="w-5 h-5 mb-0.5" />
            Call
          </a>
          <a
            href={theme.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center bg-ch-accent text-ch-primary-dark text-xs font-semibold"
          >
            Book
          </a>
        </div>
      </div>

      {/* Spacers for fixed elements */}
      <div className="h-[70px] md:h-[95px]" />
      <div className="md:hidden h-14" />
    </>
  );
}

import { theme } from "@/lib/theme";

interface CtaSectionProps {
  title?: string;
  description?: string;
  primaryText?: string;
  primaryUrl?: string;
  secondaryText?: string;
  secondaryUrl?: string;
  variant?: "default" | "boxed";
}

export function CtaSection({
  title = "Ready to Book Your Stay?",
  description = "Experience small-town comfort with big water fun at Cedarville Hotel.",
  primaryText = "Book Your Stay",
  primaryUrl = theme.bookingUrl,
  secondaryText,
  secondaryUrl,
  variant = "default",
}: CtaSectionProps) {
  const isBoxed = variant === "boxed";

  return (
    <section
      className={`py-16 ${
        isBoxed ? "bg-ch-bg-main" : "bg-ch-primary-dark text-ch-white"
      }`}
    >
      <div
        className={`max-w-[1200px] mx-auto px-4 text-center ${
          isBoxed
            ? "bg-ch-primary-dark text-ch-white rounded-xl p-10 md:p-14"
            : ""
        }`}
      >
        <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
          {title}
        </h2>
        <p
          className={`text-lg mb-8 max-w-2xl mx-auto ${
            isBoxed ? "text-ch-white/80" : "text-ch-white/80"
          }`}
        >
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={primaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-ch-accent text-ch-primary-dark font-semibold px-8 py-3 rounded text-lg hover:bg-ch-accent-hover transition-colors"
          >
            {primaryText}
          </a>
          {secondaryText && secondaryUrl && (
            <a
              href={secondaryUrl}
              className="inline-block border-2 border-ch-white text-ch-white font-semibold px-8 py-3 rounded text-lg hover:bg-ch-white/10 transition-colors"
            >
              {secondaryText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

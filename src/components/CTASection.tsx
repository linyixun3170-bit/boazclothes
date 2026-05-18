"use client";

import Link from "next/link";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  variant?: "light" | "dark";
}

export default function CTASection({
  title = "Ready to Scale Your Brand?",
  subtitle = "Get your free sample pack and experience BOAZ quality before committing. Zero risk, no pressure.",
  primaryLabel = "Get Free Samples",
  primaryHref = "/contact",
  secondaryLabel = "WhatsApp Us",
  secondaryHref = "https://wa.me/your-number",
  variant = "dark",
}: CTASectionProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={`py-20 md:py-28 ${
        isDark ? "bg-dark text-cream" : "bg-cream text-dark"
      }`}
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Zero-Risk Badge */}
        <div
          className={`inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.2em] ${
            isDark
              ? "border border-gold/30 text-gold"
              : "border border-dark/20 text-dark"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Zero Risk — Free Samples Available
        </div>

        <h2 className="font-heading text-3xl md:text-5xl leading-tight">
          {title}
        </h2>
        <p
          className={`mt-6 max-w-xl mx-auto leading-relaxed ${
            isDark ? "text-cream/60" : "text-warm-gray"
          }`}
        >
          {subtitle}
        </p>

        {/* Psychological triggers */}
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs">
          {[
            "No minimum trial order",
            "Free fabric swatches",
            "48hr quote turnaround",
            "Dedicated account manager",
          ].map((item) => (
            <span
              key={item}
              className={`flex items-center gap-1.5 ${
                isDark ? "text-cream/50" : "text-warm-gray"
              }`}
            >
              <svg
                className="w-3 h-3 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {item}
            </span>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={primaryHref}
            className="px-8 py-3.5 bg-gold text-dark text-sm uppercase tracking-widest rounded-full hover:bg-cream hover:text-dark transition-all duration-300"
          >
            {primaryLabel}
          </Link>
          <Link
            href={secondaryHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-8 py-3.5 text-sm uppercase tracking-widest rounded-full transition-all duration-300 ${
              isDark
                ? "border border-cream/20 text-cream hover:border-gold hover:text-gold"
                : "border border-dark/20 text-dark hover:border-gold hover:text-gold"
            }`}
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}

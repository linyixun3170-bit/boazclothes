"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      )
        .fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.4"
        )
        .fromTo(
          ctaRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.3"
        )
        .fromTo(
          statRefs.current.filter(Boolean),
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
          },
          "-=0.2"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, #1a1a1a 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24 pb-16">
        {/* Badge */}
        <div className="inline-block mb-6 px-4 py-1.5 border border-gold/30 text-gold text-xs uppercase tracking-[0.2em] rounded-full">
          Premium Wholesale &amp; Custom Manufacturing
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="font-heading text-5xl md:text-7xl lg:text-8xl text-dark leading-tight md:leading-tight"
        >
          Your Brand,
          <br />
          <span className="text-gold">Our Canvas</span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-6 text-lg md:text-xl text-warm-gray max-w-2xl mx-auto leading-relaxed"
        >
          Premium blank apparel for wholesale and custom printing. From
          classic tees to heavyweight hoodies — built for your brand.
        </p>

        {/* CTA */}
        <div ref={ctaRef} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/wholesale"
            className="px-8 py-3.5 bg-dark text-cream text-sm uppercase tracking-widest rounded-full hover:bg-gold hover:text-dark transition-all duration-300"
          >
            Explore Products
          </Link>
          <Link
            href="/custom"
            className="px-8 py-3.5 border border-dark/20 text-dark text-sm uppercase tracking-widest rounded-full hover:border-gold hover:text-gold transition-all duration-300"
          >
            Custom Orders
          </Link>
        </div>

        {/* Trust stats */}
        <div className="mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
          {[
            { number: "10+", label: "Years Experience" },
            { number: "5,000+", label: "Wholesale Partners" },
            { number: "1M+", label: "Garments Produced" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              ref={(el) => { statRefs.current[i] = el; }}
              className="text-center"
            >
              <div className="font-heading text-3xl md:text-4xl text-dark">
                {stat.number}
              </div>
              <div className="mt-1 text-sm text-warm-gray uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-warm-gray"
        >
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </div>
    </section>
  );
}

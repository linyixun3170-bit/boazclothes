"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in overlay
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 2,
        ease: "power2.out",
        delay: 0.5,
      });

      // Text reveal
      gsap.fromTo(
        textRef.current?.children || [],
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.8,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-dark"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-dark/40" />
      </div>

      {/* Initial overlay for fade-in effect */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-cream z-10"
        style={{ opacity: 1 }}
      />

      {/* Content */}
      <div
        ref={textRef}
        className="relative z-20 h-full flex flex-col items-center justify-center text-center section-padding"
      >
        <span className="text-caption text-cream/60 mb-6">
          Hangzhou · Zhejiang & Hebei
        </span>

        <h1 className="text-display-xl text-cream max-w-4xl text-balance">
          Your Line,
          <br />
          <span className="italic font-light">Our Craft</span>
        </h1>

        <p className="text-body-xl text-cream/70 mt-8 max-w-xl">
          Three generations of manufacturing. Factory-direct pricing on premium
          blank apparel and custom builds.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/contact/"
            className="btn-capsule btn-capsule-light text-[12px]"
          >
            Request a Quote
          </Link>
          <Link
            href="/wholesale/"
            className="text-[12px] uppercase tracking-[0.2em] text-cream/70 hover:text-cream transition-colors link-underline"
          >
            Browse Products
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.3em] text-cream/50">
          Scroll
        </span>
        <div className="w-px h-8 bg-cream/30 animate-pulse" />
      </div>
    </section>
  );
}

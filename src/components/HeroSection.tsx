"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { images } from "@/lib/images";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation - fade in from bottom
      gsap.fromTo(
        ".hero-title-line",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.3,
        }
      );
      // CTA fade in
      gsap.fromTo(
        ".hero-cta",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.9,
        }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Background Image - Full screen */}
      <div className="absolute inset-0">
        <Image
          src={images.hero.main}
          alt={images.hero.alt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Content - positioned at bottom left like Nomad */}
      <div
        ref={textRef}
        className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-12 lg:px-20 pb-20 md:pb-28"
      >
        <div className="max-w-[1400px] mx-auto">
          {/* Small label */}
          <p className="hero-title-line text-[11px] uppercase tracking-[0.25em] text-white/60 mb-4">
            Premium Apparel Manufacturing
          </p>

          {/* Main title - large serif */}
          <h1 className="font-heading text-white">
            <span className="hero-title-line block text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.95] tracking-tight">
              Crafted to
            </span>
            <span className="hero-title-line block text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.95] tracking-tight italic">
              Wear.
            </span>
          </h1>

          {/* Subtitle + CTA row */}
          <div className="hero-cta mt-8 md:mt-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <p className="text-white/70 text-sm md:text-base max-w-md leading-relaxed">
              Factory-direct blank apparel for brands that demand quality. 
              50 pieces MOQ. 72-hour sample dispatch.
            </p>
            <Link
              href="/contact/"
              className="inline-block px-8 py-3.5 border border-white/40 text-white text-[11px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500 rounded-full shrink-0"
              data-cursor-hover
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <div className="w-px h-12 bg-white/30 animate-pulse" />
      </div>
    </section>
  );
}

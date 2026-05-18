"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current?.children || [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: "power2.out" }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div ref={containerRef} className="text-center max-w-lg mx-auto px-6">
        <div className="font-heading text-8xl md:text-9xl text-gold/30 leading-none mb-4">
          404
        </div>
        <h1 className="font-heading text-3xl md:text-4xl text-dark mb-4">
          Page Not Found
        </h1>
        <p className="text-warm-gray leading-relaxed mb-8">
          Looks like this page wandered off. Let&apos;s get you back to
          something useful.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-8 py-3.5 bg-dark text-cream text-sm uppercase tracking-widest rounded-full hover:bg-gold hover:text-dark transition-all duration-300"
          >
            Back to Home
          </Link>
          <Link
            href="/wholesale"
            className="px-8 py-3.5 border border-dark/20 text-dark text-sm uppercase tracking-widest rounded-full hover:border-gold hover:text-gold transition-all duration-300"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}

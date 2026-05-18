"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current?.children || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-cream">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div ref={textRef}>
            <span className="text-gold text-xs uppercase tracking-[0.2em]">
              Who We Are
            </span>
            <h2 className="mt-3 font-heading text-3xl md:text-5xl text-dark leading-tight">
              We Own the Factory.
              <br />
              <span className="text-gold">You Own the Brand.</span>
            </h2>
            <p className="mt-6 text-warm-gray leading-relaxed">
              Based in Guangzhou, China, BOAZ Apparel is a vertically integrated
              garment manufacturer — we own the production line from fabric
              sourcing to finished product. No middlemen, no markup padding.
            </p>
            <p className="mt-4 text-warm-gray leading-relaxed">
              For over a decade, we&apos;ve been the manufacturing partner
              behind hundreds of apparel brands worldwide. Our 50,000+ sq ft
              facility produces 50,000+ garments daily, all under strict quality
              control.
            </p>

            {/* Certification badges */}
            <div className="mt-8 flex flex-wrap gap-4">
              {[
                { label: "OEKO-TEX®", desc: "Standard 100" },
                { label: "ISO 9001", desc: "Quality Certified" },
                { label: "BSCI", desc: "Social Compliance" },
                { label: "SEDEX", desc: "Ethical Trade" },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 px-4 py-2 border border-gold/20 rounded-full"
                >
                  <span className="text-xs uppercase tracking-wider text-gold font-medium">
                    {badge.label}
                  </span>
                  <span className="text-[10px] text-warm-gray">{badge.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-light-gray shadow-lg">
            <div className="w-full h-full bg-gradient-to-br from-light-gray to-cream flex items-center justify-center">
              <div className="text-center p-8">
                <span className="text-5xl">🏭</span>
                <p className="mt-4 text-sm text-warm-gray">
                  [Factory Image — Replace with your facility photo]
                </p>
                <p className="text-xs text-warm-gray/60 mt-2">
                  Update in lib/images.ts
                </p>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-gold/20 rounded-full" />
            <div className="absolute -top-4 -left-4 w-16 h-16 border-2 border-gold/10 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

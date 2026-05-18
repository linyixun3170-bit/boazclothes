"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current?.querySelectorAll(".cta-animate") || [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-40 md:py-52 bg-dark overflow-hidden"
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-dark/70" />

      <div className="relative z-10 max-w-3xl mx-auto text-center section-padding">
        <span className="cta-animate text-caption text-cream/50 mb-6 block">
          Start Your Order
        </span>
        <h2 className="cta-animate text-display-lg text-cream mb-6">
          Get Your <span className="italic">Free</span> Quote
        </h2>
        <p className="cta-animate text-body-xl text-cream/60 mb-12 max-w-lg mx-auto">
          Tell us what you need. We'll reply within 24 hours with pricing,
          lead times, and sample options.
        </p>
        <div className="cta-animate flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact/" className="btn-capsule btn-capsule-light">
            Request a Quote
          </Link>
          <a
            href="https://wa.me/8618868798631"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] uppercase tracking-[0.2em] text-cream/60 hover:text-cream transition-colors link-underline"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}

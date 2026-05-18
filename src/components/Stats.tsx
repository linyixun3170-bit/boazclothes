"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { number: "50", suffix: "+", label: "MOQ (pieces per style)" },
  { number: "72", suffix: "hr", label: "Sample Dispatch" },
  { number: "50,000", suffix: "+", label: "Daily Production Cap" },
  { number: "Free", suffix: "", label: "Samples for Partners" },
];

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".stat-item",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
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
    <section
      ref={sectionRef}
      className="py-14 md:py-20 bg-dark text-cream"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item text-center">
              <div className="font-heading text-3xl md:text-5xl text-gold leading-none">
                {stat.number}
                {stat.suffix && (
                  <span className="text-xl md:text-2xl">{stat.suffix}</span>
                )}
              </div>
              <div className="mt-2 md:mt-3 text-xs md:text-sm text-cream/60 uppercase tracking-wider leading-relaxed">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

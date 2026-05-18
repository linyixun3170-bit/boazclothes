"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { number: "50", suffix: "", label: "MOQ — Pieces per style" },
  { number: "72", suffix: "hr", label: "Sample Dispatch" },
  { number: "30,000", suffix: "", label: "Largest Single Order" },
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
          duration: 0.8,
          stagger: 0.12,
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
      <div className="max-w-[1400px] mx-auto section-padding">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item text-center">
              <div className="counter-number text-display-md text-dark">
                {stat.number}
                {stat.suffix && (
                  <span className="text-xl md:text-2xl ml-1">{stat.suffix}</span>
                )}
              </div>
              <div className="mt-3 text-[11px] uppercase tracking-[0.2em] text-warm-gray">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

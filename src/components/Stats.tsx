"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const stats = [
    { value: "¥6–¥70", label: "Price Range" },
    { value: "50", label: "MOQ (pieces)" },
    { value: "30K", label: "Max Capacity" },
    { value: "72hr", label: "Sample Dispatch" },
  ];

  return (
    <section ref={sectionRef} className="bg-dark py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item text-center md:text-left">
              <p className="font-heading text-3xl md:text-4xl lg:text-5xl text-white leading-none">
                {stat.value}
              </p>
              <p className="text-[11px] text-white/40 uppercase tracking-[0.2em] mt-3">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    quote:
      "BOAZ has been our manufacturing partner for over 3 years. Their quality is unmatched — every batch is consistent, every order is on time. They're an extension of our team.",
    author: "Mark Chen",
    role: "Founder, StreetWear Co.",
    location: "Los Angeles, USA",
  },
  {
    quote:
      "We switched to BOAZ after quality issues with our previous supplier. The difference was immediate — better fabric, cleaner stitching, and real communication. Our customers noticed.",
    author: "Sarah Kim",
    role: "Creative Director, Urban Threads",
    location: "Seoul, South Korea",
  },
  {
    quote:
      "The private label service is exceptional. From our custom neck labels to the retail-ready packaging, everything reflects our brand. Our MOQ was only 200 units — try getting that anywhere else.",
    author: "James Park",
    role: "Owner, Collective Goods",
    location: "London, UK",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".testimonial-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-dark text-cream">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div ref={titleRef} className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-gold text-xs uppercase tracking-[0.2em]">
            Trusted by Brands Worldwide
          </span>
          <h2 className="mt-3 font-heading text-3xl md:text-4xl">
            What Our Partners Say
          </h2>
          <p className="mt-4 text-cream/60 leading-relaxed">
            Real feedback from real brand owners. No scripts, no filters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card relative p-6 md:p-8 rounded-2xl border border-cream/10 hover:border-gold/20 transition-all duration-500"
            >
              {/* Quote mark */}
              <span className="font-heading text-5xl text-gold/20 absolute top-4 right-6 leading-none">
                &ldquo;
              </span>

              <p className="text-sm md:text-base text-cream/80 leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <span className="text-xs uppercase text-gold font-medium">
                    {t.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-cream font-medium">{t.author}</p>
                  <p className="text-[10px] text-cream/50 uppercase tracking-wider">
                    {t.role} &middot; {t.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

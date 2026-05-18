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
      "We've been working with Boaz for 18 months. The fit is exactly right for our US customers — that's the thing that keeps us coming back.",
    author: "Mark T.",
    role: "DTC Brand Owner, California",
  },
  {
    quote:
      "4 orders per week, 3,000+ pieces each. They've never missed a delivery window. True source factory, no trading company markup.",
    author: "Sarah L.",
    role: "Amazon FBA Seller, UK",
  },
  {
    quote:
      "This price for this quality? I checked six factories before finding Boaz. Their pattern team understood our tech pack on the first try.",
    author: "James R.",
    role: "Apparel Startup Founder, Australia",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonial-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
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
    <section ref={sectionRef} className="py-32 md:py-40 bg-cream">
      <div className="max-w-[1400px] mx-auto section-padding">
        <div className="text-center mb-20">
          <span className="text-caption text-warm-gray mb-4 block">Testimonials</span>
          <h2 className="text-display-lg text-dark">
            What They <span className="italic">Say</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card bg-light-gray p-8 md:p-10 flex flex-col justify-between min-h-[280px]"
            >
              <p className="text-body-lg text-dark leading-relaxed">
                "{t.quote}"
              </p>
              <div className="mt-8">
                <p className="text-[13px] font-medium text-dark">{t.author}</p>
                <p className="text-[11px] text-warm-gray mt-1">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

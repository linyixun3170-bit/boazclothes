"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    step: 1,
    title: "Request Quote",
    desc: "Tell us your requirements. We respond within 24 hours with pricing and lead times.",
    icon: "📋",
  },
  {
    step: 2,
    title: "Approve Samples",
    desc: "Request free samples to verify quality, feel, and color accuracy before committing.",
    icon: "✂️",
  },
  {
    step: 3,
    title: "Production",
    desc: "We manufacture your order with full quality control at every stage.",
    icon: "🏭",
  },
  {
    step: 4,
    title: "Delivery",
    desc: "Shipped worldwide with tracking. From our factory to your door.",
    icon: "🚚",
  },
];

export default function TrustProgress() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".trust-step",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Progress bar animation
      gsap.fromTo(
        progressRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-cream">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-gold text-xs uppercase tracking-[0.2em]">
            How It Works
          </span>
          <h2 className="mt-3 font-heading text-3xl md:text-4xl text-dark">
            From Quote to Delivery in 4 Steps
          </h2>
          <p className="mt-3 text-warm-gray">
            A transparent process designed for busy brand owners.
          </p>
        </div>

        {/* Progress bar */}
        <div className="relative h-1 bg-light-gray rounded-full mb-12 overflow-hidden">
          <div
            ref={progressRef}
            className="absolute inset-0 bg-gold origin-left rounded-full"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.step} className="trust-step text-center">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">{s.icon}</span>
              </div>
              <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gold/20 text-gold text-xs font-bold mb-2">
                {s.step}
              </div>
              <h3 className="font-heading text-lg text-dark mb-2">
                {s.title}
              </h3>
              <p className="text-sm text-warm-gray leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      gsap.fromTo(
        textRef.current?.children || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 md:py-40 bg-light-gray overflow-hidden">
      <div className="max-w-[1400px] mx-auto section-padding">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <div
            ref={imageRef}
            className="relative aspect-[4/5] overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80"
              alt="Factory fabric detail"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text */}
          <div ref={textRef}>
            <span className="text-caption text-warm-gray mb-6 block">
              Our Story
            </span>
            <h2 className="text-display-lg text-dark mb-4">
              Built to Wear,
              <br />
              <span className="italic">Made to Last</span>
            </h2>
            <p className="text-body-xl text-warm-gray mb-8">
              Three generations. One uncompromising standard.
            </p>
            <div className="space-y-5 text-body-lg text-warm-gray max-w-lg">
              <p>
                In an era when education was a luxury, our grandmother used a needle and thread
                to put her brother through university. When our mother turned 15, she locked herself
                in that same room with a single sewing machine. By 20, she was a sought-after
                pattern maker. By 25, seven apprentices sat at her feet.
              </p>
              <p>
                We grew up in that workshop. Our school dresses were cut and sewn there.
                Today, Boaz operates two production bases — Zhejiang and Hebei.
                Our online sales team sits in Hangzhou.
              </p>
              <p className="text-dark font-medium">
                We do not rent expensive factory real estate and pass that cost to you.
                Product + Labor + Logistics = Your Price.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-8">
              {["OEKO-TEX Certified", "BSCI Audited", "ISO 9001"].map((badge) => (
                <div key={badge} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-dark" />
                  <span className="text-[11px] uppercase tracking-[0.15em] text-warm-gray">
                    {badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

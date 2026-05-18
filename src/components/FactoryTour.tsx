"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { factoryImages } from "@/lib/images";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const images = [
  factoryImages.facility,
  factoryImages.quality,
  factoryImages.cutting,
  factoryImages.sewing,
];

const captions = [
  "50,000 sq ft production facility in Guangzhou",
  "Stringent quality control at every stage",
  "Automated cutting for precision at scale",
  "Skilled craftsmanship — 200+ trained workers",
];

export default function FactoryTour() {
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
        ".tour-image",
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
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
    <section ref={sectionRef} className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={titleRef} className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-gold text-xs uppercase tracking-[0.2em]">
            Factory Tour
          </span>
          <h2 className="mt-3 font-heading text-3xl md:text-4xl text-dark">
            See Where Your Products Are Made
          </h2>
          <p className="mt-4 text-warm-gray leading-relaxed">
            Transparency matters. Tour our Guangzhou facility — the same
            factory that produces millions of garments annually.
          </p>
        </div>

        {/* Asymmetric grid layout (nomad-inspired) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {images.map((img, i) => {
            const isLarge = i === 0;
            const spanClass = isLarge
              ? "col-span-2 row-span-2"
              : "col-span-1";

            return (
              <div
                key={i}
                className={`tour-image relative group overflow-hidden rounded-xl bg-light-gray ${spanClass}`}
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes={isLarge ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/20 transition-all duration-500" />
                </div>
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  <p className="text-[10px] md:text-xs text-cream leading-tight">
                    {captions[i]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

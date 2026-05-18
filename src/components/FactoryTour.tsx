"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { images } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

export default function FactoryTour() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".factory-image",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-cream py-24 md:py-36">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header - minimal */}
        <div className="mb-16 md:mb-24">
          <p className="text-[11px] uppercase tracking-[0.25em] text-gray-400 mb-4">
            Our Facility
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-dark leading-tight max-w-2xl">
            Where Quality is Made
          </h2>
        </div>

        {/* Asymmetric image grid - like high-end editorial */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {/* Large left image */}
          <div className="md:col-span-7 factory-image">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <Image
                src={images.factory.sewing}
                alt="Precision sewing station"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 58vw"
              />
            </div>
          </div>

          {/* Right column - two stacked */}
          <div className="md:col-span-5 flex flex-col gap-4 md:gap-6">
            <div className="factory-image relative aspect-[4/3] overflow-hidden rounded-sm flex-1">
              <Image
                src={images.factory.fabric}
                alt="Premium fabric rolls"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 42vw"
              />
            </div>
            <div className="factory-image relative aspect-[4/3] overflow-hidden rounded-sm flex-1">
              <Image
                src={images.factory.cutting}
                alt="Precision cutting"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 42vw"
              />
            </div>
          </div>
        </div>

        {/* Bottom caption */}
        <div className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <p className="text-sm text-dark/50 max-w-md leading-relaxed">
            Every garment passes through 12 quality checkpoints. From fabric sourcing 
            to final fold, we treat each piece as if it were our own.
          </p>
          <div className="flex gap-8">
            <div>
              <p className="text-2xl font-heading text-dark">12</p>
              <p className="text-[11px] text-gray-400 uppercase tracking-wider mt-1">Checkpoints</p>
            </div>
            <div>
              <p className="text-2xl font-heading text-dark">3-5</p>
              <p className="text-[11px] text-gray-400 uppercase tracking-wider mt-1">Days Turnaround</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

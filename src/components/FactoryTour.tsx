"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const factoryImages = [
  {
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
    alt: "Factory floor",
  },
  {
    src: "https://images.unsplash.com/photo-1604147495798-57beb5d6af73?w=600&q=80",
    alt: "Fabric cutting",
  },
  {
    src: "https://images.unsplash.com/photo-1591129841193-b87320846256?w=600&q=80",
    alt: "Sewing workshop",
  },
];

export default function FactoryTour() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".factory-image",
        { y: 50, opacity: 0 },
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
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 md:py-40 bg-light-gray overflow-hidden">
      <div className="max-w-[1400px] mx-auto section-padding">
        <div className="text-center mb-16">
          <span className="text-caption text-warm-gray mb-4 block">The Workshop</span>
          <h2 className="text-display-lg text-dark">
            Where It&apos;s <span className="italic">Made</span>
          </h2>
          <p className="text-body-lg text-warm-gray mt-6 max-w-xl mx-auto">
            Two production bases in Zhejiang and Hebei. Quality control at every checkpoint.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {factoryImages.map((img, i) => (
            <div
              key={i}
              className={`factory-image relative overflow-hidden image-hover ${
                i === 0 ? "md:col-span-2 md:row-span-1 aspect-[16/9]" : "aspect-[4/3]"
              }`}
            >
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-caption text-warm-gray">
            Zhejiang & Hebei Production Bases · Hangzhou Sales Office
          </p>
        </div>
      </div>
    </section>
  );
}

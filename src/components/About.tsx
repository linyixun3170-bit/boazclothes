"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { images } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-text",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
      gsap.fromTo(
        ".about-image",
        { y: 40, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-24 md:py-36">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Asymmetric layout - image dominates */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Large image - 7 columns */}
          <div className="lg:col-span-7 about-image">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <Image
                src={images.models.male1}
                alt="Boaz apparel quality"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            </div>
          </div>

          {/* Text - 5 columns, minimal */}
          <div className="lg:col-span-5 lg:pl-8">
            <p className="about-text text-[11px] uppercase tracking-[0.25em] text-gray-400 mb-6">
              About Boaz
            </p>
            <h2 className="about-text font-heading text-4xl md:text-5xl lg:text-6xl text-dark leading-tight mb-8">
              Three Generations<br />of Craft
            </h2>
            <p className="about-text text-dark/60 leading-relaxed text-sm md:text-base mb-6">
              Founded in Hangzhou by a family of textile artisans. From hand-operated looms 
              to 30,000-piece automated lines, we have never stopped obsessing over the 
              quality of a single stitch.
            </p>
            <p className="about-text text-dark/60 leading-relaxed text-sm md:text-base mb-10">
              Today, Boaz supplies blank apparel and custom garments to brands across 
              40+ countries — always at factory-direct pricing.
            </p>
            
            {/* Stats row - minimal */}
            <div className="about-text grid grid-cols-3 gap-6 pt-8 border-t border-gray-100">
              <div>
                <p className="text-2xl md:text-3xl font-heading text-dark">3rd</p>
                <p className="text-[11px] text-gray-400 mt-1 uppercase tracking-wider">Generation</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-heading text-dark">40+</p>
                <p className="text-[11px] text-gray-400 mt-1 uppercase tracking-wider">Countries</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-heading text-dark">30K</p>
                <p className="text-[11px] text-gray-400 mt-1 uppercase tracking-wider">Capacity</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

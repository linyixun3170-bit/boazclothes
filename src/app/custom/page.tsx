"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import TShirt3DViewer from "@/components/TShirt3DViewer";

const steps = [
  {
    num: "01",
    title: "Choose Your Garment",
    desc: "Select from our premium blanks — tees, hoodies, tanks, and more.",
  },
  {
    num: "02",
    title: "Select Colors & Sizes",
    desc: "Pick your palette and size run from our extensive catalog.",
  },
  {
    num: "03",
    title: "Send Your Design",
    desc: "Share your artwork, logo, or specifications. We handle the rest.",
  },
  {
    num: "04",
    title: "Production & Delivery",
    desc: "We manufacture and ship — on time, every time.",
  },
];

export default function CustomPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.children || [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: "power2.out" }
      );

      gsap.fromTo(
        ".custom-step",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stepsRef.current,
            start: "top 80%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="pt-28 pb-20">
      {/* Header */}
      <div ref={headerRef} className="max-w-4xl mx-auto px-6 text-center mb-16">
        <span className="text-gold text-xs uppercase tracking-[0.2em]">
          Custom Manufacturing
        </span>
        <h1 className="mt-3 font-heading text-4xl md:text-5xl text-dark">
          Your Design, Our Expertise
        </h1>
        <p className="mt-4 text-warm-gray leading-relaxed max-w-2xl mx-auto">
          From concept to finished garment — full custom production with your
          tags, packaging, and specifications.
        </p>
      </div>

      {/* 3D Preview */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-20">
        <TShirt3DViewer />
      </div>

      {/* Process */}
      <section ref={stepsRef} className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl text-dark">
              How It Works
            </h2>
            <p className="mt-3 text-warm-gray">
              Four simple steps from idea to delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {steps.map((step) => (
              <div key={step.num} className="custom-step flex gap-6">
                <div className="text-gold font-heading text-4xl leading-none shrink-0">
                  {step.num}
                </div>
                <div>
                  <h3 className="font-heading text-xl text-dark mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-warm-gray leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 bg-cream">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl text-dark">
              What We Can Do
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Screen Printing", desc: "Vibrant, durable prints at scale. Up to 6 colors." },
              { title: "Embroidery", desc: "Premium logo embroidery on chest, sleeve, or back." },
              { title: "DTG Printing", desc: "Full-color direct-to-garment for detailed artwork." },
              { title: "Private Labeling", desc: "Your brand tags, care labels, and packaging." },
              { title: "Custom Dyeing", desc: "Match any Pantone color with our custom dye service." },
              { title: "Bulk Packaging", desc: "Bulk, poly-bagged, or retail-ready packaging options." },
            ].map((cap) => (
              <div
                key={cap.title}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-heading text-lg text-dark mb-2">
                  {cap.title}
                </h3>
                <p className="text-sm text-warm-gray leading-relaxed">
                  {cap.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/contact"
              className="inline-block px-8 py-3.5 bg-dark text-cream text-sm uppercase tracking-widest rounded-full hover:bg-gold hover:text-dark transition-all duration-300"
            >
              Start Your Custom Project
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

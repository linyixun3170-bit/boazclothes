"use client";

import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    number: "01",
    title: "Upload Your Design",
    desc: "Upload your artwork, logo, or pattern. We accept AI, PSD, PNG, and PDF files.",
  },
  {
    number: "02",
    title: "Select Garment",
    desc: "Choose from our collection of t-shirts, hoodies, tanks, and long sleeves.",
  },
  {
    number: "03",
    title: "Choose Color",
    desc: "Pick from our curated color palette or request a custom dye.",
  },
  {
    number: "04",
    title: "Placement & Size",
    desc: "Drag and position your design. Adjust scale, rotation, and placement.",
  },
];

export default function CustomPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [placement, setPlacement] = useState("center");
  const sectionRef = useRef<HTMLDivElement>(null);

  const colors = [
    { name: "White", hex: "#ffffff" },
    { name: "Black", hex: "#1a1a1a" },
    { name: "Cream", hex: "#FAF9F6" },
    { name: "Heather", hex: "#B0B0B0" },
    { name: "Navy", hex: "#1B3A5C" },
    { name: "Sage", hex: "#8FA68E" },
  ];

  const placements = [
    { id: "center", label: "Center Chest" },
    { id: "left", label: "Left Chest" },
    { id: "back", label: "Back" },
    { id: "sleeve", label: "Sleeve" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".step-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <CustomCursor />
      <SmoothScroll>
        <Navbar />
        <main className="pt-28 pb-20">
          {/* Hero */}
          <div className="max-w-[1400px] mx-auto section-padding mb-20">
            <span className="text-caption text-warm-gray mb-4 block">
              Custom Manufacturing
            </span>
            <h1 className="text-display-lg text-dark max-w-3xl">
              From Your <span className="italic">Sketch</span> to Shelf
            </h1>
            <p className="text-body-xl text-warm-gray mt-8 max-w-2xl">
              Upload your design, choose your garment, and see it come to life.
              We handle everything from sampling to full production.
            </p>
          </div>

          {/* 3D Preview / Mockup Area */}
          <div className="max-w-[1400px] mx-auto section-padding mb-24">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* T-Shirt Mockup */}
              <div className="relative aspect-[3/4] bg-light-gray flex items-center justify-center overflow-hidden">
                {/* Base t-shirt shape */}
                <div
                  className="relative w-3/4 aspect-[3/4] transition-colors duration-500"
                  style={{ backgroundColor: selectedColor }}
                >
                  {/* Simple t-shirt outline using CSS */}
                  <svg
                    viewBox="0 0 300 400"
                    className="absolute inset-0 w-full h-full"
                    style={{ filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.1))" }}
                  >
                    <path
                      d="M75 60 L110 40 L150 70 L190 40 L225 60 L240 120 L210 130 L210 380 L90 380 L90 130 L60 120 Z"
                      fill={selectedColor}
                      stroke="#00000010"
                      strokeWidth="1"
                    />
                  </svg>

                  {/* Uploaded image preview */}
                  {uploadedImage && (
                    <div
                      className="absolute inset-0 flex items-center justify-center p-20"
                    >
                      <img
                        src={uploadedImage}
                        alt="Your design"
                        className="max-w-[60%] max-h-[40%] object-contain opacity-90"
                        style={{
                          transform:
                            placement === "left"
                              ? "translate(-40%, -30%) scale(0.5)"
                              : placement === "back"
                              ? "translate(0, 10%) scale(0.7)"
                              : placement === "sleeve"
                              ? "translate(60%, -50%) scale(0.3) rotate(15deg)"
                              : "scale(0.8)",
                          transition: "transform 0.5s ease",
                        }}
                      />
                    </div>
                  )}

                  {/* Placeholder text when no image */}
                  {!uploadedImage && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-warm-gray/40 text-sm">
                        Upload a design to preview
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-10">
                {/* Upload */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-dark mb-3">
                    Upload Design
                  </label>
                  <div className="border-2 border-dashed border-stone p-8 text-center hover:border-dark transition-colors">
                    <input
                      type="file"
                      accept="image/*,.ai,.psd,.pdf"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="design-upload"
                    />
                    <label
                      htmlFor="design-upload"
                      className="cursor-pointer block"
                    >
                      <svg
                        className="w-8 h-8 mx-auto mb-3 text-warm-gray"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-sm text-warm-gray">
                        Drop file here or click to upload
                      </p>
                      <p className="text-[11px] text-warm-gray/60 mt-1">
                        AI, PSD, PNG, PDF up to 20MB
                      </p>
                    </label>
                  </div>
                </div>

                {/* Color */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-dark mb-3">
                    Garment Color
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {colors.map((c) => (
                      <button
                        key={c.hex}
                        onClick={() => setSelectedColor(c.hex)}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${
                          selectedColor === c.hex
                            ? "border-dark scale-110"
                            : "border-transparent"
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                  <p className="text-[11px] text-warm-gray mt-2">
                    Current: {colors.find((c) => c.hex === selectedColor)?.name}
                  </p>
                </div>

                {/* Placement */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-dark mb-3">
                    Placement
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {placements.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setPlacement(p.id)}
                        className={`px-4 py-3 text-[12px] uppercase tracking-wider border transition-all ${
                          placement === p.id
                            ? "border-dark bg-dark text-cream"
                            : "border-stone text-dark/60 hover:border-dark/40"
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-4">
                  <button className="btn-capsule w-full">Request Quote</button>
                  <p className="text-[11px] text-warm-gray mt-3 text-center">
                    We'll review your design and reply within 24 hours with
                    pricing and lead time.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Process Steps */}
          <div ref={sectionRef} className="max-w-[1400px] mx-auto section-padding">
            <div className="text-center mb-16">
              <span className="text-caption text-warm-gray mb-4 block">
                The Process
              </span>
              <h2 className="text-display-md text-dark">
                How <span className="italic">Custom</span> Works
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {steps.map((step) => (
                <div key={step.number} className="step-card">
                  <span className="font-heading text-4xl text-stone/60">
                    {step.number}
                  </span>
                  <h3 className="font-heading text-xl text-dark mt-4 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-body-lg text-warm-gray">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}

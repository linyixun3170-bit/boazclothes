"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import { products, type Product } from "@/lib/products-catalog";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const categories = ["All", "T-Shirts", "Hoodies", "Long Sleeves", "Kids", "Tank Tops"];

export default function WholesalePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const filtered: Product[] =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".wholesale-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    });
    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <>
      <CustomCursor />
      <SmoothScroll>
        <Navbar />
        <main className="pt-28 pb-20">
          {/* Header */}
          <div className="max-w-[1400px] mx-auto section-padding mb-16">
            <span className="text-caption text-warm-gray mb-4 block">
              The Collection
            </span>
            <h1 className="text-display-lg text-dark">
              Wholesale <span className="italic">Products</span>
            </h1>
            <p className="text-body-lg text-warm-gray mt-6 max-w-xl">
              Factory-direct pricing on premium blank apparel. All products
              available for customization — labels, prints, packaging.
            </p>
          </div>

          {/* Category Filter */}
          <div className="max-w-[1400px] mx-auto section-padding mb-10">
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-[11px] uppercase tracking-[0.15em] transition-all ${
                    activeCategory === cat
                      ? "bg-dark text-cream"
                      : "bg-light-gray text-dark/60 hover:bg-stone"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div ref={sectionRef} className="max-w-[1400px] mx-auto section-padding">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <div
                  key={product.id}
                  className="wholesale-card group"
                  data-cursor-hover
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div className="relative aspect-[3/4] overflow-hidden mb-5 image-hover bg-light-gray">
                    <Image
                      src={
                        hoveredProduct === product.id && product.images.gallery[1]
                          ? product.images.gallery[1]
                          : product.images.main
                      }
                      alt={product.name}
                      fill
                      className="object-cover transition-opacity duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Tags */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      {product.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] uppercase tracking-wider px-2.5 py-1 bg-cream/90 text-dark"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h3 className="font-heading text-xl text-dark group-hover:text-gold transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[12px] text-warm-gray mt-1">
                    {product.tagline}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-[0.15em] text-dark/60">
                      {product.priceFOB}
                    </span>
                    <span className="text-[11px] text-warm-gray">
                      MOQ: {product.moq}
                    </span>
                  </div>
                  {/* Quick specs */}
                  <div className="mt-3 pt-3 border-t border-stone/50 flex gap-4">
                    <span className="text-[10px] uppercase tracking-wider text-warm-gray/70">
                      {product.weight}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-warm-gray/70">
                      {product.fabric}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-warm-gray/70">
                      {product.fit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="max-w-[1400px] mx-auto section-padding mt-20">
            <div className="bg-light-gray p-12 md:p-16 text-center">
              <h2 className="text-display-md text-dark mb-4">
                Need a Custom Order?
              </h2>
              <p className="text-body-lg text-warm-gray mb-8 max-w-lg mx-auto">
                Send us your tech pack, reference sample, or sketch. We&apos;ll
                produce a counter-sample for your approval.
              </p>
              <Link href="/contact/" className="btn-capsule">
                Request a Quote
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}

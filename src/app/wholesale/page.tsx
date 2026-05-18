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
          {/* Header - minimal like Nomad */}
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 mb-16">
            <p className="text-[11px] uppercase tracking-[0.25em] text-gray-400 mb-4">
              The Collection
            </p>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-dark leading-tight">
              Wholesale <span className="italic">Products</span>
            </h1>
            <p className="text-dark/50 mt-6 max-w-md text-sm leading-relaxed">
              Factory-direct pricing on premium blank apparel. Available for
              customization — labels, prints, packaging.
            </p>
          </div>

          {/* Category Filter - pill style */}
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 mb-12">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-[11px] uppercase tracking-[0.15em] transition-all ${
                    activeCategory === cat
                      ? "bg-dark text-cream"
                      : "bg-light-gray text-dark/50 hover:bg-gray-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid - large images, minimal info */}
          <div ref={sectionRef} className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/wholesale/${product.slug}/`}
      className="wholesale-card group block"
      data-cursor-hover
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Large image container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-light-gray rounded-sm">
        <Image
          src={
            isHovered && product.images.gallery[1]
              ? product.images.gallery[1]
              : product.images.main
          }
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Minimal info below */}
      <div className="mt-4 flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-dark">{product.name}</h3>
          <p className="text-xs text-gray-400 mt-1">{product.tagline}</p>
        </div>
        <span className="text-sm text-dark/60 tabular-nums">
          {product.priceFOB}
        </span>
      </div>
    </Link>
  );
}

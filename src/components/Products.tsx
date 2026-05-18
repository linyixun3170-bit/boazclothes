"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getFeaturedProducts } from "@/lib/products-catalog";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Products() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featuredProducts = getFeaturedProducts();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".product-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-cream py-24 md:py-36">
      {/* Section header - minimal */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 mb-16 md:mb-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-gray-400 mb-4">
              Featured
            </p>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-dark leading-tight">
              Blank Canvas
            </h2>
          </div>
          <Link
            href="/wholesale/"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-dark/60 hover:text-dark transition-colors"
            data-cursor-hover
          >
            View All Products
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Product grid - large images like Nomad */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: any }) {
  const [isHovered, setIsHovered] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  return (
    <Link
      href={`/wholesale/${product.slug}/`}
      className="product-card group block"
      data-cursor-hover
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container - large, aspect ratio */}
      <div
        ref={imageRef}
        className="relative aspect-[4/5] overflow-hidden bg-light-gray rounded-sm"
      >
        <Image
          src={isHovered && product.gallery[1] ? product.gallery[1] : product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
      </div>

      {/* Product info - minimal, below image */}
      <div className="mt-4 flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-dark tracking-tight">
            {product.name}
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            {product.fabric} · {product.weight}
          </p>
        </div>
        <span className="text-sm text-dark/60 tabular-nums">
          {product.priceRange}
        </span>
      </div>
    </Link>
  );
}

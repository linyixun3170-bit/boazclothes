"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getFeaturedProducts } from "@/lib/products-catalog";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Products() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const featured = getFeaturedProducts();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.children || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".product-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".product-grid",
            start: "top 75%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 md:py-40 bg-cream">
      <div className="max-w-[1400px] mx-auto section-padding">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-caption text-warm-gray mb-4 block">The Collection</span>
            <h2 className="text-display-lg text-dark">
              Blank Canvas,
              <br />
              <span className="italic">Your Vision</span>
            </h2>
          </div>
          <Link
            href="/wholesale/"
            className="text-[11px] uppercase tracking-[0.2em] text-dark/70 hover:text-dark transition-colors link-underline shrink-0"
          >
            View All Products →
          </Link>
        </div>

        {/* Product Grid */}
        <div className="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <Link
              key={product.id}
              href={`/wholesale/`}
              className="product-card group"
              data-cursor-hover
            >
              <div className="relative aspect-[3/4] overflow-hidden mb-5 image-hover">
                <Image
                  src={product.images.main}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Tag */}
                {product.isBestSeller && (
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 bg-cream/90 text-dark">
                      Best Seller
                    </span>
                  </div>
                )}
                {product.isNew && (
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 bg-dark/90 text-cream">
                      New
                    </span>
                  </div>
                )}
              </div>
              <h3 className="font-heading text-xl text-dark group-hover:text-gold transition-colors">
                {product.name}
              </h3>
              <p className="text-[12px] text-warm-gray mt-1">{product.tagline}</p>
              <p className="text-[11px] uppercase tracking-[0.15em] text-dark/60 mt-2">
                {product.priceFOB} · MOQ {product.moq}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const products = [
  {
    name: "Heavyweight Tee",
    subtitle: "240gsm Combed Cotton",
    price: "From ¥18",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    href: "/wholesale/",
  },
  {
    name: "Premium Hoodie",
    subtitle: "400gsm Fleece Lined",
    price: "From ¥45",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80",
    href: "/wholesale/",
  },
  {
    name: "Classic Tank",
    subtitle: "180gsm Ring-Spun",
    price: "From ¥12",
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
    href: "/wholesale/",
  },
  {
    name: "Long Sleeve",
    subtitle: "220gsm Soft Jersey",
    price: "From ¥22",
    image:
      "https://images.unsplash.com/photo-1593493277262-d3b4805e1bcb?w=600&q=80",
    href: "/wholesale/",
  },
];

export default function Products() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

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
          {products.map((product) => (
            <Link
              key={product.name}
              href={product.href}
              className="product-card group"
              data-cursor-hover
            >
              <div className="relative aspect-[3/4] overflow-hidden mb-5 image-hover">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/10 transition-colors duration-500" />
              </div>
              <h3 className="font-heading text-xl text-dark group-hover:text-gold transition-colors">
                {product.name}
              </h3>
              <p className="text-[12px] text-warm-gray mt-1">{product.subtitle}</p>
              <p className="text-[11px] uppercase tracking-[0.15em] text-dark/60 mt-2">
                {product.price}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

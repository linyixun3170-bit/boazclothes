"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import type { ProductWithCategory } from "@/lib/products";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const placeholderProducts: ProductWithCategory[] = [
  {
    id: 0,
    name: "Premium Crewneck Tee",
    slug: "premium-crewneck-tee",
    permalink: "",
    description: "",
    short_description: "",
    price: "8.50",
    regular_price: "8.50",
    sale_price: "",
    on_sale: false,
    stock_status: "instock",
    stock_quantity: null,
    categories: [{ id: 0, name: "T-Shirts", slug: "t-shirts", parent: 0, description: "" }],
    images: [],
    attributes: [{ id: 0, name: "Color", slug: "pa_color", position: 0, visible: true, variation: true, options: ["White", "Black", "Navy", "Gray"] }],
    meta_data: [],
    type: "simple",
    categoryName: "T-Shirts",
    colors: ["White", "Black", "Navy", "Gray"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    material: "100% Combed Ring-Spun Cotton",
  },
  {
    id: 0,
    name: "Heavyweight Hoodie",
    slug: "heavyweight-hoodie",
    permalink: "",
    description: "",
    short_description: "",
    price: "18.00",
    regular_price: "18.00",
    sale_price: "",
    on_sale: false,
    stock_status: "instock",
    stock_quantity: null,
    categories: [{ id: 0, name: "Hoodies", slug: "hoodies", parent: 0, description: "" }],
    images: [],
    attributes: [{ id: 0, name: "Color", slug: "pa_color", position: 0, visible: true, variation: true, options: ["Black", "Heather Gray", "Navy", "Forest Green"] }],
    meta_data: [],
    type: "simple",
    categoryName: "Hoodies",
    colors: ["Black", "Heather Gray", "Navy", "Forest Green"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    material: "80% Cotton / 20% Polyester",
  },
  {
    id: 0,
    name: "Ring-Spun Tank Top",
    slug: "ringspun-tank-top",
    permalink: "",
    description: "",
    short_description: "",
    price: "6.50",
    regular_price: "6.50",
    sale_price: "",
    on_sale: false,
    stock_status: "instock",
    stock_quantity: null,
    categories: [{ id: 0, name: "Tank Tops", slug: "tank-tops", parent: 0, description: "" }],
    images: [],
    attributes: [{ id: 0, name: "Color", slug: "pa_color", position: 0, visible: true, variation: true, options: ["White", "Black", "Royal Blue", "Red"] }],
    meta_data: [],
    type: "simple",
    categoryName: "Tank Tops",
    colors: ["White", "Black", "Royal Blue", "Red"],
    sizes: ["S", "M", "L", "XL"],
    material: "100% Cotton",
  },
];

const features = [
  {
    title: "Premium Materials",
    description:
      "Every garment is crafted from high-quality fabrics — ring-spun cotton, heavyweight blends, and eco-friendly options.",
    icon: "🧵",
  },
  {
    title: "Bulk Pricing",
    description:
      "Competitive wholesale pricing from 50 to 10,000+ units. The more you order, the better the value.",
    icon: "💰",
  },
  {
    title: "Custom Manufacturing",
    description:
      "Full custom production — your tags, your packaging, your specifications. We make it exactly how you want it.",
    icon: "🏭",
  },
  {
    title: "Global Shipping",
    description:
      "Reliable worldwide shipping with tracking. From local boutiques to international brands.",
    icon: "🌍",
  },
];

export default function HomePage() {
  const featuresRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [products] = useState(placeholderProducts);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Features section
      gsap.fromTo(
        ".feature-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
          },
        }
      );

      // Products section
      gsap.fromTo(
        ".featured-product",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: productsRef.current,
            start: "top 80%",
          },
        }
      );

      // CTA section
      gsap.fromTo(
        ctaRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <HeroSection />

      {/* Why Boaz section */}
      <section ref={featuresRef} className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-gold text-xs uppercase tracking-[0.2em]">
              Why Boaz
            </span>
            <h2 className="mt-3 font-heading text-3xl md:text-4xl text-dark">
              Built Different. Priced Fair.
            </h2>
            <p className="mt-4 text-warm-gray leading-relaxed">
              We don&apos;t just sell blanks — we partner with brands to
              deliver consistent quality at scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="feature-card text-center p-6"
              >
                <span className="text-4xl block mb-4">{feature.icon}</span>
                <h3 className="font-heading text-xl text-dark mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-warm-gray leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section ref={productsRef} className="py-20 md:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-gold text-xs uppercase tracking-[0.2em]">
              Featured Products
            </span>
            <h2 className="mt-3 font-heading text-3xl md:text-4xl text-dark">
              Our Best Sellers
            </h2>
            <p className="mt-4 text-warm-gray leading-relaxed">
              Trusted by thousands of brands worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.slug} className="featured-product">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/wholesale"
              className="inline-block px-8 py-3 border border-dark/20 text-dark text-sm uppercase tracking-widest rounded-full hover:border-gold hover:text-gold transition-all duration-300"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="py-20 md:py-28 bg-dark text-cream">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl md:text-5xl leading-tight">
            Ready to Build Your Collection?
          </h2>
          <p className="mt-6 text-cream/60 max-w-xl mx-auto leading-relaxed">
            Whether you need 50 units or 10,000, we deliver consistent quality
            at competitive prices. Start your wholesale journey today.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/wholesale"
              className="px-8 py-3.5 bg-gold text-dark text-sm uppercase tracking-widest rounded-full hover:bg-cream hover:text-dark transition-all duration-300"
            >
              Start Wholesale
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 border border-cream/20 text-cream text-sm uppercase tracking-widest rounded-full hover:border-gold hover:text-gold transition-all duration-300"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

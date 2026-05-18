"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "@/components/HeroSection";
import Stats from "@/components/Stats";
import About from "@/components/About";
import FactoryTour from "@/components/FactoryTour";
import Testimonials from "@/components/Testimonials";
import TrustProgress from "@/components/TrustProgress";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import { productImages } from "@/lib/images";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const featuredProducts = [
  {
    ...productImages.heavyweightTee,
    name: "240gsm Heavyweight T-Shirt",
    category: "T-Shirts",
    price: "$8.50",
    href: "/wholesale",
    colors: ["#ffffff", "#1a1a1a", "#0a192f", "#808080"],
  },
  {
    ...productImages.hoodie,
    name: "Premium Heavyweight Hoodie",
    category: "Hoodies",
    price: "$18.00",
    href: "/wholesale",
    colors: ["#1a1a1a", "#b0b0b0", "#0a192f"],
  },
  {
    ...productImages.tankTop,
    name: "Ring-Spun Tank Top",
    category: "Tank Tops",
    price: "$6.50",
    href: "/wholesale",
    colors: ["#ffffff", "#1a1a1a", "#4169e1"],
  },
  {
    ...productImages.longSleeve,
    name: "Premium Long Sleeve Tee",
    category: "Long Sleeves",
    price: "$12.00",
    href: "/wholesale",
    colors: ["#ffffff", "#1a1a1a", "#36454f"],
  },
  {
    ...productImages.polo,
    name: "Classic Pique Polo",
    category: "Polos",
    price: "$15.00",
    href: "/wholesale",
    colors: ["#ffffff", "#1a1a1a", "#0a192f", "#800020"],
  },
  {
    ...productImages.youth,
    name: "Youth & Kids Collection",
    category: "Kids",
    price: "$5.50",
    href: "/wholesale",
    colors: ["#ffffff", "#1a1a1a", "#4169e1"],
  },
];

export default function HomePage() {
  const productsRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Products section
      gsap.fromTo(
        ".featured-product-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: productsRef.current,
            start: "top 80%",
          },
        }
      );

      // Brand logos
      gsap.fromTo(
        ".brand-logo",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: logosRef.current,
            start: "top 85%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* 🎯 Hero Section — 全屏巨幕 + 定位语 */}
      <HeroSection />

      {/* 📊 Stats — B2B 实力数据（50 MOQ / 72hr / 50000+ / Free Samples） */}
      <Stats />

      {/* 🏭 About — "We Own the Factory" 信任建设 */}
      <About />

      {/* 👕 Featured Products — 6 核心产品卡片 */}
      <section ref={productsRef} className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-gold text-xs uppercase tracking-[0.2em]">
              Featured Products
            </span>
            <h2 className="mt-3 font-heading text-3xl md:text-4xl text-dark">
              Our Best Sellers
            </h2>
            <p className="mt-4 text-warm-gray leading-relaxed">
              Premium blanks trusted by thousands of brands worldwide.
              Factory-direct pricing, consistent quality.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredProducts.map((product, i) => (
              <Link
                key={i}
                href={product.href}
                className="featured-product-card block group"
                onMouseEnter={() => setHoveredProduct(i)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="relative bg-cream rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500">
                  {/* Image container — nomad-style card */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={product.src}
                      alt={product.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={`object-cover transition-all duration-700 ${
                        hoveredProduct === i
                          ? "scale-105"
                          : "scale-100"
                      }`}
                    />
                    {/* Hover overlay */}
                    <div
                      className={`absolute inset-0 bg-dark/0 group-hover:bg-dark/10 transition-all duration-500`}
                    />
                  </div>

                  {/* Product info — elegant overlay at bottom */}
                  <div className="p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-warm-gray mb-1">
                      {product.category}
                    </p>
                    <h3 className="font-heading text-lg text-dark leading-tight group-hover:text-gold transition-colors">
                      {product.name}
                    </h3>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-dark">
                        From {product.price}
                      </span>
                      <span className="text-xs text-gold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
                        View →
                      </span>
                    </div>

                    {/* Color dots */}
                    <div className="mt-3 flex gap-1.5">
                      {product.colors.map((color) => (
                        <span
                          key={color}
                          className="w-3 h-3 rounded-full border border-dark/10"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/wholesale"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-dark text-cream text-sm uppercase tracking-widest rounded-full hover:bg-gold hover:text-dark transition-all duration-300"
            >
              View Full Catalog
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 🤝 Trust Progress — 合作流程可视化 */}
      <TrustProgress />

      {/* 🏭 Factory Tour — 工厂实拍不对称网格 */}
      <FactoryTour />

      {/* 💬 Testimonials — 社会认同（深色背景） */}
      <Testimonials />

      {/* ❓ FAQ — 解决决策卡点 + FAQPage Schema */}
      <FAQ />

      {/* 🎯 Final CTA — 零风险启动 */}
      <CTASection />

      {/* ⭐ Brand Trust Logos */}
      <section ref={logosRef} className="py-12 md:py-16 bg-cream/50 border-t border-light-gray">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <p className="text-center text-xs uppercase tracking-[0.2em] text-warm-gray mb-8">
            Trusted by brands worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14 opacity-40">
            {[
              "StreetWear Co.",
              "Urban Threads",
              "Collective Goods",
              "Base Layer",
              "Iron & Cotton",
              "Pacific Apparel",
            ].map((name) => (
              <span
                key={name}
                className="brand-logo font-heading text-lg md:text-xl text-dark/70"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

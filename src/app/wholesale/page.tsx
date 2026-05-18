"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";

const allProducts = [
  {
    name: "Heavyweight Tee",
    subtitle: "240gsm Combed Cotton",
    price: "¥18–28",
    moq: "50 pcs",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    tags: ["Bestseller", "Stock"],
  },
  {
    name: "Premium Hoodie",
    subtitle: "400gsm Fleece Lined",
    price: "¥45–70",
    moq: "50 pcs",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80",
    tags: ["Premium"],
  },
  {
    name: "Classic Tank",
    subtitle: "180gsm Ring-Spun",
    price: "¥12–18",
    moq: "50 pcs",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
    tags: ["Stock"],
  },
  {
    name: "Long Sleeve Tee",
    subtitle: "220gsm Soft Jersey",
    price: "¥22–32",
    moq: "50 pcs",
    image: "https://images.unsplash.com/photo-1593493277262-d3b4805e1bcb?w=600&q=80",
    tags: ["New"],
  },
  {
    name: "Vintage Wash Tee",
    subtitle: "200gsm Garment Dyed",
    price: "¥25–35",
    moq: "100 pcs",
    image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&q=80",
    tags: ["Trending"],
  },
  {
    name: "Crop Hoodie",
    subtitle: "350gsm Brushed Fleece",
    price: "¥38–55",
    moq: "100 pcs",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
    tags: ["Custom"],
  },
];

const categories = ["All", "Stock", "Custom", "Premium", "Bestseller"];

export default function WholesalePage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? allProducts
      : allProducts.filter((p) => p.tags.includes(activeCategory));

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
          <div className="max-w-[1400px] mx-auto section-padding">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <div key={product.name} className="group" data-cursor-hover>
                  <div className="relative aspect-[3/4] overflow-hidden mb-5 image-hover">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Tags */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      {product.tags.map((tag) => (
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
                    {product.subtitle}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-[0.15em] text-dark/60">
                      {product.price}
                    </span>
                    <span className="text-[11px] text-warm-gray">
                      MOQ: {product.moq}
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
                Send us your tech pack, reference sample, or sketch. We'll produce
                a counter-sample for your approval.
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

"use client";

import { use, useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { fetchProduct } from "@/lib/products";
import type { ProductWithCategory } from "@/lib/products";

export default function ProductDetailClient({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [product, setProduct] = useState<ProductWithCategory | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchProduct(slug);
        setProduct(data);
      } catch (err) {
        console.error("Failed to load product:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  useEffect(() => {
    if (!loading && contentRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: "power2.out" }
      );
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="pt-28 pb-20 min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-28 pb-20 min-h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-light-gray flex items-center justify-center">
            <svg className="w-8 h-8 text-warm-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="font-heading text-2xl text-dark mb-2">Product Not Found</h2>
          <p className="text-warm-gray mb-8">We couldn&apos;t find the product you&apos;re looking for.</p>
          <Link
            href="/wholesale"
            className="inline-block px-8 py-3 bg-dark text-white rounded-full text-sm uppercase tracking-wider hover:bg-dark/90 transition-colors"
          >
            Browse All Products
          </Link>
        </div>
      </div>
    );
  }

  const allImages = product.images?.length
    ? product.images
    : [{ src: "/placeholder-product.svg", alt: product.name }];

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-warm-gray">
          <Link href="/" className="hover:text-gold transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/wholesale" className="hover:text-gold transition-colors">
            Wholesale
          </Link>
          <span className="mx-2">/</span>
          <span className="text-dark">{product.name}</span>
        </nav>

        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div className="aspect-square rounded-2xl overflow-hidden bg-light-gray mb-4">
              <Image
                src={allImages[selectedImage]?.src || "/placeholder-product.svg"}
                alt={allImages[selectedImage]?.alt || product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      i === selectedImage
                        ? "border-gold"
                        : "border-transparent hover:border-warm-gray/30"
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt || `${product.name} ${i + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {product.categoryName && (
              <span className="text-gold text-xs uppercase tracking-[0.2em]">
                {product.categoryName}
              </span>
            )}
            <h1 className="font-heading text-3xl md:text-4xl text-dark leading-tight">
              {product.name}
            </h1>

            {product.price && (
              <p className="text-2xl font-heading text-dark">
                {product.regular_price && product.regular_price !== product.price ? (
                  <>
                    <span className="line-through text-warm-gray text-lg mr-2">
                      ${parseFloat(product.regular_price).toFixed(2)}
                    </span>
                    ${parseFloat(product.price).toFixed(2)}
                  </>
                ) : (
                  `$${parseFloat(product.price).toFixed(2)}`
                )}
              </p>
            )}

            {product.short_description && (
              <div
                className="text-warm-gray leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.short_description }}
              />
            )}

            {product.description && (
              <div>
                <h3 className="font-heading text-lg text-dark mb-2">Description</h3>
                <div
                  className="text-warm-gray leading-relaxed text-sm"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            )}

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="font-heading text-sm text-dark uppercase tracking-wider mb-3">
                  Colors
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => {
                    const colorMap: Record<string, string> = {
                      black: "#111",
                      white: "#f5f5f5",
                      navy: "#1a2744",
                      gray: "#808080",
                      "heather gray": "#b0b0b0",
                      charcoal: "#36454f",
                      "royal blue": "#4169e1",
                      red: "#cc0000",
                      "forest green": "#228b22",
                      maroon: "#800000",
                      purple: "#6a0dad",
                      gold: "#c9a84c",
                      pink: "#ffb6c1",
                      "kelly green": "#4cbb17",
                      "dark grey": "#555",
                      "neon green": "#39ff14",
                      orange: "#ff6600",
                      "dark heather": "#404040",
                      "sport grey": "#a0a0a0",
                    };
                    return (
                      <div
                        key={color}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-light-gray text-xs text-dark"
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-warm-gray/20 inline-block"
                          style={{
                            backgroundColor: colorMap[color] || color,
                          }}
                        />
                        {color.charAt(0).toUpperCase() + color.slice(1)}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="font-heading text-sm text-dark uppercase tracking-wider mb-3">
                  Available Sizes
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <span
                      key={size}
                      className="px-4 py-2 border border-warm-gray/20 rounded-lg text-sm text-dark"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Material */}
            {product.material && (
              <div className="text-sm text-warm-gray">
                <span className="font-medium text-dark">Material:</span> {product.material}
              </div>
            )}

            {/* CTA */}
            <div className="pt-4 border-t border-light-gray">
              <Link
                href="/contact"
                className="inline-block px-10 py-4 bg-dark text-white rounded-full text-sm uppercase tracking-wider hover:bg-dark/90 transition-colors"
              >
                Request Quote
              </Link>
              <p className="mt-3 text-xs text-warm-gray">
                Minimum order quantities apply. Contact us for pricing and availability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

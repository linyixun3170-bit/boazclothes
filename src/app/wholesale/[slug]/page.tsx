"use client";

import { use, useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { fetchProduct } from "@/lib/products";
import type { ProductWithCategory } from "@/lib/products";

export default function ProductDetailPage({
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
    if (!loading && product) {
      gsap.fromTo(
        contentRef.current?.children || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    }
  }, [loading, product]);

  if (loading) {
    return (
      <div className="pt-28 min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-28 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl text-dark mb-4">
            Product Not Found
          </h1>
          <p className="text-warm-gray mb-8">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/wholesale"
            className="px-6 py-3 bg-dark text-cream text-sm uppercase tracking-widest rounded-full inline-block"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images?.length > 0 ? product.images : [];
  const hasSale = product.on_sale;
  const description = product.description || product.short_description;

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-warm-gray">
          <Link href="/wholesale" className="hover:text-gold transition-colors">
            Products
          </Link>
          <span className="mx-2">/</span>
          <span className="text-dark">{product.name}</span>
        </div>

        <div
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Image gallery */}
          <div>
            <div className="relative aspect-square bg-light-gray rounded-2xl overflow-hidden mb-4">
              {images.length > 0 ? (
                <Image
                  src={images[selectedImage]?.src || images[0]?.src}
                  alt={images[selectedImage]?.alt || product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-warm-gray">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto mb-2 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm">No image available</span>
                  </div>
                </div>
              )}
              {hasSale && (
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-gold text-dark text-xs uppercase tracking-wider rounded-full">
                  Sale
                </div>
              )}
            </div>

            {/* Thumbnail grid */}
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {images.map((img, i) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(i)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      i === selectedImage
                        ? "border-gold"
                        : "border-transparent hover:border-gold/50"
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt || `${product.name} ${i + 1}`}
                      fill
                      sizes="20vw"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div>
            {product.categoryName && (
              <p className="text-xs uppercase tracking-[0.15em] text-gold mb-2">
                {product.categoryName}
              </p>
            )}

            <h1 className="font-heading text-3xl md:text-4xl text-dark leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mt-4 flex items-center gap-3">
              {hasSale ? (
                <>
                  <span className="text-3xl font-medium text-gold">
                    ${product.sale_price}
                  </span>
                  <span className="text-lg text-warm-gray line-through">
                    ${product.regular_price}
                  </span>
                </>
              ) : (
                <span className="text-3xl font-medium text-dark">
                  ${product.price}
                </span>
              )}
              <span className="text-xs text-warm-gray uppercase tracking-wider">
                {product.type === "variable" ? "Price varies by variant" : "per unit (wholesale)"}
              </span>
            </div>

            {/* Stock status */}
            <div className="mt-4">
              <span
                className={`inline-flex items-center gap-1.5 text-xs uppercase tracking-wider ${
                  product.stock_status === "instock"
                    ? "text-green-700"
                    : "text-warm-gray"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    product.stock_status === "instock"
                      ? "bg-green-500"
                      : "bg-warm-gray"
                  }`}
                />
                {product.stock_status === "instock"
                  ? "In Stock"
                  : product.stock_status === "onbackorder"
                  ? "Available on Backorder"
                  : "Out of Stock"}
              </span>
            </div>

            {/* Material */}
            {product.material && (
              <div className="mt-6">
                <h3 className="text-xs uppercase tracking-wider text-warm-gray mb-1">
                  Material
                </h3>
                <p className="text-sm text-dark">{product.material}</p>
              </div>
            )}

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xs uppercase tracking-wider text-warm-gray mb-2">
                  Available Colors
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <span
                      key={color}
                      className="px-3 py-1 bg-light-gray text-dark text-xs rounded-full"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xs uppercase tracking-wider text-warm-gray mb-2">
                  Available Sizes
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <span
                      key={size}
                      className="px-4 py-2 border border-dark/20 text-dark text-xs rounded-full"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {description && (
              <div className="mt-8">
                <h3 className="text-xs uppercase tracking-wider text-warm-gray mb-2">
                  Description
                </h3>
                <div
                  className="text-sm text-warm-gray leading-relaxed prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </div>
            )}

            {/* CTA */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="flex-1 text-center px-8 py-3.5 bg-dark text-cream text-sm uppercase tracking-widest rounded-full hover:bg-gold hover:text-dark transition-all duration-300"
              >
                Request Wholesale Pricing
              </Link>
              <Link
                href="/custom"
                className="flex-1 text-center px-8 py-3.5 border border-dark/20 text-dark text-sm uppercase tracking-widest rounded-full hover:border-gold hover:text-gold transition-all duration-300"
              >
                Customize This Product
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

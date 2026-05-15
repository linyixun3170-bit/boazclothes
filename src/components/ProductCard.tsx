"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import type { ProductWithCategory } from "@/lib/products";

interface ProductCardProps {
  product: ProductWithCategory;
}

export default function ProductCard({ product }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      scale: 1.03,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const imageSrc =
    product.images?.[0]?.src || "/placeholder-product.svg";
  const imageAlt = product.images?.[0]?.alt || product.name;
  const hasSale = product.on_sale;

  return (
    <Link href={`/wholesale/${product.slug}`} className="block group">
      <div
        ref={cardRef}
        className="relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Sale badge */}
        {hasSale && (
          <div className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-gold text-dark text-[10px] uppercase tracking-wider font-medium rounded-full">
            Sale
          </div>
        )}

        {/* Image */}
        <div className="relative aspect-[3/4] bg-light-gray overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Info */}
        <div className="p-4">
          {product.categoryName && (
            <p className="text-[10px] uppercase tracking-[0.15em] text-warm-gray mb-1">
              {product.categoryName}
            </p>
          )}
          <h3 className="font-heading text-lg text-dark leading-tight">
            {product.name}
          </h3>
          <div className="mt-2 flex items-center gap-2">
            {hasSale ? (
              <>
                <span className="text-lg font-medium text-gold">
                  ${product.sale_price}
                </span>
                <span className="text-sm text-warm-gray line-through">
                  ${product.regular_price}
                </span>
              </>
            ) : (
              <span className="text-lg font-medium text-dark">
                ${product.price}
              </span>
            )}
          </div>

          {/* Color dots */}
          {product.colors && product.colors.length > 0 && (
            <div className="mt-3 flex gap-1.5">
              {product.colors.slice(0, 5).map((color) => (
                <span
                  key={color}
                  className="w-3 h-3 rounded-full border border-dark/10"
                  style={{ backgroundColor: colorToHex(color) }}
                  title={color}
                />
              ))}
              {product.colors.length > 5 && (
                <span className="text-[10px] text-warm-gray self-center ml-1">
                  +{product.colors.length - 5}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

function colorToHex(color: string): string {
  const colorMap: Record<string, string> = {
    white: "#ffffff",
    black: "#000000",
    navy: "#0a192f",
    gray: "#808080",
    "heather gray": "#b0b0b0",
    "heather grey": "#b0b0b0",
    "dark gray": "#404040",
    "charcoal": "#36454f",
    "royal blue": "#4169e1",
    red: "#dc2626",
    maroon: "#800000",
    "forest green": "#228b22",
    "olive green": "#556b2f",
    "army green": "#4b5320",
    "kelly green": "#4cbb17",
    "sport grey": "#c0c0c0",
    "light blue": "#add8e6",
    "baby blue": "#89cff0",
    pink: "#ffc0cb",
    "hot pink": "#ff69b4",
    purple: "#800080",
    "light pink": "#ffb6c1",
    yellow: "#ffd700",
    gold: "#c4b898",
    orange: "#ffa500",
    burgundy: "#800020",
    brown: "#8b4513",
    khaki: "#c3b091",
    "natural": "#f5deb3",
  };
  return colorMap[color.toLowerCase()] || "#e8e4dc";
}

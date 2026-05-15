"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import ProductCard from "@/components/ProductCard";
import type { ProductWithCategory } from "@/lib/products";
import { fetchProducts, fetchCategories } from "@/lib/products";

export default function WholesalePage() {
  const [products, setProducts] = useState<ProductWithCategory[]>([]);
  const [categories, setCategories] = useState<Array<{ id: number; name: string; slug: string }>>([]);
  const [activeCategory, setActiveCategory] = useState<number | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const [catData] = await Promise.all([
          fetchCategories(),
        ]);
        setCategories(catData as any);
        const { products: prodData } = await fetchProducts({ per_page: 12 });
        setProducts(prodData);
      } catch (err) {
        console.error("Failed to load products:", err);
        setError("Unable to load products at this time.");
        // Use empty products
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  useEffect(() => {
    if (!loading && products.length > 0) {
      gsap.fromTo(
        ".wholesale-product",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
        }
      );
    }
  }, [loading, products.length]);

  const handleCategoryFilter = async (catId?: number) => {
    setActiveCategory(catId === activeCategory ? undefined : catId);
    setLoading(true);
    try {
      const { products: prodData } = await fetchProducts({
        per_page: 12,
        ...(catId && { category: catId }),
      });
      setProducts(prodData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-gold text-xs uppercase tracking-[0.2em]">
            Wholesale
          </span>
          <h1 className="mt-3 font-heading text-4xl md:text-5xl text-dark">
            Products
          </h1>
          <p className="mt-4 text-warm-gray leading-relaxed">
            Premium blanks ready for your brand. Competitive wholesale pricing
            on every order.
          </p>
        </div>
      </div>

      {/* Category filter */}
      {categories.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-10">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => handleCategoryFilter(undefined)}
              className={`px-5 py-2 text-xs uppercase tracking-widest rounded-full transition-all duration-300 ${
                !activeCategory
                  ? "bg-dark text-cream"
                  : "bg-light-gray text-dark/70 hover:bg-dark hover:text-cream"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryFilter(cat.id)}
                className={`px-5 py-2 text-xs uppercase tracking-widest rounded-full transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-dark text-cream"
                    : "bg-light-gray text-dark/70 hover:bg-dark hover:text-cream"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Products grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-warm-gray mb-4">{error}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-8">
              {/* Show placeholder message */}
              <div className="col-span-full text-center">
                <p className="text-sm text-warm-gray/60">
                  Please ensure the WooCommerce API is configured correctly.
                </p>
              </div>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-warm-gray">No products found.</p>
          </div>
        ) : (
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id || product.slug} className="wholesale-product">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

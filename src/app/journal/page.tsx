"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

interface WPPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  date: string;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

export default function JournalPage() {
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          "https://boazclothes.com/wp-json/wp/v2/posts?per_page=10&_embed"
        );
        if (res.ok) {
          const data = await res.json();
          setPosts(data);
        } else {
          setPosts([]);
        }
      } catch {
        // Silent fail — demo mode
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  useEffect(() => {
    if (!loading && !error) {
      gsap.fromTo(
        ".journal-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    }
  }, [loading, error]);

  const fallbackPosts = [
    {
      id: 1,
      title: { rendered: "The Complete Guide to Wholesale T-Shirt Quality" },
      excerpt: {
        rendered:
          "Learn how to evaluate blank t-shirt quality — fabric weight, construction, and what matters for your brand.",
      },
      slug: "wholesale-t-shirt-quality-guide",
      date: "2025-03-15T00:00:00",
    },
    {
      id: 2,
      title: { rendered: "Screen Printing vs. DTG: Which Is Right for Your Brand?" },
      excerpt: {
        rendered:
          "A detailed comparison of production methods, minimums, costs, and quality outcomes.",
      },
      slug: "screen-printing-vs-dtg",
      date: "2025-02-20T00:00:00",
    },
    {
      id: 3,
      title: { rendered: "How to Choose the Right Blank Hoodie for Customization" },
      excerpt: {
        rendered:
          "From fleece weight to pocket styles — everything you need to know before ordering custom hoodies.",
      },
      slug: "choose-blank-hoodie-customization",
      date: "2025-01-10T00:00:00",
    },
    {
      id: 4,
      title: { rendered: "Minimum Order Quantities Explained for Apparel Brands" },
      excerpt: {
        rendered:
          "Understanding MOQs, how they work, and tips for negotiating with manufacturers.",
      },
      slug: "minimum-order-quantities-apparel",
      date: "2024-12-05T00:00:00",
    },
    {
      id: 5,
      title: { rendered: "Sustainable Fashion: Eco-Friendly Options for Bulk Orders" },
      excerpt: {
        rendered:
          "Explore sustainable fabric options and eco-certifications available for wholesale apparel.",
      },
      slug: "sustainable-fashion-bulk-orders",
      date: "2024-11-18T00:00:00",
    },
    {
      id: 6,
      title: { rendered: "Private Label Apparel: Building Your Clothing Brand" },
      excerpt: {
        rendered:
          "A step-by-step guide to launching a private label clothing line with a manufacturing partner.",
      },
      slug: "private-label-apparel-guide",
      date: "2024-10-22T00:00:00",
    },
  ];

  const displayPosts = posts.length > 0 ? posts : fallbackPosts;

  return (
    <div className="pt-28 pb-20">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-6 text-center mb-16">
        <span className="text-gold text-xs uppercase tracking-[0.2em]">
          Journal
        </span>
        <h1 className="mt-3 font-heading text-4xl md:text-5xl text-dark">
          Insights &amp; Resources
        </h1>
        <p className="mt-4 text-warm-gray leading-relaxed max-w-2xl mx-auto">
          Tips, guides, and industry insights for apparel brands, retailers, and
          entrepreneurs.
        </p>
      </div>

      {/* Posts grid */}
      <div ref={gridRef} className="max-w-5xl mx-auto px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPosts.map((post) => (
              <article key={post.id} className="journal-card group cursor-pointer">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  {/* Thumbnail placeholder */}
                  <div className="aspect-[16/10] bg-light-gray overflow-hidden">
                    {(post as any)._embedded?.["wp:featuredmedia"]?.[0]
                      ?.source_url ? (
                      <Image
                        src={
                          (post as any)._embedded["wp:featuredmedia"][0]
                            .source_url
                        }
                        alt={
                          (post as any)._embedded["wp:featuredmedia"][0]
                            .alt_text || post.title.rendered
                        }
                        width={400}
                        height={250}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-warm-gray/30">
                        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <time className="text-xs text-warm-gray uppercase tracking-wider">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <h2 className="mt-2 font-heading text-lg text-dark leading-snug group-hover:text-gold transition-colors line-clamp-2">
                      {post.title.rendered}
                    </h2>
                    <p
                      className="mt-2 text-sm text-warm-gray leading-relaxed line-clamp-3"
                      dangerouslySetInnerHTML={{
                        __html: post.excerpt.rendered,
                      }}
                    />
                    <span className="mt-4 inline-block text-xs text-gold uppercase tracking-wider group-hover:gap-2 transition-all">
                      Read More →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

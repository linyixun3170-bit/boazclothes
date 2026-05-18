"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { faqSchema } from "./SchemaOrg";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const defaultFaqs = [
  {
    q: "What is the minimum order quantity (MOQ)?",
    a: "Our MOQ starts at 50 pieces per style and color. But we routinely scale — our largest single order was 30,000 pieces. Whether you are testing the market or restocking a bestseller, we meet you where you are.",
  },
  {
    q: "How fast can you produce and ship?",
    a: "Stock + custom orders: 5-day standard turnaround. Rush orders: 3 days when needed. Large-volume custom orders follow contracted timelines. One of our Amazon clients places 4 orders per week, averaging 3,000+ pieces each — and we have never missed a window.",
  },
  {
    q: "Do you offer custom labels, packaging, and branding?",
    a: "Yes — neck labels, hang tags, poly bags, custom boxes, and garment finishing. We also offer three curated package tiers: an entry-level 'traffic builder' set, a balanced 'quality-value' set, and a premium 'high-margin' set. Each tier is transparently priced so you know exactly what you are paying for.",
  },
  {
    q: "What is your price range?",
    a: "Our blank garment prices range from ¥6 for lightweight basic tees to ¥70 for heavyweight premium hoodies. Processing, customization, and logistics are quoted separately — so you see exactly where every dollar goes. No hidden factory real estate costs passed on to you.",
  },
  {
    q: "Can you develop a completely custom garment from a tech pack or sketch?",
    a: "Absolutely. Send us a tech pack, a reference sample, or even a rough sketch. Our pattern team — trained the old way, hand-to-hand — will produce a counter-sample for your approval. From clean basics to vintage washes to full custom builds.",
  },
  {
    q: "Who are your typical clients?",
    a: "Independent DTC brands, Amazon sellers (including top-tier accounts), brick-and-mortar stores, event companies needing team uniforms, training institutions, trading companies, and custom apparel brands. Our patterns are optimized for international body types — clients consistently tell us: 'The fit is exactly right for our foreign customers.'",
  },
  {
    q: "Where are you located?",
    a: "Our online sales team is based in Hangzhou. Our production bases are in Zhejiang and Hebei — strategically located to minimize overhead and maximize speed. We do not charge you for expensive downtown real estate.",
  },
  {
    q: "What makes BOAZ different from other factories?",
    a: "We are not a trading company. We are the production line. Three generations of hands-on manufacturing means we control every stitch, every checkpoint, every delivery window. Clients tell us four things consistently: 'This price for this quality?' 'True source factory.' 'Fast.' 'The fit works for our market.'",
  },
];

interface FAQProps {
  faqs?: { q: string; a: string }[];
  title?: string;
  subtitle?: string;
}

export default function FAQ({
  faqs = defaultFaqs,
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about working with us.",
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          scrollTrigger: { trigger: titleRef.current, start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".faq-item",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* FAQPage Schema for GEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(faqs)),
        }}
      />

      <section ref={sectionRef} className="py-20 md:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div ref={titleRef} className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-gold text-xs uppercase tracking-[0.2em]">
              FAQ
            </span>
            <h2 className="mt-3 font-heading text-3xl md:text-4xl text-dark">
              {title}
            </h2>
            <p className="mt-4 text-warm-gray leading-relaxed">{subtitle}</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className="faq-item border border-light-gray rounded-xl overflow-hidden transition-colors duration-300 hover:border-gold/30"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between px-5 md:px-6 py-4 md:py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-heading text-base md:text-lg text-dark pr-4">
                      {faq.q}
                    </span>
                    <span
                      className={`shrink-0 w-5 h-5 flex items-center justify-center transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-gold"
                      >
                        <path d="M8 2v12M2 8h12" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="px-5 md:px-6 pb-4 md:pb-5 text-sm text-warm-gray leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

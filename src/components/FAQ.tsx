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
    q: "What is the minimum order quantity (MOQ) for custom t-shirts?",
    a: "Our MOQ starts at just 50 pieces per style for blank wholesale orders. For custom manufacturing (printing, tagging, packaging), the MOQ is 200 units per design. Contact us for smaller trial orders.",
  },
  {
    q: "How long does sample production take?",
    a: "Sample production typically takes 5–7 business days. We offer free samples for wholesale partners — you only pay shipping. Express samples available within 48 hours for urgent timelines.",
  },
  {
    q: "Can I get custom labels and packaging?",
    a: "Absolutely. We offer full private label services including custom neck labels, care labels, hang tags, poly bags, and retail-ready packaging. Your brand, your presentation.",
  },
  {
    q: "What fabrics do you use?",
    a: "We use premium combed ring-spun cotton (180–260gsm), cotton-poly blends, and eco-friendly options like organic cotton and recycled polyester. All fabrics are OEKO-TEX Standard 100 certified.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes, we ship to over 50 countries worldwide via DHL, FedEx, and sea freight. Typical delivery: 7–15 days for air freight, 25–40 days for sea freight. Free shipping available on orders over $2,000.",
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

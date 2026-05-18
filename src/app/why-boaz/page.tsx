"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Stats from "@/components/Stats";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const milestones = [
  { year: "2010", event: "BOAZ founded with a mission to produce premium blank apparel from our Guangzhou facility." },
  { year: "2013", event: "Expanded to international wholesale distribution — first export orders to Southeast Asia and Europe." },
  { year: "2016", event: "Launched custom manufacturing division for private label and custom print clients." },
  { year: "2019", event: "Surpassed 500,000 garments produced annually. Expanded facility to 50,000 sq ft." },
  { year: "2021", event: "Opened eco-friendly production wing with solar power and water recycling systems." },
  { year: "2024", event: "5,000+ wholesale partners worldwide across 50+ countries. Daily capacity: 50,000+ garments." },
  { year: "2025", event: "Launched BOAZ digital platform for seamless wholesale ordering and sample requests." },
];

const stats = [
  { number: "10+", label: "Years of Excellence" },
  { number: "5,000+", label: "Wholesale Partners" },
  { number: "1M+", label: "Garments Produced" },
  { number: "50+", label: "Countries Shipped To" },
];

const values = [
  {
    title: "Quality Without Compromise",
    desc: "Every garment meets rigorous quality standards. We inspect fabric, test construction, and guarantee consistency across every batch — from 50 to 50,000 units.",
  },
  {
    title: "Transparent Partnership",
    desc: "Honest pricing, clear communication, and on-time delivery. No hidden fees, no excuses. We do what we say.",
  },
  {
    title: "Scale With You",
    desc: "Whether you're a startup ordering 50 pieces or a national brand needing 10,000 — our production line flexes with your growth.",
  },
  {
    title: "Craftsmanship at Every Stitch",
    desc: "Decades of garment manufacturing expertise inform every seam, finish, and fabric choice. We don't cut corners.",
  },
];

const qualityChecks = [
  { label: "Fabric Inspection", desc: "100% incoming fabric checked for defects, shrinkage, and color accuracy." },
  { label: "In-Process QC", desc: "Every production stage monitored — cutting, sewing, finishing." },
  { label: "Final Inspection", desc: "AQL 2.5 standard sampling inspection before shipment." },
  { label: "Pre-Shipment Testing", desc: "Wash testing, colorfastness, and dimensional stability checks." },
];

export default function WhyBoazPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const qualityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.children || [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: "power2.out" }
      );

      gsap.fromTo(
        ".timeline-item",
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: storyRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".quality-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: qualityRef.current,
            start: "top 80%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="pt-28 pb-20">
      {/* Hero */}
      <div ref={headerRef} className="max-w-4xl mx-auto px-6 text-center mb-20">
        <span className="text-gold text-xs uppercase tracking-[0.2em]">
          Our Story
        </span>
        <h1 className="mt-3 font-heading text-4xl md:text-5xl text-dark">
          Why BOAZ?
        </h1>
        <p className="mt-4 text-warm-gray leading-relaxed max-w-2xl mx-auto">
          We&apos;re not just a supplier — we&apos;re your manufacturing
          partner. Here&apos;s what 10+ years of experience looks like.
        </p>
      </div>

      {/* Stats */}
      <section className="py-16 bg-dark text-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading text-4xl md:text-5xl text-gold">
                  {stat.number}
                </div>
                <div className="mt-2 text-sm text-cream/60 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline / Story */}
      <section ref={storyRef} className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="mb-16 max-w-2xl">
            <h2 className="font-heading text-3xl md:text-4xl text-dark mb-4">
              From Small Workshop to Global Partner
            </h2>
            <p className="text-warm-gray leading-relaxed">
              BOAZ started in 2010 with a simple belief: quality apparel
              shouldn&apos;t be reserved for big brands. Over a decade later,
              we&apos;ve grown into a trusted manufacturing partner for
              thousands of brands worldwide — while keeping that same
              commitment to quality, integrity, and partnership.
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((m) => (
              <div key={m.year} className="timeline-item flex gap-6">
                <div className="shrink-0 w-20 text-right">
                  <span className="font-heading text-xl text-gold">
                    {m.year}
                  </span>
                </div>
                <div className="relative pl-6 pb-8 border-l border-gold/30">
                  <span className="absolute left-[-4px] top-[6px] w-2 h-2 rounded-full bg-gold" />
                  <p className="text-sm text-warm-gray leading-relaxed pt-1">
                    {m.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Control */}
      <section ref={qualityRef} className="py-20 bg-cream">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-gold text-xs uppercase tracking-[0.2em]">
              Quality Assurance
            </span>
            <h2 className="mt-3 font-heading text-3xl md:text-4xl text-dark">
              Every Stitch Inspected
            </h2>
            <p className="mt-4 text-warm-gray leading-relaxed max-w-2xl mx-auto">
              Our 4-stage QC process ensures every garment meets your
              specifications — batch after batch.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {qualityChecks.map((qc) => (
              <div
                key={qc.label}
                className="quality-item bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-light-gray"
              >
                <div className="w-10 h-10 bg-gold/20 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-5 h-5 text-gold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-heading text-lg text-dark mb-2">
                  {qc.label}
                </h3>
                <p className="text-sm text-warm-gray leading-relaxed">
                  {qc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl text-dark">
              Our Values
            </h2>
            <p className="mt-3 text-warm-gray">
              The principles that guide every garment we make.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((v) => (
              <div
                key={v.title}
                className="p-8 rounded-2xl bg-cream border border-light-gray"
              >
                <h3 className="font-heading text-2xl text-dark mb-3">
                  {v.title}
                </h3>
                <p className="text-sm text-warm-gray leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ section with GEO schema */}
      <FAQ
        faqs={[
          {
            q: "What is the minimum order quantity (MOQ) for custom t-shirts?",
            a: "Our MOQ starts at just 50 pieces per style for blank wholesale orders. For custom manufacturing (printing, private label), the MOQ is 200 units per design. Contact us for smaller trial orders.",
          },
          {
            q: "How do I request samples?",
            a: "Samples are free for wholesale partners — you only pay shipping. Simply reach out via our contact form or WhatsApp, tell us which products you're interested in, and we'll send samples within 5-7 business days.",
          },
          {
            q: "Can you match specific Pantone colors?",
            a: "Yes. We offer custom dyeing services to match any Pantone color. Minimum 200 units per color for custom dyeing.",
          },
          {
            q: "What quality certifications do you have?",
            a: "BOAZ is OEKO-TEX Standard 100 certified, ISO 9001 certified, BSCI compliant, and SEDEX registered. All fabrics are tested for harmful substances and quality standards.",
          },
          {
            q: "What is the typical production lead time?",
            a: "Blank wholesale orders: 7-15 days. Custom manufacturing: 15-25 days depending on complexity. Rush orders available for an additional fee.",
          },
        ]}
      />

      {/* CTA */}
      <CTASection
        title="Ready to Partner with BOAZ?"
        subtitle="Whether you need 50 samples or 50,000 units, we're here to help. Start with a free consultation and sample pack."
        primaryLabel="Get Free Quote"
        primaryHref="/contact"
      />
    </div>
  );
}

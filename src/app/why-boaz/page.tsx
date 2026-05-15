"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const milestones = [
  { year: "2010", event: "Boaz founded with a mission to produce premium blank apparel." },
  { year: "2013", event: "Expanded to international wholesale distribution." },
  { year: "2016", event: "Launched custom manufacturing division." },
  { year: "2019", event: "Surpassed 500,000 garments produced annually." },
  { year: "2021", event: "Opened eco-friendly production facility." },
  { year: "2024", event: "5,000+ wholesale partners worldwide." },
];

const stats = [
  { number: "10+", label: "Years of Excellence" },
  { number: "5,000+", label: "Wholesale Partners" },
  { number: "1M+", label: "Garments Produced" },
  { number: "50+", label: "Countries Shipped To" },
];

const values = [
  {
    title: "Quality",
    desc: "Every garment meets rigorous quality standards. We inspect, test, and guarantee consistency across every batch.",
  },
  {
    title: "Integrity",
    desc: "Honest pricing, transparent communication, and on-time delivery. We do what we say.",
  },
  {
    title: "Partnership",
    desc: "We invest in your success with responsive support, samples, and flexible minimums.",
  },
  {
    title: "Craftsmanship",
    desc: "Decades of garment manufacturing expertise inform every stitch, seam, and finish.",
  },
];

export default function WhyBoazPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.children || [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: "power2.out" }
      );

      gsap.fromTo(
        ".stat-item",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
          },
        }
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
          Why Boaz?
        </h1>
        <p className="mt-4 text-warm-gray leading-relaxed max-w-2xl mx-auto">
          We&apos;re not just a supplier — we&apos;re a partner in your
          brand&apos;s growth. Here&apos;s what sets us apart.
        </p>
      </div>

      {/* Stats */}
      <section ref={statsRef} className="py-16 bg-dark text-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-item text-center">
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

      {/* Story & timeline */}
      <section ref={storyRef} className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="mb-16 max-w-2xl">
            <h2 className="font-heading text-3xl md:text-4xl text-dark mb-4">
              From Small Workshop to Global Partner
            </h2>
            <p className="text-warm-gray leading-relaxed">
              Boaz started with a simple belief: quality apparel shouldn&apos;t
              be reserved for big brands. Over a decade later, we&apos;ve grown
              into a trusted manufacturing partner for thousands of brands
              worldwide — while keeping that same commitment to quality,
              integrity, and partnership.
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((m, i) => (
              <div key={m.year} className="timeline-item flex gap-6">
                <div className="shrink-0 w-20 text-right">
                  <span className="font-heading text-xl text-gold">{m.year}</span>
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

      {/* Values */}
      <section className="py-20 bg-cream">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl text-dark">
              Our Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((v) => (
              <div key={v.title} className="bg-white p-8 rounded-2xl shadow-sm">
                <h3 className="font-heading text-2xl text-dark mb-3">{v.title}</h3>
                <p className="text-sm text-warm-gray leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-dark text-cream">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl md:text-4xl">
            Let&apos;s Build Something Together
          </h2>
          <p className="mt-4 text-cream/60 leading-relaxed">
            Ready to partner with a manufacturer who cares as much about your
            brand as you do?
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/wholesale"
              className="px-8 py-3.5 bg-gold text-dark text-sm uppercase tracking-widest rounded-full hover:bg-cream hover:text-dark transition-all duration-300"
            >
              Browse Products
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 border border-cream/20 text-cream text-sm uppercase tracking-widest rounded-full hover:border-gold hover:text-gold transition-all duration-300"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

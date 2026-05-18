"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";

export default function WhyBoazPage() {
  return (
    <>
      <CustomCursor />
      <SmoothScroll>
        <Navbar />
        <main className="pt-28 pb-20">
          {/* Hero */}
          <div className="max-w-[1400px] mx-auto section-padding mb-20">
            <span className="text-caption text-warm-gray mb-4 block">
              Why Boaz
            </span>
            <h1 className="text-display-lg text-dark max-w-3xl">
              We Are the{" "}
              <span className="italic">Production Line</span>
            </h1>
            <p className="text-body-xl text-warm-gray mt-8 max-w-2xl">
              Three generations of hands-on manufacturing. Two production bases.
              One uncompromising standard. We do not rent expensive real estate
              and pass that cost to you.
            </p>
          </div>

          {/* Trust Grid */}
          <div className="max-w-[1400px] mx-auto section-padding mb-32">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "True Source Factory",
                  desc: "We own the production line from fabric sourcing to finished product. No middlemen, no markup padding.",
                },
                {
                  title: "Speed You Can Trust",
                  desc: "5-day standard turnaround. Rush orders in 3 days. 30,000-piece single orders delivered on contracted timelines.",
                },
                {
                  title: "Fit for Foreign Markets",
                  desc: "Our patterns are optimized for international body types. Clients consistently tell us: 'The fit is exactly right.'",
                },
              ].map((item) => (
                <div key={item.title} className="bg-light-gray p-8 md:p-10">
                  <h3 className="font-heading text-2xl text-dark mb-4">
                    {item.title}
                  </h3>
                  <p className="text-body-lg text-warm-gray leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Process */}
          <div className="max-w-[1400px] mx-auto section-padding mb-32">
            <div className="text-center mb-16">
              <h2 className="text-display-md text-dark">
                How We <span className="italic">Work</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Inquiry",
                  desc: "Send your tech pack, sketch, or reference sample. We'll review and reply within 24 hours.",
                },
                {
                  step: "02",
                  title: "Sampling",
                  desc: "We produce a counter-sample for your approval. Adjustments until it's exactly right.",
                },
                {
                  step: "03",
                  title: "Production",
                  desc: "Full-scale manufacturing with quality control at every checkpoint. Real-time updates.",
                },
                {
                  step: "04",
                  title: "Delivery",
                  desc: "Air freight (7–15 days) or sea freight (25–40 days). Customs paperwork handled.",
                },
              ].map((item) => (
                <div key={item.step} className="relative">
                  <span className="font-heading text-5xl text-stone/60">
                    {item.step}
                  </span>
                  <h3 className="font-heading text-xl text-dark mt-4 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-body-lg text-warm-gray">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="max-w-[1400px] mx-auto section-padding">
            <div className="bg-dark p-12 md:p-20 text-center">
              <h2 className="text-display-md text-cream mb-6">
                Ready to Start?
              </h2>
              <p className="text-body-lg text-cream/60 mb-10 max-w-lg mx-auto">
                Get a free quote with pricing, lead times, and sample options
                within 24 hours.
              </p>
              <Link
                href="/contact/"
                className="btn-capsule btn-capsule-light"
              >
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

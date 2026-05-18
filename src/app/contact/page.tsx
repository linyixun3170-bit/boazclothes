"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import HoneypotForm from "@/components/HoneypotForm";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const inquiryTypes = [
  { value: "wholesale", label: "Wholesale Pricing" },
  { value: "custom", label: "Custom Manufacturing" },
  { value: "sample", label: "Request Samples" },
  { value: "private-label", label: "Private Label Inquiry" },
  { value: "partnership", label: "Partnership Opportunity" },
  { value: "other", label: "Other" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    wechat: "",
    inquiryType: "wholesale",
    quantity: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent, honeypot: string) => {
    e.preventDefault();
    if (honeypot) { setSubmitted(true); return; }
    setSending(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please email us directly at hello@boaz.apparel");
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <>
        <CustomCursor />
        <SmoothScroll>
          <Navbar />
          <div className="pt-28 pb-20 min-h-screen flex items-center justify-center">
            <div className="text-center max-w-lg mx-auto px-6">
              <div className="w-16 h-16 bg-dark/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="font-heading text-3xl text-dark mb-4">
                Thank You
              </h1>
              <p className="text-warm-gray leading-relaxed mb-8">
                We&apos;ve received your inquiry and will respond within 24 hours.
                For urgent requests, reach out via{" "}
                <a href="https://wa.me/8618868798631" target="_blank" rel="noopener noreferrer" className="text-dark underline">
                  WhatsApp
                </a>{" "}
                or email{" "}
                <a href="mailto:hello@boaz.apparel" className="text-dark underline">
                  hello@boaz.apparel
                </a>.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: "", email: "", company: "", phone: "", wechat: "",
                    inquiryType: "wholesale", quantity: "", message: "",
                  });
                }}
                className="btn-capsule"
              >
                Send Another Inquiry
              </button>
            </div>
          </div>
          <Footer />
        </SmoothScroll>
      </>
    );
  }

  return (
    <>
      <CustomCursor />
      <SmoothScroll>
        <Navbar />
        <main className="pt-28 pb-20">
          {/* Header */}
          <div className="max-w-[1400px] mx-auto section-padding mb-16 text-center">
            <span className="text-caption text-warm-gray mb-4 block">Get In Touch</span>
            <h1 className="text-display-lg text-dark">Start Your Project</h1>
            <p className="text-body-lg text-warm-gray mt-6 max-w-2xl mx-auto">
              Tell us about your project and we&apos;ll get back to you within 24
              hours with pricing, lead times, and sample options.
            </p>
          </div>

          <div className="max-w-[1400px] mx-auto section-padding grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Form */}
            <div ref={formRef} className="lg:col-span-3">
              <HoneypotForm onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-dark mb-2">Name <span className="text-gold">*</span></label>
                      <input type="text" name="name" required value={formData.name} onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-stone rounded-none text-sm text-dark placeholder:text-warm-gray/50 focus:outline-none focus:border-dark transition-all"
                        placeholder="Your name" />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-dark mb-2">Email <span className="text-gold">*</span></label>
                      <input type="email" name="email" required value={formData.email} onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-stone rounded-none text-sm text-dark placeholder:text-warm-gray/50 focus:outline-none focus:border-dark transition-all"
                        placeholder="your@email.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-dark mb-2">Company</label>
                      <input type="text" name="company" value={formData.company} onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-stone rounded-none text-sm text-dark placeholder:text-warm-gray/50 focus:outline-none focus:border-dark transition-all"
                        placeholder="Your brand or company" />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-dark mb-2">Phone / WhatsApp</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-stone rounded-none text-sm text-dark placeholder:text-warm-gray/50 focus:outline-none focus:border-dark transition-all"
                        placeholder="+1 (555) 000-0000" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-dark mb-2">WeChat (Optional)</label>
                    <input type="text" name="wechat" value={formData.wechat} onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-stone rounded-none text-sm text-dark placeholder:text-warm-gray/50 focus:outline-none focus:border-dark transition-all"
                      placeholder="Your WeChat ID" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-dark mb-2">Inquiry Type</label>
                      <select name="inquiryType" value={formData.inquiryType} onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-stone rounded-none text-sm text-dark focus:outline-none focus:border-dark transition-all">
                        {inquiryTypes.map((t) => (<option key={t.value} value={t.value}>{t.label}</option>))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-dark mb-2">Est. Quantity</label>
                      <input type="text" name="quantity" value={formData.quantity} onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-stone rounded-none text-sm text-dark placeholder:text-warm-gray/50 focus:outline-none focus:border-dark transition-all"
                        placeholder="e.g. 100–500 units" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-dark mb-2">Project Details <span className="text-gold">*</span></label>
                    <textarea name="message" required rows={5} value={formData.message} onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-stone rounded-none text-sm text-dark placeholder:text-warm-gray/50 focus:outline-none focus:border-dark transition-all resize-none"
                      placeholder="Tell us about your project — products, quantities, timeline, customization needs..." />
                  </div>

                  {error && (
                    <p className="text-sm text-red-600 bg-red-50 px-4 py-3">{error}</p>
                  )}

                  <button type="submit" disabled={sending}
                    className="btn-capsule w-full sm:w-auto disabled:opacity-50">
                    {sending ? "Sending..." : "Send Inquiry"}
                  </button>
                </div>
              </HoneypotForm>
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-2">
              <div className="sticky top-28 space-y-8">
                <div className="bg-light-gray p-8">
                  <h3 className="font-heading text-xl text-dark mb-6">How to Reach Us</h3>
                  <div className="space-y-5">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-warm-gray mb-1">Email</p>
                      <a href="mailto:hello@boaz.apparel" className="text-sm text-dark hover:text-gold transition-colors">
                        hello@boaz.apparel
                      </a>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-warm-gray mb-1">WhatsApp</p>
                      <a href="https://wa.me/8618868798631" target="_blank" rel="noopener noreferrer"
                        className="text-sm text-dark hover:text-gold transition-colors">
                        +86 188 6879 8631 (Andrew)
                      </a>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-warm-gray mb-1">WeChat</p>
                      <p className="text-sm text-dark">Richel</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-warm-gray mb-1">Location</p>
                      <p className="text-sm text-dark">Hangzhou / Zhejiang &amp; Hebei, China</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-stone p-8">
                  <h3 className="text-[11px] uppercase tracking-wider text-warm-gray mb-4">Quick Links</h3>
                  <ul className="space-y-3">
                    {[
                      { label: "Browse Products", href: "/wholesale/" },
                      { label: "Custom Manufacturing", href: "/custom/" },
                      { label: "Why Boaz?", href: "/why-boaz/" },
                    ].map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="text-sm text-dark/60 hover:text-dark transition-colors link-underline">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}

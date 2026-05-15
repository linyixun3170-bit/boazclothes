"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    inquiryType: "wholesale",
    quantity: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: "power2.out" }
      );
      gsap.fromTo(
        infoRef.current,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: "power2.out" }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    // Simulate sending
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSending(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="pt-28 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-lg mx-auto px-6">
          <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-gold"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="font-heading text-3xl text-dark mb-4">
            Thank You!
          </h1>
          <p className="text-warm-gray leading-relaxed mb-8">
            We&apos;ve received your inquiry and will get back to you within
            24 hours. For urgent requests, please email us directly at{" "}
            <a
              href="mailto:info@boazclothes.com"
              className="text-gold underline"
            >
              info@boazclothes.com
            </a>
            .
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-3 bg-dark text-cream text-sm uppercase tracking-widest rounded-full hover:bg-gold hover:text-dark transition-all"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 min-h-screen">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-16">
        <span className="text-gold text-xs uppercase tracking-[0.2em]">
          Get In Touch
        </span>
        <h1 className="mt-3 font-heading text-4xl md:text-5xl text-dark">
          Let&apos;s Talk
        </h1>
        <p className="mt-4 text-warm-gray leading-relaxed max-w-2xl mx-auto">
          Ready to start your wholesale or custom project? Fill out the form
          below and our team will get back to you within 24 hours.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Form */}
        <div ref={formRef} className="lg:col-span-3">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs uppercase tracking-wider text-dark mb-2"
                >
                  Name <span className="text-gold">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-light-gray rounded-xl text-sm text-dark placeholder:text-warm-gray/50 focus:outline-none focus:border-gold transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs uppercase tracking-wider text-dark mb-2"
                >
                  Email <span className="text-gold">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-light-gray rounded-xl text-sm text-dark placeholder:text-warm-gray/50 focus:outline-none focus:border-gold transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Company & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="company"
                  className="block text-xs uppercase tracking-wider text-dark mb-2"
                >
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-light-gray rounded-xl text-sm text-dark placeholder:text-warm-gray/50 focus:outline-none focus:border-gold transition-colors"
                  placeholder="Your company name"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs uppercase tracking-wider text-dark mb-2"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-light-gray rounded-xl text-sm text-dark placeholder:text-warm-gray/50 focus:outline-none focus:border-gold transition-colors"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            {/* Inquiry type */}
            <div>
              <label
                htmlFor="inquiryType"
                className="block text-xs uppercase tracking-wider text-dark mb-2"
              >
                Inquiry Type
              </label>
              <select
                id="inquiryType"
                name="inquiryType"
                value={formData.inquiryType}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-light-gray rounded-xl text-sm text-dark focus:outline-none focus:border-gold transition-colors"
              >
                <option value="wholesale">Wholesale Pricing</option>
                <option value="custom">Custom Manufacturing</option>
                <option value="sample">Request Samples</option>
                <option value="partnership">Partnership Inquiry</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label
                htmlFor="quantity"
                className="block text-xs uppercase tracking-wider text-dark mb-2"
              >
                Estimated Quantity
              </label>
              <input
                type="text"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-light-gray rounded-xl text-sm text-dark placeholder:text-warm-gray/50 focus:outline-none focus:border-gold transition-colors"
                placeholder="e.g. 100-500 units"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-xs uppercase tracking-wider text-dark mb-2"
              >
                Message <span className="text-gold">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-light-gray rounded-xl text-sm text-dark placeholder:text-warm-gray/50 focus:outline-none focus:border-gold transition-colors resize-none"
                placeholder="Tell us about your project, products, quantities, and timeline..."
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={sending}
              className="w-full sm:w-auto px-10 py-3.5 bg-dark text-cream text-sm uppercase tracking-widest rounded-full hover:bg-gold hover:text-dark transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? "Sending..." : "Send Inquiry"}
            </button>
          </form>
        </div>

        {/* Contact info sidebar */}
        <div ref={infoRef} className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-8 shadow-sm space-y-8">
            <div>
              <h3 className="text-xs uppercase tracking-wider text-gold mb-2">
                Email
              </h3>
              <a
                href="mailto:info@boazclothes.com"
                className="text-dark hover:text-gold transition-colors"
              >
                info@boazclothes.com
              </a>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wider text-gold mb-2">
                Response Time
              </h3>
              <p className="text-sm text-warm-gray">
                We respond within 24 hours on business days. For urgent
                inquiries, please mark your subject line as &quot;URGENT&quot;.
              </p>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wider text-gold mb-2">
                Minimum Orders
              </h3>
              <p className="text-sm text-warm-gray">
                Wholesale: 50 units per style. Custom manufacturing: 200 units
                per design. Contact us for smaller quantities.
              </p>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wider text-gold mb-2">
                Shipping
              </h3>
              <p className="text-sm text-warm-gray">
                We ship worldwide via major carriers. Lead times vary by order
                size and customization requirements.
              </p>
            </div>

            {/* Quick links */}
            <div className="pt-6 border-t border-light-gray">
              <h3 className="text-xs uppercase tracking-wider text-gold mb-3">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {[
                  { label: "Browse Products", href: "/wholesale" },
                  { label: "Custom Orders", href: "/custom" },
                  { label: "Our Story", href: "/why-boaz" },
                  { label: "Journal", href: "/journal" },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-dark/70 hover:text-gold transition-colors"
                    >
                      {link.label} →
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { contactInfo, socialLinks } from "@/lib/images";

export default function Footer() {
  return (
    <footer className="bg-dark text-cream/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="font-heading text-2xl tracking-wider text-cream"
            >
              BOAZ
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-cream/60 max-w-xs">
              Premium wholesale apparel and custom manufacturing from
              Guangzhou, China. Quality that speaks for your brand.
            </p>
            {/* Badges */}
            <div className="mt-6 flex flex-wrap gap-2">
              {["OEKO-TEX®", "ISO 9001", "BSCI"].map((badge) => (
                <span
                  key={badge}
                  className="text-[10px] px-2.5 py-1 border border-cream/10 rounded-full text-cream/40"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-cream text-sm uppercase tracking-widest mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Products", href: "/wholesale" },
                { label: "Custom Manufacturing", href: "/custom" },
                { label: "Why BOAZ", href: "/why-boaz" },
                { label: "Journal", href: "/journal" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/60 hover:text-cream transition-colors link-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-cream text-sm uppercase tracking-widest mb-4">
              Products
            </h4>
            <ul className="space-y-2.5">
              {[
                "T-Shirts",
                "Hoodies",
                "Tank Tops",
                "Long Sleeves",
                "Polos",
                "Kids Apparel",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`/wholesale?search=${item.toLowerCase()}`}
                    className="text-sm text-cream/60 hover:text-cream transition-colors link-underline"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-cream text-sm uppercase tracking-widest mb-4">
              Get In Touch
            </h4>
            <ul className="space-y-3">
              <li className="text-sm text-cream/60">
                <span className="block text-[10px] uppercase tracking-wider text-cream/40 mb-1">
                  Email
                </span>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="hover:text-gold transition-colors"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li className="text-sm text-cream/60">
                <span className="block text-[10px] uppercase tracking-wider text-cream/40 mb-1">
                  WhatsApp
                </span>
                <a
                  href={contactInfo.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  Chat on WhatsApp
                </a>
              </li>
              <li className="text-sm text-cream/60">
                <span className="block text-[10px] uppercase tracking-wider text-cream/40 mb-1">
                  WeChat
                </span>
                {contactInfo.wechat}
              </li>
              <li className="text-sm text-cream/60">
                <span className="block text-[10px] uppercase tracking-wider text-cream/40 mb-1">
                  Location
                </span>
                {contactInfo.address}
              </li>
            </ul>

            <Link
              href="/contact"
              className="inline-block mt-6 px-6 py-2.5 border border-gold text-gold text-sm uppercase tracking-wider rounded-full hover:bg-gold hover:text-dark transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream/40">
            &copy; {new Date().getFullYear()} BOAZ Apparel. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            {[
              { name: "Instagram", url: socialLinks.instagram.url },
              { name: "Facebook", url: socialLinks.facebook.url },
              { name: "TikTok", url: socialLinks.tiktok.url },
            ].map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-cream/40 hover:text-cream/60 transition-colors uppercase tracking-wider"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

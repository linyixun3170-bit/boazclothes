import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark text-cream/60">
      <div className="max-w-[1400px] mx-auto section-padding py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link
              href="/"
              className="font-heading text-3xl tracking-[0.15em] text-cream"
            >
              BOAZ
            </Link>
            <p className="mt-6 text-sm leading-relaxed text-cream/40 max-w-xs">
              Premium wholesale apparel and custom manufacturing from
              China. Based in Hangzhou with production in Zhejiang &amp; Hebei.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {["OEKO-TEX®", "ISO 9001", "BSCI"].map((badge) => (
                <span
                  key={badge}
                  className="text-[10px] px-3 py-1.5 border border-cream/10 rounded-full text-cream/30"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-2">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-cream/40 mb-5">
              Navigate
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Products", href: "/wholesale/" },
                { label: "Customize", href: "/custom/" },
                { label: "About", href: "/why-boaz/" },
                { label: "Contact", href: "/contact/" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/50 hover:text-cream transition-colors link-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div className="md:col-span-2">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-cream/40 mb-5">
              Products
            </h4>
            <ul className="space-y-3">
              {["T-Shirts", "Hoodies", "Tank Tops", "Long Sleeves"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="/wholesale/"
                      className="text-sm text-cream/50 hover:text-cream transition-colors link-underline"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-cream/40 mb-5">
              Get In Touch
            </h4>
            <ul className="space-y-4">
              <li>
                <span className="text-[10px] uppercase tracking-wider text-cream/30 block mb-1">
                  Email
                </span>
                <a
                  href="mailto:hello@boaz.apparel"
                  className="text-sm text-cream/60 hover:text-cream transition-colors"
                >
                  hello@boaz.apparel
                </a>
              </li>
              <li>
                <span className="text-[10px] uppercase tracking-wider text-cream/30 block mb-1">
                  WhatsApp
                </span>
                <a
                  href="https://wa.me/8618868798631"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cream/60 hover:text-cream transition-colors"
                >
                  +86 188 6879 8631 (Andrew)
                </a>
              </li>
              <li>
                <span className="text-[10px] uppercase tracking-wider text-cream/30 block mb-1">
                  WeChat
                </span>
                <span className="text-sm text-cream/60">Richel</span>
              </li>
              <li>
                <span className="text-[10px] uppercase tracking-wider text-cream/30 block mb-1">
                  Location
                </span>
                <span className="text-sm text-cream/60">
                  Hangzhou / Zhejiang &amp; Hebei, China
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 pt-8 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-cream/30 tracking-wider">
            &copy; {new Date().getFullYear()} Boaz. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Instagram", "Facebook", "TikTok"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-[11px] text-cream/30 hover:text-cream/60 transition-colors uppercase tracking-wider"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark text-cream/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="font-heading text-2xl tracking-wider text-cream">
              BOAZ
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-cream/60 max-w-xs">
              Premium wholesale apparel and custom manufacturing since 2010.
              Quality that speaks for itself.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-cream text-sm uppercase tracking-widest mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Wholesale", href: "/wholesale" },
                { label: "Custom", href: "/custom" },
                { label: "Why Boaz", href: "/why-boaz" },
                { label: "Journal", href: "/journal" },
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
              {["T-Shirts", "Hoodies", "Tank Tops", "Long Sleeves", "Custom"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={`/wholesale?search=${item.toLowerCase()}`}
                      className="text-sm text-cream/60 hover:text-cream transition-colors link-underline"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-cream text-sm uppercase tracking-widest mb-4">
              Get In Touch
            </h4>
            <ul className="space-y-2.5">
              <li className="text-sm text-cream/60">info@boazclothes.com</li>
              <li>
                <Link
                  href="/contact"
                  className="inline-block mt-4 px-6 py-2.5 border border-gold text-gold text-sm uppercase tracking-wider rounded-full hover:bg-gold hover:text-dark transition-all duration-300"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream/40">
            &copy; {new Date().getFullYear()} Boaz Clothes. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Instagram", "Facebook", "TikTok"].map((social) => (
              <span
                key={social}
                className="text-xs text-cream/40 hover:text-cream/60 transition-colors cursor-pointer uppercase tracking-wider"
              >
                {social}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

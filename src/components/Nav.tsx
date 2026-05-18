"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/wholesale", label: "Products" },
  { href: "/custom", label: "Custom" },
  { href: "/why-boaz", label: "Why BOAZ" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLHeadElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isHome = pathname === "/";

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream/90 backdrop-blur-md shadow-sm"
          : isHome
          ? "bg-transparent"
          : "bg-cream/80 backdrop-blur-sm"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-20">
        {/* Logo */}
        <Link
          href="/"
          className={`font-heading text-2xl tracking-wider transition-colors duration-300 ${
            scrolled || !isHome ? "text-dark" : "text-dark"
          }`}
        >
          BOAZ
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm tracking-wider uppercase transition-colors duration-300 link-underline ${
                  isActive
                    ? "text-gold"
                    : "text-dark/70 hover:text-dark"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* CTA button in nav */}
          <Link
            href="/contact"
            className="px-5 py-2 bg-dark text-cream text-xs uppercase tracking-widest rounded-full hover:bg-gold hover:text-dark transition-all duration-300"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-[1.5px] bg-dark transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-[6px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-dark transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-dark transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-[6px]" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu — fullscreen overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-20 bg-cream/98 backdrop-blur-lg z-40">
          <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-2xl tracking-wider uppercase transition-colors ${
                    isActive ? "text-gold" : "text-dark/70 hover:text-dark"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="mt-6 px-8 py-3.5 bg-dark text-cream text-sm uppercase tracking-widest rounded-full hover:bg-gold hover:text-dark transition-all"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

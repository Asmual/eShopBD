import React from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
  BadgePercent,
  Award,
  ShieldCheck,
  Headphones,
} from "lucide-react";
import Logo from "./Logo";

// Pre-footer trust features inspired by the design mockup
const TRUST_FEATURES = [
  {
    id: "best-price",
    icon: BadgePercent,
    title: "Best Price",
    subtitle: "Guaranteed savings",
  },
  {
    id: "top-quality",
    icon: Award,
    title: "Top Quality",
    subtitle: "100% genuine products",
  },
  {
    id: "secure-payment",
    icon: ShieldCheck,
    title: "Secure Payment",
    subtitle: "Encrypted & protected",
  },
  {
    id: "support-24-7",
    icon: Headphones,
    title: "24/7 Support",
    subtitle: "Always here for you",
  },
];

const CUSTOMER_SERVICE_LINKS = [
  { label: "Contact Us", href: "/contact" },
  { label: "Return Policy", href: "/return-policy" },
  { label: "Track Order", href: "/track-order" },
  { label: "Shipping Policy", href: "/shipping-policy" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "FAQ", href: "/faq" },
  { label: "Terms & Conditions", href: "/terms" },
];

const USEFUL_LINKS = [
  { label: "All Products", href: "/products" },
  { label: "About Us", href: "/about" },
  { label: "Blogs", href: "/blog" },
  { label: "Order Returns", href: "/returns" },
  { label: "Size Guide", href: "/size-guide" },
  { label: "Flash Deals", href: "/products?filter=mega-deals" },
  { label: "Site Map", href: "/sitemap" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer aria-label="eShopBD Footer" className="w-full bg-brand-surface border-t border-border-light">
      {/* 1. Pre-Footer Trust Bar (Design Inspiration) */}
      <div className="border-b border-border-light bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {TRUST_FEATURES.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="flex items-center gap-3.5 group">
                  <div className="w-12 h-12 rounded-2xl bg-brand-light flex items-center justify-center shrink-0 text-brand group-hover:bg-brand group-hover:text-white transition-all duration-300 shadow-2xs">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text-main leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs text-text-muted mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Main Footer Multi-Column Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Column 1: Brand Info & Contact (Span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <Logo size="md" />

            <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-sm">
              Your trusted online shopping store in Bangladesh. We provide the best quality products at competitive prices with rapid nationwide delivery and buyer protection.
            </p>

            <div className="space-y-2.5 pt-2 text-xs sm:text-sm text-text-main">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                <div>
                  <a
                    href="tel:+8809678123456"
                    className="font-bold hover:text-brand transition-colors"
                  >
                    09678 123 456
                  </a>
                  <div className="flex items-center gap-1.5 text-[11px] text-text-muted mt-0.5">
                    <Clock className="w-3 h-3 text-text-muted/80" />
                    <span>9:00 AM - 10:00 PM</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand shrink-0" />
                <a
                  href="mailto:support@eshopbd.com"
                  className="text-text-muted hover:text-brand transition-colors text-xs sm:text-sm"
                >
                  support@eshopbd.com
                </a>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                <span className="text-text-muted text-xs sm:text-sm leading-snug">
                  House-23, Road-12, Dhanmondi, Dhaka-1209, Bangladesh
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Customer Service (Span 3) */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-black text-text-main uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand" />
              <span>Customer Service</span>
            </h3>
            <ul className="space-y-2">
              {CUSTOMER_SERVICE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-xs sm:text-sm text-text-muted hover:text-brand transition-colors"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-text-muted/60 group-hover:text-brand group-hover:translate-x-0.5 transition-all mr-1" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Useful Links (Span 2) */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-black text-text-main uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand" />
              <span>Useful Links</span>
            </h3>
            <ul className="space-y-2">
              {USEFUL_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-xs sm:text-sm text-text-muted hover:text-brand transition-colors"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-text-muted/60 group-hover:text-brand group-hover:translate-x-0.5 transition-all mr-1" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Follow Us & Download App (Span 3) */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h3 className="text-sm font-black text-text-main uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand" />
                <span>Follow Us</span>
              </h3>
              {/* Social Media Icons */}
              <div className="flex items-center gap-2.5">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Facebook"
                  className="w-9 h-9 rounded-xl bg-white border border-border-light text-[#1877F2] hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] flex items-center justify-center transition-all duration-200 shadow-2xs hover:scale-105"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Instagram"
                  className="w-9 h-9 rounded-xl bg-white border border-border-light text-[#E4405F] hover:bg-[#E4405F] hover:text-white hover:border-[#E4405F] flex items-center justify-center transition-all duration-200 shadow-2xs hover:scale-105"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* X (formerly Twitter) */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on X"
                  className="w-9 h-9 rounded-xl bg-white border border-border-light text-text-main hover:bg-black hover:text-white hover:border-black flex items-center justify-center transition-all duration-200 shadow-2xs hover:scale-105"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Subscribe to our YouTube channel"
                  className="w-9 h-9 rounded-xl bg-white border border-border-light text-[#FF0000] hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000] flex items-center justify-center transition-all duration-200 shadow-2xs hover:scale-105"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* App Download Badges */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2.5">
                Download Our App
              </h4>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                {/* Google Play */}
                <a
                  href="https://play.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl shadow-xs transition-all hover:scale-[1.02]"
                >
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M3.609 1.814 13.792 12 3.61 22.186a2.21 2.21 0 0 1-.61-.925V2.739c.147-.36.364-.68.61-.925z"
                    />
                    <path
                      fill="#FBBC04"
                      d="m17.158 8.634-3.366 3.366 3.366 3.366 3.798-2.193a1.99 1.99 0 0 0 0-3.447l-3.798-2.092z"
                    />
                    <path
                      fill="#4285F4"
                      d="m3.609 1.814 10.183 10.186L17.158 8.634 5.378 1.834a2.26 2.26 0 0 0-1.769-.02z"
                    />
                    <path
                      fill="#34A853"
                      d="m3.609 22.186 1.769.02 11.78-6.8-3.366-3.366L3.609 22.186z"
                    />
                  </svg>
                  <div className="flex flex-col text-left leading-none">
                    <span className="text-[9px] uppercase tracking-wider text-neutral-300">
                      GET IT ON
                    </span>
                    <span className="text-xs font-bold text-white mt-0.5">
                      Google Play
                    </span>
                  </div>
                </a>

                {/* Apple App Store */}
                <a
                  href="https://apple.com/app-store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl shadow-xs transition-all hover:scale-[1.02]"
                >
                  <svg className="w-5 h-5 fill-white shrink-0" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.35-.58.66-1.09 1.73-.95 2.76.99.08 2.05-.51 2.68-1.26z" />
                  </svg>
                  <div className="flex flex-col text-left leading-none">
                    <span className="text-[9px] uppercase tracking-wider text-neutral-300">
                      Download on the
                    </span>
                    <span className="text-xs font-bold text-white mt-0.5">
                      App Store
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Copyright & Payment Methods Bar */}
      <div className="border-t border-border-light/80 bg-white/70 backdrop-blur-xs py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-muted">
            {/* Left: Copyright */}
            <p className="text-center md:text-left">
              &copy; {currentYear} <span className="font-semibold text-text-main">eShopBD</span>. All Rights Reserved.
            </p>

            {/* Center: Design Credit */}
            <p className="text-center">
              Design by{" "}
              <span className="font-bold text-brand hover:underline cursor-pointer">
                Asmual Obaidul Hoque
              </span>
            </p>

            {/* Right: Payment Gateway Badges */}
            <div className="flex items-center gap-2">
              {/* VISA Badge */}
              <div className="px-2.5 py-1 bg-white border border-border-light rounded-md text-[11px] font-black tracking-tight text-[#1A1F71] shadow-2xs">
                VISA
              </div>

              {/* MasterCard Badge */}
              <div className="px-2.5 py-1 bg-white border border-border-light rounded-md text-[11px] font-bold text-neutral-800 flex items-center gap-1 shadow-2xs">
                <span className="flex -space-x-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EB001B] inline-block opacity-90" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F79E1B] inline-block opacity-90" />
                </span>
                <span className="text-[10px]">Mastercard</span>
              </div>

              {/* bKash Badge */}
              <div className="px-2 py-1 bg-white border border-border-light rounded-md text-[11px] font-black text-[#D12053] shadow-2xs">
                bKash
              </div>

              {/* Nagad Badge */}
              <div className="px-2 py-1 bg-white border border-border-light rounded-md text-[11px] font-black text-[#F7941D] shadow-2xs">
                Nagad
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Star,
  CheckCircle2,
  Store,
  ChevronRight,
  Package,
} from "lucide-react";

interface BrandStore {
  id: string;
  name: string;
  tagline: string;
  category: string;
  rating: number;
  productsCount: number;
  positiveRate: string;
  avatarBg: string;
  link: string;
}

const BRAND_STORES: BrandStore[] = [
  {
    id: "b-1",
    name: "Sony Audio BD",
    tagline: "Official Bluetooth speakers & headphones",
    category: "Electronics",
    rating: 4.9,
    productsCount: 42,
    positiveRate: "99.2%",
    avatarBg: "bg-neutral-900 text-white",
    link: "/electronics",
  },
  {
    id: "b-2",
    name: "Apex Tech Gadgets",
    tagline: "Fast PD chargers & high capacity power banks",
    category: "Gadgets",
    rating: 4.9,
    productsCount: 34,
    positiveRate: "99.0%",
    avatarBg: "bg-emerald-700 text-white",
    link: "/electronics",
  },
  {
    id: "b-3",
    name: "Heritage Silk Mills",
    tagline: "Handcrafted kurti sets & festive panjabis",
    category: "Fashion",
    rating: 4.9,
    productsCount: 52,
    positiveRate: "99.4%",
    avatarBg: "bg-purple-700 text-white",
    link: "/products?category=women",
  },
  {
    id: "b-4",
    name: "Zebronics Theater",
    tagline: "Multi-channel 2.1 BT soundbars & audio",
    category: "Electronics",
    rating: 4.8,
    productsCount: 28,
    positiveRate: "98.5%",
    avatarBg: "bg-blue-800 text-white",
    link: "/electronics",
  },
  {
    id: "b-5",
    name: "KiddoCraft STEM",
    tagline: "Montessori wooden toys & robotic block sets",
    category: "Kids & Toys",
    rating: 4.8,
    productsCount: 38,
    positiveRate: "98.8%",
    avatarBg: "bg-amber-600 text-white",
    link: "/toys",
  },
  {
    id: "b-6",
    name: "Urban Fit Menswear",
    tagline: "Premium combed cotton oxford shirts & chinos",
    category: "Men's Fashion",
    rating: 4.7,
    productsCount: 45,
    positiveRate: "97.9%",
    avatarBg: "bg-neutral-800 text-white",
    link: "/products?category=men",
  },
];

export default function BrandStoresSection() {
  return (
    <section className="w-full py-8 sm:py-10 bg-white border-t border-border-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 pb-3 border-b border-border-light">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-brand uppercase tracking-wider mb-0.5">
              <Store className="w-3.5 h-3.5" />
              <span>Verified Merchant Mall</span>
            </div>
            <h2 className="text-base sm:text-lg font-black text-text-main tracking-tight">
              Official Brand Stores & Verified Sellers
            </h2>
          </div>

          <Link
            href="/become-seller"
            className="text-xs font-bold text-brand hover:underline inline-flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Become a Seller</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Brand Stores Grid (6 Columns on Desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
          {BRAND_STORES.map((brand) => (
            <Link
              key={brand.id}
              href={brand.link}
              className="group bg-white rounded-xl border border-border-light hover:border-brand/50 p-3 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                {/* Brand Logo Avatar */}
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-9 h-9 rounded-xl ${brand.avatarBg} flex items-center justify-center font-black text-xs shadow-2xs group-hover:scale-105 transition-transform`}
                  >
                    {brand.name.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-full">
                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                    <span>Official</span>
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-xs font-bold text-text-main group-hover:text-brand transition-colors line-clamp-1 leading-snug">
                  {brand.name}
                </h3>

                {/* Tagline */}
                <p className="text-[10px] text-text-muted mt-0.5 line-clamp-2 leading-relaxed">
                  {brand.tagline}
                </p>
              </div>

              {/* Bottom Meta */}
              <div className="pt-2 mt-2 border-t border-border-light/60 flex items-center justify-between text-[10px] text-text-muted">
                <span className="flex items-center gap-0.5 font-bold text-text-main">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{brand.rating}</span>
                </span>
                <span className="font-medium text-brand">{brand.productsCount} Items</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

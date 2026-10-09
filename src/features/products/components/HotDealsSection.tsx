"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import ProductCard from "./ProductCard";
import { ALL_PRODUCTS } from "@/data/products";

export default function HotDealsSection() {
  const hotDeals = ALL_PRODUCTS.slice(0, 10);

  return (
    <section aria-label="Hot Deals Showcase" className="w-full bg-brand-surface/30 py-8 sm:py-14 border-t border-border-light/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
              <Flame className="w-4.5 h-4.5 fill-current" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-text-main tracking-tight">
                Hot Deals
              </h2>
              <p className="text-xs text-text-muted hidden sm:block">
                Grab top-rated items with limited-time price drops
              </p>
            </div>
          </div>

          <Link
            href="/mega-deals"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand hover:text-brand-hover hover:gap-2 transition-all cursor-pointer"
          >
            <span>View More</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product Cards Responsive Grid (5 columns on desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {hotDeals.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={idx < 5}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

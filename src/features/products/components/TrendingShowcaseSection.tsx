"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Sparkles, ChevronRight, Zap, Headphones, Shirt, Baby } from "lucide-react";
import ProductCard from "./ProductCard";
import { ALL_PRODUCTS } from "@/data/products";

const CATEGORY_TABS = [
  { id: "all", label: "All Trending", icon: Sparkles },
  { id: "electronics", label: "Audio & Gadgets", icon: Headphones },
  { id: "women", label: "Women's Dresses", icon: Shirt },
  { id: "men", label: "Men's Fashion", icon: Shirt },
  { id: "toys-games", label: "Toys & Kids", icon: Baby },
];

export default function TrendingShowcaseSection() {
  const [activeTab, setActiveTab] = useState("all");

  const displayedProducts = useMemo(() => {
    let result = [...ALL_PRODUCTS];

    if (activeTab !== "all") {
      result = result.filter((p) => p.category === activeTab);
    }

    return result.slice(0, 5);
  }, [activeTab]);

  return (
    <section className="w-full py-6 sm:py-8 bg-brand-surface/30 border-t border-border-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4 pb-3 border-b border-border-light">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-brand uppercase tracking-wider mb-0.5">
              <Zap className="w-3.5 h-3.5" />
              <span>Curated Daily Recommendations</span>
            </div>
            <h2 className="text-base sm:text-lg font-black text-text-main tracking-tight">
              Trending Products & Category Picks
            </h2>
          </div>

          {/* Interactive Category Switcher Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORY_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    isActive
                      ? "bg-brand text-white shadow-2xs"
                      : "bg-white text-text-muted hover:text-text-main border border-border-light"
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5-Column Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom View All Link */}
        <div className="mt-4 text-center">
          <Link
            href={activeTab === "all" ? "/products" : `/products?category=${activeTab}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:underline px-4 py-1.5 rounded-lg bg-white border border-border-light shadow-2xs"
          >
            <span>Explore More in {activeTab === "all" ? "All Products" : activeTab}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

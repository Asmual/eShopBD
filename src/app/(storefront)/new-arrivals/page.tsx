"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Sparkles, ChevronRight, Clock, ShieldCheck, Truck } from "lucide-react";
import ProductCard from "@/features/products/components/ProductCard";
import ProductFilterBar from "@/features/products/components/ProductFilterBar";
import EmptyState from "@/components/common/EmptyState";
import { ALL_PRODUCTS } from "@/data/products";

const NEW_ARRIVALS_CATEGORIES = [
  { id: "women", name: "Women's Collection" },
  { id: "men", name: "Men's Collection" },
  { id: "kids", name: "Kids & Babies" },
  { id: "toys-games", name: "Toys & Games" },
  { id: "electronics", name: "Electronics" },
];

export default function NewArrivalsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");

  const newArrivals = useMemo(() => {
    // Priority to items tagged as isNewArrival, fallback to latest
    let result = ALL_PRODUCTS.filter((p) => p.isNewArrival || p.badge === "NEW");
    if (result.length < 6) {
      result = ALL_PRODUCTS.slice(0, 8);
    }

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
        result.sort((a, b) => b.soldCount - a.soldCount);
        break;
      default:
        break;
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="w-full bg-brand-surface/40 min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-text-muted mb-4 sm:mb-6"
        >
          <Link href="/" className="hover:text-brand transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-text-main font-semibold">New Arrivals</span>
        </nav>

        {/* Hero Header Banner */}
        <div className="bg-gradient-to-r from-emerald-800 via-brand to-teal-800 rounded-2xl p-6 sm:p-10 text-white mb-6 sm:mb-8 shadow-sm relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-text-main text-xs font-black uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>Season Fresh Drops 2026</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              New Arrivals Collection
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-white/90 leading-relaxed">
              Discover the latest trends, newly released electronics, and seasonal fashion essentials. Handpicked daily directly from top brands and verified sellers.
            </p>
          </div>
          <div className="absolute -right-8 -bottom-8 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Value Highlights Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
          <div className="bg-white rounded-xl p-3.5 border border-border-light flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-brand flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-text-main">Updated Daily</h4>
              <p className="text-[11px] text-text-muted">Fresh catalogs listed every 24 hours</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-3.5 border border-border-light flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-brand flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-text-main">100% Authentic</h4>
              <p className="text-[11px] text-text-muted">Direct from authorized manufacturers</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-3.5 border border-border-light flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-brand flex items-center justify-center shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-text-main">Priority Dispatch</h4>
              <p className="text-[11px] text-text-muted">Same-day packaging on new arrivals</p>
            </div>
          </div>
        </div>

        {/* Dynamic Filter and Sort Bar */}
        <ProductFilterBar
          categories={NEW_ARRIVALS_CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalCount={newArrivals.length}
        />

        {/* Product Cards Grid */}
        {newArrivals.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {newArrivals.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={idx < 4}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No new arrivals found"
            description="Try switching categories or clearing search filters to see all available drops."
            onReset={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
          />
        )}
      </div>
    </div>
  );
}

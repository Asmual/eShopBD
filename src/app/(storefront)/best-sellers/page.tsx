"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Award, ChevronRight, TrendingUp, ThumbsUp, Star } from "lucide-react";
import ProductCard from "@/features/products/components/ProductCard";
import ProductFilterBar from "@/features/products/components/ProductFilterBar";
import EmptyState from "@/components/common/EmptyState";
import { ALL_PRODUCTS } from "@/data/products";

const BEST_SELLER_CATEGORIES = [
  { id: "electronics", name: "Electronics" },
  { id: "women", name: "Women's Fashion" },
  { id: "men", name: "Men's Fashion" },
  { id: "toys-games", name: "Toys & Games" },
  { id: "kids", name: "Kids & Babies" },
];

export default function BestSellersPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");

  const bestSellers = useMemo(() => {
    let result = ALL_PRODUCTS.filter(
      (p) => p.isBestSeller || p.soldCount > 1000
    );
    if (result.length < 6) {
      result = [...ALL_PRODUCTS].sort((a, b) => b.soldCount - a.soldCount);
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
      case "featured":
        result.sort((a, b) => b.price - a.price);
        break;
      case "popular":
      default:
        result.sort((a, b) => b.soldCount - a.soldCount);
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
          <span className="text-text-main font-semibold">Best Sellers</span>
        </nav>

        {/* Hero Header Banner */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 rounded-2xl p-6 sm:p-10 text-white mb-6 sm:mb-8 shadow-sm relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider mb-3 backdrop-blur-xs">
              <Award className="w-4 h-4 fill-current" />
              <span>Community Favorite Top Ranked</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Best Sellers Leaderboard
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-white/90 leading-relaxed">
              Explore our most purchased and highly recommended products. Loved by thousands of customers nationwide for unmatched durability, style, and performance.
            </p>
          </div>
          <div className="absolute -right-8 -bottom-8 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Stats Highlight Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
          <div className="bg-white rounded-xl p-3.5 border border-border-light flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-text-main">50,000+ Orders</h4>
              <p className="text-[11px] text-text-muted">Successfully fulfilled across Bangladesh</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-3.5 border border-border-light flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Star className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-text-main">4.8+ Rating Average</h4>
              <p className="text-[11px] text-text-muted">Based on 12,000+ verified customer reviews</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-3.5 border border-border-light flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <ThumbsUp className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-text-main">98% Recommendation</h4>
              <p className="text-[11px] text-text-muted">Verified buyer satisfaction guarantee</p>
            </div>
          </div>
        </div>

        {/* Filter and Sort Bar */}
        <ProductFilterBar
          categories={BEST_SELLER_CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalCount={bestSellers.length}
        />

        {/* Product Cards Grid (5 columns on desktop) */}
        {bestSellers.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {bestSellers.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={idx < 4}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No best selling products found"
            description="Try clearing search filters or selecting all categories to view the full list."
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

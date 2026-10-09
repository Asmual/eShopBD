"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Sparkles, ChevronRight } from "lucide-react";
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
    <div className="w-full bg-brand-surface/40 min-h-screen pt-2 sm:pt-3 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Page Header & Breadcrumbs (Brand Green Theme) */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 py-1.5 mb-3 border-b border-border-light">
          <div className="flex flex-wrap items-center gap-2">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-xs text-text-muted"
            >
              <Link href="/" className="hover:text-brand transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-text-main font-semibold">New Arrivals</span>
            </nav>
            <span className="text-border-light hidden sm:inline">|</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-light text-brand">
              <Sparkles className="w-3 h-3" />
              <span>Season Fresh Drops 2026</span>
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-text-muted hidden md:block">
            {newArrivals.length} freshly curated items • Handpicked daily
          </p>
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

        {/* Product Cards Grid (5 columns on desktop) */}
        {newArrivals.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
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

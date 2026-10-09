"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Award, ChevronRight } from "lucide-react";
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
              <span className="text-text-main font-semibold">Best Sellers</span>
            </nav>
            <span className="text-border-light hidden sm:inline">|</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-light text-brand">
              <Award className="w-3.5 h-3.5" />
              <span>Top Rated & Most Popular</span>
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-text-muted hidden md:block">
            {bestSellers.length} community favorite items • 4.8★ customer satisfaction
          </p>
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

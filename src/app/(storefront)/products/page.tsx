"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ShoppingBag, ChevronRight, Sparkles } from "lucide-react";
import ProductCard from "@/features/products/components/ProductCard";
import ProductFilterBar from "@/features/products/components/ProductFilterBar";
import EmptyState from "@/components/common/EmptyState";
import { ALL_PRODUCTS } from "@/data/products";

const ALL_PRODUCT_CATEGORIES = [
  { id: "women", name: "Women's Fashion" },
  { id: "men", name: "Men's Fashion" },
  { id: "kids", name: "Kids & Babies" },
  { id: "toys-games", name: "Toys & Games" },
  { id: "electronics", name: "Electronics" },
];

function ProductsCatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialSearch = searchParams.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  const filteredProducts = useMemo(() => {
    let result = [...ALL_PRODUCTS];

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
        {/* Compact Page Header & Breadcrumbs */}
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
              <span className="text-text-main font-semibold">Products Catalog</span>
            </nav>
            <span className="text-border-light hidden sm:inline">|</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-light text-brand">
              <ShoppingBag className="w-3 h-3" />
              <span>{filteredProducts.length} Items Available</span>
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-text-muted hidden md:block">
            Verified authentic brands & fast dispatch across Bangladesh
          </p>
        </div>

        {/* Dynamic Filter and Sort Bar */}
        <ProductFilterBar
          categories={ALL_PRODUCT_CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalCount={filteredProducts.length}
        />

        {/* Product Cards Grid (5 columns on desktop) */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {filteredProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={idx < 4}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No matching products found"
            description="Try clearing search query or switching categories to browse available items."
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

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen py-20 text-center text-sm text-text-muted">
          Loading catalog...
        </div>
      }
    >
      <ProductsCatalogContent />
    </Suspense>
  );
}

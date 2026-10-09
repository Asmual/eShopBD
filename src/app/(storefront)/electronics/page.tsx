"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Cpu, ChevronRight, Zap, ShieldCheck, Headphones, Truck } from "lucide-react";
import ProductCard from "@/features/products/components/ProductCard";
import ProductFilterBar from "@/features/products/components/ProductFilterBar";
import EmptyState from "@/components/common/EmptyState";
import { ALL_PRODUCTS } from "@/data/products";

const ELECTRONICS_SUB_CATEGORIES = [
  { id: "all", name: "All Electronics" },
  { id: "speakers", name: "Speakers & Sound" },
  { id: "chargers-power", name: "Power & Chargers" },
  { id: "headphones", name: "Headphones & Earbuds" },
];

export default function ElectronicsPage() {
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");

  const electronicsProducts = useMemo(() => {
    let result = ALL_PRODUCTS.filter((p) => p.category === "electronics");

    if (selectedSubCategory !== "all") {
      if (selectedSubCategory === "speakers") {
        result = result.filter(
          (p) =>
            p.name.toLowerCase().includes("speaker") ||
            p.name.toLowerCase().includes("sound")
        );
      } else if (selectedSubCategory === "chargers-power") {
        result = result.filter(
          (p) =>
            p.name.toLowerCase().includes("charger") ||
            p.name.toLowerCase().includes("power bank")
        );
      } else if (selectedSubCategory === "headphones") {
        result = result.filter(
          (p) =>
            p.name.toLowerCase().includes("headphone") ||
            p.name.toLowerCase().includes("earbud")
        );
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q));
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
  }, [selectedSubCategory, searchQuery, sortBy]);

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
              <Link href="/categories" className="hover:text-brand transition-colors">
                Categories
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-text-main font-semibold">Electronics & Gadgets</span>
            </nav>
            <span className="text-border-light hidden sm:inline">|</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-light text-brand">
              <Cpu className="w-3.5 h-3.5" />
              <span>{electronicsProducts.length} Premium Verified Items</span>
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-text-muted hidden md:flex">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-brand" />
              100% Authentic
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-brand" />
              Fast Dispatch
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Headphones className="w-3.5 h-3.5 text-brand" />
              Official Warranty
            </span>
          </div>
        </div>

        {/* Filter and Sort Bar */}
        <ProductFilterBar
          categories={ELECTRONICS_SUB_CATEGORIES.filter((c) => c.id !== "all")}
          selectedCategory={selectedSubCategory}
          onSelectCategory={setSelectedSubCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalCount={electronicsProducts.length}
        />

        {/* 5-Column Product Cards Grid */}
        {electronicsProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {electronicsProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={idx < 5}
                showDealProgress={Boolean(product.isMegaDeal && product.claimedPercent)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No electronics products found"
            description="Try clearing search filters or selecting all categories to view the full list."
            onReset={() => {
              setSelectedSubCategory("all");
              setSearchQuery("");
            }}
          />
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Baby, ChevronRight, ShieldCheck, Sparkles, Heart, Truck } from "lucide-react";
import ProductCard from "@/features/products/components/ProductCard";
import ProductFilterBar from "@/features/products/components/ProductFilterBar";
import EmptyState from "@/components/common/EmptyState";
import { ALL_PRODUCTS } from "@/data/products";

const TOYS_SUB_CATEGORIES = [
  { id: "all", name: "All Toys & Kids" },
  { id: "stem", name: "STEM & Learning" },
  { id: "vehicles", name: "RC & Vehicles" },
  { id: "baby", name: "Baby & Sensory" },
  { id: "creative", name: "Creative & Pretend" },
];

export default function ToysPage() {
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");

  const toysProducts = useMemo(() => {
    let result = ALL_PRODUCTS.filter(
      (p) => p.category === "toys-kids" || p.category === "toys-games" || p.category === "kids"
    );

    if (selectedSubCategory !== "all") {
      if (selectedSubCategory === "stem") {
        result = result.filter(
          (p) =>
            p.name.toLowerCase().includes("flash card") ||
            p.name.toLowerCase().includes("learning") ||
            p.name.toLowerCase().includes("microscope") ||
            p.name.toLowerCase().includes("magnetic") ||
            p.name.toLowerCase().includes("stem") ||
            p.name.toLowerCase().includes("book") ||
            p.name.toLowerCase().includes("camera")
        );
      } else if (selectedSubCategory === "vehicles") {
        result = result.filter(
          (p) =>
            p.name.toLowerCase().includes("car") ||
            p.name.toLowerCase().includes("truck") ||
            p.name.toLowerCase().includes("racing") ||
            p.name.toLowerCase().includes("rc") ||
            p.name.toLowerCase().includes("rocket") ||
            p.name.toLowerCase().includes("train") ||
            p.name.toLowerCase().includes("drone")
        );
      } else if (selectedSubCategory === "baby") {
        result = result.filter(
          (p) =>
            p.name.toLowerCase().includes("baby") ||
            p.name.toLowerCase().includes("piano") ||
            p.name.toLowerCase().includes("walker") ||
            p.name.toLowerCase().includes("bear") ||
            p.name.toLowerCase().includes("romper") ||
            p.name.toLowerCase().includes("toddler")
        );
      } else if (selectedSubCategory === "creative") {
        result = result.filter(
          (p) =>
            p.name.toLowerCase().includes("dough") ||
            p.name.toLowerCase().includes("doctor") ||
            p.name.toLowerCase().includes("kitchen") ||
            p.name.toLowerCase().includes("tent") ||
            p.name.toLowerCase().includes("drawing") ||
            p.name.toLowerCase().includes("bubble") ||
            p.name.toLowerCase().includes("robot")
        );
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
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
  }, [selectedSubCategory, searchQuery, sortBy]);

  return (
    <div className="w-full bg-brand-surface/40 min-h-screen pt-2 sm:pt-3 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Page Header & Breadcrumbs (Brand Theme) */}
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
              <span className="text-text-main font-semibold">Toys & Kids</span>
            </nav>
            <span className="text-border-light hidden sm:inline">|</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-light text-brand">
              <Baby className="w-3.5 h-3.5" />
              <span>{toysProducts.length} Premium Verified Items</span>
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-text-muted hidden md:flex">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-brand" />
              100% Non-Toxic & Safe
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-brand" />
              STEM Verified
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-brand" />
              Fast Nationwide Dispatch
            </span>
          </div>
        </div>

        {/* Filter and Sort Bar */}
        <ProductFilterBar
          categories={TOYS_SUB_CATEGORIES.filter((c) => c.id !== "all")}
          selectedCategory={selectedSubCategory}
          onSelectCategory={setSelectedSubCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalCount={toysProducts.length}
        />

        {/* 5-Column Product Cards Grid */}
        {toysProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {toysProducts.map((product, idx) => (
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
            title="No toys & kids products found"
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

"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Layers, ChevronRight, Sparkles } from "lucide-react";
import ProductCard from "@/features/products/components/ProductCard";
import ProductFilterBar from "@/features/products/components/ProductFilterBar";
import EmptyState from "@/components/common/EmptyState";
import { ALL_PRODUCTS } from "@/data/products";

const CATEGORIES_METADATA = [
  {
    id: "women",
    name: "Women's Fashion",
    image: "/images/categories/category-women.jpg",
    itemCount: "450+ Items",
    description: "Ethnic sets, kurtis, western dresses, accessories & jewelry.",
  },
  {
    id: "men",
    name: "Men's Fashion",
    image: "/images/categories/category-men2.jpg",
    itemCount: "380+ Items",
    description: "Casual shirts, panjabis, formal chinos, denim & activewear.",
  },
  {
    id: "kids",
    name: "Kids & Babies",
    image: "/images/categories/category-kids.jpg",
    itemCount: "290+ Items",
    description: "Gentle organic clothing, baby care essentials, shoes & accessories.",
  },
  {
    id: "toys-games",
    name: "Toys & Games",
    image: "/images/categories/category-Toys.jpg",
    itemCount: "210+ Items",
    description: "Interactive STEM robots, building blocks, drones & board games.",
  },
  {
    id: "electronics",
    name: "Electronics & Gadgets",
    image: "/images/products/electronics/electronics-8.jpg",
    itemCount: "10+ Verified Items",
    description: "Wireless audio, power banks, fast chargers & home speakers.",
  },
];

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");

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

  const categoryOptions = CATEGORIES_METADATA.map((c) => ({
    id: c.id,
    name: c.name,
  }));

  return (
    <div className="w-full bg-brand-surface/40 min-h-screen pt-2 sm:pt-3 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Breadcrumbs & Header Strip */}
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
              <span className="text-text-main font-semibold">Categories</span>
            </nav>
            <span className="text-border-light hidden sm:inline">|</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-light text-brand">
              <Layers className="w-3 h-3" />
              <span>{CATEGORIES_METADATA.length} Primary Departments</span>
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-text-muted hidden md:block">
            Explore verified products across all departments
          </p>
        </div>

        {/* Category Cards Showcase */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-sm font-bold text-text-main">
              Featured Departments
            </h2>
            {selectedCategory !== "all" && (
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className="text-xs font-bold text-brand hover:underline cursor-pointer"
              >
                Clear Filter (View All)
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
            {CATEGORIES_METADATA.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <div
                  key={cat.id}
                  onClick={() =>
                    setSelectedCategory(isSelected ? "all" : cat.id)
                  }
                  className={`group relative rounded-xl p-2.5 sm:p-3 bg-white border transition-all duration-200 cursor-pointer overflow-hidden ${
                    isSelected
                      ? "border-brand ring-2 ring-brand/20 shadow-xs bg-brand-surface"
                      : "border-border-light hover:border-brand/40 hover:shadow-xs"
                  }`}
                >
                  <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-50 mb-2">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-text-main group-hover:text-brand transition-colors line-clamp-1">
                    {cat.name}
                  </h3>
                  <span className="text-[10px] sm:text-[11px] font-semibold text-text-muted block mt-0.5">
                    {cat.itemCount}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Catalog Filter & Sort Bar */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-black text-text-main flex items-center gap-2">
            <span>Browse Products</span>
            <Sparkles className="w-4 h-4 text-brand" />
          </h2>
        </div>

        <ProductFilterBar
          categories={categoryOptions}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalCount={filteredProducts.length}
        />

        {/* Product Grid (5 columns on desktop) */}
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
            description="Try selecting another category or clear your search query to see available items."
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

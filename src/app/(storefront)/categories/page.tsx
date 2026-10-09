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
    image: "/images/categories/category-electronics.jpg",
    itemCount: "520+ Items",
    description: "Wireless audio, smart watches, fast chargers & computer peripherals.",
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
          <span className="text-text-main font-semibold">Categories</span>
        </nav>

        {/* Page Header Banner */}
        <div className="bg-gradient-to-r from-brand to-brand-hover rounded-2xl p-6 sm:p-10 text-white mb-8 sm:mb-12 shadow-sm relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-xs">
              <Layers className="w-3.5 h-3.5" />
              <span>Explore Department Showcase</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              All Categories & Departments
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-white/90 leading-relaxed">
              Explore thousands of verified products across fashion, electronics, toys, and lifestyle. Discover deals curated for your every need.
            </p>
          </div>
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Category Cards Showcase */}
        <div className="mb-10 sm:mb-14">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-text-main">
                Featured Categories
              </h2>
              <p className="text-xs text-text-muted">
                Select a department to quickly view its product catalog
              </p>
            </div>
            {selectedCategory !== "all" && (
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className="text-xs font-bold text-brand hover:underline cursor-pointer"
              >
                View All Categories
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">
            {CATEGORIES_METADATA.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <div
                  key={cat.id}
                  onClick={() =>
                    setSelectedCategory(isSelected ? "all" : cat.id)
                  }
                  className={`group relative rounded-2xl p-4 bg-white border transition-all duration-300 cursor-pointer overflow-hidden ${
                    isSelected
                      ? "border-brand ring-2 ring-brand/20 shadow-md bg-brand-surface"
                      : "border-border-light hover:border-brand/40 hover:shadow-md"
                  }`}
                >
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-50 mb-3">
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
                  <span className="text-[11px] font-semibold text-text-muted block mt-0.5">
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

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
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

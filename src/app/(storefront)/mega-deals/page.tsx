"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Flame, ChevronRight, Timer } from "lucide-react";
import ProductCard from "@/features/products/components/ProductCard";
import ProductFilterBar from "@/features/products/components/ProductFilterBar";
import EmptyState from "@/components/common/EmptyState";
import { ALL_PRODUCTS } from "@/data/products";

const MEGA_DEALS_CATEGORIES = [
  { id: "electronics", name: "Electronics" },
  { id: "toys-games", name: "Toys & Games" },
  { id: "women", name: "Women's Fashion" },
  { id: "men", name: "Men's Fashion" },
  { id: "kids", name: "Kids & Babies" },
];

export default function MegaDealsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");

  // Live Countdown Timer (14 hours, 32 minutes, 45 seconds from mount)
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const megaDeals = useMemo(() => {
    let result = ALL_PRODUCTS.filter(
      (p) => p.isMegaDeal || p.discountPercent >= 25
    );

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
        result.sort((a, b) => (b.claimedPercent || 0) - (a.claimedPercent || 0));
        break;
      case "featured":
      default:
        result.sort((a, b) => b.discountPercent - a.discountPercent);
        break;
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  const formatNumber = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="w-full bg-brand-surface/40 min-h-screen pt-2 sm:pt-3 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Breadcrumb Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 py-1.5 mb-2.5 border-b border-border-light">
          <div className="flex flex-wrap items-center gap-2">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-xs text-text-muted"
            >
              <Link href="/" className="hover:text-brand transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-text-main font-semibold">Mega Deals</span>
            </nav>
            <span className="text-border-light hidden sm:inline">|</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-light text-brand">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>{megaDeals.length} Flash Deals Live</span>
            </span>
          </div>

          {/* Compact Countdown Bar */}
          <div className="flex items-center gap-2 text-xs font-mono font-bold bg-brand text-white px-3 py-1 rounded-full shadow-xs">
            <Timer className="w-3.5 h-3.5 text-white animate-pulse" />
            <span className="text-[11px] font-sans font-medium text-white/90">Deals Expire:</span>
            <span className="bg-white text-brand px-1.5 py-0.2 rounded font-black text-xs">{formatNumber(timeLeft.hours)}h</span>
            <span>:</span>
            <span className="bg-white text-brand px-1.5 py-0.2 rounded font-black text-xs">{formatNumber(timeLeft.minutes)}m</span>
            <span>:</span>
            <span className="bg-white text-brand px-1.5 py-0.2 rounded font-black text-xs">{formatNumber(timeLeft.seconds)}s</span>
          </div>
        </div>

        {/* Filter and Sort Bar */}
        <ProductFilterBar
          categories={MEGA_DEALS_CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalCount={megaDeals.length}
        />

        {/* Product Cards Grid with Deal Progress Bar (5 columns on desktop) */}
        {megaDeals.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {megaDeals.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                showDealProgress={true}
                priority={idx < 4}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No mega deals currently found"
            description="All limited stock items in this category may be claimed. Check back shortly for the next drop."
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

"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Flame, ChevronRight, Timer, Zap, Tag } from "lucide-react";
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
          <span className="text-text-main font-semibold">Mega Deals</span>
        </nav>

        {/* Hero Header Banner with Live Countdown Timer (Website Brand Theme) */}
        <div className="bg-gradient-to-r from-brand via-brand-hover to-[#093522] rounded-2xl p-6 sm:p-10 text-white mb-6 sm:mb-8 shadow-sm relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider mb-3 backdrop-blur-xs">
                <Flame className="w-4 h-4 fill-current text-white" />
                <span>Lightning Flash Deals 2026</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
                Mega Deals & Super Flash Sales
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-white/90 leading-relaxed">
                Save up to 50% on top electronics, branded fashion, and trending gadgets. Limited inventory with claim limits—grab yours before the timer expires!
              </p>
            </div>

            {/* Countdown Box */}
            <div className="bg-black/25 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/20 shrink-0 text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white/95 mb-2.5">
                <Timer className="w-4 h-4 text-white" />
                <span>Deals Expire In</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="flex flex-col items-center">
                  <span className="w-12 h-12 rounded-xl bg-white text-brand text-xl font-black flex items-center justify-center shadow-md">
                    {formatNumber(timeLeft.hours)}
                  </span>
                  <span className="text-[10px] font-bold text-white/80 mt-1 uppercase">Hours</span>
                </div>
                <span className="text-2xl font-black text-white/80 -mt-4">:</span>
                <div className="flex flex-col items-center">
                  <span className="w-12 h-12 rounded-xl bg-white text-brand text-xl font-black flex items-center justify-center shadow-md">
                    {formatNumber(timeLeft.minutes)}
                  </span>
                  <span className="text-[10px] font-bold text-white/80 mt-1 uppercase">Mins</span>
                </div>
                <span className="text-2xl font-black text-white/80 -mt-4">:</span>
                <div className="flex flex-col items-center">
                  <span className="w-12 h-12 rounded-xl bg-white text-brand text-xl font-black flex items-center justify-center shadow-md">
                    {formatNumber(timeLeft.seconds)}
                  </span>
                  <span className="text-[10px] font-bold text-white/80 mt-1 uppercase">Secs</span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -right-8 -bottom-8 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Value Highlights Strip (Brand Colors) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
          <div className="bg-white rounded-xl p-3.5 border border-border-light flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-brand-light text-brand flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-text-main">Instant Price Drops</h4>
              <p className="text-[11px] text-text-muted">Direct manufacturer clearance discounts</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-3.5 border border-border-light flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-brand-light text-brand flex items-center justify-center shrink-0">
              <Tag className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-text-main">Stackable Coupons</h4>
              <p className="text-[11px] text-text-muted">Use checkout promo codes for extra savings</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-3.5 border border-border-light flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-brand-light text-brand flex items-center justify-center shrink-0">
              <Flame className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-text-main">Limited Stock Allocation</h4>
              <p className="text-[11px] text-text-muted">Reserve before units sell out completely</p>
            </div>
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

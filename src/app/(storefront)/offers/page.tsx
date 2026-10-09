"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Tag, ChevronRight, Copy, Check, Ticket, Gift, Percent } from "lucide-react";
import toast from "react-hot-toast";
import ProductCard from "@/features/products/components/ProductCard";
import ProductFilterBar from "@/features/products/components/ProductFilterBar";
import EmptyState from "@/components/common/EmptyState";
import { ALL_PRODUCTS, COUPON_OFFERS } from "@/data/products";

const OFFERS_CATEGORIES = [
  { id: "women", name: "Fashion Deals" },
  { id: "electronics", name: "Tech Discounts" },
  { id: "toys-games", name: "Toys & Games" },
  { id: "kids", name: "Baby & Kids" },
];

export default function OffersPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`Coupon code ${code} copied to clipboard!`);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const offerProducts = useMemo(() => {
    let result = ALL_PRODUCTS.filter((p) => p.discountPercent > 0);

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
      case "featured":
      default:
        result.sort((a, b) => b.discountPercent - a.discountPercent);
        break;
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

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
              <span className="text-text-main font-semibold">Offers & Coupons</span>
            </nav>
            <span className="text-border-light hidden sm:inline">|</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-light text-brand">
              <Gift className="w-3 h-3 text-brand" />
              <span>Verified Store Vouchers & Promos</span>
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-text-muted hidden md:block">
            Apply active coupons during checkout for instant discounts
          </p>
        </div>

        {/* Interactive Coupon Vouchers Showcase */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-sm font-bold text-text-main flex items-center gap-1.5">
              <Ticket className="w-4 h-4 text-brand" />
              <span>Available Coupon Codes ({COUPON_OFFERS.length})</span>
            </h2>
            <span className="text-[11px] text-text-muted hidden sm:inline">
              Click any code below to copy instantly
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
            {COUPON_OFFERS.map((coupon) => {
              const isCopied = copiedCode === coupon.code;
              return (
                <div
                  key={coupon.id}
                  className="relative bg-white rounded-xl border border-dashed border-brand/40 p-3 sm:p-3.5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  {/* Top Badge */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded-md bg-brand-light text-brand text-[10px] font-black uppercase tracking-wider">
                      {coupon.tag}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-600">
                      {coupon.discount}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-text-main mb-0.5">
                      {coupon.title}
                    </h3>
                    <p className="text-[11px] text-text-muted leading-relaxed line-clamp-1 mb-2">
                      {coupon.description}
                    </p>
                  </div>

                  {/* Coupon Code Pill & Copy Button */}
                  <div className="pt-2 border-t border-border-light flex items-center justify-between">
                    <div className="font-mono text-xs font-black text-brand bg-gray-50 px-2.5 py-1.5 rounded-lg border border-border-light select-all">
                      {coupon.code}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopyCode(coupon.code)}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isCopied
                          ? "bg-emerald-600 text-white"
                          : "bg-brand hover:bg-brand-hover text-white active:scale-98"
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Discounted Product Catalog Section */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-black text-text-main flex items-center gap-2">
            <Percent className="w-5 h-5 text-brand" />
            <span>Eligible Discounted Products</span>
          </h2>
        </div>

        <ProductFilterBar
          categories={OFFERS_CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalCount={offerProducts.length}
        />

        {/* Product Cards Grid (5 columns on desktop) */}
        {offerProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {offerProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={idx < 4}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No promotional items found"
            description="Try selecting another category or clear search terms to see all eligible offers."
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

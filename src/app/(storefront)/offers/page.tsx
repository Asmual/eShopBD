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
          <span className="text-text-main font-semibold">Offers & Coupons</span>
        </nav>

        {/* Hero Header Banner */}
        <div className="bg-gradient-to-r from-teal-800 via-brand to-emerald-700 rounded-2xl p-6 sm:p-10 text-white mb-8 sm:mb-10 shadow-sm relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider mb-3 backdrop-blur-xs">
              <Gift className="w-3.5 h-3.5 fill-current text-yellow-300" />
              <span>Verified Promo Vouchers & Deals</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Exclusive Offers & Discount Vouchers
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-white/90 leading-relaxed">
              Unlock extraordinary savings with our official store coupons and bundle deals. Apply any active coupon code at checkout for immediate extra discounts.
            </p>
          </div>
          <div className="absolute -right-8 -bottom-8 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Interactive Coupon Vouchers Showcase */}
        <div className="mb-10 sm:mb-14">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-text-main flex items-center gap-2">
                <Ticket className="w-5 h-5 text-brand" />
                <span>Available Coupon Vouchers</span>
              </h2>
              <p className="text-xs text-text-muted">
                Click any voucher code to copy and apply directly during checkout
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {COUPON_OFFERS.map((coupon) => {
              const isCopied = copiedCode === coupon.code;
              return (
                <div
                  key={coupon.id}
                  className="relative bg-white rounded-2xl border border-dashed border-brand/40 p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  {/* Top Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-0.5 rounded-md bg-brand-light text-brand text-[10px] font-black uppercase tracking-wider">
                      {coupon.tag}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-600">
                      {coupon.discount}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <div>
                    <h3 className="text-sm font-bold text-text-main mb-1">
                      {coupon.title}
                    </h3>
                    <p className="text-xs text-text-muted leading-relaxed line-clamp-2 mb-3">
                      {coupon.description}
                    </p>
                  </div>

                  {/* Coupon Code Pill & Copy Button */}
                  <div className="pt-3 border-t border-border-light flex items-center justify-between">
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

        {/* Product Cards Grid */}
        {offerProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
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

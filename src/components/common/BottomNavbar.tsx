"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Menu,
  ChevronDown,
  Store,
  Flame,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const CATEGORIES_LIST = [
  { name: "Baby & Kids", slug: "baby-kids" },
  { name: "Beauty & Personal Care", slug: "beauty" },
  { name: "Books & Stationery", slug: "books" },
  { name: "Consumer Electronics", slug: "electronics" },
  { name: "Fashion & Apparel", slug: "fashion" },
  { name: "Daily Grocery", slug: "grocery" },
  { name: "Health & Fitness", slug: "health-fitness" },
  { name: "Home & Kitchen", slug: "home-kitchen" },
  { name: "Jewelry & Watches", slug: "jewelry" },
  { name: "Sports & Outdoors", slug: "sports" },
];

export default function BottomNavbar() {
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  return (
    <div className="w-full bg-brand text-white relative z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Left: All Categories Dropdown Trigger */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setIsCategoryDropdownOpen((prev) => !prev)}
              aria-expanded={isCategoryDropdownOpen}
              aria-label="Toggle All Categories menu"
              className="h-12 px-5 bg-brand-hover hover:brightness-110 flex items-center gap-3 text-sm font-bold tracking-wide uppercase transition-colors cursor-pointer"
            >
              <Menu className="w-4 h-4 shrink-0" />
              <span>All Categories</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isCategoryDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isCategoryDropdownOpen && (
              <div
                className="absolute top-full left-0 w-64 bg-white border border-border-light shadow-lg rounded-b-xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                onMouseLeave={() => setIsCategoryDropdownOpen(false)}
              >
                {CATEGORIES_LIST.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/products?category=${category.slug}`}
                    onClick={() => setIsCategoryDropdownOpen(false)}
                    className="flex items-center justify-between px-4 py-2.5 text-sm text-text-main hover:bg-brand-light hover:text-brand transition-colors"
                  >
                    <span>{category.name}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-text-muted" />
                  </Link>
                ))}
                <div className="pt-1 mt-1 border-t border-border-light px-4 pb-1">
                  <Link
                    href="/products"
                    onClick={() => setIsCategoryDropdownOpen(false)}
                    className="text-xs font-semibold text-brand hover:underline flex items-center gap-1"
                  >
                    View All Products &rarr;
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Center: Main Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-1 lg:gap-2 flex-1 pl-6"
          >
            <Link
              href="/"
              className="px-3 py-1.5 rounded-md text-sm font-medium text-white hover:bg-brand-hover transition-colors"
            >
              Home
            </Link>

            <Link
              href="/products"
              className="px-3 py-1.5 rounded-md text-sm font-medium text-white/90 hover:text-white hover:bg-brand-hover transition-colors"
            >
              Categories
            </Link>

            <Link
              href="/products?filter=best-sellers"
              className="px-3 py-1.5 rounded-md text-sm font-medium text-white/90 hover:text-white hover:bg-brand-hover transition-colors"
            >
              Best Sellers
            </Link>

            <Link
              href="/products?filter=mega-deals"
              className="px-3 py-1.5 rounded-md text-sm font-medium text-white/90 hover:text-white hover:bg-brand-hover transition-colors relative group"
            >
              <span className="flex items-center gap-1">
                Mega Deals
                <span className="px-1.5 py-0.2 bg-amber-400 text-text-main text-[10px] font-bold rounded-sm uppercase tracking-wider flex items-center gap-0.5">
                  <Flame className="w-2.5 h-2.5 fill-current text-orange-600" />
                  Hot
                </span>
              </span>
            </Link>

            <Link
              href="/products?filter=offers"
              className="px-3 py-1.5 rounded-md text-sm font-medium text-white/90 hover:text-white hover:bg-brand-hover transition-colors"
            >
              Offers
            </Link>

            <Link
              href="/become-seller"
              className="px-3 py-1.5 rounded-md text-sm font-medium text-white/90 hover:text-white hover:bg-brand-hover transition-colors"
            >
              Vendors
            </Link>
          </nav>

          {/* Right: Seller Shortcut (Login is kept strictly in Top Navbar) */}
          <div className="hidden lg:flex items-center shrink-0">
            <Link
              href="/become-seller"
              className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold text-white/95 hover:text-white hover:bg-brand-hover transition-colors border border-white/20"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Become a Seller</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

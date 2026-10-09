"use client";

import React from "react";
import Link from "next/link";
import {
  Menu,
  Store,
  Flame,
} from "lucide-react";

export default function BottomNavbar() {
  return (
    <div className="hidden md:block w-full bg-brand text-white relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-10 sm:h-10.5">
          {/* Left: All Categories Permanent Header (Fixed on Desktop) */}
          <div className="relative shrink-0">
            <div
              className="h-10 sm:h-10.5 w-64 px-4 bg-brand-hover flex items-center gap-2.5 text-xs sm:text-[13px] font-bold tracking-wide uppercase select-none"
            >
              <Menu className="w-4 h-4 shrink-0" />
              <span>All Categories</span>
            </div>
          </div>

          {/* Center: Main Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-0.5 lg:gap-1.5 flex-1 pl-4 lg:pl-6"
          >
            <Link
              href="/"
              className="px-2.5 py-1 rounded-md text-xs sm:text-[13px] font-medium text-white hover:bg-brand-hover transition-colors"
            >
              Home
            </Link>

            <Link
              href="/categories"
              className="px-2.5 py-1 rounded-md text-xs sm:text-[13px] font-medium text-white/90 hover:text-white hover:bg-brand-hover transition-colors"
            >
              Categories
            </Link>

            <Link
              href="/new-arrivals"
              className="px-2.5 py-1 rounded-md text-xs sm:text-[13px] font-medium text-white/90 hover:text-white hover:bg-brand-hover transition-colors"
            >
              New Arrival
            </Link>

            <Link
              href="/best-sellers"
              className="px-2.5 py-1 rounded-md text-xs sm:text-[13px] font-medium text-white/90 hover:text-white hover:bg-brand-hover transition-colors"
            >
              Best Sellers
            </Link>

            <Link
              href="/mega-deals"
              className="px-2.5 py-1 rounded-md text-xs sm:text-[13px] font-medium text-white/90 hover:text-white hover:bg-brand-hover transition-colors relative group"
            >
              <span className="flex items-center gap-1">
                Mega Deals
                <span className="px-1 py-0.2 bg-amber-400 text-text-main text-[9px] font-bold rounded-xs uppercase tracking-wider flex items-center gap-0.5">
                  <Flame className="w-2.5 h-2.5 fill-current text-orange-600" />
                  Hot
                </span>
              </span>
            </Link>

            <Link
              href="/offers"
              className="px-2.5 py-1 rounded-md text-xs sm:text-[13px] font-medium text-white/90 hover:text-white hover:bg-brand-hover transition-colors"
            >
              Offers
            </Link>
          </nav>

          {/* Right: Seller Shortcut (Login is strictly in Top Navbar) */}
          <div className="hidden lg:flex items-center shrink-0">
            <Link
              href="/become-seller"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold text-white/95 hover:text-white hover:bg-brand-hover transition-colors border border-white/20"
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

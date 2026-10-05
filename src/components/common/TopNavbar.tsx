"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Truck,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
} from "lucide-react";
import Logo from "./Logo";

interface TopNavbarProps {
  onToggleMobileMenu?: () => void;
  isMobileMenuOpen?: boolean;
}

export default function TopNavbar({
  onToggleMobileMenu,
  isMobileMenuOpen,
}: TopNavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
  };

  return (
    <div className="w-full bg-white border-b border-border-light">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-13 sm:h-16 gap-2 sm:gap-4 lg:gap-6">
          {/* Logo Section */}
          <Logo size="md" />

          {/* Search Bar (Centered on Desktop) */}
          <div className="flex-1 max-w-xl mx-2 lg:mx-6 hidden md:block">
            <form
              onSubmit={handleSearchSubmit}
              className="relative flex items-center w-full"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Product..."
                aria-label="Search products"
                className="w-full h-9 sm:h-9.5 pl-3.5 pr-11 text-xs sm:text-sm text-text-main bg-white border border-border-light rounded-lg focus:outline-hidden focus:border-brand focus:ring-1 focus:ring-brand transition-all placeholder:text-text-muted"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-1 w-8 h-7.5 bg-brand hover:bg-brand-hover text-white rounded-md flex items-center justify-center transition-colors cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Right Action Icons & Auth */}
          <div className="flex items-center gap-2 sm:gap-4 lg:gap-5 shrink-0">
            {/* Mobile Search Toggle Icon (Only on mobile) */}
            <button
              type="button"
              onClick={() => setIsMobileSearchOpen((prev) => !prev)}
              aria-label={isMobileSearchOpen ? "Close search bar" : "Open search bar"}
              className="md:hidden p-1.5 text-text-main hover:text-brand transition-colors cursor-pointer"
            >
              {isMobileSearchOpen ? (
                <X className="w-4.5 h-4.5 text-brand" />
              ) : (
                <Search className="w-4.5 h-4.5" />
              )}
            </button>

            {/* Track Order (Desktop only) */}
            <Link
              href="/track-order"
              className="hidden lg:flex items-center gap-1.5 text-text-main hover:text-brand transition-colors text-xs sm:text-sm font-medium"
            >
              <Truck className="w-4 h-4 text-text-muted hover:text-brand transition-colors" />
              <span>Track Order</span>
            </Link>

            {/* Wishlist */}
            <Link
              href="/customer/orders"
              className="relative flex items-center text-text-main hover:text-brand transition-colors p-1"
              aria-label="Wishlist (0 items)"
            >
              <Heart className="w-4.5 h-4.5 text-text-main hover:text-brand transition-colors" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-brand text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Cart with Counter */}
            <Link
              href="/cart"
              className="relative flex items-center text-text-main hover:text-brand transition-colors p-1"
              aria-label="Shopping Cart (0 items)"
            >
              <ShoppingCart className="w-4.5 h-4.5 text-text-main hover:text-brand transition-colors" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-brand text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Login / Sign Up */}
            <Link
              href="/login"
              className="hidden sm:flex items-center gap-1.5 text-xs sm:text-sm font-medium text-text-main hover:text-brand transition-colors pl-2.5 sm:pl-3 border-l border-border-light"
            >
              <User className="w-4 h-4 text-text-muted" />
              <span>Login / Sign Up</span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={onToggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              className="md:hidden p-1.5 text-text-main hover:text-brand rounded-lg transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Expandable Mobile Search Bar (Only shown when mobile search icon is tapped) */}
        {isMobileSearchOpen && (
          <div className="pb-2.5 pt-1 md:hidden border-t border-border-light/60 animate-in fade-in slide-in-from-top-1 duration-200">
            <form
              onSubmit={handleSearchSubmit}
              className="relative flex items-center w-full"
            >
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Product..."
                aria-label="Search products"
                className="w-full h-8.5 pl-3 pr-10 text-xs text-text-main bg-gray-50 border border-border-light rounded-lg focus:outline-hidden focus:border-brand focus:bg-white placeholder:text-text-muted"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-1 w-7.5 h-6.5 bg-brand hover:bg-brand-hover text-white rounded-md flex items-center justify-center transition-colors"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

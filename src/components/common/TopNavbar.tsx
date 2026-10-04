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

interface TopNavbarProps {
  onToggleMobileMenu?: () => void;
  isMobileMenuOpen?: boolean;
}

export default function TopNavbar({
  onToggleMobileMenu,
  isMobileMenuOpen,
}: TopNavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
  };

  return (
    <div className="w-full bg-white border-b border-border-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 md:gap-8">
          {/* Logo Section */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 group focus:outline-hidden"
            aria-label="eShopBD Home"
          >
            {/* Shopping Bag Brand Icon */}
            <div className="w-11 h-11 rounded-xl bg-brand flex items-center justify-center text-white shadow-xs group-hover:bg-brand-hover transition-colors">
              <svg
                className="w-6 h-6 transform transition-transform group-hover:scale-110"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>

            {/* Brand Name */}
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold tracking-tight text-text-main flex items-center leading-none">
                eShop<span className="text-brand">BD</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-text-muted mt-0.5">
                Multi-Vendor Store
              </span>
            </div>
          </Link>

          {/* Search Bar (Centered) */}
          <div className="flex-1 max-w-2xl hidden md:block">
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
                className="w-full h-11 pl-4 pr-14 text-sm text-text-main bg-white border border-border-light rounded-lg focus:outline-hidden focus:border-brand focus:ring-1 focus:ring-brand transition-all placeholder:text-text-muted"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-1 w-10 h-9 bg-brand hover:bg-brand-hover text-white rounded-md flex items-center justify-center transition-colors cursor-pointer"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Right Action Icons & Auth */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            {/* Track Order */}
            <Link
              href="/track-order"
              className="hidden lg:flex items-center gap-2 text-text-main hover:text-brand transition-colors text-sm font-medium"
            >
              <Truck className="w-5 h-5 text-text-muted hover:text-brand transition-colors" />
              <span>Track Order</span>
            </Link>

            {/* Wishlist */}
            <Link
              href="/customer/orders"
              className="relative flex items-center text-text-main hover:text-brand transition-colors p-1"
              aria-label="Wishlist (0 items)"
            >
              <Heart className="w-5 h-5 text-text-main hover:text-brand transition-colors" />
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-brand text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Cart with Counter */}
            <Link
              href="/cart"
              className="relative flex items-center text-text-main hover:text-brand transition-colors p-1"
              aria-label="Shopping Cart (0 items)"
            >
              <ShoppingCart className="w-5 h-5 text-text-main hover:text-brand transition-colors" />
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-brand text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Single Login / Sign Up Button (Top bar only as specified) */}
            <Link
              href="/login"
              className="flex items-center gap-2 text-sm font-medium text-text-main hover:text-brand transition-colors pl-2 border-l border-border-light"
            >
              <User className="w-5 h-5 text-text-muted" />
              <span className="hidden sm:inline">Login / Sign Up</span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={onToggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              className="md:hidden p-2 text-text-main hover:text-brand rounded-lg transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Row (Shown only on small screens) */}
        <div className="pb-3 md:hidden">
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
              className="w-full h-10 pl-3.5 pr-12 text-sm text-text-main bg-white border border-border-light rounded-lg focus:outline-hidden focus:border-brand placeholder:text-text-muted"
            />
            <button
              type="submit"
              aria-label="Search"
              className="absolute right-1 w-9 h-8 bg-brand hover:bg-brand-hover text-white rounded-md flex items-center justify-center transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

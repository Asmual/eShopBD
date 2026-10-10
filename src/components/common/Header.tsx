"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TopNavbar from "./TopNavbar";
import BottomNavbar from "./BottomNavbar";
import Logo from "./Logo";
import {
  X,
  Home,
  Layers,
  Award,
  Sparkles,
  Flame,
  Tag,
  Store,
  Truck,
  Heart,
  ShoppingCart,
  User,
} from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActiveRoute = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-xs">
      {/* Top Navbar */}
      <TopNavbar
        onToggleMobileMenu={toggleMobileMenu}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      {/* Bottom Navbar */}
      <BottomNavbar />

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs md:hidden"
          onClick={closeMobileMenu}
        >
          <div
            className="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-white shadow-xl flex flex-col z-50 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Header Top */}
            <div className="flex items-center justify-between p-4 border-b border-border-light bg-brand-surface">
              <Logo size="sm" />

              <button
                type="button"
                onClick={closeMobileMenu}
                aria-label="Close navigation menu"
                className="p-1.5 rounded-lg text-text-muted hover:text-text-main hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <nav className="p-4 space-y-1 flex-1">
              <div className="text-xs font-semibold uppercase tracking-wider text-text-muted px-3 py-2">
                Menu
              </div>

              <Link
                href="/"
                onClick={closeMobileMenu}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActiveRoute("/")
                    ? "bg-brand-light text-brand font-semibold"
                    : "text-text-main hover:bg-brand-light hover:text-brand font-medium"
                }`}
              >
                <Home className="w-4 h-4 text-brand" />
                <span>Home</span>
              </Link>

              <Link
                href="/categories"
                onClick={closeMobileMenu}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActiveRoute("/categories")
                    ? "bg-brand-light text-brand font-semibold"
                    : "text-text-main hover:bg-brand-light hover:text-brand font-medium"
                }`}
              >
                <Layers className="w-4 h-4 text-brand" />
                <span>Categories</span>
              </Link>

              <Link
                href="/new-arrivals"
                onClick={closeMobileMenu}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActiveRoute("/new-arrivals")
                    ? "bg-brand-light text-brand font-semibold"
                    : "text-text-main hover:bg-brand-light hover:text-brand font-medium"
                }`}
              >
                <Sparkles className="w-4 h-4 text-brand" />
                <span>New Arrival</span>
              </Link>

              <Link
                href="/best-sellers"
                onClick={closeMobileMenu}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActiveRoute("/best-sellers")
                    ? "bg-brand-light text-brand font-semibold"
                    : "text-text-main hover:bg-brand-light hover:text-brand font-medium"
                }`}
              >
                <Award className="w-4 h-4 text-brand" />
                <span>Best Sellers</span>
              </Link>

              <Link
                href="/mega-deals"
                onClick={closeMobileMenu}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActiveRoute("/mega-deals")
                    ? "bg-brand-light text-brand font-semibold"
                    : "text-text-main hover:bg-brand-light hover:text-brand font-medium"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span>Mega Deals</span>
                </div>
                <span className="px-1.5 py-0.5 bg-orange-100 text-orange-600 text-[10px] font-bold rounded">
                  HOT
                </span>
              </Link>

              <Link
                href="/offers"
                onClick={closeMobileMenu}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActiveRoute("/offers")
                    ? "bg-brand-light text-brand font-semibold"
                    : "text-text-main hover:bg-brand-light hover:text-brand font-medium"
                }`}
              >
                <Tag className="w-4 h-4 text-brand" />
                <span>Offers</span>
              </Link>

              <Link
                href="/become-seller"
                onClick={closeMobileMenu}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActiveRoute("/become-seller")
                    ? "bg-brand-light text-brand font-semibold"
                    : "text-text-main hover:bg-brand-light hover:text-brand font-medium"
                }`}
              >
                <Store className="w-4 h-4 text-brand" />
                <span>Become a Seller</span>
              </Link>

              <div className="border-t border-border-light my-3 pt-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-text-muted px-3 py-2">
                  Account & Orders
                </div>

                <Link
                  href="/track-order"
                  onClick={closeMobileMenu}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActiveRoute("/track-order")
                      ? "bg-brand-light text-brand font-semibold"
                      : "text-text-main hover:bg-brand-light hover:text-brand font-medium"
                  }`}
                >
                  <Truck className="w-4 h-4 text-text-muted" />
                  <span>Track Order</span>
                </Link>

                <Link
                  href="/customer/orders"
                  onClick={closeMobileMenu}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActiveRoute("/customer/orders")
                      ? "bg-brand-light text-brand font-semibold"
                      : "text-text-main hover:bg-brand-light hover:text-brand font-medium"
                  }`}
                >
                  <Heart className="w-4 h-4 text-text-muted" />
                  <span>Wishlist</span>
                </Link>

                <Link
                  href="/cart"
                  onClick={closeMobileMenu}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActiveRoute("/cart")
                      ? "bg-brand-light text-brand font-semibold"
                      : "text-text-main hover:bg-brand-light hover:text-brand font-medium"
                  }`}
                >
                  <ShoppingCart className="w-4 h-4 text-text-muted" />
                  <span>Shopping Cart</span>
                </Link>

                <Link
                  href="/login"
                  onClick={closeMobileMenu}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActiveRoute("/login")
                      ? "bg-brand-light text-brand font-semibold"
                      : "text-text-main hover:bg-brand-light hover:text-brand font-medium"
                  }`}
                >
                  <User className="w-4 h-4 text-text-muted" />
                  <span>Login / Sign Up</span>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

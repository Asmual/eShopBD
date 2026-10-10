"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Store,
  Flame,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { CATEGORIES } from "@/features/products/components/CategorySidebar";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/categories" },
  { label: "New Arrival", href: "/new-arrivals" },
  { label: "Best Sellers", href: "/best-sellers" },
  {
    label: "Mega Deals",
    href: "/mega-deals",
    hasBadge: true,
  },
  { label: "Offers", href: "/offers" },
];

export default function BottomNavbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on route change
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isDropdownOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const isActiveRoute = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <div className="hidden md:block w-full bg-brand text-white relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-10 sm:h-10.5">
          {/* Left: All Categories Section */}
          {isHomePage ? (
            /* Fixed permanent header on Homepage (matches CategorySidebar perfectly) */
            <div className="relative shrink-0">
              <div className="h-10 sm:h-10.5 w-64 px-4 bg-brand-hover flex items-center gap-2.5 text-xs sm:text-[13px] font-bold tracking-wide uppercase select-none">
                <Menu className="w-4 h-4 shrink-0" />
                <span>All Categories</span>
              </div>
            </div>
          ) : (
            /* Interactive toggle button with floating overlay on all subpages */
            <div ref={dropdownRef} className="relative shrink-0">
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                aria-expanded={isDropdownOpen}
                aria-label="Toggle All Categories Menu"
                className="h-10 sm:h-10.5 w-64 px-4 bg-brand-hover hover:bg-brand-hover/90 flex items-center justify-between text-xs sm:text-[13px] font-bold tracking-wide uppercase cursor-pointer transition-colors focus:outline-hidden"
              >
                <div className="flex items-center gap-2.5">
                  {isDropdownOpen ? (
                    <X className="w-4 h-4 shrink-0 transition-transform duration-200" />
                  ) : (
                    <Menu className="w-4 h-4 shrink-0 transition-transform duration-200" />
                  )}
                  <span>All Categories</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Floating Dropdown Overlay */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 z-50 w-64 bg-white text-text-main shadow-2xl rounded-b-xl border-x border-b border-border-light overflow-hidden animate-in fade-in-0 duration-150">
                  <ul className="divide-y divide-border-light/50 max-h-[calc(100vh-160px)] overflow-y-auto">
                    {CATEGORIES.map((category) => {
                      const Icon = category.icon;
                      return (
                        <li key={category.id}>
                          <Link
                            href={
                              category.slug === "electronics"
                                ? "/electronics"
                                : `/products?category=${category.slug}`
                            }
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-center justify-between px-4 py-2.5 text-xs sm:text-[13px] font-medium text-text-main hover:bg-brand-light hover:text-brand transition-colors group"
                          >
                            <div className="flex items-center gap-2.5">
                              <Icon className="w-4 h-4 text-text-muted group-hover:text-brand transition-colors" />
                              <span>{category.name}</span>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-text-muted group-hover:text-brand group-hover:translate-x-0.5 transition-transform" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Center: Main Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-0.5 lg:gap-1.5 flex-1 pl-4 lg:pl-6"
          >
            {NAV_LINKS.map((link) => {
              const active = isActiveRoute(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-2.5 py-1 rounded-md text-xs sm:text-[13px] transition-colors ${
                    active
                      ? "bg-brand-hover text-white font-semibold shadow-2xs"
                      : "text-white/90 hover:text-white hover:bg-brand-hover font-medium"
                  }`}
                >
                  {link.hasBadge ? (
                    <span className="flex items-center gap-1">
                      {link.label}
                      <span className="px-1 py-0.2 bg-amber-400 text-text-main text-[9px] font-bold rounded-xs uppercase tracking-wider flex items-center gap-0.5">
                        <Flame className="w-2.5 h-2.5 fill-current text-orange-600" />
                        Hot
                      </span>
                    </span>
                  ) : (
                    link.label
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Seller Shortcut (Login is strictly in Top Navbar) */}
          <div className="hidden lg:flex items-center shrink-0">
            <Link
              href="/become-seller"
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors border ${
                isActiveRoute("/become-seller")
                  ? "bg-brand-hover text-white border-white/40 shadow-2xs"
                  : "text-white/95 hover:text-white hover:bg-brand-hover border-white/20"
              }`}
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

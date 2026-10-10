"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Store,
  Flame,
} from "lucide-react";

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
